import SiteSettingsForm from "@/components/admin/settings/SiteSettingsForm";

export default function SiteSettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Site Settings
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Manage your website and company information.
        </p>
      </div>
      <SiteSettingsForm />
    </div>
  );
}
