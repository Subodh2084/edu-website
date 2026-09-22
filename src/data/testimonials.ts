import type { Testimonial } from "@/types/testimonial";

export const testimonials: Testimonial[] = [
  {
    id: "testimonial-1",
    student_name: "Aarav Sharma",
    profile_image: "",
    course_id: "course-1",
    course: "Modern Web Development",
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
    profile_image: "",
    course_id: "course-2",
    course: "AI & Machine Learning",
    review:
      "The learning experience was practical and easy to follow. The mentorship helped me understand concepts much better.",
    rating: 5,
    designation: "Computer Science Student",
    is_featured: true,
    is_active: true,
    display_order: 2,
  },
  {
    id: "testimonial-3",
    student_name: "Sujan Karki",
    profile_image: "",
    course_id: "course-3",
    course: "UI/UX Design Masterclass",
    review:
      "I really liked the practical approach and structured learning process. Would highly recommend!",
    rating: 4,
    designation: "Junior Designer",
    is_featured: false,
    is_active: true,
    display_order: 3,
  },
];
