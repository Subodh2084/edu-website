import { createClient } from "@/lib/supabase/client";
import { testimonials as fallbackTestimonials } from "@/data/testimonials";
import type { Testimonial } from "@/types/testimonial";

/**
 * Fetch active testimonials directly from Supabase for public website
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*, courses(title)")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data || data.length === 0) {
      return fallbackTestimonials.filter((t) => t.is_active);
    }

    return (data as any[]).map((t) => ({
      id: t.id,
      student_name: t.student_name,
      profile_image: t.profile_image || "/testimonials/student-1.jpg",
      course_id: t.course_id || "",
      course: t.courses?.title || "",
      review: t.review,
      rating: t.rating ?? 5,
      designation: t.designation || "Student",
      is_featured: t.is_featured ?? false,
      is_active: t.is_active ?? true,
      display_order: t.display_order ?? 0,
    }));
  } catch (err) {
    console.error("Error fetching testimonials:", err);
    return fallbackTestimonials.filter((t) => t.is_active);
  }
}

/**
 * Fetch all testimonials for Admin Portal (includes active and inactive)
 */
export async function getAdminTestimonials(): Promise<Testimonial[]> {
  try {
    const response = await fetch("/api/admin/testimonials", { cache: "no-store" });
    const json = await response.json();

    if (!response.ok || !json.data || json.data.length === 0) {
      return fallbackTestimonials;
    }

    return (json.data as any[]).map((t: any) => ({
      id: t.id,
      student_name: t.student_name,
      profile_image: t.profile_image || "/testimonials/student-1.jpg",
      course_id: t.course_id || "",
      course: t.courses?.title || "",
      review: t.review,
      rating: t.rating ?? 5,
      designation: t.designation || "Student",
      is_featured: t.is_featured ?? false,
      is_active: t.is_active ?? true,
      display_order: t.display_order ?? 0,
    }));
  } catch (err) {
    console.error("Error fetching admin testimonials:", err);
    return fallbackTestimonials;
  }
}

/**
 * Fetch single testimonial by ID
 */
export async function getTestimonialById(testimonialId: string): Promise<Testimonial | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("testimonials")
      .select("*, courses(title)")
      .eq("id", testimonialId)
      .single();

    if (error || !data) {
      const fallback = fallbackTestimonials.find((t) => t.id === testimonialId);
      return fallback || null;
    }

    const t = data as any;
    return {
      id: t.id,
      student_name: t.student_name,
      profile_image: t.profile_image || "/testimonials/student-1.jpg",
      course_id: t.course_id || "",
      course: t.courses?.title || "",
      review: t.review,
      rating: t.rating ?? 5,
      designation: t.designation || "Student",
      is_featured: t.is_featured ?? false,
      is_active: t.is_active ?? true,
      display_order: t.display_order ?? 0,
    };
  } catch (err) {
    console.error("Error fetching testimonial by id:", err);
    return fallbackTestimonials.find((t) => t.id === testimonialId) || null;
  }
}

export interface SaveTestimonialInput {
  id?: string;
  student_name: string;
  profile_image?: string | null;
  course_id?: string | null;
  review: string;
  rating: number;
  designation?: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}

/**
 * Save (insert or update) a testimonial in Supabase
 */
export async function saveTestimonial(
  input: SaveTestimonialInput
): Promise<{ success: boolean; data?: any; error?: string }> {
  try {
    const response = await fetch("/api/admin/testimonials", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(input),
    });
    const json = await response.json();
    if (!response.ok || !json.success) {
      return { success: false, error: json.error || "Failed to save testimonial." };
    }
    return { success: true, data: json.data };
  } catch (err: any) {
    console.error("Error saving testimonial:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

/**
 * Delete a testimonial from Supabase
 */
export async function deleteTestimonial(testimonialId: string): Promise<boolean> {
  try {
    const response = await fetch(
      `/api/admin/testimonials?id=${encodeURIComponent(testimonialId)}`,
      { method: "DELETE" }
    );
    const json = await response.json();
    if (!response.ok || !json.success) {
      console.error("Error deleting testimonial:", json.error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error deleting testimonial:", err);
    return false;
  }
}

/**
 * Upload student image to Supabase storage bucket
 */
export async function uploadTestimonialImage(file: File): Promise<string | null> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("folder", "testimonials");

    const res = await fetch("/api/admin/upload-image", {
      method: "POST",
      body: formData,
    });

    const json = await res.json();
    if (!res.ok || !json.url) {
      console.error("Testimonial image upload error:", json.error || "Unknown error");
      return null;
    }

    return json.url;
  } catch (err) {
    console.error("Failed to upload testimonial image:", err);
    return null;
  }
}
