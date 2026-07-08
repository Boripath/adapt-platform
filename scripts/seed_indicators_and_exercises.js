import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Setup Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env");
  process.exit(1);
}
const supabase = createClient(supabaseUrl, supabaseKey);

// Parse Markdown
const mdPath = path.resolve(__dirname, '../../เอกสาร/ตัวชี้วัดวิทยาศาสตร์ประถมศึกษา.md');
const mdContent = fs.readFileSync(mdPath, 'utf8');

const indicators = [];
// Match the markdown table rows
const rowRegex = /\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|\s*(.*?)\s*\|/g;
let match;
let isHeader = true;

while ((match = rowRegex.exec(mdContent)) !== null) {
  if (isHeader || match[1].includes('---')) {
    if (match[1].includes('---')) isHeader = false;
    continue;
  }
  
  const strand = match[1].trim();
  const standard = match[2].trim();
  const indicator_code = match[3].trim();
  const details = match[4].trim();
  const core_content = match[5].trim();
  
  if (indicator_code && strand) {
    indicators.push({
      indicator_code,
      strand,
      standard,
      details,
      core_content,
      vdo_url: `https://www.youtube.com/results?search_query=${encodeURIComponent(indicator_code + ' วิทยาศาสตร์')}`
    });
  }
}

console.log(`Found ${indicators.length} indicators from markdown.`);

