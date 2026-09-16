export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";

export interface Course {
  id: string;
  category_id: string;
  title: string;
  slug: string;
  short_description: string;
  description: string;
  thumbnail: string;
  preview_video_url: string | null;
  price: number;
  discount_price: number | null;
  level: CourseLevel;
  duration: string;
  language: string;
  featured: boolean;
  popular: boolean;
  status: CourseStatus;
}