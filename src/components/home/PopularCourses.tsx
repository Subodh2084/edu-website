"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getPopularCourses } from "@/lib/queries/courses";
import type { Course } from "@/types/course";

export default function PopularCourses() {
  const [popularCourses, setPopularCourses] = useState<Course[]>([]);

  useEffect(() => {
    getPopularCourses().then((data) => {
      setPopularCourses(data);
    });
  }, []);

  return (
    <section className="py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10 flex items-end justify-between gap-6">
          <div className="max-w-2xl">
            <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-leaf-green-dark">
              Our Popular Courses
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl">
              Learn skills that move you forward
            </h2>

            <p className="mt-4 text-leaf-navy">
              Explore our most popular courses designed to help you build
              practical skills and grow your career.
            </p>
          </div>

          <Link
            href="/courses"
            className="hidden items-center gap-2 rounded-md bg-leaf-green-dark text-white  px-4 py-2 text-sm font-medium sm:flex"
          >
            View All Courses
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularCourses.map((course) => (
            <Card
              key={course.id}
              className="group overflow-hidden border-leaf-border shadow bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="relative aspect-16/10 overflow-hidden bg-leaf-soft">
                {course.thumbnail && (
                  <Image
                    src={course.thumbnail}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, 300px"
                  />
                )}
              </div>
              <CardContent className="p-5">
                <Badge className="mb-3 bg-leaf-soft text-leaf-navy hover:bg-leaf-soft">
                  {course.level}
                </Badge>
                <h3 className="line-clamp-2 text-lg font-semibold text-leaf-navy">
                  {course.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm leading-6 text-leaf-muted">
                  {course.short_description}
                </p>
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
                <div className="mt-5">
                  {course.discount_price ? (
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-leaf-navy">
                        NPR {course.discount_price.toLocaleString()}
                      </span>

                      <span className="text-sm text-leaf-muted line-through">
                        NPR {course.price.toLocaleString()}
                      </span>
                    </div>
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
              </CardContent>
            </Card>
          ))}
        </div>
        <Link
          href="/courses"
          className="mt-6 flex items-center justify-center gap-2 rounded-md border border-leaf-border px-4 py-2 text-sm font-medium text-leaf-navy transition-colors hover:bg-leaf-soft sm:hidden"
        >
          View All Courses
          <ArrowRight className="size-4" />
        </Link>
      </div>
    </section>
  );
}
