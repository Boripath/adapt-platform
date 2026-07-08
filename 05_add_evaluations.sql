-- 1. สร้างตารางการประเมินของนักเรียน (student_evaluations)
CREATE TABLE IF NOT EXISTS student_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  familiarity_rating integer NOT NULL CHECK (familiarity_rating >= 1 AND familiarity_rating <= 5),
  platform_rating integer NOT NULL CHECK (platform_rating >= 1 AND platform_rating <= 5),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. สร้างตารางการประเมินของคุณครู (teacher_evaluations)
CREATE TABLE IF NOT EXISTS teacher_evaluations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  teacher_id uuid REFERENCES teachers(id) ON DELETE CASCADE,
  analysis_rating integer NOT NULL CHECK (analysis_rating >= 1 AND analysis_rating <= 5),
  platform_rating integer NOT NULL CHECK (platform_rating >= 1 AND platform_rating <= 5),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);
