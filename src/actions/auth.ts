"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

/**
 * Login action: Handles both admin (email) and client (phone) login
 */
export async function login(formData: FormData) {
  const loginIdentifier = formData.get("identifier") as string; // Can be email or phone
  const password = formData.get("password") as string;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  let email = loginIdentifier;

  // If identifier is a phone number (doesn't contain @), lookup the associated email
  if (!loginIdentifier.includes("@")) {
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", loginIdentifier)
      .single();

    if (profileError || !profile) {
      return { error: "رقم الهاتف غير مسجل / Numéro non enregistré" };
    }

    // Use a deterministic email for phone-based users
    email = `${loginIdentifier}@yanbaa.local`;
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: "خطأ في تسجيل الدخول / Erreur de connexion" };
  }

  // Check role to redirect correctly
  const { data: userProfile } = await supabase
    .from("profiles")
    .select("role")
    .single();

  revalidatePath("/", "layout");
  
  if (userProfile?.role === "admin") {
    redirect("/admin");
  } else {
    redirect("/account");
  }
}

/**
 * Registration action: Handles complex client registration form
 */
export async function register(formData: FormData) {
  const fullName = formData.get("fullName") as string;
  const businessName = formData.get("businessName") as string;
  const phone = formData.get("phone") as string;
  const address = formData.get("address") as string;
  const wilaya = formData.get("wilaya") as string;
  const commune = formData.get("commune") as string;
  const password = formData.get("password") as string;
  
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  // Use a deterministic email for phone-based users
  const email = `${phone}@yanbaa.local`;

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone: phone,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        full_name: fullName,
        business_name: businessName,
        phone: phone,
        address: address,
        wilaya: wilaya,
        commune: commune,
        role: "client",
      });

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
      return { error: "Could not create profile. Please contact support." };
    }
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/auth/login");
}
