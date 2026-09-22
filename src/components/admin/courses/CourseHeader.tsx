import Link from "next/link";
import { Plus } from "lucide-react";

export default function CourseHeader() {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <h1 className="text-2xl font-bold text-leaf-navy">
          Courses
        </h1>

        <p className="mt-1 text-sm text-leaf-muted">
          Manage all courses available on your platform.
        </p>
      </div>

      <Link
        href="/admin/courses/create"
        className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-leaf-green-dark px-4 text-sm font-medium text-white transition-colors hover:bg-leaf-green"
      >
        <Plus className="size-4" />
        Create Course
      </Link>
    </div>
  );
}