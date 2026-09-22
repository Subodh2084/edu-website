import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase.from("offers")
      .select("*").eq("is_active", true).maybeSingle();
    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    const { data: settings } = await supabase.from("site_settings")
      .select("whatsapp").limit(1).maybeSingle();
    const whatsapp = (settings as unknown as { whatsapp?: string | null } | null)?.whatsapp ?? null;
    return NextResponse.json({ data: data ?? null, whatsapp });
  } catch {
    return NextResponse.json({ data: null, whatsapp: null });
  }
}
