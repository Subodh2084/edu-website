import { CheckCircle2 } from "lucide-react";

interface CourseOutcomesProps {
  outcomes: string[];
}

export default function CourseOutcomes({
  outcomes,
}: CourseOutcomesProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
            What You'll Learn
          </h2>

          <p className="mt-2 text-sm text-leaf-muted">
            Skills and knowledge you will gain from this course.
          </p>
        </div>

        <div className="grid gap-4 rounded-xl shadow-xl bg-white p-6 sm:grid-cols-2 sm:p-8">
          {outcomes.map((outcome, index) => (
            <div
              key={index}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-leaf-green-dark" />

              <p className="text-sm leading-6 text-leaf-text">
                {outcome}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}