const customExercises = {
  'ว 1.1 ป.1/1': { q: 'บริเวณใดที่นักเรียนมักจะพบไส้เดือนดินและตะขาบ?', options: ['บนยอดต้นมะม่วง', 'ใต้ก้อนหินที่ชื้นในสวน', 'บนหลังคาบ้าน', 'กลางสระน้ำ'], a: 1 },
  'ว 1.1 ป.1/2': { q: 'สภาพแวดล้อมใดเหมาะสมกับการดำรงชีวิตของกบมากที่สุด?', options: ['ทะเลทรายที่แห้งแล้ง', 'แหล่งน้ำตื้นและบริเวณที่ชื้นแฉะ', 'ทุ่งหญ้าสะวันนา', 'ยอดเขาสูงที่มีหิมะปกคลุม'], a: 1 },
  'ว 1.1 ป.5/1': { q: 'ลักษณะของต้นผักตบชวาที่มีก้านใบพองออกคล้ายฟองน้ำ ช่วยในการดำรงชีวิตอย่างไร?', options: ['ช่วยให้ลอยน้ำได้', 'ช่วยในการสังเคราะห์แสง', 'ป้องกันแมลงมากัดกิน', 'ช่วยกักเก็บน้ำฝน'], a: 0 },
  'ว 1.1 ป.5/2': { q: 'ความสัมพันธ์ระหว่าง "นกเอี้ยงกับควาย" เป็นความสัมพันธ์แบบใด และมีประโยชน์อย่างไร?', options: ['นกเอี้ยงได้กินแมลง ควายได้รับการกำจัดแมลงรำคาญ', 'นกเอี้ยงแย่งอาหารควาย ควายได้รับอันตราย', 'นกเอี้ยงอาศัยร่มเงาควาย ควายไม่ได้ประโยชน์', 'นกเอี้ยงกินเลือดควาย ควายเสียเลือด'], a: 0 },
  'ว 1.1 ป.5/3': { q: 'ในโซ่อาหาร: หญ้า -> ตั๊กแตน -> กบ -> งู ข้อใดคือผู้ผลิต?', options: ['กบ', 'งู', 'ตั๊กแตน', 'หญ้า'], a: 3 },
  'ว 1.1 ป.5/4': { q: 'การกระทำใดถือเป็นการมีส่วนร่วมในการดูแลรักษาสิ่งแวดล้อมเพื่อรักษาสมดุลของระบบนิเวศ?', options: ['ปล่อยน้ำเสียลงแม่น้ำ', 'ปลูกต้นไม้และคัดแยกขยะ', 'จับสัตว์ป่ามาเลี้ยง', 'เผาขยะพลาสติกหลังบ้าน'], a: 1 },
  'ว 1.2 ป.1/1': { q: 'อวัยวะใดทำหน้าที่ในการมองเห็น?', options: ['ตา', 'หู', 'จมูก', 'ปาก'], a: 0 },
  'ว 1.2 ป.1/2': { q: 'วิธีการดูแลรักษาดวงตาให้ปลอดภัยคือข้อใด?', options: ['อ่านหนังสือในที่มืด', 'ใช้มือขยี้ตาแรงๆ เมื่อฝุ่นเข้าตา', 'อ่านหนังสือในที่ที่มีแสงสว่างเพียงพอ', 'จ้องจอคอมพิวเตอร์ใกล้ๆ'], a: 2 },
  'ว 1.2 ป.2/1': { q: 'พืชต้องการสิ่งใดเป็นปัจจัยหลักในการเจริญเติบโต?', options: ['น้ำและแสง', 'นมและแสง', 'น้ำและน้ำอัดลม', 'ทรายและแสง'], a: 0 },
  'ว 1.2 ป.2/2': { q: 'ถ้านักเรียนปลูกต้นไม้ไว้ในกล่องทึบที่แสงส่องไม่ถึง ต้นไม้จะเป็นอย่างไร?', options: ['เจริญเติบโตได้เร็วกว่าปกติ', 'ใบจะเปลี่ยนเป็นสีเขียวเข้ม', 'ต้นจะค่อยๆ เหลืองและอาจตายได้', 'ออกดอกมากกว่าเดิม'], a: 2 },
  'ว 1.2 ป.2/3': { q: 'ดอกของพืชทำหน้าที่อะไรในวัฏจักรชีวิตของพืชดอก?', options: ['ดูดซึมน้ำ', 'สร้างอาหาร', 'สืบพันธุ์เพื่อสร้างเมล็ด', 'ลำเลียงอาหาร'], a: 2 },
  'ว 1.2 ป.3/1': { q: 'ปัจจัยใดจำเป็นต่อการเจริญเติบโตของร่างกายมนุษย์?', options: ['ขนมขบเคี้ยวและน้ำอัดลม', 'อาหาร น้ำ และอากาศ', 'ของเล่นและอากาศ', 'เสื้อผ้าและอาหาร'], a: 1 },
  'ว 1.2 ป.3/2': { q: 'การดื่มน้ำสะอาดวันละ 6-8 แก้ว มีประโยชน์อย่างไร?', options: ['ทำให้เรียนหนังสือเก่งขึ้น', 'ช่วยให้ระบบต่างๆ ในร่างกายทำงานเป็นปกติ', 'ทำให้มองเห็นในที่มืดได้ชัด', 'ทำให้ผมยาวเร็วขึ้น'], a: 1 },
  'ว 1.2 ป.3/3': { q: 'สัตว์ชนิดใดมีวัฏจักรชีวิตที่มีการเปลี่ยนแปลงรูปร่าง (มีระยะดักแด้)?', options: ['ไก่', 'สุนัข', 'แมว', 'ผีเสื้อ'], a: 3 },
  'ว 1.2 ป.3/4': { q: 'การจับปลาในฤดูวางไข่ส่งผลกระทบต่อวัฏจักรชีวิตของสัตว์อย่างไร?', options: ['ทำให้ปลาตัวใหญ่ขึ้น', 'ทำให้ปลาสูญพันธุ์หรือลดจำนวนลงอย่างรวดเร็ว', 'ทำให้ปลาว่ายน้ำเร็วขึ้น', 'ไม่ส่งผลกระทบใดๆ'], a: 1 },
  'ว 1.2 ป.4/1': { q: 'ส่วนใดของพืชทำหน้าที่ลำเลียงน้ำและธาตุอาหารจากรากไปสู่ใบ?', options: ['ราก', 'ลำต้น', 'ดอก', 'ผล'], a: 1 },
  'ว 1.2 ป.6/1': { q: 'สารอาหารประเภทใดให้พลังงานแก่ร่างกายเป็นหลัก?', options: ['วิตามินและเกลือแร่', 'คาร์โบไฮเดรตและไขมัน', 'น้ำและวิตามิน', 'เกลือแร่และน้ำ'], a: 1 },
  'ว 1.2 ป.6/2': { q: 'หลักธงโภชนาการแนะนำให้รับประทานอาหารประเภทใดน้อยที่สุด?', options: ['ข้าว-แป้ง', 'ผักและผลไม้', 'น้ำตาล ไขมัน เกลือ', 'เนื้อสัตว์'], a: 2 },
  'ว 1.2 ป.6/3': { q: 'วัยเรียนควรเลือกรับประทานอาหารในข้อใดเพื่อให้ร่างกายเจริญเติบโตได้ดีที่สุด?', options: ['ข้าวผัดไข่ใส่ผัก และนมจืด', 'ข้าวเกรียบและน้ำอัดลม', 'ลูกชิ้นปิ้งและน้ำหวาน', 'ขนมปังเคลือบช็อกโกแลต'], a: 0 },
  'ว 1.2 ป.6/4': { q: 'อวัยวะใดทำหน้าที่ดูดซึมสารอาหารที่ย่อยแล้วเข้าสู่กระแสเลือดมากที่สุด?', options: ['กระเพาะอาหาร', 'ลำไส้ใหญ่', 'ลำไส้เล็ก', 'ตับ'], a: 2 },
  'ว 1.2 ป.6/5': { q: 'พฤติกรรมใดช่วยให้ระบบย่อยอาหารทำงานเป็นปกติ?', options: ['กินอาหารรสจัดบ่อยๆ', 'เคี้ยวอาหารให้ละเอียดก่อนกลืน', 'กินอาหารไม่ตรงเวลา', 'กินอิ่มแล้วนอนทันที'], a: 1 }
};

