-- Leafclutch Technologies Supabase Migration
-- File: supabase/migrations/20260916000000_create_leafclutch_schema.sql

-- 1. EXTENSIONS & UTILITY FUNCTIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. USER PROFILES & AUTH SYSTEM
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  email TEXT,
  avatar_url TEXT,
  role TEXT CHECK (role IN ('admin', 'student')) DEFAULT 'student',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Helper function to verify admin status
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for auto-creating profiles on auth user registration
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, avatar_url, role)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    NEW.raw_user_meta_data->>'avatar_url',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. COURSE CATEGORIES
CREATE TABLE IF NOT EXISTS public.course_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. COURSES
CREATE TABLE IF NOT EXISTS public.courses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.course_categories(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  short_description TEXT,
  description TEXT,
  thumbnail TEXT,
  preview_video_url TEXT,
  price NUMERIC(10, 2) NOT NULL DEFAULT 0.00,
  discount_price NUMERIC(10, 2),
  level TEXT CHECK (level IN ('beginner', 'intermediate', 'advanced')) DEFAULT 'beginner',
  duration TEXT,
  language TEXT DEFAULT 'English',
  featured BOOLEAN DEFAULT false,
  popular BOOLEAN DEFAULT false,
  status TEXT CHECK (status IN ('draft', 'published', 'archived')) DEFAULT 'draft',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 5. COURSE OUTCOMES
CREATE TABLE IF NOT EXISTS public.course_outcomes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  outcome TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 6. COURSE REQUIREMENTS
CREATE TABLE IF NOT EXISTS public.course_requirements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  requirement TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 7. COURSE TARGET AUDIENCE
CREATE TABLE IF NOT EXISTS public.course_target_audience (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  description TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- 8. INSTRUCTORS & JUNCTION TABLE
CREATE TABLE IF NOT EXISTS public.instructors (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  profile_image TEXT,
  designation TEXT,
  bio TEXT,
  experience TEXT,
  skills TEXT[],
  linkedin_url TEXT,
  github_url TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.course_instructors (
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  instructor_id UUID REFERENCES public.instructors(id) ON DELETE CASCADE,
  PRIMARY KEY (course_id, instructor_id)
);

-- 9. COURSE CURRICULUM: SECTIONS & LESSONS
CREATE TABLE IF NOT EXISTS public.course_sections (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.course_lessons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id UUID NOT NULL REFERENCES public.course_sections(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  video_url TEXT,
  duration TEXT,
  lesson_type TEXT DEFAULT 'video',
  is_preview BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 10. COURSE PROJECTS
CREATE TABLE IF NOT EXISTS public.course_projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail TEXT,
  technologies TEXT[],
  github_url TEXT,
  live_demo_url TEXT,
  difficulty TEXT,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 11. COURSE REVIEWS
CREATE TABLE IF NOT EXISTS public.course_reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  user_id UUID REFERENCES public.profiles(id) ON DELETE SET NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
  review TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 12. STUDENT ENROLLMENTS & LESSON PROGRESS
CREATE TABLE IF NOT EXISTS public.enrollments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('active', 'completed', 'cancelled')) DEFAULT 'active',
  enrolled_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE (user_id, course_id)
);

CREATE TABLE IF NOT EXISTS public.lesson_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  lesson_id UUID NOT NULL REFERENCES public.course_lessons(id) ON DELETE CASCADE,
  is_completed BOOLEAN DEFAULT false,
  completed_at TIMESTAMPTZ,
  UNIQUE (user_id, lesson_id)
);

-- 13. HOMEPAGE CONTENT TABLES
CREATE TABLE IF NOT EXISTS public.homepage_hero (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL,
  description TEXT,
  image TEXT,
  primary_button_text TEXT,
  primary_button_link TEXT,
  secondary_button_text TEXT,
  secondary_button_link TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.site_stats (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.why_choose_us (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.learning_process (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  step_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

CREATE TABLE IF NOT EXISTS public.homepage_cta (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  heading TEXT NOT NULL,
  description TEXT,
  button_text TEXT,
  button_link TEXT,
  image TEXT,
  is_active BOOLEAN DEFAULT true,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 14. TESTIMONIALS
CREATE TABLE IF NOT EXISTS public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_name TEXT NOT NULL,
  profile_image TEXT,
  course_id UUID REFERENCES public.courses(id) ON DELETE SET NULL,
  review TEXT NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5) DEFAULT 5,
  designation TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  display_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 15. FAQS
CREATE TABLE IF NOT EXISTS public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT CHECK (category IN ('General', 'Course', 'Enrollment', 'Payment', 'Certificate')) DEFAULT 'General',
  course_id UUID REFERENCES public.courses(id) ON DELETE CASCADE,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 16. ABOUT US CONTENT
CREATE TABLE IF NOT EXISTS public.about_us_content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_introduction TEXT,
  our_story TEXT,
  mission TEXT,
  vision TEXT,
  values JSONB DEFAULT '[]'::jsonb,
  achievements JSONB DEFAULT '[]'::jsonb,
  images TEXT[],
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 17. TEAM MEMBERS
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  profile_image TEXT,
  designation TEXT NOT NULL,
  bio TEXT,
  linkedin_url TEXT,
  github_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 18. SITE SETTINGS
CREATE TABLE IF NOT EXISTS public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT DEFAULT 'Leafclutch Technologies',
  logo TEXT,
  favicon TEXT,
  email TEXT,
  phone TEXT,
  whatsapp TEXT,
  address TEXT,
  social_media_links JSONB DEFAULT '{}'::jsonb,
  google_maps_url TEXT,
  office_hours TEXT,
  footer_description TEXT,
  copyright_text TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 19. CONTACT MESSAGES
CREATE TABLE IF NOT EXISTS public.contact_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  status TEXT CHECK (status IN ('new', 'read', 'replied', 'closed')) DEFAULT 'new',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 20. INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_courses_slug ON public.courses(slug);
CREATE INDEX IF NOT EXISTS idx_courses_category_id ON public.courses(category_id);
CREATE INDEX IF NOT EXISTS idx_courses_status ON public.courses(status);
CREATE INDEX IF NOT EXISTS idx_courses_featured ON public.courses(featured);
CREATE INDEX IF NOT EXISTS idx_courses_popular ON public.courses(popular);
CREATE INDEX IF NOT EXISTS idx_course_categories_slug ON public.course_categories(slug);
CREATE INDEX IF NOT EXISTS idx_instructors_slug ON public.instructors(slug);
CREATE INDEX IF NOT EXISTS idx_course_sections_course_id ON public.course_sections(course_id);
CREATE INDEX IF NOT EXISTS idx_course_lessons_section_id ON public.course_lessons(section_id);
CREATE INDEX IF NOT EXISTS idx_course_reviews_course_id ON public.course_reviews(course_id);
CREATE INDEX IF NOT EXISTS idx_course_reviews_is_approved ON public.course_reviews(is_approved);
CREATE INDEX IF NOT EXISTS idx_faqs_course_id ON public.faqs(course_id);
CREATE INDEX IF NOT EXISTS idx_faqs_category ON public.faqs(category);
CREATE INDEX IF NOT EXISTS idx_enrollments_user_id ON public.enrollments(user_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course_id ON public.enrollments(course_id);

-- 21. UPDATED_AT TRIGGERS
CREATE TRIGGER set_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_course_categories_updated_at BEFORE UPDATE ON public.course_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_courses_updated_at BEFORE UPDATE ON public.courses FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_instructors_updated_at BEFORE UPDATE ON public.instructors FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_course_sections_updated_at BEFORE UPDATE ON public.course_sections FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_course_lessons_updated_at BEFORE UPDATE ON public.course_lessons FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_course_projects_updated_at BEFORE UPDATE ON public.course_projects FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_course_reviews_updated_at BEFORE UPDATE ON public.course_reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_homepage_hero_updated_at BEFORE UPDATE ON public.homepage_hero FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_homepage_cta_updated_at BEFORE UPDATE ON public.homepage_cta FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_testimonials_updated_at BEFORE UPDATE ON public.testimonials FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_faqs_updated_at BEFORE UPDATE ON public.faqs FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_about_us_content_updated_at BEFORE UPDATE ON public.about_us_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_team_members_updated_at BEFORE UPDATE ON public.team_members FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_site_settings_updated_at BEFORE UPDATE ON public.site_settings FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER set_contact_messages_updated_at BEFORE UPDATE ON public.contact_messages FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 22. ROW LEVEL SECURITY (RLS) POLICIES
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_outcomes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_requirements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_target_audience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_instructors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lesson_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_stats ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.why_choose_us ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.learning_process ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.homepage_cta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.about_us_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Category RLS
CREATE POLICY "Public read active categories" ON public.course_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access categories" ON public.course_categories FOR ALL USING (public.is_admin());

-- Course RLS
CREATE POLICY "Public read published courses" ON public.courses FOR SELECT USING (status = 'published');
CREATE POLICY "Admin full access courses" ON public.courses FOR ALL USING (public.is_admin());

-- Course Outcomes RLS
CREATE POLICY "Public read course outcomes" ON public.course_outcomes FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_outcomes.course_id AND status = 'published')
);
CREATE POLICY "Admin full access course outcomes" ON public.course_outcomes FOR ALL USING (public.is_admin());

-- Course Requirements RLS
CREATE POLICY "Public read course requirements" ON public.course_requirements FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_requirements.course_id AND status = 'published')
);
CREATE POLICY "Admin full access course requirements" ON public.course_requirements FOR ALL USING (public.is_admin());

-- Target Audience RLS
CREATE POLICY "Public read course target audience" ON public.course_target_audience FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_target_audience.course_id AND status = 'published')
);
CREATE POLICY "Admin full access course target audience" ON public.course_target_audience FOR ALL USING (public.is_admin());

-- Instructors RLS
CREATE POLICY "Public read active instructors" ON public.instructors FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access instructors" ON public.instructors FOR ALL USING (public.is_admin());

-- Course Instructors RLS
CREATE POLICY "Public read course instructors" ON public.course_instructors FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_instructors.course_id AND status = 'published')
);
CREATE POLICY "Admin full access course instructors" ON public.course_instructors FOR ALL USING (public.is_admin());

