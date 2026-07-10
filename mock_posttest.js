import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const schoolName = 'โรงเรียนเหล่าหลวงวิทยาคาร';
  const { data: teachers } = await supabase.from('teachers').select('id').eq('school_name', schoolName);
  
  if (!teachers || teachers.length === 0) {
    console.log('Teacher not found for school:', schoolName);
    return;
  }
  
  const teacherId = teachers[0].id;
  console.log('Teacher ID:', teacherId);
  
  const { data: students } = await supabase.from('students').select('id, name').eq('teacher_id', teacherId);
  console.log(`Found ${students?.length || 0} students.`);
  
  if (!students || students.length === 0) return;
  
  const newResults = students.map(student => {
    // Generate a score between 40 and 45
    const score = Math.floor(Math.random() * 6) + 40;
    
    return {
      student_id: student.id,
      teacher_id: teacherId,
      subject: 'Science (Post-test)',
      exam_year: '2568',
      score: score,
      total: 100,
      weaknesses: ['ว 1.1 ป.5/1', 'ว 1.2 ป.4/1', 'ว 3.1 ป.4/1'],
      time_spent_seconds: Math.floor(Math.random() * 1000) + 1000
    };
  });
  
  const { data, error } = await supabase.from('test_results').insert(newResults);
  
  if (error) {
    console.error('Error inserting test results:', error);
  } else {
    console.log(`Successfully inserted ${newResults.length} post-test results for year 2568.`);
    const avgScore = newResults.reduce((sum, r) => sum + r.score, 0) / newResults.length;
    console.log(`Average score: ${avgScore.toFixed(2)}`);
  }
}

run();