const exercises = indicators.map(indicator => {
  const custom = customExercises[indicator.indicator_code];
  let qText, options, correctIdx;
  
  if (custom) {
    qText = custom.q;
    options = custom.options;
    correctIdx = custom.a;
  } else {
    // Basic fallback based on details for the remaining 100+ indicators
    const snippet = indicator.details.replace(/\n/g, ' ');
    qText = `ข้อใดอธิบายเกี่ยวกับ "${snippet}" ได้สอดคล้องกับหลักการทางวิทยาศาสตร์มากที่สุด?`;
    options = [
      `เป็นไปตามหลักการของ ${indicator.strand}`,
      `ไม่เกี่ยวข้องกับ ${indicator.standard}`,
      `เป็นการอธิบายที่ผิดจากความจริง`,
      `ไม่สามารถสรุปได้จากข้อมูลเบื้องต้น`
    ];
    correctIdx = 0; 
  }
  
  return {
    subject: 'Science',
    indicator_code: indicator.indicator_code,
    note: 'lesson_exercise',
    type: 'choice',
    content: [{ type: 'text', value: qText }],
    options: options.map(opt => [{ type: 'text', value: opt }]),
    correct_answer_index: correctIdx,
    exam_year: 'LESSON'
  };
});

async function runSeed() {
  console.log('Inserting indicators...');
  let insertedIndicatorsCount = 0;
  for (const ind of indicators) {
    const { error } = await supabase.from('indicators').upsert(ind, { onConflict: 'indicator_code' });
    if (error) console.error(`Error inserting ${ind.indicator_code}:`, error.message);
    else insertedIndicatorsCount++;
  }
  console.log(`Inserted ${insertedIndicatorsCount} indicators.`);

  console.log('Inserting exercises...');
  let insertedExercisesCount = 0;
  for (const exe of exercises) {
    await supabase.from('questions')
        .delete()
        .eq('indicator_code', exe.indicator_code)
        .eq('note', 'lesson_exercise');
        
    const { error } = await supabase.from('questions').insert(exe);
    if (error) console.error(`Error inserting exercise for ${exe.indicator_code}:`, error.message);
    else insertedExercisesCount++;
  }
  console.log(`Inserted ${insertedExercisesCount} exercises.`);
}

runSeed().then(() => console.log('Seeding completed!')).catch(console.error);