-- Sections RLS
CREATE POLICY "Public read course sections" ON public.course_sections FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_sections.course_id AND status = 'published')
);
CREATE POLICY "Admin full access course sections" ON public.course_sections FOR ALL USING (public.is_admin());

-- Lessons RLS
CREATE POLICY "Public read course lessons" ON public.course_lessons FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM public.course_sections cs
    JOIN public.courses c ON cs.course_id = c.id
    WHERE cs.id = course_lessons.section_id AND c.status = 'published'
  )
);
CREATE POLICY "Admin full access course lessons" ON public.course_lessons FOR ALL USING (public.is_admin());

-- Projects RLS
CREATE POLICY "Public read course projects" ON public.course_projects FOR SELECT USING (
  EXISTS (SELECT 1 FROM public.courses WHERE id = course_projects.course_id AND status = 'published')
);
CREATE POLICY "Admin full access course projects" ON public.course_projects FOR ALL USING (public.is_admin());

-- Reviews RLS
CREATE POLICY "Public read approved reviews" ON public.course_reviews FOR SELECT USING (is_approved = true);
CREATE POLICY "Authenticated users insert reviews" ON public.course_reviews FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin full access course reviews" ON public.course_reviews FOR ALL USING (public.is_admin());

-- Homepage Hero RLS
CREATE POLICY "Public read active homepage hero" ON public.homepage_hero FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access homepage hero" ON public.homepage_hero FOR ALL USING (public.is_admin());

