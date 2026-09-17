export type FAQCategory =
  | "General"
  | "Course"
  | "Enrollment"
  | "Payment"
  | "Certificate";

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: FAQCategory;
  course_id: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}
