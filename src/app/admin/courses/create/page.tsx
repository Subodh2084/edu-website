import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CourseForm from "@/components/admin/courses/CourseForm";

export default function CreateCoursePage() {
    return (
        <div className="space-y-6">
            <Link
                href="/admin/courses"
                className="inline-flex items-center gap-2 text-sm font-medium bg-leaf-green-dark text-white hover:bg-leaf-green-dark/80 px-4 py-2 rounded transition-colors"
            >
                <ArrowLeft className="size-4" />
                Back to Courses
            </Link>

            <div>
                <h1 className="text-2xl font-bold text-leaf-navy">
                    Create Course
                </h1>

                <p className="mt-1 text-sm text-leaf-muted">
                    Fill in the details below to create a new course.
                </p>
            </div>

            <CourseForm />
        </div>
    );
}
