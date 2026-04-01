import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212] flex">
      <DashboardSidebar role="client" />
      <main className="flex-1 ltr:ml-[280px] rtl:mr-[280px] p-8 md:p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
