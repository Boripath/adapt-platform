const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const content = fs.readFileSync('src/lib/supabase.js', 'utf8');
const urlMatch = content.match(/supabaseUrl\s*=\s*['"]([^'"]+)['"]/);
const keyMatch = content.match(/supabaseAnonKey\s*=\s*['"]([^'"]+)['"]/);
if(urlMatch && keyMatch) {
  const supabase = createClient(urlMatch[1], keyMatch[1]);
  supabase.from('test_results').select('*').limit(1).then(res => {
    if(res.error) console.log('ERROR:', res.error);
    else if(res.data.length > 0) console.log('COLUMNS:', Object.keys(res.data[0]));
    else console.log('EMPTY_TABLE_OK');
  });
} else {
  console.log('No keys found');
}
