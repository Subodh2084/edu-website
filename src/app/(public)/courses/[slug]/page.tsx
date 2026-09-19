import { notFound } from "next/navigation";
import { courseRequirements } from "@/data/Requirements";

import CourseHero from "@/components/courses/CourseDetailsHero";
import { courses } from "@/data/courses";
import CourseOverview from "@/components/courses/CourseOverviewHome";
import CourseOutcomes from "@/components/courses/CourseOutcomeHome";
import CourseCurriculum from "@/components/courses/CourseCurriculumHome";
import CourseRequirementsHome from "@/components/courses/CourseRequirementsHome";
import { courseTargetAudience } from "@/data/TargetAudience";
import CourseTargetAudience from "@/components/courses/CourseTargetAudience";
import { courseProjects } from "@/data/courseProjects";
import CourseProjects from "@/components/courses/CourseProjectsHome";


interface CourseDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { slug } = await params;

  const course = courses.find(
    (course) =>
      course.slug === slug && course.status === "published",
  );

  if (!course) {
    notFound();
  }

  return (
    <main>
      <CourseHero course={course} />
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseOverview course={course}/>
        </div>
         <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseOutcomes outcomes={course.outcomes}/>
        </div>
          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseCurriculum sections={course.sections}
          />
        </div>
        <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseRequirementsHome requirements={courseRequirements}/>
          
        </div>

          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseTargetAudience targetAudience={courseTargetAudience}/>
        </div>

        <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseProjects projects={courseProjects}/>
        </div>
      </section>
       
    </main>
  );
}