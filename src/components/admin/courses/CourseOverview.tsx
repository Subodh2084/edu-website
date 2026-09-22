"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Pencil } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getCourseById, type AdminCourseItem } from "@/lib/queries/admin";

interface CourseOverviewProps {
  courseId: string;
}

export default function CourseOverview({ courseId }: CourseOverviewProps) {
  const [course, setCourse] = useState<AdminCourseItem | null>(null);

  useEffect(() => {
    getCourseById(courseId).then(setCourse);
  }, [courseId]);

  if (!course) {
    return <p className="text-sm text-leaf-muted">Loading course overview...</p>;
  }

  return (
    <Card className="border-leaf-border/80 shadow-xs">
      <CardHeader className="flex flex-col gap-3 border-b border-leaf-border/50 pb-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <CardTitle className="text-lg font-bold text-leaf-navy">
            Course Overview
          </CardTitle>
          <p className="mt-1 text-xs text-leaf-muted">
            High-level metadata, pricing details, and course summaries.
          </p>
        </div>
        <Link
          className="inline-flex items-center gap-1.5 rounded-lg bg-leaf-green-dark px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-leaf-green transition-all shadow-xs"
          href={`/admin/courses/${courseId}/edit`}
        >
          <Pencil className="size-3.5" /> Edit Details
        </Link>
      </CardHeader>
      <CardContent className="space-y-6 pt-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-leaf-muted">Category</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.category_name || "Uncategorized"}
            </p>
          </div>

          <div>
            <p className="text-sm text-leaf-muted">Level</p>
            <p className="mt-1 font-medium text-leaf-navy capitalize">
              {course.level}
            </p>
          </div>

          <div>
            <p className="text-sm text-leaf-muted">Duration</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.duration || "-"}
            </p>
          </div>

          <div>
            <p className="text-sm text-leaf-muted">Language</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.language || "-"}
            </p>
          </div>
        </div>
        <div className="border-t border-leaf-border pt-6">
          <h3 className="text-sm font-semibold text-leaf-navy">
            Pricing
          </h3>
          <div className="mt-3 flex flex-wrap gap-8">
            <div>
              <p className="text-sm text-leaf-muted">Price</p>
              <p className="mt-1 font-medium text-leaf-navy">
                NPR {Number(course.price || 0).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-leaf-muted">Discount Price</p>
              <p className="mt-1 font-medium text-leaf-green-dark">
                {course.discount_price
                  ? `NPR ${Number(course.discount_price).toLocaleString()}`
                  : "-"}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-leaf-border pt-6">
          <h3 className="text-sm font-semibold text-leaf-navy">
            Short Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-leaf-text">
            {course.short_description || "-"}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-leaf-navy">
            Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-leaf-text">
            {course.description || "-"}
          </p>
        </div>
        <div className="border-t border-leaf-border pt-6">
          <h3 className="text-sm font-semibold text-leaf-navy">
            Preview Video
          </h3>

          <p className="mt-2 break-all text-sm text-leaf-muted">
            {course.preview_video_url || "-"}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
