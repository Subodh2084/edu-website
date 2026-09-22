import { SidebarTrigger } from "@/components/ui/sidebar";

export default function AdminHeader() {
  return (
    <header className="flex h-16 items-center border-b border-leaf-border bg-white px-4">
      <SidebarTrigger />

      <div className="ml-4">
        <h1 className="text-sm font-semibold text-leaf-navy">
          Admin Panel
        </h1>

        <p className="text-xs text-leaf-muted">
          Manage your website
        </p>
      </div>
    </header>
  );
}