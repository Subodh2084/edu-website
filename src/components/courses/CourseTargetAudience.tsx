import { Users } from "lucide-react";

interface CourseTargetAudienceProps {
  targetAudience: string[];
}

export default function CourseTargetAudience({
  targetAudience,
}: CourseTargetAudienceProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
            Who This Course Is For
          </h2>

          <p className="mt-2 text-sm text-leaf-muted">
            This course is designed for learners who want to build practical
            web development skills.
          </p>
        </div>

        <div className="mt-6 shadow-xl p-10 grid gap-4 sm:grid-cols-2">
          {targetAudience.map((audience, index) => (
            <div
              key={index}
              className="flex items-start gap-4 rounded-xl shadow-lg border border-leaf-border bg-white p-5"
            >

              <p className="text-sm leading-6 text-leaf-text">
                {audience}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}