-- Seed Data for Leafclutch Technologies E-Learning Platform
-- File: supabase/seed.sql

-- Clear existing data if needed (for fresh seed execution)
TRUNCATE TABLE public.contact_messages CASCADE;
TRUNCATE TABLE public.site_settings CASCADE;
TRUNCATE TABLE public.team_members CASCADE;
TRUNCATE TABLE public.about_us_content CASCADE;
TRUNCATE TABLE public.faqs CASCADE;
TRUNCATE TABLE public.testimonials CASCADE;
TRUNCATE TABLE public.homepage_cta CASCADE;
TRUNCATE TABLE public.learning_process CASCADE;
TRUNCATE TABLE public.why_choose_us CASCADE;
TRUNCATE TABLE public.site_stats CASCADE;
TRUNCATE TABLE public.homepage_hero CASCADE;
TRUNCATE TABLE public.course_projects CASCADE;
TRUNCATE TABLE public.course_lessons CASCADE;
TRUNCATE TABLE public.course_sections CASCADE;
TRUNCATE TABLE public.course_instructors CASCADE;
TRUNCATE TABLE public.instructors CASCADE;
TRUNCATE TABLE public.course_target_audience CASCADE;
TRUNCATE TABLE public.course_requirements CASCADE;
TRUNCATE TABLE public.course_outcomes CASCADE;
TRUNCATE TABLE public.courses CASCADE;
TRUNCATE TABLE public.course_categories CASCADE;

-- 1. COURSE CATEGORIES (5 Categories)
INSERT INTO public.course_categories (id, name, slug, description, image, is_active, display_order) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Web Development', 'web-development', 'Master modern full-stack web technologies including React, Next.js, and Node.js.', '/categories/web-dev.jpg', true, 1),
  ('10000000-0000-0000-0000-000000000002', 'AI & Machine Learning', 'ai-machine-learning', 'Learn Artificial Intelligence, Data Science models, neural networks, and Deep Learning.', '/categories/ai-ml.jpg', true, 2),
  ('10000000-0000-0000-0000-000000000003', 'UI/UX Design', 'ui-ux-design', 'Design intuitive, modern, user-centric interfaces and interactive visual prototypes.', '/categories/ui-ux.jpg', true, 3),
  ('10000000-0000-0000-0000-000000000004', 'Python Programming', 'python-programming', 'Build software tools, automation scripts, and backend architectures using Python.', '/categories/python.jpg', true, 4),
  ('10000000-0000-0000-0000-000000000005', 'Cybersecurity', 'cybersecurity', 'Understand modern network security, ethical hacking, vulnerability assessments, and defense.', '/categories/cybersecurity.jpg', true, 5);

-- 2. COURSES (5 Courses)
INSERT INTO public.courses (id, category_id, title, slug, short_description, description, thumbnail, preview_video_url, price, discount_price, level, duration, language, featured, popular, status) VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Modern Web Development',
    'modern-web-development',
    'Build modern websites using HTML, CSS, JavaScript and React.',
    'Learn practical frontend development and build real-world web projects with hands-on mentoring.',
    '/courses/web-development.jpg',
    'https://www.youtube.com/watch?example1',
    12000.00,
    7999.00,
    'beginner',
    '12 Weeks',
    'English',
    true,
    true,
    'published'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    'AI & Machine Learning',
    'ai-machine-learning',
    'Learn the fundamentals of artificial intelligence and machine learning.',
    'Understand AI concepts, train data models, and build practical machine learning projects using Python and PyTorch.',
    '/courses/ai-machine-learning.jpg',
    'https://www.youtube.com/watch?example2',
    15000.00,
    9999.00,
    'intermediate',
    '14 Weeks',
    'English',
    true,
    true,
    'published'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000003',
    'UI/UX Design Masterclass',
    'ui-ux-design-masterclass',
    'Design professional and user-friendly digital experiences.',
    'Learn UI/UX principles, wireframing, interactive prototyping and design systems using Figma.',
    '/courses/ui-ux.jpg',
    NULL,
    10000.00,
    6999.00,
    'beginner',
    '8 Weeks',
    'English',
    false,
    true,
    'published'
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000004',
    'Python Programming',
    'python-programming',
    'Learn Python programming from fundamentals to practical projects.',
    'Build a strong programming foundation with Python, file handling, APIs, and data structures.',
    '/courses/python.jpg',
    NULL,
    11000.00,
    7499.00,
    'beginner',
    '10 Weeks',
    'English',
    false,
    true,
    'published'
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000005',
    'Cybersecurity Essentials',
    'cybersecurity-essentials',
    'Learn ethical hacking, network analysis, and enterprise security basics.',
    'Comprehensive introduction to IT security, threat analysis, cryptography, and network defense strategies.',
    '/courses/cybersecurity.jpg',
    NULL,
    14000.00,
    8999.00,
    'intermediate',
    '12 Weeks',
    'English',
    true,
    false,
    'published'
  );

