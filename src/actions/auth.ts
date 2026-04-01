"use server";

import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function register(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;
  const fullName = formData.get("fullName") as string;
  const businessName = formData.get("businessName") as string;
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        business_name: businessName,
      },
    },
  });

  if (error) {
    return { error: error.message };
  }

  if (data.user) {
    // Manually create profile if trigger is not set up
    const { error: profileError } = await supabase
      .from("profiles")
      .insert({
        id: data.user.id,
        full_name: fullName,
        business_name: businessName,
        role: "client",
      });

    if (profileError) {
      console.error("Profile creation error:", profileError.message);
    }
  }

  revalidatePath("/", "layout");
  redirect("/account");
}

export async function signOut() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  await supabase.auth.signOut();
  redirect("/auth/login");
}

import { revalidatePath } from "next/cache";
