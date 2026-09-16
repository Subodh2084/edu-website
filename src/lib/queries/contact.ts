import { createClient } from "@/lib/supabase/client";

export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/**
 * Submit contact message directly to Supabase contact_messages table
 */
export async function submitContactMessage(payload: ContactSubmissionPayload) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from("contact_messages")
    .insert({
      name: payload.name,
      email: payload.email,
      phone: payload.phone || null,
      subject: payload.subject || null,
      message: payload.message,
      status: "new",
    });

  if (error) {
    console.error("Error submitting contact message:", error);
    throw new Error(error.message || "Failed to send message. Please try again.");
  }

  return true;
}