-- 3. COURSE OUTCOMES
INSERT INTO public.course_outcomes (course_id, outcome, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Build responsive web applications using React and Tailwind CSS', 1),
  ('20000000-0000-0000-0000-000000000001', 'Understand modern JavaScript (ES6+), async code, and DOM manipulation', 2),
  ('20000000-0000-0000-0000-000000000001', 'Work with backend APIs and state management tools', 3),
  ('20000000-0000-0000-0000-000000000001', 'Deploy web projects live using Vercel and Netlify', 4),

  ('20000000-0000-0000-0000-000000000002', 'Understand supervised and unsupervised machine learning algorithms', 1),
  ('20000000-0000-0000-0000-000000000002', 'Preprocess datasets using Pandas and NumPy', 2),
  ('20000000-0000-0000-0000-000000000002', 'Build and evaluate predictive models with scikit-learn', 3);

-- 4. COURSE REQUIREMENTS
INSERT INTO public.course_requirements (course_id, requirement, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Basic computer operating knowledge', 1),
  ('20000000-0000-0000-0000-000000000001', 'No prior programming experience required', 2),

  ('20000000-0000-0000-0000-000000000002', 'Basic understanding of high school algebra', 1),
  ('20000000-0000-0000-0000-000000000002', 'Familiarity with basic programming logic', 2);

-- 5. COURSE TARGET AUDIENCE
INSERT INTO public.course_target_audience (course_id, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Beginners seeking to start a career in Web Development', 1),
  ('20000000-0000-0000-0000-000000000001', 'Students and IT graduates looking for practical coding skills', 2),

  ('20000000-0000-0000-0000-000000000002', 'Developers aiming to transition into Data Science and AI', 1);

-- 6. INSTRUCTORS (3 Instructors)
INSERT INTO public.instructors (id, name, slug, profile_image, designation, bio, experience, skills, linkedin_url, github_url, is_active) VALUES
  (
    '30000000-0000-0000-0000-000000000001',
    'Rohan Karki',
    'rohan-karki',
    '/instructors/rohan-karki.jpg',
    'Senior Full Stack Architect',
    'Rohan has over 8 years of software industry experience leading web app architectures and mentoring hundreds of developer students.',
    '8+ Years',
    ARRAY['React', 'Next.js', 'Node.js', 'PostgreSQL', 'TypeScript'],
    'https://linkedin.com/in/rohankarki',
    'https://github.com/rohankarki',
    true
  ),
  (
    '30000000-0000-0000-0000-000000000002',
    'Pooja Adhikari',
    'pooja-adhikari',
    '/instructors/pooja-adhikari.jpg',
    'AI Engineer & Data Scientist',
    'Pooja specializes in machine learning systems, computer vision models, and practical AI implementations for tech enterprises.',
    '6+ Years',
    ARRAY['Python', 'PyTorch', 'Scikit-Learn', 'Pandas', 'TensorFlow'],
    'https://linkedin.com/in/poojaadhikari',
    'https://github.com/poojaadhikari',
    true
  ),
  (
    '30000000-0000-0000-0000-000000000003',
    'Sujan Shrestha',
    'sujan-shrestha',
    '/instructors/sujan-shrestha.jpg',
    'Product Lead & UI/UX Specialist',
    'Sujan is a creative product designer with expertise in design systems, interaction patterns, and user experience research.',
    '5+ Years',
    ARRAY['Figma', 'UI Design', 'UX Research', 'Design Systems', 'Prototyping'],
    'https://linkedin.com/in/sujanshrestha',
    'https://github.com/sujanshrestha',
    true
  );

-- 7. COURSE INSTRUCTORS MAP
INSERT INTO public.course_instructors (course_id, instructor_id) VALUES
  ('20000000-0000-0000-0000-000000000001', '30000000-0000-0000-0000-000000000001'),
  ('20000000-0000-0000-0000-000000000002', '30000000-0000-0000-0000-000000000002'),
  ('20000000-0000-0000-0000-000000000003', '30000000-0000-0000-0000-000000000003'),
  ('20000000-0000-0000-0000-000000000004', '30000000-0000-0000-0000-000000000001');

-- 8. COURSE SECTIONS & LESSONS (For Course 1 & Course 2)
-- Course 1 Sections
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Section 1: Web Development Basics', 'Getting started with HTML5, CSS3, and modern layouts.', 1),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'Section 2: JavaScript & React Basics', 'Mastering JS variables, functions, DOM, and React components.', 2);

-- Course 1 Lessons
INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'Welcome & Orientation', 'Course overview and workspace setup.', 'https://www.youtube.com/watch?v=demo1', '10 mins', 'video', true, 1),
  ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'HTML5 Semantic Structures', 'Learn core tags, elements, forms and semantic markup.', 'https://www.youtube.com/watch?v=demo2', '25 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000002', 'Introduction to React Components', 'Creating stateful React components and JSX structure.', 'https://www.youtube.com/watch?v=demo3', '35 mins', 'video', true, 1);

-- Course 2 Sections
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000002', 'Section 1: Foundations of Machine Learning', 'Understanding datasets, features, and model training.', 1);

-- Course 2 Lessons
INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000003', 'What is Machine Learning?', 'Introduction to ML types: supervised, unsupervised, reinforcement.', 'https://www.youtube.com/watch?v=demo4', '15 mins', 'video', true, 1);

-- 9. COURSE PROJECTS
INSERT INTO public.course_projects (course_id, title, description, thumbnail, technologies, github_url, live_demo_url, difficulty, display_order) VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    'Interactive E-Commerce Platform',
    'Build a fully responsive online shop complete with cart management and product catalog.',
    '/projects/ecommerce.jpg',
    ARRAY['React', 'Tailwind CSS', 'JavaScript'],
    'https://github.com/leafclutch/demo-shop',
    'https://demo-shop.leafclutch.com',
    'Intermediate',
    1
  );

