import Link from "next/link";
import { Pencil } from "lucide-react";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface CourseOverviewProps {
  courseId: string;
}

const course = {
  title: "React Development",
  category: "Web Development",
  level: "Intermediate",
  duration: "3 Months",
  language: "English",
  price: 15000,
  discount_price: 12000,
  short_description:
    "Learn React from fundamentals to building production-ready applications.",
  description:
    "A complete React development course covering components, hooks, state management, routing, API integration, and modern frontend development.",
  preview_video_url: "https://youtube.com/example",
};

export default function CourseOverview({courseId}:CourseOverviewProps) {
  return (
    <Card>
      <CardHeader className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <CardTitle className="text-leaf-navy">
          Course Overview
        </CardTitle>
        <Link className='flex items-center gap-2 text-white bg-leaf-green-dark rounded px-3 py-1 font-bold' href={`/admin/courses/${courseId}/edit`}>
         <Pencil size={10}/> Course
      </Link>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="text-sm text-leaf-muted">Category</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.category}
            </p>
          </div>

          <div>
            <p className="text-sm text-leaf-muted">Level</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.level}
            </p>
          </div>

          <div>
            <p className="text-sm text-leaf-muted">Duration</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.duration}
            </p>
          </div>

          <div>
            <p className="text-sm text-leaf-muted">Language</p>
            <p className="mt-1 font-medium text-leaf-navy">
              {course.language}
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
                NPR {course.price.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-leaf-muted">Discount Price</p>
              <p className="mt-1 font-medium text-leaf-green-dark">
                NPR {course.discount_price.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
        <div className="border-t border-leaf-border pt-6">
          <h3 className="text-sm font-semibold text-leaf-navy">
            Short Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-leaf-text">
            {course.short_description}
          </p>
        </div>
        <div>
          <h3 className="text-sm font-semibold text-leaf-navy">
            Description
          </h3>

          <p className="mt-2 text-sm leading-6 text-leaf-text">
            {course.description}
          </p>
        </div>
        <div className="border-t border-leaf-border pt-6">
          <h3 className="text-sm font-semibold text-leaf-navy">
            Preview Video
          </h3>

          <p className="mt-2 break-all text-sm text-leaf-muted">
            {course.preview_video_url}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}