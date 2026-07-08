import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseAnonKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function seed() {
  console.log('Seeding teachers...');
  await supabase.from('teachers').upsert({ username: 'teacher01', password_hash: 'password123', name: 'คุณครู สมใจ รักสอน' }, { onConflict: 'username' });

  console.log('Seeding students...');
  await supabase.from('students').upsert([
    { national_id: '1234567890123', name: 'เด็กชายสมชาย เรียนดี', class: 'ป.6/1' },
    { national_id: '2345678901234', name: 'เด็กหญิงสมหญิง รักเรียน', class: 'ป.6/1' },
    { national_id: '3456789012345', name: 'เด็กชายปัญญา ชาญฉลาด', class: 'ป.6/2' }
  ], { onConflict: 'national_id' });

  console.log('Seeding questions...');
  await supabase.from('questions').insert([
    { subject: 'Science', indicator_code: 'ว 1.2 ป.6/1', text: 'ข้อใดคือสารอาหารที่ให้พลังงานหลักแก่ร่างกาย?', options: ['คาร์โบไฮเดรต', 'วิตามิน', 'เกลือแร่', 'น้ำ'], correct_answer_index: 0 },
    { subject: 'Science', indicator_code: 'ว 1.2 ป.6/2', text: 'เด็กวัยเรียนควรเน้นรับประทานอาหารประเภทใดเพื่อการเจริญเติบโต?', options: ['ไขมัน', 'โปรตีน', 'คาร์โบไฮเดรต', 'วิตามิน'], correct_answer_index: 1 },
    { subject: 'Science', indicator_code: 'ว 2.1 ป.6/1', text: 'ข้อใดคือการเปลี่ยนแปลงทางเคมี?', options: ['น้ำแข็งละลาย', 'กระดาษฉีกขาด', 'เหล็กเป็นสนิม', 'น้ำเดือด'], correct_answer_index: 2 }
  ]);

  console.log('Seeding remedial contents...');
  await supabase.from('remedial_contents').insert([
    { indicator_code: 'ว 1.2 ป.6/1', title: 'ทบทวนเรื่องสารอาหาร (หมู่ 1-5)', type: 'video', url: 'https://youtube.com/...' },
    { indicator_code: 'ว 1.2 ป.6/2', title: 'สัดส่วนอาหารที่เหมาะสมสำหรับวัยเรียน', type: 'video', url: 'https://youtube.com/...' },
    { indicator_code: 'ว 2.1 ป.6/1', title: 'การเปลี่ยนแปลงทางกายภาพและเคมี', type: 'document', url: 'https://drive.google.com/...' }
  ]);

  console.log('Seeding finished!');
}

seed().catch(console.error);