-- 10. HOMEPAGE HERO
INSERT INTO public.homepage_hero (heading, description, image, primary_button_text, primary_button_link, secondary_button_text, secondary_button_link, is_active) VALUES
  (
    'Accelerate Your Career with Industry-Led IT Training',
    'Leafclutch Technologies provides practical, project-based courses designed by tech industry professionals to turn your ambition into real-world skills.',
    '/hero-banner.jpg',
    'Explore Courses',
    '/courses',
    'Contact Us',
    '/contact',
    true
  );

-- 11. SITE STATS
INSERT INTO public.site_stats (label, value, icon, display_order, is_active) VALUES
  ('Active Learners', '2,500+', 'Users', 1, true),
  ('Practical Courses', '25+', 'BookOpen', 2, true),
  ('Industry Mentors', '15+', 'GraduationCap', 3, true),
  ('Project Success Rate', '95%', 'CheckCircle', 4, true);

-- 12. WHY CHOOSE US
INSERT INTO public.why_choose_us (title, description, icon, display_order, is_active) VALUES
  ('Project-Based Curriculum', 'Gain hands-on experience by building real software projects for your portfolio.', 'Code', 1, true),
  ('Expert Mentorship', 'Learn directly from practicing tech leads and senior software engineers.', 'UserCheck', 2, true),
  ('Career Support', 'Resume guidance, mock interviews, and career counseling to land your dream job.', 'Briefcase', 3, true);

-- 13. LEARNING PROCESS
INSERT INTO public.learning_process (step_number, title, description, icon, display_order, is_active) VALUES
  (1, 'Choose Your Track', 'Select a course aligned with your career goals and skill level.', 'Target', 1, true),
  (2, 'Interactive Learning', 'Attend live sessions, watch video modules, and access curated resources.', 'Tv', 2, true),
  (3, 'Build Real Projects', 'Apply concepts by building tangible software projects.', 'FolderPlus', 3, true),
  (4, 'Get Certified', 'Receive an industry-recognized certificate and career guidance.', 'Award', 4, true);

-- 14. HOMEPAGE CTA
INSERT INTO public.homepage_cta (heading, description, button_text, button_link, image, is_active) VALUES
  (
    'Ready to Transform Your IT Career?',
    'Enroll in our upcoming cohort today and learn directly from top industry experts.',
    'Join Now',
    '/courses',
    '/cta-background.jpg',
    true
  );

