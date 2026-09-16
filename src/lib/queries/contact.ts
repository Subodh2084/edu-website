export interface ContactSubmissionPayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

/**
 * Submit contact message via server API route (bypasses client-side RLS permission restrictions)
 */
export async function submitContactMessage(payload: ContactSubmissionPayload) {
  const response = await fetch("/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data = await response.json();

  if (!response.ok || data.error) {
    throw new Error(data.error || "Failed to send message. Please try again.");
  }

  return data;
}
