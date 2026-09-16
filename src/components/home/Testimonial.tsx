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

  useEffect(() => {
    getTestimonials().then((data) => {
      setFeaturedTestimonials(data);
    });
  }, []);

  if (!featuredTestimonials.length) return null;

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
            taking the next step in their careers.
          </p>
        </div>
        <div className="mx-auto mt-14 max-w-5xl px-4 sm:px-10">
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
                    <div className="relative z-10 size-56 shrink-0 overflow-hidden rounded-3xl border-8 border-white shadow-lg sm:size-64 lg:size-72">
                      <Image
                        src={testimonial.profile_image}
                        alt={testimonial.student_name}
                        fill
                        className="object-cover"
                        sizes="288px"
                      />
                    </div>
                    <div className="relative w-full rounded-2xl border border-leaf-border bg-white p-8 pt-14 shadow-sm sm:p-10 sm:pt-14 lg:min-h-[280px]">
                      <div className="absolute left-8 top-6 text-leaf-green-dark">
                        <Quote className="size-12" />
                      </div>

                      <p className="mt-8 text-lg leading-8 text-leaf-text sm:text-xl">
                        “{testimonial.review}”
                      </p>

                      <div className="mt-6 flex items-center gap-1">
                        {Array.from({
                          length: testimonial.rating,
                        }).map((_, index) => (
                          <Star
                            key={index}
                            className="size-4 fill-leaf-green-dark text-leaf-green-dark"
                          />
                        ))}
                      </div>
                      <div className="mt-5">
                        <h3 className="font-semibold text-leaf-navy">
                          {testimonial.student_name}
                        </h3>
                        <p className="mt-1 text-sm text-leaf-muted">
                          {testimonial.designation}
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-[-30px] border-leaf-border text-lg text-leaf-navy hover:bg-leaf-soft" />
            <CarouselNext className="right-[-30px] border-leaf-border text-lg text-leaf-navy hover:bg-leaf-soft" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}