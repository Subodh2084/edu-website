export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  is_active: boolean;
  display_order: number;
  course_count?: number;
}
