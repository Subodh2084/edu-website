import FeaturedCourses from "@/components/about/FeaturedCourses";
import CTA from "@/components/home/CTA";
import Hero from "@/components/home/HeroSection";
import PopularCourses from "@/components/home/PopularCourses";
import Testimonials from "@/components/home/Testimonial";
import WhyChooseUs from "@/components/home/WhyChooseUs";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCourses />
      <WhyChooseUs />
      <PopularCourses />
      <CTA />
      <Testimonials />
    </>
  );
}
