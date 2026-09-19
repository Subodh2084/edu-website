import { createClient } from "@/lib/supabase/client";
import { BookOpen, FolderKanban, UserRoundCheck, Users, type LucideIcon } from "lucide-react";

export interface StatItem {
  id?: string;
  label: string;
  value: string;
  icon: LucideIcon;
}

const iconMap: Record<string, LucideIcon> = {
  Users,
  BookOpen,
  UserRoundCheck,
  FolderKanban,
  GraduationCap: UserRoundCheck,
  CheckCircle: FolderKanban,
};

/**
 * Fetch active site stats directly from database (No static fallback)
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

    const typedData = data as Array<{ id: string; label: string; value: string; icon: string | null; display_order: number }>;

    return typedData.map((item) => ({
      id: item.id,
      label: item.label,
      value: item.value,
      icon: (item.icon && iconMap[item.icon]) ? iconMap[item.icon] : Users,
    }));
  } catch (err) {
    console.error("Error fetching site stats:", err);
    return [];
  }
}
