import CTA from "@/components/home/CTA";
import Hero from "@/components/home/HeroSection";
import PopularCourses from "@/components/home/PopularCourses";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Image from "next/image";

export default function Home() {
  return (
    <>
     <Hero/>
     <WhyChooseUs/>
     <PopularCourses/>
     <CTA/>
    </>
    
  );
}
