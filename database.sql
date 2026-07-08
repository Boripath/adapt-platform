-- 1. สร้างตารางนักเรียน (students)
CREATE TABLE IF NOT EXISTS students (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  national_id text UNIQUE NOT NULL,
  name text NOT NULL,
  class text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. สร้างตารางคุณครู (teachers)
CREATE TABLE IF NOT EXISTS teachers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL, -- ในระบบจริงควรเข้ารหัส แต่เพื่อความง่ายในการทดสอบเราจะเก็บตรงๆก่อน
  name text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. สร้างตารางข้อสอบ (questions)
CREATE TABLE IF NOT EXISTS questions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  subject text NOT NULL,
  indicator_code text NOT NULL,
  note text,
  type text DEFAULT 'choice',
  content jsonb NOT NULL,
  options jsonb NOT NULL,
  correct_answer_index integer,
  complex_answers jsonb,
  exam_year text DEFAULT 'O-NET 65',
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. สร้างตารางผลการสอบ (test_results)
CREATE TABLE IF NOT EXISTS test_results (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id uuid REFERENCES students(id) ON DELETE CASCADE,
  subject text NOT NULL,
  score integer NOT NULL,
  total integer NOT NULL,
  weaknesses text[] NOT NULL, -- เก็บ array ของรหัสตัวชี้วัดที่ทำผิด
  completed_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. สร้างตารางสื่อซ่อมเสริม (remedial_contents) - อาจจะไม่ใช้แล้วถ้าใช้ indicators แทน
CREATE TABLE IF NOT EXISTS remedial_contents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_code text NOT NULL,
  title text NOT NULL,
  type text NOT NULL, -- 'video', 'document'
  url text NOT NULL,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 6. สร้างตารางตัวชี้วัดและบทเรียน (indicators)
CREATE TABLE IF NOT EXISTS indicators (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  indicator_code text UNIQUE NOT NULL,
  strand text NOT NULL,
  standard text NOT NULL,
  details text NOT NULL,
  core_content text NOT NULL,
  vdo_url text,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- ==========================================
-- ใส่ข้อมูลตั้งต้น (Seed Data)
-- ==========================================

-- เพิ่มครูสมมติ (password123)
INSERT INTO teachers (username, password_hash, name) 
VALUES ('teacher01', 'password123', 'คุณครู สมใจ รักสอน')
ON CONFLICT (username) DO NOTHING;

-- เพิ่มนักเรียนสมมติ
INSERT INTO students (national_id, name, class) VALUES
('1234567890123', 'เด็กชายสมชาย เรียนดี', 'ป.6/1'),
('2345678901234', 'เด็กหญิงสมหญิง รักเรียน', 'ป.6/1'),
('3456789012345', 'เด็กชายปัญญา ชาญฉลาด', 'ป.6/2')
ON CONFLICT (national_id) DO NOTHING;

-- เพิ่มข้อสอบวิชาวิทยาศาสตร์
INSERT INTO questions (subject, indicator_code, text, options, correct_answer_index) VALUES
('Science', 'ว 1.2 ป.6/1', 'ข้อใดคือสารอาหารที่ให้พลังงานหลักแก่ร่างกาย?', '["คาร์โบไฮเดรต", "วิตามิน", "เกลือแร่", "น้ำ"]', 0),
('Science', 'ว 1.2 ป.6/2', 'เด็กวัยเรียนควรเน้นรับประทานอาหารประเภทใดเพื่อการเจริญเติบโต?', '["ไขมัน", "โปรตีน", "คาร์โบไฮเดรต", "วิตามิน"]', 1),
('Science', 'ว 2.1 ป.6/1', 'ข้อใดคือการเปลี่ยนแปลงทางเคมี?', '["น้ำแข็งละลาย", "กระดาษฉีกขาด", "เหล็กเป็นสนิม", "น้ำเดือด"]', 2);

-- เพิ่มสื่อซ่อมเสริม
INSERT INTO remedial_contents (indicator_code, title, type, url) VALUES
('ว 1.2 ป.6/1', 'ทบทวนเรื่องสารอาหาร (หมู่ 1-5)', 'video', 'https://youtube.com/...'),
('ว 1.2 ป.6/2', 'สัดส่วนอาหารที่เหมาะสมสำหรับวัยเรียน', 'video', 'https://youtube.com/...'),
('ว 2.1 ป.6/1', 'การเปลี่ยนแปลงทางกายภาพและเคมี', 'document', 'https://drive.google.com/...');
