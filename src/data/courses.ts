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

    outcomes: [
      "Build modern and responsive web applications using HTML, CSS, JavaScript, and React.",
      "Create reusable React components and manage data using props and state.",
      "Use React Hooks such as useState, useEffect, and custom hooks effectively.",
      "Implement client-side routing and build multi-page React applications.",
      "Manage application state and handle forms and user interactions.",
      "Integrate REST APIs and work with asynchronous data in React applications.",
      "Apply modern frontend development practices to create scalable and maintainable applications.",
      "Build real-world projects that demonstrate your React development skills.",
    ],

    price: 12000,
    discount_price: 7999,

    level: "beginner",
    duration: "12 Weeks",
    language: "English",

    featured: true,
    popular: true,
    status: "published",

    sections: [
      {
        id: "section-1",
        title: "Introduction to Web Development",
        lessons: [
          {
            id: "lesson-1",
            title: "Introduction to Modern Web Development",
            duration: "12 min",
            description:
              "Get an overview of modern web development, its tools, and best practices.",

          },
          {
            id: "lesson-2",
            title: "How the Web Works",
            duration: "15 min",
            description:
              "Learn about the basics of how the web works, including HTTP, browsers, and servers.",
          },
          {
            id: "lesson-3",
            title: "Setting Up Your Development Environment",
            duration: "18 min",
            description:
              "Learn how to set up your development environment with the necessary tools and software.",
          },
          {
            id: "lesson-4",
            title: "Introduction to Git and GitHub",
            duration: "20 min",
            description:
              "Learn the basics of version control with Git and how to use GitHub for collaboration.",

          },
        ],
      },

      {
        id: "section-2",
        title: "HTML & CSS Fundamentals",
        lessons: [
          {
            id: "lesson-5",
            title: "HTML Document Structure",
            duration: "16 min",
            description:
              "Learn about the structure of an HTML document and how to create web pages using HTML.",
          },
          {
            id: "lesson-6",
            title: "Semantic HTML",
            duration: "14 min",
            description:
              "Understand the importance of semantic HTML and how to use it to improve accessibility and SEO.",
          },
          {
            id: "lesson-7",
            title: "CSS Fundamentals",
            duration: "20 min",
            description:
              "Learn the basics of CSS, including selectors, properties, and how to style web pages.",
          },
          {
            id: "lesson-8",
            title: "Responsive Web Design",
            duration: "24 min",
            description:
              "Learn how to create responsive web designs that adapt to different screen sizes and devices.",
          },
        ],
      },

      {
        id: "section-3",
        title: "JavaScript Fundamentals",
        lessons: [
          {
            id: "lesson-9",
            title: "JavaScript Basics",
            duration: "18 min",
          },
          {
            id: "lesson-10",
            title: "Variables, Data Types and Operators",
            duration: "22 min",
          },
          {
            id: "lesson-11",
            title: "Functions and Scope",
            duration: "25 min",
          },
          {
            id: "lesson-12",
            title: "Arrays, Objects and Modern JavaScript",
            duration: "28 min",
          },
          {
            id: "lesson-13",
            title: "Promises and Async/Await",
            duration: "24 min",
          },
        ],
      },

      {
        id: "section-4",
        title: "React Fundamentals",
        lessons: [
          {
            id: "lesson-14",
            title: "Introduction to React",
            duration: "15 min",
          },
          {
            id: "lesson-15",
            title: "Components and JSX",
            duration: "20 min",
          },
          {
            id: "lesson-16",
            title: "Props and State",
            duration: "24 min",
          },
          {
            id: "lesson-17",
            title: "Handling Events and Forms",
            duration: "22 min",
          },
          {
            id: "lesson-18",
            title: "Rendering Lists and Conditional UI",
            duration: "18 min",
          },
        ],
      },

      {
        id: "section-5",
        title: "React Hooks & State Management",
        lessons: [
          {
            id: "lesson-19",
            title: "Understanding useState",
            duration: "20 min",
          },
          {
            id: "lesson-20",
            title: "Working with useEffect",
            duration: "25 min",
          },
          {
            id: "lesson-21",
            title: "useContext and Shared State",
            duration: "22 min",
          },
          {
            id: "lesson-22",
            title: "Creating Custom Hooks",
            duration: "20 min",
          },
        ],
      },

      {
        id: "section-6",
        title: "Building Real-World React Applications",
        lessons: [
          {
            id: "lesson-23",
            title: "React Router",
            duration: "24 min",
          },
          {
            id: "lesson-24",
            title: "Fetching Data from APIs",
            duration: "26 min",
          },
          {
            id: "lesson-25",
            title: "Loading, Error and Empty States",
            duration: "20 min",
          },
          {
            id: "lesson-26",
            title: "Reusable Component Architecture",
            duration: "28 min",
          },
          {
            id: "lesson-27",
            title: "Building the Final Project",
            duration: "45 min",
          },
          {
            id: "lesson-28",
            title: "Deploying Your React Application",
            duration: "22 min",
          },
        ],
      },
    ],
  },
];