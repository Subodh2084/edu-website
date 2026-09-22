import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/course";

interface CourseCardProps {
  course: Course;
  className?: string;
}

export default function CourseCard({ course, className = "" }: CourseCardProps) {
  return (
    <Card
      className={`group flex flex-col overflow-hidden border-leaf-border bg-white shadow transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${className}`}
    >
      {/* Course Thumbnail */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-leaf-soft">
        {course.thumbnail ? (
          <Image
            src={course.thumbnail}
            alt={course.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-leaf-muted">
            <BookOpen className="size-10 opacity-40" />
          </div>
        )}
      </div>

      {/* Card Content */}
      <CardContent className="flex flex-1 flex-col p-5">
        <div>
          <Badge className="mb-3 capitalize bg-leaf-soft text-leaf-navy hover:bg-leaf-soft">
            {course.level}
          </Badge>
          <h3 className="line-clamp-2 text-lg font-semibold text-leaf-navy group-hover:text-leaf-green-dark transition-colors">
            {course.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-sm leading-6 text-leaf-muted">
            {course.short_description}
          </p>
        </div>

        <div className="mt-4 flex items-center gap-4 text-sm text-leaf-muted">
          <span className="flex items-center gap-1.5">
            <Clock className="size-4 text-leaf-green-dark" />
            {course.duration}
          </span>
          <span className="flex items-center gap-1.5">
            <BookOpen className="size-4 text-leaf-green-dark" />
            {course.language}
          </span>
        </div>

        <div className="mt-auto pt-5">
          <div className="flex items-center gap-2">
            {course.discount_price ? (
              <>
                <span className="font-bold text-leaf-navy">
                  NPR {course.discount_price.toLocaleString()}
                </span>
                <span className="text-sm text-leaf-muted line-through">
                  NPR {course.price.toLocaleString()}
                </span>
              </>
            ) : (
              <span className="font-bold text-leaf-navy">
                NPR {course.price.toLocaleString()}
              </span>
            )}
          </div>

          <Link
            href={`/courses/${course.slug}`}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-leaf-green-dark px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-leaf-green-dark/90"
          >
            View Course
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
