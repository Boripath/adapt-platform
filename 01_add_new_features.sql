-- 1. สร้างตารางคอมเมนต์สำหรับถาม-ตอบในบทเรียน
CREATE TABLE IF NOT EXISTS lesson_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_code text NOT NULL,
  user_id uuid NOT NULL,
  role text NOT NULL, -- 'student' or 'teacher'
  user_name text NOT NULL, -- เก็บชื่อไว้แสดงผลได้ง่ายๆ
  message text NOT NULL,
  parent_id uuid REFERENCES lesson_comments(id) ON DELETE CASCADE,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. สร้างตารางการประเมินความพึงพอใจ
CREATE TABLE IF NOT EXISTS lesson_ratings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_code text NOT NULL,
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(indicator_code, student_id) -- 1 คน ประเมินได้ 1 ครั้งต่อบทเรียน
);

-- 3. สร้างตารางข้อมูลสถิติผลสอบย้อนหลังรายข้อ
CREATE TABLE IF NOT EXISTS historical_question_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  exam_year text NOT NULL,
  question_id uuid REFERENCES questions(id) ON DELETE CASCADE,
  indicator_code text NOT NULL,
  percent_correct numeric NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  UNIQUE(exam_year, question_id)
);
