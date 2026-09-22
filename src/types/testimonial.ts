export interface Testimonial {
  id: string;
  student_name: string;
  profile_image?: string | null;
  course_id?: string | null;
  course?: string | null;
  review: string;
  rating: number;
  designation?: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}