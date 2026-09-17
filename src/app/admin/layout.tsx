import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import AdminSidebar from "@/components/admin/AdminSidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset>
     <AdminHeader />

        <main className="min-h-screen bg-leaf-bg p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}