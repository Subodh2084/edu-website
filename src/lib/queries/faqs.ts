import { createClient } from "@/lib/supabase/client";
import { initialFAQs } from "@/data/faqs";
import type { FAQ, FAQCategory } from "@/types/faq";

/**
 * Fetch active FAQs for public website with optional category filter
 */
export async function getFAQs(category?: string): Promise<FAQ[]> {
  const supabase = createClient();
  try {
    let query = supabase
      .from("faqs")
      .select("*, courses(title)")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (category && category !== "All") {
      query = query.eq("category", category);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      if (category && category !== "All") {
        return initialFAQs.filter((f) => f.category === category && f.is_active);
      }
      return initialFAQs.filter((f) => f.is_active);
    }

    return (data as any[]).map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category as FAQCategory,
      course_id: item.course_id || null,
      course_title: item.courses?.title || null,
      display_order: item.display_order ?? 0,
      is_active: item.is_active ?? true,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (err) {
    console.error("Error fetching FAQs:", err);
    if (category && category !== "All") {
      return initialFAQs.filter((f) => f.category === category && f.is_active);
    }
    return initialFAQs.filter((f) => f.is_active);
  }
}

/**
 * Fetch all FAQs for Admin Portal (includes inactive ones)
 */
export async function getAdminFAQs(): Promise<FAQ[]> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*, courses(title)")
      .order("display_order", { ascending: true });

    if (error) {
      console.error("Error fetching admin FAQs:", error);
      return initialFAQs;
    }

    if (!data || data.length === 0) {
      return initialFAQs;
    }

    return (data as any[]).map((item) => ({
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category as FAQCategory,
      course_id: item.course_id || null,
      course_title: item.courses?.title || null,
      display_order: item.display_order ?? 0,
      is_active: item.is_active ?? true,
      created_at: item.created_at,
      updated_at: item.updated_at,
    }));
  } catch (err) {
    console.error("Error fetching admin FAQs:", err);
    return initialFAQs;
  }
}

/**
 * Fetch a single FAQ by ID
 */
export async function getFAQById(faqId: string): Promise<FAQ | null> {
  const supabase = createClient();
  try {
    const { data, error } = await supabase
      .from("faqs")
      .select("*, courses(title)")
      .eq("id", faqId)
      .single();

    if (error || !data) {
      // Fallback search in initialFAQs
      const fallback = initialFAQs.find((f) => f.id === faqId);
      return fallback || null;
    }

    const item = data as any;
    return {
      id: item.id,
      question: item.question,
      answer: item.answer,
      category: item.category as FAQCategory,
      course_id: item.course_id || null,
      course_title: item.courses?.title || null,
      display_order: item.display_order ?? 0,
      is_active: item.is_active ?? true,
      created_at: item.created_at,
      updated_at: item.updated_at,
    };
  } catch (err) {
    console.error("Error fetching FAQ by id:", err);
    return initialFAQs.find((f) => f.id === faqId) || null;
  }
}

export interface SaveFAQInput {
  id?: string;
  question: string;
  answer: string;
  category: FAQCategory;
  course_id?: string | null;
  display_order?: number;
  is_active?: boolean;
}

/**
 * Insert or update an FAQ in Supabase
 */
export async function saveFAQ(input: SaveFAQInput): Promise<{ success: boolean; data?: any; error?: string }> {
  const supabase = createClient();
  try {
    const payload = {
      question: input.question,
      answer: input.answer,
      category: input.category,
      course_id: input.course_id && input.course_id !== "none" ? input.course_id : null,
      display_order: input.display_order ?? 0,
      is_active: input.is_active ?? true,
      updated_at: new Date().toISOString(),
    };

    if (input.id) {
      const { data, error } = await supabase
        .from("faqs")
        .update(payload)
        .eq("id", input.id)
        .select()
        .single();

      if (error) {
        console.error("Error updating FAQ:", error);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    } else {
      const { data, error } = await supabase
        .from("faqs")
        .insert(payload)
        .select()
        .single();

      if (error) {
        console.error("Error creating FAQ:", error);
        return { success: false, error: error.message };
      }
      return { success: true, data };
    }
  } catch (err: any) {
    console.error("Error saving FAQ:", err);
    return { success: false, error: err.message || "Unknown error" };
  }
}

/**
 * Delete an FAQ from Supabase
 */
export async function deleteFAQ(faqId: string): Promise<boolean> {
  const supabase = createClient();
  try {
    const { error } = await supabase.from("faqs").delete().eq("id", faqId);
    if (error) {
      console.error("Error deleting FAQ:", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("Error deleting FAQ:", err);
    return false;
  }
}
