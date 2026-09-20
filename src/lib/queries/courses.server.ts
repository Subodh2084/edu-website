// Server-only course queries — do NOT import this in Client Components.
// This file uses next/headers (via createClient from @/lib/supabase/server).
import { createClient } from "@/lib/supabase/server";
import type { Course } from "@/types/course";

/**
 * Fetch all published courses for the public /courses listing page (Server Component)
 */
export async function getPublishedCourses(): Promise<Course[]> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("Supabase Error fetching published courses:", error);
      return [];
    }

    return data as unknown as Course[];
  } catch (err) {
    console.error("Error fetching published courses:", err);
    return [];
  }
}

/**
 * Fetch a single published course by slug for the public /courses/[slug] detail page (Server Component)
 */
export async function getCourseBySlug(slug: string): Promise<Course | null> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("slug", slug)
      .eq("status", "published")
      .maybeSingle();

    if (error || !data) {
      console.error("Supabase Error fetching course by slug:", error);
      return null;
    }

    return data as unknown as Course;
  } catch (err) {
    console.error("Error fetching course by slug:", err);
    return null;
  }
}
