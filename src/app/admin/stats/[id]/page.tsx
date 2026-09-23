import { notFound } from "next/navigation";

import { getStatById } from "@/lib/queries/stats";
import StatsForm from "@/components/admin/stats/StatsForm";

interface EditStatPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditStatPage({
  params,
}: EditStatPageProps) {
  const { id } = await params;

  const stat = await getStatById(id);

  if (!stat) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-leaf-navy">
          Edit Stat
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Update the details of this homepage statistic.
        </p>
      </div>

      <StatsForm stat={stat} />
    </div>
  );
}