-- 1. สร้างคอลัมน์ใหม่ indicator_codes ให้เป็น array ของ text
ALTER TABLE questions ADD COLUMN IF NOT EXISTS indicator_codes text[] DEFAULT '{}';

-- 2. ย้ายข้อมูลจาก indicator_code เดิมเข้าไปใน array
UPDATE questions SET indicator_codes = ARRAY[indicator_code] WHERE indicator_code IS NOT NULL AND indicator_code != '';

-- (ทางเลือก) ลบคอลัมน์เก่าทิ้งเพื่อความสะอาด แต่แนะนำให้ทำหลังจากที่โค้ดฝั่ง Frontend ถูกอัปเดตและทดสอบเรียบร้อยแล้ว
-- ALTER TABLE questions DROP COLUMN indicator_code;
