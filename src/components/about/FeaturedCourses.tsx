"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { getFeaturedCourses } from "@/lib/queries/courses";
import type { Course } from "@/types/course";

export default function FeaturedCourses() {
  const [featuredCourses, setFeaturedCourses] = useState<Course[]>([]);

  useEffect(() => {
    getFeaturedCourses().then((data) => {
      setFeaturedCourses(data);
    });
  }, []);

  if (!featuredCourses.length) return null;

  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16 lg:px-8">
        <div className="max-w-xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-wider text-leaf-green-dark">
            Featured Courses
          </p>

          <h2 className="text-3xl font-bold leading-tight tracking-tight text-leaf-navy sm:text-4xl">
            Learn <span className="italic">essential</span> career and{" "}
            <span className="italic text-leaf-green-dark">life</span> skills
          </h2>

          <p className="mt-5 leading-7 text-leaf-muted">
            LeafClutch helps you build in-demand skills fast and advance your
            career in a changing job market.
          </p>
        </div>
        <div className="relative min-w-0">
          <Carousel
            opts={{
              align: "start",
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4 p-6">
              {featuredCourses.map((course) => (
                <CarouselItem
                  key={course.id}
                  className="basis-[85%] pl-7 sm:basis-1/2"
                >
                  <Link
                    href={`/courses/${course.slug}`}
                    className="group block"
                  >
                    <Card className="overflow-hidden border border-leaf-border hover:shadow-lg">
                      <div className="relative aspect-16/10 overflow-hidden bg-leaf-soft">
                        <Image
                          src={course.thumbnail || "/courses/web-development.jpg"}
                          alt={course.title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-105"
                          sizes="(max-width: 640px) 85vw, 400px"
                        />
                      </div>

                      <CardContent className="flex items-center justify-between gap-4 p-5">
                        <h3 className="line-clamp-2 text-sm font-semibold text-leaf-navy">
                          {course.title}
                        </h3>

                        <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-leaf-soft text-leaf-green-dark transition-all duration-300 group-hover:bg-leaf-green-dark group-hover:text-white">
                          <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="-left-5 border-leaf-border bg-white text-leaf-navy hover:bg-leaf-soft" />
            <CarouselNext className="-right-5 border-leaf-border bg-white text-leaf-navy hover:bg-leaf-soft" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
