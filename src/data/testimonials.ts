import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    student_name: "Aarav Sharma",
    profile_image: "/testimonials/student-1.jpg",
    course_id: "course-1",
    review:
      "The course gave me practical knowledge and helped me build projects that I could confidently add to my portfolio.",
    rating: 5,
    designation: "Frontend Developer",
    is_featured: true,
    is_active: true,
    display_order: 1,
  },
  {
    id: "testimonial-2",
    student_name: "Sita Thapa",
    profile_image: "/testimonials/student-2.jpg",
    course_id: "course-2",
    review:
      "The learning experience was practical and easy to follow. The mentorship helped me understand concepts much better.",
    rating: 5,
    designation: "Computer Science Student",
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
];