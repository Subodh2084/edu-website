import { createClient } from "@/lib/supabase/client";
import type { Testimonial } from "@/types/testimonial";

/**
 * Fetch active featured testimonials directly from database (No static fallback)
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .eq("is_featured", true)
      .order("display_order", { ascending: true });

    if (error || !data) {
      console.error("Supabase Error fetching testimonials:", error);
      return [];
    }

    const typedData = data as Array<{
      id: string;
      student_name: string;
      profile_image: string | null;
      course_id: string | null;
      review: string;
      rating: number;
      designation: string | null;
      is_featured: boolean;
      is_active: boolean;
      display_order: number;
    }>;

    return typedData.map((t) => ({
      id: t.id,
      student_name: t.student_name,
      profile_image: t.profile_image || "/testimonials/student-1.jpg",
      course_id: t.course_id || "",
      review: t.review,
      rating: t.rating ?? 5,
      designation: t.designation || "Student",
      is_featured: t.is_featured ?? true,
      is_active: t.is_active ?? true,
      display_order: t.display_order ?? 1,
    }));
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return [];
  }
}