-- 15. TESTIMONIALS (Matches frontend data)
INSERT INTO public.testimonials (id, student_name, profile_image, course_id, review, rating, designation, is_featured, is_active, display_order) VALUES
  (
    '60000000-0000-0000-0000-000000000001',
    'Aarav Sharma',
    '/testimonials/student-1.jpg',
    '20000000-0000-0000-0000-000000000001',
    'The course gave me practical knowledge and helped me build projects that I could confidently add to my portfolio.',
    5,
    'Frontend Developer',
    true,
    true,
    1
  ),
  (
    '60000000-0000-0000-0000-000000000002',
    'Sita Thapa',
    '/testimonials/student-2.jpg',
    '20000000-0000-0000-0000-000000000002',
    'The learning experience was practical and easy to follow. The mentorship helped me understand concepts much better.',
    5,
    'Computer Science Student',
    true,
    true,
    2
  );

-- 16. FAQS (Across Categories)
INSERT INTO public.faqs (question, answer, category, course_id, display_order, is_active) VALUES
  (
    'What background knowledge do I need before joining?',
    'Most beginner-level courses require no prior coding knowledge. Advanced tracks list specific prerequisites in their course page.',
    'General',
    NULL,
    1,
    true
  ),
  (
    'Will I receive a certificate upon course completion?',
    'Yes! You will receive a verified Leafclutch Technologies certificate after completing all lessons and required course projects.',
    'Certificate',
    NULL,
    2,
    true
  ),
  (
    'What payment methods are supported for course enrollment?',
    'We accept eSewa, Khalti, direct bank transfer, and major debit/credit cards.',
    'Payment',
    NULL,
    3,
    true
  ),
  (
    'Are class recordings provided if I miss a live session?',
    'Yes, all recorded lectures and learning materials remain accessible in your student portal.',
    'Enrollment',
    NULL,
    4,
    true
  );

-- 17. ABOUT US CONTENT
INSERT INTO public.about_us_content (company_introduction, our_story, mission, vision, values, achievements, images) VALUES
  (
    'Leafclutch Technologies is a premier IT training and tech innovation provider.',
    'Founded with the vision to bridge the gap between academic education and industry requirements, Leafclutch delivers practical skill building.',
    'To empower learners with real-world tech capabilities and bridge the tech talent gap.',
    'To become a leading regional hub for practical tech education and software excellence.',
    '[{"title": "Excellence", "desc": "High standard of training and mentorship"}, {"title": "Practicality", "desc": "Hands-on project work over pure theory"}]'::jsonb,
    '[{"title": "Graduates Employed", "value": "85%"}, {"title": "Completed Projects", "value": "120+"}]'::jsonb,
    ARRAY['/about/team-1.jpg', '/about/workspace-1.jpg']
  );

-- 18. TEAM MEMBERS
INSERT INTO public.team_members (name, profile_image, designation, bio, linkedin_url, github_url, display_order, is_active) VALUES
  (
    'Kiran Adhikari',
    '/team/kiran.jpg',
    'Chief Executive Officer & Founder',
    'Kiran leads overall strategic vision and operations at Leafclutch Technologies.',
    'https://linkedin.com/in/kiranadhikari',
    'https://github.com/kiranadhikari',
    1,
    true
  ),
  (
    'Anjali Gurung',
    '/team/anjali.jpg',
    'Head of Curriculum & Education',
    'Anjali oversees course design and ensures training quality across all programs.',
    'https://linkedin.com/in/anjaligurung',
    'https://github.com/anjaligurung',
    2,
    true
  );

-- 19. SITE SETTINGS
INSERT INTO public.site_settings (company_name, logo, favicon, email, phone, whatsapp, address, social_media_links, google_maps_url, office_hours, footer_description, copyright_text) VALUES
  (
    'Leafclutch Technologies',
    '/logo.svg',
    '/favicon.ico',
    'info@leafclutch.com',
    '+977-1-4500000',
    '+977-9800000000',
    'Kathmandu, Nepal',
    '{"facebook": "https://facebook.com/leafclutch", "linkedin": "https://linkedin.com/company/leafclutch", "github": "https://github.com/leafclutch", "instagram": "https://instagram.com/leafclutch"}'::jsonb,
    'https://maps.google.com/?q=Kathmandu',
    'Sunday - Friday: 9:00 AM - 6:00 PM',
    'Leafclutch Technologies provides industry-driven IT training and software engineering courses to empower next-generation tech professionals.',
    '© 2026 Leafclutch Technologies. All rights reserved.'
  );
