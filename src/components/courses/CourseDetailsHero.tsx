import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Clock,
  FileText,
  Languages,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import type { Course } from "@/types/course";

interface CourseHeroProps {
  course: Course;
}

function toYouTubeEmbed(url: string): string | null {
  try {
    const u = new URL(url);
    const v = u.searchParams.get("v");
    if (v) return `https://www.youtube.com/embed/${v}`;
    if (u.hostname === "youtu.be") return `https://www.youtube.com/embed${u.pathname}`;
    if (u.pathname.startsWith("/embed/")) return url;
  } catch {
    return null;
  }
  return null;
}

export default function CourseDetailsHero({
  course,
}: CourseHeroProps) {
  const embedSrc = course.preview_video_url
    ? toYouTubeEmbed(course.preview_video_url)
    : null;

  return (
    <section className="relative bg-leaf-navy">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        {/* Breadcrumb */}
        <div className="mb-8 text-sm text-white/70">
          <Link
            href="/courses"
            className="transition-colors hover:text-white"
          >
            Courses
          </Link>

          <span className="mx-2">/</span>

          <span className="text-white/90">
            {course.title}
          </span>
        </div>

        {/* Hero Content */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left Content */}
          <div className="max-w-3xl">
            <Badge className="border-0 bg-leaf-green text-leaf-navy hover:bg-leaf-green">
              {course.level}
            </Badge>

            <h1 className="mt-5 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              {course.title}
            </h1>

            <p className="mt-5 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {course.short_description}
            </p>

            {/* Course Meta */}
            <div className="mt-7 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/80">
              <span className="flex items-center gap-2">
                <Clock className="size-4 text-leaf-green" />
                {course.duration}
              </span>

              <span className="flex items-center gap-2">
                <Languages className="size-4 text-leaf-green" />
                {course.language}
              </span>

              <span className="flex items-center gap-2">
                <BookOpen className="size-4 text-leaf-green" />
                {course.level}
              </span>
            </div>
          </div>
          <div
            className="
              relative
              mt-2
              w-full
              max-w-md
              overflow-hidden
              rounded-xl
              bg-white
              shadow-xl
              lg:fixed
              lg:right-10
              lg:top-24
              lg:mt-0
            "
          >
            {/* Video or Thumbnail */}
            <div className="relative aspect-video w-full overflow-hidden bg-black">
              {embedSrc ? (
                <iframe
                  src={embedSrc}
                  title={`${course.title} – Preview Video`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full border-0"
                />
              ) : (
                <Image
                  src={course.thumbnail}
                  alt={course.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover"
                />
              )}
            </div>

            {/* Pricing */}
            <div className="p-6">
              <div className="flex items-center gap-3">
                {course.discount_price ? (
                  <>
                    <span className="text-2xl font-bold text-leaf-navy">
                      NPR{" "}
                      {course.discount_price.toLocaleString()}
                    </span>

                    <span className="text-sm text-leaf-muted line-through">
                      NPR {course.price.toLocaleString()}
                    </span>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-leaf-navy">
                    NPR {course.price.toLocaleString()}
                  </span>
                )}
              </div>

              <Link
                href={`/courses/${course.slug}/enroll`}
                className="
                  mt-5
                  flex
                  w-full
                  items-center
                  justify-center
                  gap-2
                  rounded-md
                  bg-leaf-green-dark
                  px-4
                  py-3
                  text-sm
                  font-semibold
                  text-white
                  transition-colors
                  hover:bg-leaf-green
                "
              >
                Enroll Now
                <ArrowRight className="size-4" />
              </Link>

              {((course as any).syllabus_pdf_url || (course as any).pdf_url) && (
                <a
                  href={(course as any).syllabus_pdf_url || (course as any).pdf_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="
                    mt-3
                    flex
                    w-full
                    items-center
                    justify-center
                    gap-2
                    rounded-md
                    border
                    border-red-200
                    bg-red-50
                    px-4
                    py-2.5
                    text-xs
                    font-bold
                    text-red-700
                    transition-colors
                    hover:bg-red-100
                  "
                >
                  <FileText className="size-4 text-red-600" />
                  Download Syllabus (PDF)
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}