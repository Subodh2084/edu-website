import StatForm from "@/components/admin/stats/StatsForm";

export default function CreateStatPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-leaf-navy">
          Create Stat
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Add a new statistic to display in the homepage hero section.
        </p>
      </div>

      <StatForm />
    </div>
  );
}