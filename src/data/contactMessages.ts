export type ContactMessageStatus = "new" | "read" | "replied";
export interface ContactMessage {
  id: string;
  name: string;
    email: string;
    phone: string | null;
    subject: string | null;
    message: string;
    status: ContactMessageStatus;
    created_at: string; // ISO 8601 date string
    updated_at: string; // ISO 8601 date string
}

export const contactMessages: ContactMessage[] = [
  {
    id: "msg-001",
    name: "Aarav Sharma",
    email: "aarav.sharma@gmail.com",
    phone: "+977 9812345678",
    subject: "Inquiry About Web Development Course",
    message:
      "Hello, I would like to know more about your Web Development course. Could you please provide information about the course duration, fees, and whether it is available online?",
    status: "new",
    created_at: "2026-09-20T09:30:00Z",
    updated_at: "2026-09-20T09:30:00Z",
  },
  {
    id: "msg-002",
    name: "Sita Thapa",
    email: "sita.thapa@gmail.com",
    phone: "+977 9801234567",
    subject: "Course Enrollment",
    message:
      "I am interested in enrolling in the UI/UX Design course. Please let me know when the next batch starts and what the enrollment process looks like.",
    status: "read",
    created_at: "2026-09-19T14:15:00Z",
    updated_at: "2026-09-19T15:10:00Z",
  },
  {
    id: "msg-003",
    name: "Rohan Adhikari",
    email: "rohan.adhikari@gmail.com",
    phone: "+977 9867890123",
    subject: "Internship Opportunity",
    message:
      "I recently completed my frontend development course and wanted to ask if LeafClutch provides internship opportunities for students who complete their courses.",
    status: "replied",
    created_at: "2026-09-18T11:45:00Z",
    updated_at: "2026-09-18T13:20:00Z",
  },
  {
    id: "msg-004",
    name: "Anisha Karki",
    email: "anisha.karki@gmail.com",
    phone: null,
    subject: "Online Classes",
    message:
      "Hi, I am currently living outside Butwal. Do you offer online classes for your courses, and are the classes conducted live or through recorded lessons?",
    status: "new",
    created_at: "2026-09-17T08:20:00Z",
    updated_at: "2026-09-17T08:20:00Z",
  },
  {
    id: "msg-005",
    name: "Bibek Gautam",
    email: "bibek.gautam@gmail.com",
    phone: "+977 9845678910",
    subject: "Data Science Course Details",
    message:
      "Could you please share the complete syllabus and requirements for the Data Science course? I have basic Python knowledge but no previous experience with data science.",
    status: "read",
    created_at: "2026-09-16T16:40:00Z",
    updated_at: "2026-09-16T17:05:00Z",
  },
  {
    id: "msg-006",
    name: "Pratiksha Bhandari",
    email: "pratiksha.bhandari@gmail.com",
    phone: "+977 9823456789",
    subject: "Certification",
    message:
      "I would like to know whether students receive a certificate after completing the courses. Also, is the certificate recognized by companies?",
    status: "replied",
    created_at: "2026-09-15T10:10:00Z",
    updated_at: "2026-09-15T11:45:00Z",
  },
  {
    id: "msg-007",
    name: "Nischal KC",
    email: "nischal.kc@gmail.com",
    phone: "+977 9809876543",
    subject: "Course Fee and Payment",
    message:
      "I am interested in joining the AI and Machine Learning course. Please provide the course fee and available payment methods.",
    status: "new",
    created_at: "2026-09-14T13:25:00Z",
    updated_at: "2026-09-14T13:25:00Z",
  },
  {
    id: "msg-008",
    name: "Samiksha Rai",
    email: "samiksha.rai@gmail.com",
    phone: "+977 9811122233",
    subject: "Career Guidance",
    message:
      "I am a beginner and want to start a career in technology. I am confused about which course to choose. Could someone from your team guide me?",
    status: "read",
    created_at: "2026-09-13T09:05:00Z",
    updated_at: "2026-09-13T09:40:00Z",
  },
  {
    id: "msg-009",
    name: "Sujan Poudel",
    email: "sujan.poudel@gmail.com",
    phone: null,
    subject: "Graphic Design Course",
    message:
      "I wanted to ask if your Graphic Design course covers tools like Photoshop, Illustrator, and Figma. Please let me know.",
    status: "new",
    created_at: "2026-09-12T15:50:00Z",
    updated_at: "2026-09-12T15:50:00Z",
  },
  {
    id: "msg-010",
    name: "Manish Joshi",
    email: "manish.joshi@gmail.com",
    phone: "+977 9856789012",
    subject: "Corporate Training",
    message:
      "Our company is interested in providing technical training to our employees. Do you offer customized corporate training programs?",
    status: "replied",
    created_at: "2026-09-11T12:30:00Z",
    updated_at: "2026-09-11T14:00:00Z",
  },
];