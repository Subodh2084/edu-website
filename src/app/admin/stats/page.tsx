"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Plus } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";

import { getAllStats, type StatRecord } from "@/lib/queries/stats";
import StatCard from "@/components/admin/stats/StatsCard";

export default function StatsPage() {
  const router = useRouter();
  const [stats, setStats] = useState<StatRecord[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAllStats();
        setStats(data);
      } catch (error) {
        console.error("Failed to load stats:", error);
      } finally {
        setLoading(false);
      }
    }

    loadStats();
  }, []);

  async function handleDelete(id: string) {
    setStats((currentStats) =>
      currentStats.filter((stat) => stat.id !== id),
    );

    router.refresh();

    try {
      const data = await getAllStats();
      setStats(data);
    } catch (error) {
      console.error("Failed to refresh stats after deletion:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-leaf-navy">
            Stats
          </h1>

          <p className="mt-1 text-sm text-leaf-muted">
            Manage the statistics displayed in the homepage hero section.
          </p>
        </div>

        <Link
          href="/admin/stats/create"
          className="inline-flex items-center gap-2 self-start rounded-md bg-leaf-green-dark px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-leaf-green-dark/90 sm:self-auto"
        >
          <Plus className="size-4" />
          Add Stat
        </Link>
      </div>
      
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {stats.map((stat) => (
            <StatCard
              key={stat.id}
              stat={stat}
              onDelete={handleDelete}
            />
          ))}
        </div>
    
    </div>
  );
}
