-- ============================================================
-- Full Course Data Seed for Leafclutch Technologies
-- Run this in the Supabase SQL Editor to populate all course pages
-- ============================================================

-- STEP 1: Clear existing course-related data only
TRUNCATE TABLE public.course_projects CASCADE;
TRUNCATE TABLE public.course_lessons CASCADE;
TRUNCATE TABLE public.course_sections CASCADE;
TRUNCATE TABLE public.course_target_audience CASCADE;
TRUNCATE TABLE public.course_requirements CASCADE;
TRUNCATE TABLE public.course_outcomes CASCADE;
TRUNCATE TABLE public.courses CASCADE;
TRUNCATE TABLE public.course_categories CASCADE;

-- ============================================================
-- CATEGORIES
-- ============================================================
INSERT INTO public.course_categories (id, name, slug, description, image, is_active, display_order) VALUES
  ('10000000-0000-0000-0000-000000000001', 'Web Development',       'web-development',    'Master modern full-stack web technologies including React, Next.js, and Node.js.',                      '/categories/web-dev.jpg',       true, 1),
  ('10000000-0000-0000-0000-000000000002', 'AI & Machine Learning', 'ai-machine-learning','Learn Artificial Intelligence, Data Science models, neural networks, and Deep Learning.',               '/categories/ai-ml.jpg',         true, 2),
  ('10000000-0000-0000-0000-000000000003', 'UI/UX Design',          'ui-ux-design',       'Design intuitive, modern, user-centric interfaces and interactive visual prototypes.',                   '/categories/ui-ux.jpg',         true, 3),
  ('10000000-0000-0000-0000-000000000004', 'Python Programming',    'python-programming', 'Build software tools, automation scripts, and backend architectures using Python.',                       '/categories/python.jpg',        true, 4),
  ('10000000-0000-0000-0000-000000000005', 'Cybersecurity',         'cybersecurity',      'Understand modern network security, ethical hacking, vulnerability assessments, and defense.',            '/categories/cybersecurity.jpg', true, 5);

-- ============================================================
-- COURSES
-- ============================================================
INSERT INTO public.courses (id, category_id, title, slug, short_description, description, thumbnail, preview_video_url, price, discount_price, level, duration, language, featured, popular, status) VALUES
  (
    '20000000-0000-0000-0000-000000000001',
    '10000000-0000-0000-0000-000000000001',
    'Modern Web Development',
    'modern-web-development',
    'Build modern websites using HTML, CSS, JavaScript and React.',
    'Learn practical frontend development and build real-world web projects with hands-on mentoring. This course takes you from zero to a confident React developer with real portfolio projects.',
    '/courses/web-development.jpg',
    'https://www.youtube.com/watch?v=example1',
    12000.00, 7999.00, 'beginner', '12 Weeks', 'English', true, true, 'published'
  ),
  (
    '20000000-0000-0000-0000-000000000002',
    '10000000-0000-0000-0000-000000000002',
    'AI & Machine Learning',
    'ai-machine-learning',
    'Learn the fundamentals of artificial intelligence and machine learning.',
    'Understand AI concepts, train data models, and build practical machine learning projects using Python and PyTorch. Covers supervised learning, neural networks, and real-world AI applications.',
    '/courses/ai-machine-learning.jpg',
    'https://www.youtube.com/watch?v=example2',
    15000.00, 9999.00, 'intermediate', '14 Weeks', 'English', true, true, 'published'
  ),
  (
    '20000000-0000-0000-0000-000000000003',
    '10000000-0000-0000-0000-000000000003',
    'UI/UX Design Masterclass',
    'ui-ux-design-masterclass',
    'Design professional and user-friendly digital experiences.',
    'Learn UI/UX principles, wireframing, interactive prototyping and design systems using Figma. Build a complete design portfolio with real client-style projects.',
    '/courses/ui-ux.jpg',
    NULL,
    10000.00, 6999.00, 'beginner', '8 Weeks', 'English', false, true, 'published'
  ),
  (
    '20000000-0000-0000-0000-000000000004',
    '10000000-0000-0000-0000-000000000004',
    'Python Programming',
    'python-programming',
    'Learn Python programming from fundamentals to practical projects.',
    'Build a strong programming foundation with Python, covering file handling, APIs, data structures, OOP, and automation scripting for real-world use cases.',
    '/courses/python.jpg',
    NULL,
    11000.00, 7499.00, 'beginner', '10 Weeks', 'English', false, true, 'published'
  ),
  (
    '20000000-0000-0000-0000-000000000005',
    '10000000-0000-0000-0000-000000000005',
    'Cybersecurity Essentials',
    'cybersecurity-essentials',
    'Learn ethical hacking, network analysis, and enterprise security basics.',
    'Comprehensive introduction to IT security, threat analysis, cryptography, and network defense strategies. Gain skills to protect systems and respond to security incidents.',
    '/courses/cybersecurity.jpg',
    NULL,
    14000.00, 8999.00, 'intermediate', '12 Weeks', 'English', true, false, 'published'
  );

