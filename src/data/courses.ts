import type { Course } from "@/types/course";

export const courses: Course[] = [
  {
    id: "course-1",
    category_id: "cat-1",
    title: "Modern Web Development",
    slug: "modern-web-development",
    short_description:
      "Build modern websites using HTML, CSS, JavaScript and React.",
    description:
      "Learn practical frontend development and build real-world web projects.",
    thumbnail: "/courses/web-development.jpg",
    preview_video_url: null,
    price: 12000,
    discount_price: 7999,
    level: "beginner",
    duration: "12 Weeks",
    language: "English",
    featured: true,
    popular: true,
    status: "published",
  },

  {
    id: "course-2",
    category_id: "cat-2",
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    short_description:
      "Learn the fundamentals of artificial intelligence and machine learning.",
    description:
      "Understand AI concepts and build practical machine learning projects.",
    thumbnail: "/courses/ai-machine-learning.jpg",
    preview_video_url: null,
    price: 15000,
    discount_price: 9999,
    level: "intermediate",
    duration: "14 Weeks",
    language: "English",
    featured: true,
    popular: true,
    status: "published",
  },

  {
    id: "course-3",
    category_id: "cat-3",
    title: "UI/UX Design Masterclass",
    slug: "ui-ux-design-masterclass",
    short_description:
      "Design professional and user-friendly digital experiences.",
    description:
      "Learn UI/UX principles, wireframing, prototyping and design systems.",
    thumbnail: "/courses/ui-ux.jpg",
    preview_video_url: null,
    price: 10000,
    discount_price: 6999,
    level: "beginner",
    duration: "8 Weeks",
    language: "English",
    featured: false,
    popular: true,
    status: "published",
  },

  {
    id: "course-4",
    category_id: "cat-4",
    title: "Python Programming",
    slug: "python-programming",
    short_description:
      "Learn Python programming from fundamentals to practical projects.",
    description:
      "Build a strong programming foundation with Python.",
    thumbnail: "/courses/python.jpg",
    preview_video_url: null,
    price: 11000,
    discount_price: 7499,
    level: "beginner",
    duration: "10 Weeks",
    language: "English",
    featured: false,
    popular: true,
    status: "published",
  },
];