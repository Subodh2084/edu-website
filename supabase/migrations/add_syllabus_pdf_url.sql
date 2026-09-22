-- Add syllabus_pdf_url column to courses table
ALTER TABLE courses
ADD COLUMN IF NOT EXISTS syllabus_pdf_url TEXT DEFAULT NULL;
