export interface Testimonial {
  id: string;
  student_name: string;
  profile_image: string;
  course_id: string;
  review: string;
  rating: number;
  designation: string;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
}