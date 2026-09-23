import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function CTA() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="relative mx-auto max-w-7xl shadow-xl border-2 overflow-hidden rounded-2xl border border-leaf-border bg-white px-6 py-14 sm:px-10 sm:py-16 lg:px-16">

        <div className="pointer-events-none absolute -right-32 -top-32 size-96 rounded-full bg-leaf-green/15 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-[1fr_320px]">

   
          <div className="max-w-2xl">

            <span className="inline-flex items-center rounded-full border border-leaf-green/20 bg-leaf-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-leaf-green-dark">
              Start Your Journey
            </span>

            <h2 className="mt-6 text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl lg:text-5xl">
              Ready to build your future?
            </h2>

            <p className="mt-5 max-w-xl text-base leading-7 text-leaf-navy sm:text-lg">
              Learn practical skills, work on real projects, and get the
              guidance you need to move forward in your technology career.
            </p>

       
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-leaf-green-dark px-6 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-leaf-green"
              >
                Explore Courses
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="inline-flex items-center justify-center gap-2 rounded-lg border border-leaf-border bg-white px-6 py-3.5 text-sm font-semibold text-leaf-navy transition-colors duration-200 hover:bg-leaf-bg"
              >
                Talk to an Expert
                <MessageCircle className="size-4" />
              </Link>
            </div>
          </div>

      
          <div className="hidden h-[300px] w-full items-center justify-center lg:flex">
            <DotLottieReact
      src="https://lottie.host/2d997e43-78b9-4964-83a6-3903189aa1b8/wVn749ptBO.lottie"
      loop
      autoplay
    />
          </div>

        </div>
      </div>
    </section>
  );
}