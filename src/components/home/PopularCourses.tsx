"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import CourseCard from "@/components/courses/CourseCard";
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
    <section id="popular-courses" className="py-20">
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
            className="hidden items-center gap-2 rounded-md bg-leaf-green-dark px-4 py-2 text-sm font-medium text-white sm:flex"
          >
            View All Courses
            <ArrowRight className="size-4" />
          </Link>
        </div>

        {/* Courses */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {popularCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>

        {/* Mobile CTA */}
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