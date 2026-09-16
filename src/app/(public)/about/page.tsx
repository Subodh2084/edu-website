import FeaturedCourses from "@/components/about/FeaturedCourses";
import ProgramBenefits from "@/components/about/ProgramBenefits";
import ProgramOverview from "@/components/about/ProgramOverview";
import ProgramTimeline from "@/components/about/ProgramTimeline";
import CTA from "@/components/home/CTA";

export default function AboutPage() {
  return (
    <main>
      <ProgramOverview />
      <ProgramTimeline/>
      <ProgramBenefits/>
      <FeaturedCourses/>
      <CTA/>
    </main>
  );
}