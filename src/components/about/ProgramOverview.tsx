import Image from "next/image";

export default function ProgramOverview() {
  return (
    <section className="px-5 py-20 sm:px-8 sm:py-24 lg:px-12">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="inline-flex rounded-full bg-leaf-soft px-4 py-2 text-xs font-semibold tracking-[0.15em] text-leaf-green-dark">
              OUR PROGRAM
            </span>

            <h2 className="mt-5 max-w-xl text-3xl font-bold tracking-tight text-leaf-navy sm:text-4xl">
              A  <span className="inline font-extrabold  text-leaf-green-dark"> Complete</span> Path to Your Tech Career
            </h2>

            <div className="mt-6 max-w-xl space-y-5 text-base leading-7 text-leaf-text">
              <p>
                Leafclutch Technologies offers intensive learning programs
                designed for students and aspiring developers. Whether you are a
                complete beginner or looking to sharpen your existing skills,
                our programs focus on practical learning and real-world
                experience.
              </p>

              <p>
                Our programs cover in-demand technology tracks, combining
                structured training, hands-on projects, mentorship, and
                practical experience to help learners build skills that matter
                in the industry.
              </p>

              <p>
                We believe in learning by doing. That&apos;s why learners work
                on practical projects, learn from industry professionals, and
                develop experience they can confidently take into their careers.
              </p>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-xl">
           
            <div className="absolute -right-6 -top-6 h-32 w-32 rounded-full bg-leaf-green/10 blur-2xl" />
            <div className="relative z-10 h-90 overflow-hidden rounded-3xl border-2 border-leaf-green-dark sm:h-105">
              <Image
                src="/about/program-main.avif"
                alt="Students learning together"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 560px"
              />
            </div>
            <div className="absolute -bottom-10 -left-6 z-20 h-40 w-52 overflow-hidden rounded-2xl border-3 border-leaf-navy shadow-xl sm:h-48 sm:w-64">
              <Image
                src="/about/program-team.avif"
                alt="Students working on a technology project"
                fill
                className="object-cover"
                sizes="256px"
              />
            </div>
            <div className="absolute -right-5 -top-8 z-20 hidden h-32 w-40 overflow-hidden rounded-2xl border-8 border-white shadow-lg sm:block">
              <Image
                src="/about/program-learn.avif"
                alt="Practical technology learning"
                fill
                className="object-cover"
                sizes="160px"
              />
            </div>

            <div className="absolute -bottom-5 right-4 z-30 rounded-2xl bg-leaf-navy px-6 py-5 text-white shadow-xl sm:right-8">
              <div className="text-3xl font-bold">3</div>
              <div className="mt-1 text-xs font-medium uppercase tracking-wider text-white/70">
                Months to Get
                <br />
                Job Ready
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
