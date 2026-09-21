import Image from "next/image";
import WhyUsFeatures from "./WhyUsFeatures";

export default function WhyChooseUs() {
  return (
    <section className="overflow-hidden py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">

        <div className="grid items-center gap-10 lg:grid-cols-[0.8fr_1.4fr_0.8fr] lg:gap-8">

    
          <div className="flex justify-center lg:-translate-y-10">
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-xl sm:h-[460px] sm:w-[250px]">
              <Image
                src="/mentor.avif"
                alt="Student learning"
                fill
                className="object-cover"
                sizes="250px"
              />
            </div>
          </div>

   
          <div className="order-first text-center lg:order-none">
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-leaf-green-dark">
              Why Choose Us
            </span>

            <h2 className="mt-4 text-4xl font-bold tracking-tight text-leaf-navy sm:text-5xl">
              Learn with purpose.
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-7 text-leaf-navy sm:text-lg">
              We help you turn learning into practical skills, meaningful
              projects, and the confidence to build your future.
            </p>
          </div>

      
          <div className="flex justify-center lg:translate-y-10">
            <div className="relative h-[400px] w-[400px] overflow-hidden rounded-xl sm:h-[460px] sm:w-[250px]">
              <Image
                src="/code.avif"
                alt="Learning with mentorship"
                fill
                className="object-cover"
                sizes="250px"
              />
            </div>
          </div>
        </div>

      
        <WhyUsFeatures />

      </div>
    </section>
  );
}