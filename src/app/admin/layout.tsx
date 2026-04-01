import DashboardSidebar from "@/components/dashboard/Sidebar";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-[#121212] flex">
      <DashboardSidebar role="admin" />
      <main className="flex-1 ml-64 p-12 overflow-y-auto">
        {children}
      </main>
    </div>
  );
}
