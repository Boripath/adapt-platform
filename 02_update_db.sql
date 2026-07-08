-- SQL Script สำหรับอัปเดตฐานข้อมูล (แยกคอมเมนต์ตามนักเรียน และ แก้ปัญหาข้อสอบไม่บันทึก)

-- 1. เพิ่มคอลัมน์ thread_student_id ให้กับตาราง lesson_comments 
-- เพื่อให้รู้ว่าข้อความนี้เป็นการคุยกับนักเรียนคนไหน
ALTER TABLE lesson_comments 
ADD COLUMN IF NOT EXISTS thread_student_id uuid REFERENCES students(id) ON DELETE CASCADE;

-- 2. เพื่อความแน่ใจ ให้เพิ่มคอลัมน์ที่ขาดหายไปของ test_results อีกครั้ง (เผื่อระบบของคุณครูยังไม่ได้รันรอบก่อน)
ALTER TABLE test_results 
ADD COLUMN IF NOT EXISTS exam_year TEXT,
ADD COLUMN IF NOT EXISTS start_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS end_time TIMESTAMPTZ,
ADD COLUMN IF NOT EXISTS time_spent_seconds INTEGER;
