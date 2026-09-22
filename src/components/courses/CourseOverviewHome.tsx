import Image from "next/image";
import {
  BookOpen,
  Clock,
  Languages,
  PlayCircle,
  Tag,
} from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import type { Course } from "@/types/course";

interface CourseOverviewProps {
  course: Course;
}

export default function CourseOverviewHome({
  course,
}: CourseOverviewProps) {
  return (
    <section className="py-12 sm:py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-leaf-navy sm:text-3xl">
            Course Overview
          </h2>

          <p className="mt-2 text-sm text-leaf-muted">
            Everything you need to know about this course.
          </p>
        </div>

        <Card className="overflow-hidden shadow-xl border-leaf-border bg-white">
          <CardContent className="p-0">
            <div className="grid lg:grid-cols-[320px_1fr]">
              <div className="relative aspect-video bg-leaf-soft lg:aspect-auto lg:min-h-[280px]">
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  sizes="(max-width: 1024px) 100vw, 320px"
                  className="object-cover"
                />
              </div>
              <div className="p-6 sm:p-8">
                <h3 className="text-2xl font-bold text-leaf-navy">
                  {course.title}
                </h3>

                <div className="mt-6 grid gap-5 sm:grid-cols-2">
                  <div className="flex items-start gap-3">
                    <Tag className="mt-0.5 size-4 text-leaf-green-dark" />

                    <div>
                      <p className="text-xs text-leaf-muted">
                        Level
                      </p>
                      <p className="mt-1 text-sm font-medium capitalize text-leaf-navy">
                        {course.level}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="mt-0.5 size-4 text-leaf-green-dark" />

                    <div>
                      <p className="text-xs text-leaf-muted">
                        Duration
                      </p>
                      <p className="mt-1 text-sm font-medium text-leaf-navy">
                        {course.duration}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Languages className="mt-0.5 size-4 text-leaf-green-dark" />

                    <div>
                      <p className="text-xs text-leaf-muted">
                        Language
                      </p>
                      <p className="mt-1 text-sm font-medium text-leaf-navy">
                        {course.language}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <BookOpen className="mt-0.5 size-4 text-leaf-green-dark" />

                    <div>
                      <p className="text-xs text-leaf-muted">
                        Price
                      </p>

                      <div className="mt-1 flex flex-wrap items-center gap-2">
                        <span className="text-sm font-bold text-leaf-navy">
                          NPR{" "}
                          {(
                            course.discount_price ?? course.price
                          ).toLocaleString()}
                        </span>

                        {course.discount_price && (
                          <span className="text-xs text-leaf-muted line-through">
                            NPR {course.price.toLocaleString()}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t border-leaf-border p-6 sm:p-8">
              <div>
                <h4 className="text-lg font-semibold text-leaf-navy">
                  Description
                </h4>

                <p className="mt-2 leading-7 text-leaf-text">
                  {course.description}
                </p>
              </div>

              {course.preview_video_url && (
                <div className="mt-8">
                  <h4 className="text-lg font-semibold text-leaf-navy">
                    Preview Video
                  </h4>

                  <a
                    href={course.preview_video_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-leaf-green-dark transition-colors hover:text-leaf-green"
                  >
                    <PlayCircle className="size-5" />
                    Watch Course Preview
                  </a>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}