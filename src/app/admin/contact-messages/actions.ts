"use server";

import {
  deleteContactMessage,
  updateContactMessageStatus,
} from "@/lib/queries/admin";

import type { ContactMessage } from "@/types/database";

export async function updateContactMessageStatusAction(
  id: string,
  status: ContactMessage["status"]
) {
  return await updateContactMessageStatus(id, status);
}

export async function deleteContactMessageAction(id: string) {
  return await deleteContactMessage(id);
}