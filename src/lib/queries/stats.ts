import { createClient } from "@/lib/supabase/client";
import {
  BookOpen,
  FolderKanban,
  GraduationCap,
  UserRoundCheck,
  Users,
  type LucideIcon,
} from "lucide-react";

export interface StatItem {
  id?: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

export interface StatRecord {
  id: string;
  label: string;
  value: string;
  icon: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  BookOpen,
  UserRoundCheck,
  FolderKanban,
  GraduationCap,
};

/**
 * Fetch active site stats for the public website.
 */
export async function getSiteStats(): Promise<StatItem[]> {
  try {
    const supabase = createClient();

    const { data, error } = await supabase
      .from("site_stats")
      .select("id, label, value, icon, display_order")
      .eq("is_active", true)
      .order("display_order", { ascending: true });

    if (error || !data) {
      console.error("Supabase Error fetching site stats:", error);
      return [];
    }

    return data.map((item) => ({
      id: item.id,
      label: item.label,
      value: item.value,
      icon: item.icon && iconMap[item.icon] ? iconMap[item.icon] : Users,
    }));
  } catch (error) {
    console.error("Error fetching site stats:", error);
    return [];
  }
}

/**
 * Fetch all stats for admin panel.
 */
export async function getAllStats(): Promise<StatRecord[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .order("display_order", { ascending: true });

  if (error) {
    console.error("Error fetching all stats:", error);
    throw new Error("Failed to fetch stats");
  }

  return data ?? [];
}

/**
 * Fetch a single stat.
 */
export async function getStatById(id: string): Promise<StatRecord | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("site_stats")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching stat:", error);
    return null;
  }

  return data;
}

/**
 * Create a new stat.
 */
export async function createStat(stat: {
  label: string;
  value: string;
  icon: string;
  display_order: number;
  is_active: boolean;
}) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("site_stats")
    .insert(stat)
    .select()
    .single();

  if (error) {
    console.error("Error creating stat:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Update an existing stat.
 */
export async function updateStat(
  id: string,
  stat: {
    label: string;
    value: string;
    icon: string;
    display_order: number;
    is_active: boolean;
  },
) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("site_stats")
    .update(stat)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating stat:", error);
    throw new Error(error.message);
  }

  return data;
}

/**
 * Delete a stat.
 */
export async function deleteStat(id: string) {
  if (!id.trim()) {
    throw new Error("A stat id is required to delete a stat.");
  }

  const supabase = createClient();

  // Select the deleted row so an RLS-filtered delete (which otherwise returns
  // no error and affects zero rows) cannot be treated as a successful delete.
  const { data, error } = await supabase
    .from("site_stats")
    .delete()
    .eq("id", id)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Error deleting stat:", error);
    throw new Error(error.message);
  }

  if (!data) {
    throw new Error("Stat was not found or you do not have permission to delete it.");
  }

  return data;
}
