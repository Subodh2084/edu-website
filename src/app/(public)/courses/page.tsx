import CourseCard from "@/components/courses/CourseCard";
import CourseHero from "@/components/courses/CourseHeader";
import { courses } from "@/data/courses";

export default function CoursesPage() {
  const publishedCourses = courses.filter(
    (course) => course.status === "published",
  );

  return (
    <main>
    <CourseHero/>
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

          <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-3">
            {publishedCourses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}