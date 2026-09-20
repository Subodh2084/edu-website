import { notFound } from "next/navigation";

import { getCourseBySlug } from "@/lib/queries/courses.server";
import {
  getCourseRequirements,
  getCourseTargetAudience,
  getCourseCurriculum,
  getCourseProjects,
  getCourseOutcomes,
} from "@/lib/queries/admin";

import CourseHero from "@/components/courses/CourseDetailsHero";
import CourseOverview from "@/components/courses/CourseOverviewHome";
import CourseOutcomes from "@/components/courses/CourseOutcomeHome";
import CourseCurriculum from "@/components/courses/CourseCurriculumHome";
import CourseRequirementsHome from "@/components/courses/CourseRequirementsHome";
import CourseTargetAudience from "@/components/courses/CourseTargetAudience";
import CourseProjects from "@/components/courses/CourseProjectsHome";

export const revalidate = 60; // ISR: revalidate every 60s

interface CourseDetailsPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function CourseDetailsPage({
  params,
}: CourseDetailsPageProps) {
  const { slug } = await params;

  // Fetch course + all sub-data in parallel
  const [
    course,
  ] = await Promise.all([
    getCourseBySlug(slug),
  ]);

  if (!course) {
    notFound();
  }

  // Fetch sub-data now that we have the course id
  const [
    dbOutcomes,
    dbRequirements,
    dbAudience,
    dbCurriculum,
    dbProjects,
  ] = await Promise.all([
    getCourseOutcomes(course.id),
    getCourseRequirements(course.id),
    getCourseTargetAudience(course.id),
    getCourseCurriculum(course.id),
    getCourseProjects(course.id),
  ]);

  // Map DB rows to component-expected shapes
  const outcomes: string[] = dbOutcomes.map((o: any) => o.outcome);
  const requirements: string[] = dbRequirements.map((r: any) => r.requirement);
  const targetAudience: string[] = dbAudience.map((a: any) => a.description);

  const sections = dbCurriculum.map((sec: any) => ({
    id: sec.id,
    title: sec.title,
    lessons: (sec.lessons || []).map((l: any) => ({
      id: l.id,
      title: l.title,
      duration: l.duration || "",
      description: l.description || undefined,
    })),
  }));

  const projects = dbProjects.map((p: any) => ({
    id: p.id,
    title: p.title,
    description: p.description || "",
    // DB column is `technologies`, component expects `techStack`
    techStack: Array.isArray(p.technologies) ? p.technologies : [],
  }));

  // Enrich course with flat outcomes array for CourseOverview
  const enrichedCourse = {
    ...course,
    outcomes,
    sections,
  };

  return (
    <main>
      <CourseHero course={enrichedCourse} />
      <section className="py-12 sm:py-16">
        <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
          <CourseOverview course={enrichedCourse} />
        </div>

        {outcomes.length > 0 && (
          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
            <CourseOutcomes outcomes={outcomes} />
          </div>
        )}

        {sections.length > 0 && (
          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
            <CourseCurriculum sections={sections} />
          </div>
        )}

        {requirements.length > 0 && (
          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
            <CourseRequirementsHome requirements={requirements} />
          </div>
        )}

        {targetAudience.length > 0 && (
          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
            <CourseTargetAudience targetAudience={targetAudience} />
          </div>
        )}

        {projects.length > 0 && (
          <div className="max-w-4xl px-4 sm:px-6 lg:px-15">
            <CourseProjects projects={projects} />
          </div>
        )}
      </section>
    </main>
  );
}