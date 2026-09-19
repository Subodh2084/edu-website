import { Check } from "lucide-react";

interface CourseRequirementsProps {
  requirements: string[];
}

export default function CourseRequirementsHome({
  requirements,
}: CourseRequirementsProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
            Requirements
          </h2>

          <p className="mt-2 text-sm text-leaf-muted">
            What you need to get started with this course.
          </p>
        </div>

        <div className="mt-6 rounded-xl shadow-xl border border-leaf-border bg-white p-6 sm:p-8">
          <div className="space-y-4">
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex items-start gap-3"
              >
                <div className="mt-0.5 flex size-5 shrink-0 items-center justify-center">
                  <Check className="size-3.5 text-leaf-green-dark" />
                </div>

                <p className="text-sm leading-6 text-leaf-text">
                  {requirement}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}