-- Site Stats RLS
CREATE POLICY "Public read active site stats" ON public.site_stats FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access site stats" ON public.site_stats FOR ALL USING (public.is_admin());

-- Why Choose Us RLS
CREATE POLICY "Public read active why choose us" ON public.why_choose_us FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access why choose us" ON public.why_choose_us FOR ALL USING (public.is_admin());

-- Learning Process RLS
CREATE POLICY "Public read active learning process" ON public.learning_process FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access learning process" ON public.learning_process FOR ALL USING (public.is_admin());

-- Homepage CTA RLS
CREATE POLICY "Public read active homepage cta" ON public.homepage_cta FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access homepage cta" ON public.homepage_cta FOR ALL USING (public.is_admin());

-- Testimonials RLS
CREATE POLICY "Public read active testimonials" ON public.testimonials FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access testimonials" ON public.testimonials FOR ALL USING (public.is_admin());

-- FAQs RLS
CREATE POLICY "Public read active faqs" ON public.faqs FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access faqs" ON public.faqs FOR ALL USING (public.is_admin());

-- About Us RLS
CREATE POLICY "Public read about us content" ON public.about_us_content FOR SELECT USING (true);
CREATE POLICY "Admin full access about us content" ON public.about_us_content FOR ALL USING (public.is_admin());

-- Team Members RLS
CREATE POLICY "Public read active team members" ON public.team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Admin full access team members" ON public.team_members FOR ALL USING (public.is_admin());

-- Site Settings RLS
CREATE POLICY "Public read site settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admin full access site settings" ON public.site_settings FOR ALL USING (public.is_admin());

-- Contact Messages RLS
CREATE POLICY "Anyone can submit contact message" ON public.contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Admin full access contact messages" ON public.contact_messages FOR ALL USING (public.is_admin());
GRANT ALL ON public.contact_messages TO anon, authenticated, service_role;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

-- Profiles RLS
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id OR public.is_admin());
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Admin full access profiles" ON public.profiles FOR ALL USING (public.is_admin());

-- Enrollments RLS
CREATE POLICY "Users view own enrollments" ON public.enrollments FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users insert own enrollments" ON public.enrollments FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin full access enrollments" ON public.enrollments FOR ALL USING (public.is_admin());

-- Lesson Progress RLS
CREATE POLICY "Users view own progress" ON public.lesson_progress FOR SELECT USING (auth.uid() = user_id OR public.is_admin());
CREATE POLICY "Users update own progress" ON public.lesson_progress FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "Admin full access progress" ON public.lesson_progress FOR ALL USING (public.is_admin());

-- 23. STORAGE BUCKETS SETUP
INSERT INTO storage.buckets (id, name, public) VALUES
  ('course-thumbnails', 'course-thumbnails', true),
  ('course-images', 'course-images', true),
  ('instructor-images', 'instructor-images', true),
  ('team-images', 'team-images', true),
  ('testimonial-images', 'testimonial-images', true),
  ('website-assets', 'website-assets', true),
  ('lesson-resources', 'lesson-resources', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Public Storage Read Access" ON storage.objects
  FOR SELECT USING (bucket_id IN ('course-thumbnails', 'course-images', 'instructor-images', 'team-images', 'testimonial-images', 'website-assets'));

CREATE POLICY "Admin Storage Full Access" ON storage.objects
  FOR ALL USING (public.is_admin());

-- 24. GLOBAL PERMISSIONS & DEFAULT PRIVILEGES
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO anon, authenticated, service_role;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO anon, authenticated, service_role;

ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO anon, authenticated, service_role;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO anon, authenticated, service_role;

