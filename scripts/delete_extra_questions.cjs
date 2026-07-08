const { createClient } = require('@supabase/supabase-js');


const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanUpQuestions() {
  console.log('Fetching questions...');
  
  // Fetch all O-NET questions
  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, exam_year, created_at')
    .neq('exam_year', 'LESSON')
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Error fetching questions:', error);
    return;
  }

  // Group by exam_year
  const questionsByYear = {};
  questions.forEach(q => {
    if (!questionsByYear[q.exam_year]) {
      questionsByYear[q.exam_year] = [];
    }
    questionsByYear[q.exam_year].push(q);
  });

  const idsToDelete = [];

  for (const year of Object.keys(questionsByYear)) {
    const qList = questionsByYear[year];
    console.log(`Year ${year} has ${qList.length} questions.`);
    
    // Keep first 20, mark the rest for deletion
    if (qList.length > 20) {
      const toDelete = qList.slice(20).map(q => q.id);
      idsToDelete.push(...toDelete);
      console.log(`- Will delete ${toDelete.length} extra questions from ${year}`);
    } else {
      console.log(`- No extra questions to delete for ${year}`);
    }
  }

  if (idsToDelete.length === 0) {
    console.log('No extra questions to delete overall.');
    return;
  }

  console.log(`Total questions to delete: ${idsToDelete.length}`);
  
  // Delete in batches of 100
  for (let i = 0; i < idsToDelete.length; i += 100) {
    const batch = idsToDelete.slice(i, i + 100);
    const { error: deleteError } = await supabase
      .from('questions')
      .delete()
      .in('id', batch);
      
    if (deleteError) {
      console.error(`Error deleting batch ${i}:`, deleteError);
    } else {
      console.log(`Deleted batch of ${batch.length} questions.`);
    }
  }
  
  console.log('Cleanup completed successfully.');
}

cleanUpQuestions();
