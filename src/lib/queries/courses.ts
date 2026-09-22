import { createClient } from "@/lib/supabase/client";
import type { Course } from "@/types/course";

/**
 * Fetch published courses directly from database for navigation menu dropdown (No static fallback)
 */
export async function getNavCourses(): Promise<{ label: string; href: string; description: string }[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("title, slug, short_description")
      .eq("status", "published")
      .order("created_at", { ascending: true })
      .limit(5);

    if (error || !data) {
      console.error("Supabase Error fetching nav courses:", error);
      return [];
    }

    return (data as Array<{ title: string; slug: string; short_description: string | null }>).map((item) => ({
      label: item.title,
      href: `/courses/${item.slug}`,
      description: item.short_description || "Explore course curriculum & details",
    }));
  } catch (err) {
    console.error("Error fetching nav courses:", err);
    return [];
  }
}

/**
 * Fetch published featured courses directly from database for homepage carousel (No static fallback)
 */
export async function getFeaturedCourses(): Promise<Course[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .eq("featured", true)
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("Supabase Error fetching featured courses:", error);
      return [];
    }

    return data as unknown as Course[];
  } catch (err) {
    console.error("Error fetching featured courses:", err);
    return [];
  }
}

/**
 * Fetch published popular courses directly from database for homepage popular grid (No static fallback)
 */
export async function getPopularCourses(): Promise<Course[]> {
  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("courses")
      .select("*")
      .eq("status", "published")
      .eq("popular", true)
      .order("created_at", { ascending: true });

    if (error || !data) {
      console.error("Supabase Error fetching popular courses:", error);
      return [];
    }

    return data as unknown as Course[];
  } catch (err) {
    console.error("Error fetching popular courses:", err);
    return [];
  }
}
