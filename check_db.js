import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: results } = await supabase.from('test_results').select('*').limit(5);
  console.log("Sample results:", results);
}
run();
