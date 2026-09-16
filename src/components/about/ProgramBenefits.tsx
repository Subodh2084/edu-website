import {
  Award,
  BriefcaseBusiness,
  FolderKanban,
  Headset,
  UserRound,
} from "lucide-react";
import { FaYoutube } from "react-icons/fa";
import Image from "next/image";

const benefits = [
  {
    title: "Expert Mentorship",
    description:
      "Learn from experienced industry professionals who guide you through every step of your learning journey.",
    icon: UserRound,
    featured: true,
  },
  {
    title: "Lifetime Udemy Course",
    description:
      "Get a premium Udemy course related to your chosen track — yours to keep forever.",
    icon: FaYoutube,
  },
  {
    title: "3 Certificates",
    description:
      "Receive Training, Internship, and Completion certificates to strengthen your professional profile.",
    icon: Award,
  },
  {
    title: "Real-World Projects",
    description:
      "Work on practical company projects and build a portfolio based on real development experience.",
    icon: FolderKanban,
  },
  {
    title: "24/7 Support",
    description:
      "Get support from our team whenever you need help with questions or learning challenges.",
    icon: Headset,
  },
  {
    title: "Job Placement",
    description:
      "Get career guidance and placement support as you prepare to take the next step in your career.",
    icon: BriefcaseBusiness,
  },
];

export default function ProgramBenefits() {
  const featuredBenefit = benefits.find((benefit) => benefit.featured);
  const otherBenefits = benefits.filter((benefit) => !benefit.featured);

  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-leaf-soft px-4 py-2 text-xs font-semibold tracking-[0.15em] text-leaf-green-dark">
            WHY JOIN US
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl">
            Program Benefits
          </h2>

          <p className="mt-4 text-base leading-7 text-leaf-text">
            Everything you need to kickstart your tech career — all in one
            program.
          </p>
        </div>

        <div className="mt-14 grid gap-5 lg:grid-cols-2">
          {featuredBenefit && (
            <div className="group relative min-h-[420px] overflow-hidden rounded-2xl bg-leaf-bg p-8 sm:p-10">
              <div className="absolute right-0 top-0 h-full w-[48%] overflow-hidden">
                <Image
                  src="/about/program-mentor.jpg"
                  alt="Expert mentor guiding students"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 1024px) 50vw, 400px"
                />
                <div className="absolute inset-0 bg-linear-to-r from-leaf-bg via-leaf-bg/70 to-transparent" />
              </div>

              <div className="absolute -left-20 -top-20 size-64 rounded-full bg-leaf-green/20 blur-3xl" />

              <div className="relative z-10 flex h-full max-w-[60%] flex-col">
                <div className="flex size-14 items-center justify-center rounded-xl text-leaf-green-dark">
                  <featuredBenefit.icon className="size-7" />
                </div>

                <div className="mt-auto pt-16">
                  <span className="text-sm font-medium uppercase tracking-wider text-leaf-green-dark">
                    Learn With Experts
                  </span>

                  <h3 className="mt-3 text-2xl font-bold text-leaf-navy sm:text-3xl">
                    {featuredBenefit.title}
                  </h3>

                  <p className="mt-4 text-sm leading-7 text-leaf-text sm:text-base">
                    {featuredBenefit.description}
                  </p>
                </div>
              </div>
            </div>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            {otherBenefits.map((benefit) => {
              const Icon = benefit.icon;

              return (
                <div
                  key={benefit.title}
                  className="group rounded-2xl border border-leaf-border bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-leaf-green/40 hover:shadow-md"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl text-leaf-green-dark transition-colors duration-300">
                    <Icon className="size-8" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold text-leaf-navy">
                    {benefit.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-leaf-muted">
                    {benefit.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
