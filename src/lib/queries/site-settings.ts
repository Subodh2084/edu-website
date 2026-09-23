import { createClient } from "@/lib/supabase/client";
import type { SiteSettings } from "@/types/site-settings";

export async function getSiteSettings(
  supabase = createClient(),
): Promise<SiteSettings | null> {
  try {
    const { data, error } = await supabase
      .from("site_settings")
      .select("*")
      .limit(1)
      .single();

    if (error || !data) {
      console.error("Error fetching site settings:", error);
      return null;
    }

    return data as unknown as SiteSettings;
  } catch (err) {
    console.error("Error fetching site settings:", err);
    return null;
  }
}
