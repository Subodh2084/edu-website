import { BookOpen, Users, MessageSquare, GraduationCap } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const stats = [
  {
    title: "Total Courses",
    value: "24",
    description: "All courses",
    icon: BookOpen,
  },
  {
    title: "Published Courses",
    value: "18",
    description: "Currently available",
    icon: GraduationCap,
  },
  {
    title: "Instructors",
    value: "12",
    description: "Active instructors",
    icon: Users,
  },
  {
    title: "New Messages",
    value: "08",
    description: "Need your attention",
    icon: MessageSquare,
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-leaf-muted">
          Overview of your e-learning platform.
        </p>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <Card key={stat.title} className="shadow-xl">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-leaf-muted">
                  {stat.title}
                </CardTitle>

                <Icon className="size-5 text-leaf-green-dark" />
              </CardHeader>

              <CardContent>
                <p className="text-2xl font-bold text-leaf-navy">
                  {stat.value}
                </p>

                <p className="mt-1 text-xs text-leaf-muted">
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
