import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CourseForm from "@/components/admin/courses/CourseForm";

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;

  return (
    <div className="space-y-6">
      <Link
        href={`/admin/courses/${courseId}`}
        className="inline-flex items-center gap-2 text-sm font-medium bg-leaf-green-dark text-white hover:bg-leaf-green-dark/80 hover:text-white px-4 py-2 rounded"
      >
        <ArrowLeft className="size-4" />
        Back to Course
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Edit Course
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Update the information of this course.
        </p>
      </div>

      <CourseForm courseId={courseId} />
    </div>
  );
}