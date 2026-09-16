import {
  Award,
  BriefcaseBusiness,
  GraduationCap,
  Laptop,
  RefreshCw,
  Users,
} from "lucide-react";

const features = [
  {
    icon: GraduationCap,
    title: "Expert-Led Learning",
    desc: "Learn from experienced engineers with deep expertise across software, AI, data, and cloud.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Hands-On Projects",
    desc: "Build and deploy real-world projects that strengthen your portfolio and practical skills.",
  },
  {
    icon: Award,
    title: "Industry Certification",
    desc: "Earn verified certificates recognized by employers across Nepal and beyond.",
  },
  {
    icon: Laptop,
    title: "Flexible Learning",
    desc: "Learn on-site in Bhairahawa/Butwal or join our online programs from anywhere.",
  },
  {
    icon: RefreshCw,
    title: "Up-to-Date Curriculum",
    desc: "Our programs are continuously updated to reflect the latest industry trends and technologies.",
  },
  {
    icon: Users,
    title: "Career & Networking",
    desc: "Get career guidance, mentorship, and access to our growing community of tech professionals.",
  },
];

export default function WhyUsFeatures() {
  return (
    <div className="mt-20">
      <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="group rounded-xl border border-leaf-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-green/40 hover:shadow-md"
            >
              <div className="flex size-11 items-center justify-center rounded-lg bg-leaf-soft text-leaf-green-dark transition-colors duration-300 group-hover:bg-leaf-green-dark group-hover:text-white">
                <Icon className="size-5" />
              </div>

              <h3 className="mt-5 text-lg font-semibold text-leaf-navy">
                {feature.title}
              </h3>

              <p className="mt-2 text-sm leading-6 text-leaf-muted">
                {feature.desc}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}