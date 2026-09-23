"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { BookOpen, Users, MessageSquare, GraduationCap, ArrowRight, Clock, Loader2 } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAdminDashboardStats, AdminStats } from "@/lib/queries/admin";

export default function AdminDashboard() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadStats() {
      try {
        const data = await getAdminDashboardStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load dashboard stats", err);
      } finally {
        setLoading(false);
      }
    }
    loadStats();
  }, []);

  const statCards = [
    {
      title: "Total Courses",
      value: stats ? stats.totalCourses.toString() : "0",
      description: "All courses in system",
      icon: BookOpen,
    },
    {
      title: "Published Courses",
      value: stats ? stats.publishedCourses.toString() : "0",
      description: "Currently live and available",
      icon: GraduationCap,
    },
    {
      title: "New Messages",
      value: stats ? stats.newMessagesCount.toString() : "0",
      description: "Pending contact messages",
      icon: MessageSquare,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-leaf-navy">Dashboard</h1>
          <p className="mt-1 text-sm text-leaf-muted">
            Overview of your e-learning platform.
          </p>
        </div>
        {loading && (
          <div className="flex items-center gap-2 text-xs font-medium text-leaf-muted">
            <Loader2 className="size-4 animate-spin text-leaf-green-dark" />
            <span>Syncing data...</span>
          </div>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statCards.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="shadow-lg border-2 border-leaf-border bg-white">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-leaf-muted">
                  {stat.title}
                </CardTitle>
                <Icon className="size-5 text-leaf-green-dark" />
              </CardHeader>

              <CardContent>
                {loading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-gray-200 my-1" />
                ) : (
                  <p className="text-2xl font-bold text-leaf-navy">
                    {stat.value}
                  </p>
                )}
                <p className="mt-1 text-xs text-leaf-muted">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
     
        <Card className=" border-2 shadow-lg border-leaf-border bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-leaf-navy">Recent Courses</CardTitle>
              <CardDescription>Latest added courses</CardDescription>
            </div>
            <Link href="/admin/courses">
              <Button variant="ghost" size="sm" className="gap-1 text-xs text-leaf-green-dark hover:text-leaf-green">
                View All <ArrowRight className="size-3" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 animate-pulse rounded bg-gray-100" />
                ))}
              </div>
            ) : !stats?.recentCourses?.length ? (
              <p className="text-sm text-leaf-muted py-4 text-center">No courses found yet.</p>
            ) : (
              <div className="space-y-3">
                {stats.recentCourses.map((c) => (
                  <div
                    key={c.id}
                    className="flex items-center justify-between p-3 rounded-md border border-leaf-border hover:bg-leaf-bg/50 transition-colors"
                  >
                    <div>
                      <p className="font-medium text-sm text-leaf-navy">{c.title}</p>
                      <p className="text-xs text-leaf-muted">NPR {c.price ? c.price.toLocaleString() : 0}</p>
                    </div>
                    <Badge
                      className={
                        c.status === "published"
                          ? "bg-leaf-soft text-leaf-green-dark"
                          : "bg-yellow-50 text-yellow-700"
                      }
                    >
                      {c.status}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        <Card className="shadow-lg border-2 border-leaf-border bg-white">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="text-lg font-bold text-leaf-navy">Recent Messages</CardTitle>
              <CardDescription>Latest contact inquiries</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="h-12 animate-pulse rounded bg-gray-100" />
                ))}
              </div>
            ) : !stats?.recentMessages?.length ? (
              <p className="text-sm text-leaf-muted py-4 text-center">No new messages.</p>
            ) : (
              <div className="space-y-3">
                {stats.recentMessages.map((m) => (
                  <div
                    key={m.id}
                    className="p-3 rounded-md border border-leaf-border space-y-1 hover:bg-leaf-bg/50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-leaf-navy">{m.name}</span>
                      <span className="text-[10px] text-leaf-muted flex items-center gap-1">
                        <Clock className="size-3" />
                        {new Date(m.created_at).toLocaleDateString()}
                      </span>
                    </div>
                    <p className="text-xs text-leaf-muted truncate">{m.subject || m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

