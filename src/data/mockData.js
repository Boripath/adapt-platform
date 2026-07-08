// ข้อมูลจำลองสำหรับแพลตฟอร์ม ADAPT

export const MOCK_STUDENTS = [
  { id: 1, national_id: "1234567890123", name: "เด็กชายสมชาย เรียนดี", class: "ป.6/1" },
  { id: 2, national_id: "2345678901234", name: "เด็กหญิงสมหญิง ขยัน", class: "ป.6/1" },
  { id: 3, national_id: "3456789012345", name: "เด็กชายมานะ อดทน", class: "ป.6/1" },
];

export const MOCK_TEACHERS = [
  { id: 1, username: "teacher01", password: "password123", name: "ครูใจดี นามสมมติ" }
];

export const MOCK_INDICATORS = [
  { code: "ว 1.2 ป.6/1", description: "ระบุสารอาหารและบอกประโยชน์ของสารอาหารแต่ละประเภทจากอาหารที่ตนเองรับประทาน" },
  { code: "ว 1.2 ป.6/2", description: "บอกแนวทางในการเลือกรับประทานอาหารให้ได้สารอาหารครบถ้วนในสัดส่วนที่เหมาะสมกับเพศและวัย" },
  { code: "ว 1.2 ป.6/3", description: "ตระหนักถึงความสำคัญของสารอาหาร โดยการเลือกรับประทานอาหารที่มีประโยชน์" },
  { code: "ว 2.1 ป.6/1", description: "อธิบายและเปรียบเทียบการแยกสารผสมโดยการหยิบออก การร่อน การใช้แม่เหล็กดึงดูด" },
];

export const MOCK_QUESTIONS = [
  {
    id: 1,
    indicator_code: "ว 1.2 ป.6/1",
    text: "ข้อใดคือสารอาหารที่ให้พลังงานหลักแก่ร่างกาย?",
    options: ["คาร์โบไฮเดรต", "วิตามิน", "เกลือแร่", "น้ำ"],
    correct_answer: 0
  },
  {
    id: 2,
    indicator_code: "ว 1.2 ป.6/2",
    text: "เด็กวัยเรียนควรเน้นรับประทานอาหารประเภทใดเพื่อการเจริญเติบโต?",
    options: ["ไขมันและขนมหวาน", "โปรตีนและแคลเซียม", "ผลไม้ที่มีรสหวานจัด", "อาหารรสจัด"],
    correct_answer: 1
  },
  {
    id: 3,
    indicator_code: "ว 2.1 ป.6/1",
    text: "วิธีการใดเหมาะสมที่สุดในการแยกผงเหล็กออกจากทราย?",
    options: ["การร่อน", "การกรอง", "การใช้แม่เหล็กดูด", "การหยิบออก"],
    correct_answer: 2
  }
];

export const MOCK_REMEDIAL_CONTENT = [
  {
    indicator_code: "ว 1.2 ป.6/1",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Replace with real educational video later
    title: "คลิปทบทวน: สารอาหาร 5 หมู่"
  },
  {
    indicator_code: "ว 1.2 ป.6/2",
    type: "video",
    url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    title: "คลิปทบทวน: ธงโภชนาการและการรับประทานอาหารตามวัย"
  },
  {
    indicator_code: "ว 2.1 ป.6/1",
    type: "document",
    url: "#",
    title: "ใบความรู้: การแยกสารผสมเบื้องต้น"
  }
];

// สมมติว่ามีนักเรียนเคยสอบ Pre-test ไปแล้ว 1 คน
export const MOCK_TEST_RESULTS = [
  {
    student_id: 1,
    test_type: "pre_test",
    score: 1, // ได้ 1 เต็ม 3
    weaknesses: ["ว 1.2 ป.6/2", "ว 2.1 ป.6/1"], // สอบตกตัวชี้วัดเหล่านี้
    completed_at: "2024-05-10T10:00:00Z"
  }
];
