-- แก้ไขประเภทข้อมูลของคะแนนให้รองรับจุดทศนิยม
ALTER TABLE test_results ALTER COLUMN score TYPE NUMERIC;
ALTER TABLE test_results ALTER COLUMN total TYPE NUMERIC;
