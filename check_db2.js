import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: indicators, error: indError } = await supabase.from('indicators').select('*');
  if (indError) {
    console.error('Error fetching indicators:', indError);
    return;
  }
  console.log(`Total indicators: ${indicators.length}`);

  const { data: questions, error: qError } = await supabase.from('questions').select('*').eq('exam_year', 'LESSON');
  if (qError) {
    console.error('Error fetching questions:', qError);
    return;
  }
  console.log(`Total lesson questions: ${questions.length}`);

  const indCounts = {};
  for (const q of questions) {
    indCounts[q.indicator_code] = (indCounts[q.indicator_code] || 0) + 1;
  }

  let oneQuestionIndicators = 0;
  let otherQuestionIndicators = 0;
  let zeroQuestionIndicators = 0;

  for (const ind of indicators) {
    const count = indCounts[ind.code] || 0;
    if (count === 1) oneQuestionIndicators++;
    else if (count === 0) zeroQuestionIndicators++;
    else otherQuestionIndicators++;
  }

  console.log(`Indicators with 0 questions: ${zeroQuestionIndicators}`);
  console.log(`Indicators with 1 question: ${oneQuestionIndicators}`);
  console.log(`Indicators with >1 questions: ${otherQuestionIndicators}`);
}

run();
