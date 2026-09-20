import Link from "next/link";
import Stats from "./Stats";
import { ArrowRight } from "lucide-react";
import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_35%,#EAF8E8_0%,#FFFFFF_50%)]" />
        <div className="absolute -right-32 top-10 h-[420px] w-[420px] rounded-full bg-leaf-green/15 blur-[100px]" />
        <div className="absolute -left-40 -top-32 h-[350px] w-[350px] rounded-full bg-leaf-navy/5 blur-[100px]" />
        <div className="absolute bottom-[-180px] right-[20%] h-[350px] w-[350px] rounded-full bg-leaf-green/10 blur-[120px]" />
      </div>
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid items-center gap-10 py-12 sm:py-16 md:min-h-[700px] md:grid-cols-[1.05fr_0.95fr] md:gap-8 md:py-0 lg:gap-4">
          <div className="max-w-3xl">
            <span className="inline-flex items-center border-l-2 border-leaf-green pl-3 text-base font-semibold text-leaf-green-dark">
              Smart Learning Solutions
            </span>

            <h1 className="mt-6 text-5xl font-extrabold leading-[1.02] tracking-[-0.035em] text-leaf-navy sm:text-6xl lg:text-[76px]">
              Learn <span className="text-leaf-green-dark">Skills</span>
              <span className="mt-2 block">Build Your Future.</span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-leaf-navy">
              Learn practical skills, explore modern technologies, and build
              the confidence you need to move forward in your career.
            </p>
            <div className="mt-4 flex items-center gap-2 text-base font-semibold text-leaf-navy">
              <span>Learn</span>
              <span className="text-xl font-bold text-leaf-green">.</span>

              <span>Practice</span>
              <span className="text-xl font-bold text-leaf-green">.</span>

              <span>Build</span>
              <span className="text-xl font-bold text-leaf-green">.</span>
            </div>

            {/* Mobile Hero Image */}
            <div className="relative mt-8 flex justify-center md:hidden">
              <div className="absolute inset-0 rounded-full bg-leaf-soft/70 blur-3xl" />

              <Image
                src="/heroimg.png"
                alt="Student learning with a laptop"
                width={600}
                height={600}
                priority
                sizes="(max-width: 768px) 90vw, 500px"
                className="relative z-10 h-auto w-full max-w-125 object-contain"
              />
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/courses"
                className="inline-flex items-center justify-center gap-2 rounded-lg bg-leaf-green-dark px-7 py-3.5 text-sm font-semibold text-white transition-colors duration-200 hover:bg-leaf-green"
              >
                Explore Courses
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/about"
                className="inline-flex items-center justify-center rounded-lg border border-leaf-border bg-white px-7 py-3.5 text-sm font-semibold text-leaf-navy transition-colors duration-200 hover:bg-leaf-bg"
              >
                Learn About Us
              </Link>
            </div>
            <Stats />
          </div>
          <div className="relative hidden items-center justify-center md:flex md:justify-end">
            <div className="absolute right-0 top-1/2 h-[420px] w-[420px] -translate-y-1/2 rounded-full bg-leaf-soft/70 blur-3xl" />

            <div className="relative max-w-[600px]">
              <Image
                src="/heroimg.png"
                alt="Student learning with a laptop"
                width={600}
                height={600}
                priority
                className="relative z-10 h-auto w-full object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}