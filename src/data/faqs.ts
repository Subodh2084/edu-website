import type { FAQ } from "@/types/faq";

export const initialFAQs: FAQ[] = [
  {
    id: "1",
    question: "What is LeafClutch?",
    answer:
      "LeafClutch is an e-learning platform focused on practical skills and career development.",
    category: "General",
    course_id: null,
    display_order: 1,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "2",
    question: "Are the courses suitable for beginners?",
    answer:
      "Yes. Several courses are designed for beginners and introduce concepts step by step.",
    category: "Course",
    course_id: "course-1",
    display_order: 2,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "3",
    question: "How do I enroll in a course?",
    answer:
      "Choose the course you are interested in and follow the enrollment process provided on the course page.",
    category: "Enrollment",
    course_id: null,
    display_order: 3,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "4",
    question: "Will I receive a certificate?",
    answer:
      "Students who complete the applicable course requirements may receive a certificate.",
    category: "Certificate",
    course_id: null,
    display_order: 4,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];
