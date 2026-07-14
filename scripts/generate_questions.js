import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_ID = '5b986a96-2830-452f-94fc-0a599f2a3c7e';

function generateAdditionalQuestion(indicator, index) {
  if (index === 1) {
    return {
      subject: 'Science',
      indicator_code: indicator.indicator_code,
      content: [{ type: 'text', value: `ข้อใดกล่าวถึงความหมายหรือสาระสำคัญของ ${indicator.indicator_code} ได้ถูกต้องที่สุด?` }],
      options: [
        [{ type: 'text', value: `เกี่ยวข้องกับ ${indicator.details ? indicator.details.substring(0, 30) + '...' : 'เนื้อหาหลัก'}` }],
        [{ type: 'text', value: 'ไม่เกี่ยวข้องกับตัวชี้วัดนี้เลย' }],
        [{ type: 'text', value: 'เป็นความรู้พื้นฐานที่ยังไม่ระบุชัดเจน' }],
        [{ type: 'text', value: 'กล่าวถึงเรื่องอื่นๆ นอกเหนือจากนี้' }]
      ],
      correct_answer_index: 0,
      note: 'lesson_exercise',
      type: 'choice',
      exam_year: 'LESSON',
      teacher_id: ADMIN_ID
    };
  } else {
    return {
      subject: 'Science',
      indicator_code: indicator.indicator_code,
      content: [{ type: 'text', value: `การนำความรู้เรื่อง ${indicator.indicator_code} ไปประยุกต์ใช้ในชีวิตประจำวัน ข้อใดเหมาะสมที่สุด?` }],
      options: [
        [{ type: 'text', value: 'ไม่สามารถนำไปใช้ได้จริง' }],
        [{ type: 'text', value: 'นำไปใช้เพื่อให้เกิดประโยชน์ตามความเหมาะสม' }],
        [{ type: 'text', value: 'ใช้เพื่อการท่องจำเท่านั้น' }],
        [{ type: 'text', value: 'ใช้เฉพาะในห้องเรียนเวลาสอบ' }]
      ],
      correct_answer_index: 1,
      note: 'lesson_exercise',
      type: 'choice',
      exam_year: 'LESSON',
      teacher_id: ADMIN_ID
    };
  }
}

async function run() {
  console.log('Fetching indicators and all questions...');
  
  const { data: indicators } = await supabase.from('indicators').select('*').eq('teacher_id', ADMIN_ID);
  const { data: allQuestions } = await supabase.from('questions').select('*').eq('exam_year', 'LESSON');
  
  const adminQuestions = allQuestions.filter(q => q.teacher_id === ADMIN_ID);
  const otherQuestions = allQuestions.filter(q => q.teacher_id !== ADMIN_ID);
  
  console.log(`Found ${indicators.length} indicators, ${adminQuestions.length} admin questions, and ${otherQuestions.length} other questions.`);
  
  // 1. Delete duplicate questions from other teachers
  const toDelete = [];
  for (const other of otherQuestions) {
    const isDuplicate = adminQuestions.some(adminQ => 
      adminQ.indicator_code === other.indicator_code && 
      JSON.stringify(adminQ.content) === JSON.stringify(other.content)
    );
    if (isDuplicate) {
      toDelete.push(other.id);
    }
  }
  
  if (toDelete.length > 0) {
    console.log(`Deleting ${toDelete.length} duplicate questions from other teachers...`);
    const CHUNK_SIZE = 50;
    for (let i = 0; i < toDelete.length; i += CHUNK_SIZE) {
      const chunk = toDelete.slice(i, i + CHUNK_SIZE);
      await supabase.from('questions').delete().in('id', chunk);
    }
    console.log('Deleted duplicates.');
  }
  
  // 2. Generate missing questions for admin
  const qByIndicator = {};
  for (const q of adminQuestions) {
    if (!qByIndicator[q.indicator_code]) qByIndicator[q.indicator_code] = [];
    qByIndicator[q.indicator_code].push(q);
  }
  
  const newQuestions = [];
  
  for (const ind of indicators) {
    const existingCount = (qByIndicator[ind.indicator_code] || []).length;
    
    if (existingCount < 3) {
      const needed = 3 - existingCount;
      for (let i = 0; i < needed; i++) {
        // Use index based on existing count to vary the generated questions
        const q = generateAdditionalQuestion(ind, existingCount + i);
        newQuestions.push(q);
      }
    }
  }
  
  console.log(`Generated ${newQuestions.length} new questions. Inserting...`);
  
  if (newQuestions.length > 0) {
    const CHUNK_SIZE = 50;
    for (let i = 0; i < newQuestions.length; i += CHUNK_SIZE) {
      const chunk = newQuestions.slice(i, i + CHUNK_SIZE);
      const { error } = await supabase.from('questions').insert(chunk);
      if (error) console.error('Error inserting chunk:', error);
      else console.log(`Inserted chunk ${i / CHUNK_SIZE + 1}`);
    }
    console.log('Finished inserting all new questions!');
  } else {
    console.log('No new questions needed.');
  }
}

run();
