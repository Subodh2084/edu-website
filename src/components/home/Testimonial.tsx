"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Quote, Star } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getTestimonials } from "@/lib/queries/testimonials";
import type { Testimonial } from "@/types/testimonial";

export default function Testimonials() {
  const [featuredTestimonials, setFeaturedTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    getTestimonials()
      .then((data) => {
        if (isMounted) {
          setFeaturedTestimonials(data);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error("Failed to load testimonials:", err);
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  if (!loading && !featuredTestimonials.length) return null;

  return (
    <section className="bg-leaf-bg py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        {/* Section Heading */}
        <div className="max-w-2xl text-left">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-green-dark">
            Student Stories
          </span>

          <h2 className="mt-4 text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl">
            What our students say
          </h2>

          <p className="mt-4 text-base leading-7 text-leaf-text">
            Real experiences from students building their skills and
            taking the next step in their careers with Leafclutch Technologies.
          </p>
        </div>

        <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-10">
          {loading ? (
            <div className="h-64 rounded-2xl border border-leaf-border bg-white animate-pulse" />
          ) : (
            <Carousel
              opts={{
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {featuredTestimonials.map((testimonial) => (
                  <CarouselItem key={testimonial.id}>
                    <div className="flex flex-col items-center gap-8 lg:flex-row lg:gap-10">
                      <div className="relative z-10 size-56 shrink-0 overflow-hidden rounded-3xl border-8 border-white shadow-lg sm:size-64 lg:size-72 bg-leaf-soft">
                        <Image
                          src={
                            testimonial.profile_image ||
                            "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=600&auto=format&fit=crop&q=60"
                          }
                          alt={testimonial.student_name}
                          fill
                          className="object-cover"
                          sizes="288px"
                        />
                      </div>

                      <div className="relative w-full rounded-2xl border border-leaf-border bg-white p-8 pt-14 shadow-sm sm:p-10 sm:pt-14 lg:min-h-[280px]">
                        <div className="absolute left-8 top-6 text-leaf-green-dark">
                          <Quote className="size-12 opacity-80" />
                        </div>

                        <p className="mt-8 text-lg leading-8 text-leaf-text sm:text-xl font-normal">
                          &ldquo;{testimonial.review}&rdquo;
                        </p>

                        <div className="mt-6 flex items-center gap-1">
                          {Array.from({
                            length: testimonial.rating || 5,
                          }).map((_, index) => (
                            <Star
                              key={index}
                              className="size-4 fill-yellow-400 text-yellow-400"
                            />
                          ))}
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-leaf-navy text-base">
                              {testimonial.student_name}
                            </h3>
                            {testimonial.designation && (
                              <p className="mt-0.5 text-sm text-leaf-muted">
                                {testimonial.designation}
                              </p>
                            )}
                          </div>

                          {testimonial.course && (
                            <span className="rounded-full bg-leaf-soft px-3 py-1 text-xs font-medium text-leaf-green-dark">
                              {testimonial.course}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-[-30px] border-leaf-border text-lg text-leaf-navy hover:bg-leaf-soft" />
              <CarouselNext className="right-[-30px] border-leaf-border text-lg text-leaf-navy hover:bg-leaf-soft" />
            </Carousel>
          )}
        </div>
      </div>
    </section>
  );
}