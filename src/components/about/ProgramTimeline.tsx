import { GraduationCap, Laptop, Rocket, Check } from "lucide-react";

const timelineSteps = [
  {
    number: 1,
    icon: GraduationCap,
    title: "Month 1 — Intensive Training",
    tag: "Training Phase",
    description:
      "Deep-dive into your chosen technology track with structured lessons, hands-on exercises, and a dedicated Udemy course.",
    highlights: [
      "Daily lessons & hands-on practice",
      "Lifetime Udemy course included",
      "Weekly assessments & feedback",
      "1-on-1 mentor sessions",
    ],
  },
  {
    number: 2,
    icon: Laptop,
    title: "Month 2 — Real-World Internship",
    tag: "Internship Phase",
    description:
      "Work on real company projects alongside our development team. Experience actual workflows, deadlines, and team collaboration.",
    highlights: [
      "Work on live company projects",
      "Team collaboration & code reviews",
      "Git workflow & project management",
      "Professional work environment",
    ],
  },
  {
    number: 3,
    icon: Rocket,
    title: "Month 3 — Project & Placement",
    tag: "Completion Phase",
    description:
      "Complete your capstone project, build your portfolio, and prepare for job placement. Top performers may receive a direct job offer.",
    highlights: [
      "Build a capstone project",
      "Portfolio & resume preparation",
      "3 certificates awarded",
      "Job placement support",
    ],
  },
];

export default function ProgramTimeline() {
  return (
    <section className="bg-leaf-bg px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="inline-flex rounded-full bg-leaf-soft px-4 py-2 text-xs font-semibold tracking-[0.15em] text-leaf-green-dark">
            PROGRAM STRUCTURE
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl">
            Your 3-Month Roadmap
          </h2>

          <p className="mt-4 text-base leading-7 text-leaf-text">
            A structured learning journey designed to take you from beginner to
            job-ready professional.
          </p>
        </div>
        <div className="relative mx-auto mt-14 max-w-4xl">
          <div className="absolute left-5 top-5 hidden h-[calc(100%-40px)] w-px bg-leaf-navy md:block" />

          <div className="space-y-10 md:space-y-12">
            {timelineSteps.map((step) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  className="relative flex flex-col gap-5 md:flex-row md:gap-8"
                >
                  <div className="relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full bg-leaf-green-dark text-white shadow-sm">
                    <span className="text-sm font-bold">{step.number}</span>
                  </div>
                  <div className="flex-1 rounded-2xl border border-leaf-border bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md sm:p-8">
                    <div className="flex items-start gap-4">
                      <div className="flex size-11 shrink-0 items-center justify-center rounded-xl  text-leaf-green-dark">
                        <Icon className="size-9" />
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-leaf-navy sm:text-xl">
                          {step.title}
                        </h3>

                        <span className="mt-2 inline-flex rounded-full bg-leaf-soft px-3 py-1 text-xs font-medium text-leaf-green-dark">
                          {step.tag}
                        </span>
                      </div>
                    </div>

                    <p className="mt-5 text-sm leading-6 text-leaf-text sm:text-base sm:leading-7">
                      {step.description}
                    </p>

                    <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                      {step.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex items-start gap-2 text-sm text-leaf-text"
                        >
                          <Check className="mt-0.5 size-4 shrink-0 text-leaf-green-dark" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