-- ============================================================
-- COURSE OUTCOMES
-- ============================================================

-- Course 1: Modern Web Development
INSERT INTO public.course_outcomes (course_id, outcome, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Build modern and responsive web applications using HTML, CSS, JavaScript, and React.', 1),
  ('20000000-0000-0000-0000-000000000001', 'Create reusable React components and manage data using props and state.', 2),
  ('20000000-0000-0000-0000-000000000001', 'Use React Hooks such as useState, useEffect, and custom hooks effectively.', 3),
  ('20000000-0000-0000-0000-000000000001', 'Implement client-side routing and build multi-page React applications.', 4),
  ('20000000-0000-0000-0000-000000000001', 'Integrate REST APIs and work with asynchronous data in React applications.', 5),
  ('20000000-0000-0000-0000-000000000001', 'Apply modern frontend development practices to create scalable and maintainable applications.', 6),
  ('20000000-0000-0000-0000-000000000001', 'Deploy web projects live using Vercel and Netlify.', 7),
  ('20000000-0000-0000-0000-000000000001', 'Build real-world projects that demonstrate your React development skills.', 8);

-- Course 2: AI & Machine Learning
INSERT INTO public.course_outcomes (course_id, outcome, display_order) VALUES
  ('20000000-0000-0000-0000-000000000002', 'Understand supervised and unsupervised machine learning algorithms.', 1),
  ('20000000-0000-0000-0000-000000000002', 'Preprocess datasets using Pandas and NumPy.', 2),
  ('20000000-0000-0000-0000-000000000002', 'Build and evaluate predictive models with scikit-learn.', 3),
  ('20000000-0000-0000-0000-000000000002', 'Design and train neural networks using PyTorch.', 4),
  ('20000000-0000-0000-0000-000000000002', 'Apply computer vision techniques using CNNs.', 5),
  ('20000000-0000-0000-0000-000000000002', 'Deploy ML models to production environments.', 6);

-- Course 3: UI/UX Design
INSERT INTO public.course_outcomes (course_id, outcome, display_order) VALUES
  ('20000000-0000-0000-0000-000000000003', 'Design wireframes, prototypes and full UI flows using Figma.', 1),
  ('20000000-0000-0000-0000-000000000003', 'Conduct user research and apply findings to design decisions.', 2),
  ('20000000-0000-0000-0000-000000000003', 'Create scalable design systems and component libraries.', 3),
  ('20000000-0000-0000-0000-000000000003', 'Apply accessibility and inclusive design principles.', 4),
  ('20000000-0000-0000-0000-000000000003', 'Build a professional UI/UX design portfolio.', 5);

-- Course 4: Python Programming
INSERT INTO public.course_outcomes (course_id, outcome, display_order) VALUES
  ('20000000-0000-0000-0000-000000000004', 'Write clean Python code using variables, loops, functions, and OOP.', 1),
  ('20000000-0000-0000-0000-000000000004', 'Work with files, APIs, and databases using Python.', 2),
  ('20000000-0000-0000-0000-000000000004', 'Automate repetitive tasks with Python scripts.', 3),
  ('20000000-0000-0000-0000-000000000004', 'Build command-line tools and web scrapers.', 4),
  ('20000000-0000-0000-0000-000000000004', 'Understand and apply Python best practices and package management.', 5);

-- Course 5: Cybersecurity
INSERT INTO public.course_outcomes (course_id, outcome, display_order) VALUES
  ('20000000-0000-0000-0000-000000000005', 'Understand core cybersecurity concepts, threats, and attack vectors.', 1),
  ('20000000-0000-0000-0000-000000000005', 'Perform basic ethical hacking techniques and penetration tests.', 2),
  ('20000000-0000-0000-0000-000000000005', 'Analyze network traffic and identify vulnerabilities.', 3),
  ('20000000-0000-0000-0000-000000000005', 'Apply cryptography and secure communication principles.', 4),
  ('20000000-0000-0000-0000-000000000005', 'Respond to and document security incidents.', 5);

-- ============================================================
-- COURSE REQUIREMENTS
-- ============================================================

-- Course 1: Modern Web Development
INSERT INTO public.course_requirements (course_id, requirement, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Basic computer knowledge and familiarity with using a web browser.', 1),
  ('20000000-0000-0000-0000-000000000001', 'No prior web development experience is required.', 2),
  ('20000000-0000-0000-0000-000000000001', 'A laptop or desktop computer with a stable internet connection.', 3),
  ('20000000-0000-0000-0000-000000000001', 'A code editor such as Visual Studio Code (free download).', 4),
  ('20000000-0000-0000-0000-000000000001', 'Willingness to practice and build projects throughout the course.', 5);

-- Course 2: AI & Machine Learning
INSERT INTO public.course_requirements (course_id, requirement, display_order) VALUES
  ('20000000-0000-0000-0000-000000000002', 'Basic understanding of high school algebra and statistics.', 1),
  ('20000000-0000-0000-0000-000000000002', 'Familiarity with basic programming logic (any language is fine).', 2),
  ('20000000-0000-0000-0000-000000000002', 'A computer capable of running Python 3.x and Jupyter Notebook.', 3),
  ('20000000-0000-0000-0000-000000000002', 'Curiosity and willingness to experiment with data.', 4);

-- Course 3: UI/UX Design
INSERT INTO public.course_requirements (course_id, requirement, display_order) VALUES
  ('20000000-0000-0000-0000-000000000003', 'No design experience required — passion for visual creativity is enough.', 1),
  ('20000000-0000-0000-0000-000000000003', 'A laptop or desktop with internet connection.', 2),
  ('20000000-0000-0000-0000-000000000003', 'Free Figma account (web-based, no installation needed).', 3);

-- Course 4: Python Programming
INSERT INTO public.course_requirements (course_id, requirement, display_order) VALUES
  ('20000000-0000-0000-0000-000000000004', 'No prior programming experience required.', 1),
  ('20000000-0000-0000-0000-000000000004', 'A computer with internet access.', 2),
  ('20000000-0000-0000-0000-000000000004', 'Willingness to solve problems and write code every day.', 3);

-- Course 5: Cybersecurity
INSERT INTO public.course_requirements (course_id, requirement, display_order) VALUES
  ('20000000-0000-0000-0000-000000000005', 'Basic understanding of how computers and the internet work.', 1),
  ('20000000-0000-0000-0000-000000000005', 'Familiarity with command-line usage is helpful but not mandatory.', 2),
  ('20000000-0000-0000-0000-000000000005', 'A computer capable of running virtual machines (8GB RAM recommended).', 3);

-- ============================================================
-- COURSE TARGET AUDIENCE
-- ============================================================

-- Course 1: Modern Web Development
INSERT INTO public.course_target_audience (course_id, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Students who want to start a career in web development.', 1),
  ('20000000-0000-0000-0000-000000000001', 'Beginners interested in learning modern frontend development.', 2),
  ('20000000-0000-0000-0000-000000000001', 'Developers who want to strengthen their HTML, CSS, JavaScript, and React skills.', 3),
  ('20000000-0000-0000-0000-000000000001', 'Learners who want to build real-world web projects for their portfolio.', 4),
  ('20000000-0000-0000-0000-000000000001', 'Anyone looking to develop practical skills for frontend development roles.', 5);

-- Course 2: AI & Machine Learning
INSERT INTO public.course_target_audience (course_id, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000002', 'Developers aiming to transition into Data Science and AI.', 1),
  ('20000000-0000-0000-0000-000000000002', 'Students interested in building intelligent software applications.', 2),
  ('20000000-0000-0000-0000-000000000002', 'Professionals who want to leverage AI in their domain.', 3);

-- Course 3: UI/UX Design
INSERT INTO public.course_target_audience (course_id, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000003', 'Aspiring designers who want to enter the product design industry.', 1),
  ('20000000-0000-0000-0000-000000000003', 'Developers who want to improve their design and UX sensibility.', 2),
  ('20000000-0000-0000-0000-000000000003', 'Anyone who wants to create beautiful, user-centered digital products.', 3);

-- Course 4: Python Programming
INSERT INTO public.course_target_audience (course_id, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000004', 'Absolute beginners who want to learn their first programming language.', 1),
  ('20000000-0000-0000-0000-000000000004', 'Students who want a solid programming foundation before moving to AI or web development.', 2),
  ('20000000-0000-0000-0000-000000000004', 'Professionals who want to automate tasks and improve productivity.', 3);

-- Course 5: Cybersecurity
INSERT INTO public.course_target_audience (course_id, description, display_order) VALUES
  ('20000000-0000-0000-0000-000000000005', 'IT professionals who want to specialise in security.', 1),
  ('20000000-0000-0000-0000-000000000005', 'Students aiming for ethical hacking or cybersecurity careers.', 2),
  ('20000000-0000-0000-0000-000000000005', 'System administrators who want to harden their infrastructure.', 3);

-- ============================================================
-- COURSE SECTIONS & LESSONS
-- ============================================================

-- === COURSE 1: Modern Web Development ===
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000001', '20000000-0000-0000-0000-000000000001', 'Introduction to Web Development', 'Getting started with modern web development tools and concepts.', 1),
  ('40000000-0000-0000-0000-000000000002', '20000000-0000-0000-0000-000000000001', 'HTML & CSS Fundamentals', 'Build the structure and style of web pages.', 2),
  ('40000000-0000-0000-0000-000000000003', '20000000-0000-0000-0000-000000000001', 'JavaScript Fundamentals', 'Master the language of the web.', 3),
  ('40000000-0000-0000-0000-000000000004', '20000000-0000-0000-0000-000000000001', 'React Fundamentals', 'Build interactive UIs with React.', 4),
  ('40000000-0000-0000-0000-000000000005', '20000000-0000-0000-0000-000000000001', 'React Hooks & State Management', 'Master React hooks for scalable state.', 5),
  ('40000000-0000-0000-0000-000000000006', '20000000-0000-0000-0000-000000000001', 'Building Real-World React Applications', 'Apply everything to build production-ready projects.', 6);

INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  -- Section 1
  ('50000000-0000-0000-0000-000000000001', '40000000-0000-0000-0000-000000000001', 'Introduction to Modern Web Development', 'Get an overview of modern web development, its tools, and best practices.', NULL, '12 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000002', '40000000-0000-0000-0000-000000000001', 'How the Web Works', 'Learn about the basics of how the web works, including HTTP, browsers, and servers.', NULL, '15 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000003', '40000000-0000-0000-0000-000000000001', 'Setting Up Your Development Environment', 'Learn how to set up your development environment with the necessary tools.', NULL, '18 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000004', '40000000-0000-0000-0000-000000000001', 'Introduction to Git and GitHub', 'Learn the basics of version control with Git and how to use GitHub for collaboration.', NULL, '20 mins', 'video', false, 4),
  -- Section 2
  ('50000000-0000-0000-0000-000000000005', '40000000-0000-0000-0000-000000000002', 'HTML Document Structure', 'Learn about the structure of an HTML document and how to create web pages.', NULL, '16 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000006', '40000000-0000-0000-0000-000000000002', 'Semantic HTML', 'Understand the importance of semantic HTML for accessibility and SEO.', NULL, '14 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000007', '40000000-0000-0000-0000-000000000002', 'CSS Fundamentals', 'Learn the basics of CSS, including selectors, properties, and styling web pages.', NULL, '20 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000008', '40000000-0000-0000-0000-000000000002', 'Responsive Web Design', 'Learn how to create responsive web designs that adapt to different screen sizes.', NULL, '24 mins', 'video', false, 4),
  -- Section 3
  ('50000000-0000-0000-0000-000000000009', '40000000-0000-0000-0000-000000000003', 'JavaScript Basics', 'Introduction to JavaScript syntax and core concepts.', NULL, '18 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000010', '40000000-0000-0000-0000-000000000003', 'Variables, Data Types and Operators', 'Deep dive into JS variables, types, and operators.', NULL, '22 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000011', '40000000-0000-0000-0000-000000000003', 'Functions and Scope', 'Understand function declarations, expressions, and closures.', NULL, '25 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000012', '40000000-0000-0000-0000-000000000003', 'Arrays, Objects and Modern JavaScript', 'Work with data structures and ES6+ features.', NULL, '28 mins', 'video', false, 4),
  ('50000000-0000-0000-0000-000000000013', '40000000-0000-0000-0000-000000000003', 'Promises and Async/Await', 'Handle asynchronous operations in JavaScript cleanly.', NULL, '24 mins', 'video', false, 5),
  -- Section 4
  ('50000000-0000-0000-0000-000000000014', '40000000-0000-0000-0000-000000000004', 'Introduction to React', 'Understand what React is, why it exists, and how it works.', NULL, '15 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000015', '40000000-0000-0000-0000-000000000004', 'Components and JSX', 'Build your first React components using JSX.', NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000016', '40000000-0000-0000-0000-000000000004', 'Props and State', 'Pass data into components and manage local state.', NULL, '24 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000017', '40000000-0000-0000-0000-000000000004', 'Handling Events and Forms', 'Capture user input and handle browser events.', NULL, '22 mins', 'video', false, 4),
  ('50000000-0000-0000-0000-000000000018', '40000000-0000-0000-0000-000000000004', 'Rendering Lists and Conditional UI', 'Render dynamic lists and conditionally display content.', NULL, '18 mins', 'video', false, 5),
  -- Section 5
  ('50000000-0000-0000-0000-000000000019', '40000000-0000-0000-0000-000000000005', 'Understanding useState', 'Manage component state with the useState hook.', NULL, '20 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000020', '40000000-0000-0000-0000-000000000005', 'Working with useEffect', 'Sync your components with external systems using useEffect.', NULL, '25 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000021', '40000000-0000-0000-0000-000000000005', 'useContext and Shared State', 'Share state across components without prop drilling.', NULL, '22 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000022', '40000000-0000-0000-0000-000000000005', 'Creating Custom Hooks', 'Extract reusable logic into custom React hooks.', NULL, '20 mins', 'video', false, 4),
  -- Section 6
  ('50000000-0000-0000-0000-000000000023', '40000000-0000-0000-0000-000000000006', 'React Router', 'Add multi-page navigation to your React app.', NULL, '24 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000024', '40000000-0000-0000-0000-000000000006', 'Fetching Data from APIs', 'Consume REST APIs and display data in your React app.', NULL, '26 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000025', '40000000-0000-0000-0000-000000000006', 'Loading, Error and Empty States', 'Build robust UX with proper loading and error handling.', NULL, '20 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000026', '40000000-0000-0000-0000-000000000006', 'Reusable Component Architecture', 'Design scalable and maintainable React component trees.', NULL, '28 mins', 'video', false, 4),
  ('50000000-0000-0000-0000-000000000027', '40000000-0000-0000-0000-000000000006', 'Building the Final Project', 'Combine all concepts into a complete capstone project.', NULL, '45 mins', 'video', false, 5),
  ('50000000-0000-0000-0000-000000000028', '40000000-0000-0000-0000-000000000006', 'Deploying Your React Application', 'Deploy your React app to Vercel and make it live.', NULL, '22 mins', 'video', false, 6);

-- === COURSE 2: AI & Machine Learning ===
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000007', '20000000-0000-0000-0000-000000000002', 'Foundations of Machine Learning', 'Understanding datasets, features, and model training basics.', 1),
  ('40000000-0000-0000-0000-000000000008', '20000000-0000-0000-0000-000000000002', 'Data Processing with Python', 'Cleaning, transforming and visualising data.', 2),
  ('40000000-0000-0000-0000-000000000009', '20000000-0000-0000-0000-000000000002', 'Supervised Learning Algorithms', 'Regression, classification, and model evaluation.', 3),
  ('40000000-0000-0000-0000-000000000010', '20000000-0000-0000-0000-000000000002', 'Neural Networks & Deep Learning', 'Building and training neural networks with PyTorch.', 4);

INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  ('50000000-0000-0000-0000-000000000029', '40000000-0000-0000-0000-000000000007', 'What is Machine Learning?',             'Introduction to ML types: supervised, unsupervised, reinforcement.',                  NULL, '15 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000030', '40000000-0000-0000-0000-000000000007', 'Setting Up Python & Jupyter',           'Install Python, Anaconda, and Jupyter Notebook for data science.',                  NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000031', '40000000-0000-0000-0000-000000000007', 'Understanding Datasets',                'Explore datasets, features, labels, and train/test splits.',                        NULL, '18 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000032', '40000000-0000-0000-0000-000000000008', 'Pandas for Data Manipulation',          'Load, filter, and transform tabular data with Pandas.',                             NULL, '30 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000033', '40000000-0000-0000-0000-000000000008', 'NumPy Essentials',                      'Numerical computing and array operations for ML.',                                  NULL, '25 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000034', '40000000-0000-0000-0000-000000000008', 'Data Visualisation with Matplotlib',    'Create charts and plots to understand data distributions.',                         NULL, '22 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000035', '40000000-0000-0000-0000-000000000009', 'Linear Regression',                     'Predict continuous values with linear regression models.',                          NULL, '28 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000036', '40000000-0000-0000-0000-000000000009', 'Logistic Regression & Classification',  'Classify data using logistic regression and decision boundaries.',                  NULL, '30 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000037', '40000000-0000-0000-0000-000000000009', 'Model Evaluation & Tuning',             'Evaluate model performance with metrics and cross-validation.',                     NULL, '25 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000038', '40000000-0000-0000-0000-000000000010', 'Introduction to Neural Networks',       'Understand neurons, layers, weights, and backpropagation.',                         NULL, '35 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000039', '40000000-0000-0000-0000-000000000010', 'Building Models with PyTorch',          'Define, train, and evaluate deep learning models in PyTorch.',                      NULL, '40 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000040', '40000000-0000-0000-0000-000000000010', 'Convolutional Neural Networks',         'Apply CNNs for image recognition tasks.',                                           NULL, '38 mins', 'video', false, 3);

-- === COURSE 3: UI/UX Design Masterclass ===
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000011', '20000000-0000-0000-0000-000000000003', 'Design Foundations', 'Core design principles, color theory, and typography.', 1),
  ('40000000-0000-0000-0000-000000000012', '20000000-0000-0000-0000-000000000003', 'User Research & Information Architecture', 'Understand users and structure your product.', 2),
  ('40000000-0000-0000-0000-000000000013', '20000000-0000-0000-0000-000000000003', 'Wireframing & Prototyping with Figma', 'Design and prototype interfaces in Figma.', 3),
  ('40000000-0000-0000-0000-000000000014', '20000000-0000-0000-0000-000000000003', 'Design Systems & Portfolio', 'Build reusable components and your design portfolio.', 4);

INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  ('50000000-0000-0000-0000-000000000041', '40000000-0000-0000-0000-000000000011', 'Introduction to UI/UX Design',     'Understand the difference between UI and UX and why it matters.',  NULL, '12 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000042', '40000000-0000-0000-0000-000000000011', 'Color Theory for Designers',       'Apply color theory to create visually harmonious interfaces.',       NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000043', '40000000-0000-0000-0000-000000000011', 'Typography Essentials',            'Choose and pair fonts for readable, beautiful interfaces.',          NULL, '18 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000044', '40000000-0000-0000-0000-000000000012', 'User Research Methods',            'Conduct interviews, surveys, and usability tests.',                  NULL, '25 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000045', '40000000-0000-0000-0000-000000000012', 'Creating User Personas',           'Build data-driven user personas to guide design decisions.',         NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000046', '40000000-0000-0000-0000-000000000013', 'Wireframing in Figma',             'Sketch low-fidelity wireframes quickly in Figma.',                  NULL, '30 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000047', '40000000-0000-0000-0000-000000000013', 'High-Fidelity UI Design',          'Build pixel-perfect, high-fidelity UI screens.',                    NULL, '35 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000048', '40000000-0000-0000-0000-000000000013', 'Interactive Prototyping',          'Add interactions and animations to your Figma prototypes.',         NULL, '28 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000049', '40000000-0000-0000-0000-000000000014', 'Building a Design System',         'Create reusable components, tokens, and a style guide.',            NULL, '32 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000050', '40000000-0000-0000-0000-000000000014', 'Portfolio Project: Mobile App UI', 'Design a complete mobile app UI from scratch for your portfolio.',  NULL, '50 mins', 'video', false, 2);

-- === COURSE 4: Python Programming ===
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000015', '20000000-0000-0000-0000-000000000004', 'Python Basics', 'Variables, data types, and control flow.', 1),
  ('40000000-0000-0000-0000-000000000016', '20000000-0000-0000-0000-000000000004', 'Functions & Object-Oriented Programming', 'Write reusable, structured Python code.', 2),
  ('40000000-0000-0000-0000-000000000017', '20000000-0000-0000-0000-000000000004', 'Working with Files, APIs & Databases', 'Build practical data-driven Python programs.', 3);

INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  ('50000000-0000-0000-0000-000000000051', '40000000-0000-0000-0000-000000000015', 'Setting Up Python',                'Install Python and VS Code for development.',                        NULL, '15 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000052', '40000000-0000-0000-0000-000000000015', 'Variables and Data Types',         'Understand strings, integers, floats, and booleans.',                NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000053', '40000000-0000-0000-0000-000000000015', 'Control Flow: if, for, while',     'Use conditionals and loops to control program logic.',               NULL, '22 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000054', '40000000-0000-0000-0000-000000000015', 'Lists, Tuples, and Dictionaries',  'Master Python''s core data structures.',                            NULL, '25 mins', 'video', false, 4),
  ('50000000-0000-0000-0000-000000000055', '40000000-0000-0000-0000-000000000016', 'Defining and Calling Functions',   'Write clean, reusable functions with parameters and return values.', NULL, '20 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000056', '40000000-0000-0000-0000-000000000016', 'Object-Oriented Programming',      'Create classes, objects, and use inheritance.',                      NULL, '30 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000057', '40000000-0000-0000-0000-000000000017', 'File Handling in Python',          'Read and write files using Python''s built-in IO.',                 NULL, '18 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000058', '40000000-0000-0000-0000-000000000017', 'Working with REST APIs',           'Fetch data from web APIs using the requests library.',               NULL, '25 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000059', '40000000-0000-0000-0000-000000000017', 'SQLite Database with Python',      'Store and query data using SQLite and Python.',                      NULL, '28 mins', 'video', false, 3);

-- === COURSE 5: Cybersecurity Essentials ===
INSERT INTO public.course_sections (id, course_id, title, description, display_order) VALUES
  ('40000000-0000-0000-0000-000000000018', '20000000-0000-0000-0000-000000000005', 'Cybersecurity Fundamentals', 'Core concepts, threats, and the security landscape.', 1),
  ('40000000-0000-0000-0000-000000000019', '20000000-0000-0000-0000-000000000005', 'Network Security & Analysis', 'Understand and protect network infrastructure.', 2),
  ('40000000-0000-0000-0000-000000000020', '20000000-0000-0000-0000-000000000005', 'Ethical Hacking & Pen Testing', 'Apply offensive techniques to find vulnerabilities.', 3),
  ('40000000-0000-0000-0000-000000000021', '20000000-0000-0000-0000-000000000005', 'Cryptography & Incident Response', 'Secure communications and respond to incidents.', 4);

INSERT INTO public.course_lessons (id, section_id, title, description, video_url, duration, lesson_type, is_preview, display_order) VALUES
  ('50000000-0000-0000-0000-000000000060', '40000000-0000-0000-0000-000000000018', 'Introduction to Cybersecurity',    'Overview of the security landscape, career paths, and key concepts.', NULL, '15 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000061', '40000000-0000-0000-0000-000000000018', 'Common Attack Vectors',            'Study malware, phishing, social engineering, and exploits.',          NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000062', '40000000-0000-0000-0000-000000000018', 'Security Principles (CIA Triad)', 'Understand confidentiality, integrity, and availability.',            NULL, '18 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000063', '40000000-0000-0000-0000-000000000019', 'TCP/IP and Network Protocols',     'Review networking fundamentals relevant to security.',                NULL, '25 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000064', '40000000-0000-0000-0000-000000000019', 'Packet Analysis with Wireshark',   'Capture and inspect network traffic to spot anomalies.',             NULL, '30 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000065', '40000000-0000-0000-0000-000000000019', 'Firewall & IDS Configuration',     'Set up firewalls and intrusion detection systems.',                   NULL, '28 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000066', '40000000-0000-0000-0000-000000000020', 'Reconnaissance & Scanning',        'Use nmap and OSINT tools to gather target information.',              NULL, '25 mins', 'video', true,  1),
  ('50000000-0000-0000-0000-000000000067', '40000000-0000-0000-0000-000000000020', 'Exploitation with Metasploit',     'Use Metasploit Framework for controlled penetration testing.',        NULL, '35 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000068', '40000000-0000-0000-0000-000000000020', 'Web Application Attacks',          'Understand OWASP Top 10 and test for SQL injection, XSS, etc.',      NULL, '32 mins', 'video', false, 3),
  ('50000000-0000-0000-0000-000000000069', '40000000-0000-0000-0000-000000000021', 'Symmetric & Asymmetric Encryption', 'Understand AES, RSA, and how cryptography protects data.',          NULL, '22 mins', 'video', false, 1),
  ('50000000-0000-0000-0000-000000000070', '40000000-0000-0000-0000-000000000021', 'PKI and Digital Certificates',     'Learn how SSL/TLS and certificate authorities work.',                 NULL, '20 mins', 'video', false, 2),
  ('50000000-0000-0000-0000-000000000071', '40000000-0000-0000-0000-000000000021', 'Incident Response & Forensics',    'Detect, contain, and recover from security breaches.',               NULL, '30 mins', 'video', false, 3);

-- ============================================================
-- COURSE PROJECTS
-- ============================================================

-- Course 1: Web Development
INSERT INTO public.course_projects (course_id, title, description, thumbnail, technologies, github_url, live_demo_url, difficulty, display_order) VALUES
  ('20000000-0000-0000-0000-000000000001', 'Personal Portfolio Website',    'Build a responsive portfolio website to showcase your skills, projects, and experience.',                               '/projects/portfolio.jpg',   ARRAY['HTML', 'CSS', 'JavaScript'],                   NULL, NULL, 'Beginner',     1),
  ('20000000-0000-0000-0000-000000000001', 'Task Management App',           'Create a task management application with reusable React components, forms, and state management.',                    '/projects/tasks.jpg',       ARRAY['React', 'JavaScript', 'CSS'],                  NULL, NULL, 'Beginner',     2),
  ('20000000-0000-0000-0000-000000000001', 'E-Commerce Website',            'Build a modern e-commerce website with product listings, categories, filtering, and shopping interactions.',           '/projects/ecommerce.jpg',   ARRAY['React', 'TypeScript', 'Tailwind CSS'],          NULL, NULL, 'Intermediate', 3),
  ('20000000-0000-0000-0000-000000000001', 'Weather Dashboard',             'Build a weather dashboard that fetches data from an external API and displays current weather information.',           '/projects/weather.jpg',     ARRAY['React', 'REST API', 'JavaScript'],              NULL, NULL, 'Intermediate', 4),
  ('20000000-0000-0000-0000-000000000001', 'Course Learning Platform',      'Create a learning platform with course listings, curriculum sections, lesson pages, and a responsive interface.',     '/projects/platform.jpg',    ARRAY['Next.js', 'TypeScript', 'Tailwind CSS'],        NULL, NULL, 'Advanced',     5),
  ('20000000-0000-0000-0000-000000000001', 'Final React Application',       'Build a complete real-world application that combines all concepts learned throughout the course.',                   '/projects/final.jpg',       ARRAY['React', 'TypeScript', 'API', 'Git'],            NULL, NULL, 'Advanced',     6);

-- Course 2: AI & Machine Learning
INSERT INTO public.course_projects (course_id, title, description, thumbnail, technologies, github_url, live_demo_url, difficulty, display_order) VALUES
  ('20000000-0000-0000-0000-000000000002', 'House Price Predictor',         'Train a regression model to predict house prices from real estate data.',                                              NULL,                        ARRAY['Python', 'Pandas', 'scikit-learn'],             NULL, NULL, 'Beginner',     1),
  ('20000000-0000-0000-0000-000000000002', 'Spam Email Classifier',         'Build a natural language processing classifier to detect spam emails.',                                               NULL,                        ARRAY['Python', 'NLTK', 'scikit-learn'],               NULL, NULL, 'Intermediate', 2),
  ('20000000-0000-0000-0000-000000000002', 'Image Classification with CNN', 'Train a convolutional neural network to classify images from a public dataset.',                                     NULL,                        ARRAY['Python', 'PyTorch', 'CNN', 'NumPy'],           NULL, NULL, 'Advanced',     3);

-- Course 3: UI/UX Design
INSERT INTO public.course_projects (course_id, title, description, thumbnail, technologies, github_url, live_demo_url, difficulty, display_order) VALUES
  ('20000000-0000-0000-0000-000000000003', 'Food Delivery App UI',          'Design a complete mobile app UI for a food delivery service with interactive prototyping.',                            NULL,                        ARRAY['Figma', 'Prototyping', 'UI Design'],            NULL, NULL, 'Beginner',     1),
  ('20000000-0000-0000-0000-000000000003', 'SaaS Dashboard Design',         'Create a responsive SaaS admin dashboard with data visualisation components and design system.',                      NULL,                        ARRAY['Figma', 'Design Systems', 'UX Research'],      NULL, NULL, 'Intermediate', 2);

-- Course 4: Python
INSERT INTO public.course_projects (course_id, title, description, thumbnail, technologies, github_url, live_demo_url, difficulty, display_order) VALUES
  ('20000000-0000-0000-0000-000000000004', 'CLI Task Manager',              'Build a command-line task management tool that saves tasks to a local file.',                                          NULL,                        ARRAY['Python', 'JSON', 'CLI'],                       NULL, NULL, 'Beginner',     1),
  ('20000000-0000-0000-0000-000000000004', 'Web Scraper',                   'Scrape product data from e-commerce sites and export results to CSV.',                                                NULL,                        ARRAY['Python', 'BeautifulSoup', 'Requests'],         NULL, NULL, 'Intermediate', 2),
  ('20000000-0000-0000-0000-000000000004', 'REST API with Flask',           'Build a RESTful API backend with CRUD operations and SQLite database.',                                               NULL,                        ARRAY['Python', 'Flask', 'SQLite', 'REST API'],       NULL, NULL, 'Intermediate', 3);

-- Course 5: Cybersecurity
INSERT INTO public.course_projects (course_id, title, description, thumbnail, technologies, github_url, live_demo_url, difficulty, display_order) VALUES
  ('20000000-0000-0000-0000-000000000005', 'Network Port Scanner',          'Build a Python tool to scan open ports on a target host.',                                                             NULL,                        ARRAY['Python', 'Nmap', 'Networking'],                NULL, NULL, 'Beginner',     1),
  ('20000000-0000-0000-0000-000000000005', 'Penetration Testing Report',    'Conduct a structured pen test on a local virtual machine and document findings in a professional report.',           NULL,                        ARRAY['Kali Linux', 'Metasploit', 'Wireshark'],       NULL, NULL, 'Intermediate', 2);
