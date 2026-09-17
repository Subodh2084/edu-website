 import Image from "next/image"

export default function CourseHero(){
    return(
        <section className="bg-leaf-bg shadow-lg">
  <div className="mx-auto grid max-w-7xl items-center gap-5 px-4 py-16 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-20">
    <div>
      <p className="text-sm font-semibold uppercase tracking-wide text-leaf-green-dark">
        Our Courses
      </p>

      <h1 className="mt-3 max-w-xl text-4xl font-bold tracking-tight text-leaf-navy sm:text-5xl">
        Learn skills that move your career forward
      </h1>

      {/* <p className="mt-5 max-w-lg text-base leading-7 text-leaf-muted">
        Explore practical courses designed to help you build real-world
        skills and grow your career.
      </p> */}
    </div>
    <div className="relative flex justify-center md:justify-end">
       <Image
        src={'/courseheader.webp'}
        alt="svg"
        height={200}
        width={200}
       />
    </div>
  </div>
</section>
    )
}