import {
  BookOpen,
  FolderKanban,
  UserRoundCheck,
  Users,
} from "lucide-react";

const stats = [
  {
    value: "1,000+",
    label: "Students",
    icon: Users,
  },
  {
    value: "20+",
    label: "Courses",
    icon: BookOpen,
  },
  {
    value: "50+",
    label: "Mentors",
    icon: UserRoundCheck,
  },
  {
    value: "100+",
    label: "Projects",
    icon: FolderKanban,
  },
];

export default function Stats() {
  return (
    <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
      {stats.map((stat, index) => {
        const Icon = stat.icon;

        return (
          <div key={stat.label} className="flex items-center gap-x-8">
            <div className="flex items-center gap-3">
              <Icon className="size-5 shrink-0 text-leaf-green-dark" />

              <div>
                <p className="text-lg font-bold text-leaf-navy">
                  {stat.value}
                </p>
                <p className="text-sm text-leaf-navy font-semibold">
                  {stat.label}
                </p>
              </div>
            </div>

            {index !== stats.length - 1 && (
              <div className="h-10 w-0.75 bg-leaf-green" />
            )}
          </div>
        );
      })}
    </div>
  );
}