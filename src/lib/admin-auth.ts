import { createClient } from "@/lib/supabase/server";

export async function isAdminRequest() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return false;

  const { data: profile } = await (supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .maybeSingle() as unknown as Promise<{ data: { role?: string } | null }>);

  return profile?.role === "admin";
}
