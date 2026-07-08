const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.VITE_SUPABASE_URL || 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanUpAdminLessonExercises() {
  console.log('Fetching admin user...');
  
  // Try to find the admin user
  const { data: adminUsers, error: adminError } = await supabase
    .from('teachers')
    .select('id, username')
    .eq('role', 'admin');

  if (adminError || !adminUsers || adminUsers.length === 0) {
    console.error('Could not find admin user or teachers table does not have role admin:', adminError);
    return;
  }
  
  const adminId = adminUsers[0].id;
  console.log(`Found admin: ${adminUsers[0].username} (ID: ${adminId})`);

  console.log('Fetching LESSON exercises for admin...');
  const { data: questions, error: qError } = await supabase
    .from('questions')
    .select('id, indicator_code, indicator_codes, created_at')
    .eq('exam_year', 'LESSON')
    .eq('teacher_id', adminId)
    .order('created_at', { ascending: true });

  if (qError) {
    console.error('Error fetching questions:', qError);
    return;
  }

  // Group by indicator_code (or the first of indicator_codes)
  const questionsByIndicator = {};
  questions.forEach(q => {
    let key = q.indicator_code || (q.indicator_codes && q.indicator_codes[0]);
    if (!key) key = 'unknown';
    
    if (!questionsByIndicator[key]) {
      questionsByIndicator[key] = [];
    }
    questionsByIndicator[key].push(q);
  });

  const idsToDelete = [];

  for (const indicator of Object.keys(questionsByIndicator)) {
    const qList = questionsByIndicator[indicator];
    
    // Keep first 1, mark the rest for deletion
    if (qList.length > 1) {
      const toDelete = qList.slice(1).map(q => q.id);
      idsToDelete.push(...toDelete);
      console.log(`- Will delete ${toDelete.length} extra questions for indicator ${indicator}`);
    }
  }

  if (idsToDelete.length === 0) {
    console.log('No extra admin lesson questions to delete.');
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

cleanUpAdminLessonExercises();
