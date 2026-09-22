"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function adminLogin(input: {
  email: string;
  password: string;
}): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: input.email,
      password: input.password,
    });

    if (error || !data.user) {
      return { success: false, error: error?.message || "Invalid email or password." };
    }

    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .maybeSingle();

    const role = (profile as { role?: string } | null)?.role;

    if (profileError || role !== "admin") {
      await supabase.auth.signOut();
      return {
        success: false,
        error: "This account does not have admin access.",
      };
    }

    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Login failed.";
    return { success: false, error: message };
  }
}

export async function adminLogout(): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
    revalidatePath("/admin");
    return { success: true };
  } catch (err) {
    const message = err instanceof Error ? err.message : "Logout failed.";
    return { success: false, error: message };
  }
}
