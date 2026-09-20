import CourseCard from "@/components/courses/CourseCard";
import CourseHero from "@/components/courses/CourseHeaderHome";
import { getPublishedCourses } from "@/lib/queries/courses.server";

export const revalidate = 60; // ISR: revalidate every 60s

export default async function CoursesPage() {
  const courses = await getPublishedCourses();

  return (
    <main>
      <CourseHero />
      <section className="py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-leaf-navy">
              All Courses
            </h2>

            <p className="mt-1 text-sm text-leaf-muted">
              Choose a course and start learning today.
            </p>
          </div>

          {courses.length === 0 ? (
            <div className="py-20 text-center text-leaf-muted">
              No courses available yet. Check back soon!
            </div>
          ) : (
            <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-3">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}