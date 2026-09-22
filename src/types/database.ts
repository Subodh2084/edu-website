// Leafclutch Technologies Supabase Database Types
// File: src/types/database.ts

export type CourseLevel = "beginner" | "intermediate" | "advanced";
export type CourseStatus = "draft" | "published" | "archived";
export type FAQCategory = "General" | "Course" | "Enrollment" | "Payment" | "Certificate";
export type ContactMessageStatus = "new" | "read" | "replied" | "closed";
export type UserRole = "admin" | "student";

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile;
        Insert: Omit<Profile, "created_at" | "updated_at">;
        Update: Partial<Omit<Profile, "id">>;
      };
      course_categories: {
        Row: CourseCategory;
        Insert: Omit<CourseCategory, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CourseCategory, "id">>;
      };
      courses: {
        Row: Course;
        Insert: Omit<Course, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Course, "id">>;
      };
      course_outcomes: {
        Row: CourseOutcome;
        Insert: Omit<CourseOutcome, "id" | "created_at">;
        Update: Partial<Omit<CourseOutcome, "id">>;
      };
      course_requirements: {
        Row: CourseRequirement;
        Insert: Omit<CourseRequirement, "id" | "created_at">;
        Update: Partial<Omit<CourseRequirement, "id">>;
      };
      course_target_audience: {
        Row: CourseTargetAudience;
        Insert: Omit<CourseTargetAudience, "id" | "created_at">;
        Update: Partial<Omit<CourseTargetAudience, "id">>;
      };
      instructors: {
        Row: Instructor;
        Insert: Omit<Instructor, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Instructor, "id">>;
      };
      course_sections: {
        Row: CourseSection;
        Insert: Omit<CourseSection, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CourseSection, "id">>;
      };
      course_lessons: {
        Row: CourseLesson;
        Insert: Omit<CourseLesson, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CourseLesson, "id">>;
      };
      course_projects: {
        Row: CourseProject;
        Insert: Omit<CourseProject, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CourseProject, "id">>;
      };
      course_reviews: {
        Row: CourseReview;
        Insert: Omit<CourseReview, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<CourseReview, "id">>;
      };
      testimonials: {
        Row: Testimonial;
        Insert: Omit<Testimonial, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<Testimonial, "id">>;
      };
      faqs: {
        Row: FAQ;
        Insert: Omit<FAQ, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<FAQ, "id">>;
      };
      team_members: {
        Row: TeamMember;
        Insert: Omit<TeamMember, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<TeamMember, "id">>;
      };
      contact_messages: {
        Row: ContactMessage;
        Insert: Omit<ContactMessage, "id" | "created_at" | "updated_at">;
        Update: Partial<Omit<ContactMessage, "id">>;
      };
      site_settings: {
        Row: SiteSettings;
        Insert: Omit<SiteSettings, "id" | "updated_at">;
        Update: Partial<Omit<SiteSettings, "id">>;
      };
    };
  };
}

export interface Profile {
  id: string;
  full_name: string | null;
  email: string | null;
  avatar_url: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface CourseCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  image: string | null;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  category_id: string | null;
  title: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  thumbnail: string | null;
  preview_video_url: string | null;
  price: number;
  discount_price: number | null;
  level: CourseLevel;
  duration: string | null;
  language: string;
  featured: boolean;
  popular: boolean;
  status: CourseStatus;
  syllabus_pdf_url: string | null;
  created_at: string;
  updated_at: string;
}

export interface CourseOutcome {
  id: string;
  course_id: string;
  outcome: string;
  display_order: number;
  created_at: string;
}

export interface CourseRequirement {
  id: string;
  course_id: string;
  requirement: string;
  display_order: number;
  created_at: string;
}

export interface CourseTargetAudience {
  id: string;
  course_id: string;
  description: string;
  display_order: number;
  created_at: string;
}

export interface Instructor {
  id: string;
  name: string;
  slug: string;
  profile_image: string | null;
  designation: string | null;
  bio: string | null;
  experience: string | null;
  skills: string[] | null;
  linkedin_url: string | null;
  github_url: string | null;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface CourseSection {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CourseLesson {
  id: string;
  section_id: string;
  title: string;
  description: string | null;
  video_url: string | null;
  duration: string | null;
  lesson_type: string;
  is_preview: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CourseProject {
  id: string;
  course_id: string;
  title: string;
  description: string | null;
  thumbnail: string | null;
  technologies: string[] | null;
  github_url: string | null;
  live_demo_url: string | null;
  difficulty: string | null;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface CourseReview {
  id: string;
  course_id: string;
  user_id: string | null;
  rating: number;
  review: string;
  is_approved: boolean;
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  student_name: string;
  profile_image: string | null;
  course_id: string | null;
  review: string;
  rating: number;
  designation: string | null;
  is_featured: boolean;
  is_active: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

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

export interface TeamMember {
  id: string;
  name: string;
  profile_image: string | null;
  designation: string;
  bio: string | null;
  linkedin_url: string | null;
  github_url: string | null;
  display_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  subject: string | null;
  message: string;
  status: ContactMessageStatus;
  created_at: string;
  updated_at: string;
}

export interface SiteSettings {
  id: string;
  company_name: string;
  logo: string | null;
  favicon: string | null;
  email: string | null;
  phone: string | null;
  whatsapp: string | null;
  address: string | null;
  social_media_links: Record<string, string>;
  google_maps_url: string | null;
  office_hours: string | null;
  footer_description: string | null;
  copyright_text: string | null;
  updated_at: string;
}
