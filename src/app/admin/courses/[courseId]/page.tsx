"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import {
  BookOpen,
  CheckCircle2,
  ListOrdered,
  Users,
  FolderGit2,
  ArrowLeft,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CourseOverview from "@/components/admin/courses/CourseOverview";
import CourseOutcomes from "@/components/admin/courses/CourseOutcomes";
import CourseRequirements from "@/components/admin/courses/CourseRequirements";
import CourseAudience from "@/components/admin/courses/CourseAudience";
import CourseProjects from "@/components/admin/courses/CourseProjects";
import CourseCurriculum from "@/components/admin/courses/CourseCurriculam";
import { getCourseById, type AdminCourseItem } from "@/lib/queries/admin";

export default function CourseManagementPage() {
  const params = useParams<{ courseId: string }>();
  const courseId = params.courseId;
  const [course, setCourse] = useState<AdminCourseItem | null>(null);

  useEffect(() => {
    if (!courseId) return;
    getCourseById(courseId).then(setCourse);
  }, [courseId]);

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <Link
            href="/admin/courses"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-leaf-muted hover:text-leaf-navy transition-colors mb-1"
          >
            <ArrowLeft className="size-3.5" />
            Back to Courses
          </Link>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-2xl font-bold tracking-tight text-leaf-navy sm:text-3xl">
              {course?.title || "Course Details"}
            </h1>

            {course?.status && (
              <Badge
                className={
                  course.status === "published"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200/80 font-semibold px-2.5 py-0.5"
                    : "bg-amber-50 text-amber-800 border border-amber-200/80 font-semibold px-2.5 py-0.5"
                }
              >
                <span className={`mr-1.5 size-1.5 rounded-full ${course.status === "published" ? "bg-emerald-500" : "bg-amber-500"}`} />
                {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
              </Badge>
            )}

            {course?.featured && (
              <Badge className="bg-leaf-soft text-leaf-green-dark border border-leaf-green-light/40 font-semibold px-2.5 py-0.5">
                Featured
              </Badge>
            )}
          </div>
          <p className="text-sm text-leaf-muted">
            Manage course curriculum, learning outcomes, requirements, target audience, and real-world projects.
          </p>
        </div>
      </div>
      <Tabs defaultValue="overview" className="w-full flex flex-col space-y-6">
        <div className="rounded-xl border border-leaf-border/80 bg-white p-1.5 shadow-xs">
          <TabsList className="flex w-full items-center gap-1 overflow-x-auto bg-transparent p-0 scrollbar-none">
            <TabsTrigger
              value="overview"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-leaf-muted transition-all hover:bg-leaf-soft/70 hover:text-leaf-navy data-active:bg-leaf-green-dark data-active:text-white data-active:shadow-sm"
            >
              <BookOpen className="size-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Overview</span>
            </TabsTrigger>

            <TabsTrigger
              value="curriculum"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-leaf-muted transition-all hover:bg-leaf-soft/70 hover:text-leaf-navy data-active:bg-leaf-green-dark data-active:text-white data-active:shadow-sm"
            >
              <ListOrdered className="size-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Curriculum</span>
            </TabsTrigger>

            <TabsTrigger
              value="outcomes"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-leaf-muted transition-all hover:bg-leaf-soft/70 hover:text-leaf-navy data-active:bg-leaf-green-dark data-active:text-white data-active:shadow-sm"
            >
              <CheckCircle2 className="size-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Outcomes</span>
            </TabsTrigger>

            <TabsTrigger
              value="requirements"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-leaf-muted transition-all hover:bg-leaf-soft/70 hover:text-leaf-navy data-active:bg-leaf-green-dark data-active:text-white data-active:shadow-sm"
            >
              <ListOrdered className="size-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Requirements</span>
            </TabsTrigger>

            <TabsTrigger
              value="audience"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-leaf-muted transition-all hover:bg-leaf-soft/70 hover:text-leaf-navy data-active:bg-leaf-green-dark data-active:text-white data-active:shadow-sm"
            >
              <Users className="size-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Target Audience</span>
            </TabsTrigger>

            <TabsTrigger
              value="projects"
              className="group inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-xs font-semibold text-leaf-muted transition-all hover:bg-leaf-soft/70 hover:text-leaf-navy data-active:bg-leaf-green-dark data-active:text-white data-active:shadow-sm"
            >
              <FolderGit2 className="size-4 shrink-0 transition-transform group-hover:scale-110" />
              <span>Projects</span>
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="transition-all">
          <TabsContent value="overview" className="mt-0 outline-none">
            <CourseOverview courseId={courseId} />
          </TabsContent>

          <TabsContent value="curriculum" className="mt-0 outline-none">
            <CourseCurriculum courseId={courseId} />
          </TabsContent>

          <TabsContent value="outcomes" className="mt-0 outline-none">
            <CourseOutcomes courseId={courseId} />
          </TabsContent>

          <TabsContent value="requirements" className="mt-0 outline-none">
            <CourseRequirements courseId={courseId} />
          </TabsContent>

          <TabsContent value="audience" className="mt-0 outline-none">
            <CourseAudience courseId={courseId} />
          </TabsContent>

          <TabsContent value="projects" className="mt-0 outline-none">
            <CourseProjects courseId={courseId} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
