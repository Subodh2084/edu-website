"use client";

import { useEffect, useState } from "react";
import { getSiteStats, type StatItem } from "@/lib/queries/stats";

export default function Stats() {
  const [stats, setStats] = useState<StatItem[]>([]);

  useEffect(() => {
    getSiteStats().then((data) => {
      setStats(data);
    });
  }, []);

  if (!stats.length) return null;

  return (
    <div className="mt-10 flex w-full flex-nowrap items-center justify-between gap-x-4 overflow-x-auto py-2 sm:gap-x-6 lg:gap-x-8 scrollbar-none">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div key={stat.label} className="flex shrink-0 items-center gap-x-4 sm:gap-x-6 lg:gap-x-8">
            <div className="flex flex-col items-center justify-center">
              <Icon className="size-7 shrink-0 text-leaf-green-dark" />
              <div className="whitespace-nowrap">
                <p className="text-base text-center font-bold text-leaf-navy">
                  {stat.value}
                </p>
                <p className="text-xs text-center font-semibold text-leaf-navy sm:text-sm">
                  {stat.label}
                </p>
              </div>
            </div>

            {index !== stats.length - 1 && (
              <div className="h-9 w-0.5 shrink-0 bg-leaf-green/50 sm:h-10 sm:w-0.75" />
            )}
          </div>
        );
      })}
    </div>
  );
}