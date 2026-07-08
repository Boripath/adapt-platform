const fs = require('fs');
const { createClient } = require('@supabase/supabase-js');

// Since we know the supabase URL and key from seed_exam65.cjs
const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

async function importIndicators() {
  const filePath = '../เอกสาร/ตัวชี้วัดวิทยาศาสตร์ประถมศึกษา.md';
  const data = fs.readFileSync(filePath, 'utf8');
  
  const lines = data.split('\n');
  let inTable = false;
  const indicators = [];
  
  for (let line of lines) {
    if (line.includes('| :----')) {
      inTable = true;
      continue;
    }
    
    if (inTable && line.startsWith('|')) {
      const parts = line.split('|').map(p => p.trim());
      if (parts.length >= 6) { // | 1 | 2 | 3 | 4 | 5 |
        const strand = parts[1].replace(/\*\*/g, ''); // e.g. สาระที่ 1 วิทยาศาสตร์ชีวภาพ
        const standard = parts[2].replace(/\*\*/g, ''); // e.g. มาตรฐาน ว 1.1...
        const indicator_code = parts[3];
        const details = parts[4];
        const core_content = parts[5];
        
        if (indicator_code && indicator_code !== '3. ตัวชี้วัด' && !indicator_code.includes('---')) {
          indicators.push({
            indicator_code,
            strand,
            standard,
            details,
            core_content,
            vdo_url: '' // Default empty
          });
        }
      }
    }
  }
  
  console.log(`Found ${indicators.length} indicators. Inserting to Supabase...`);
  
  // Upsert to avoid duplicates
  const { data: result, error } = await supabase
    .from('indicators')
    .upsert(indicators, { onConflict: 'indicator_code' });
    
  if (error) {
    console.error('Error inserting indicators:', error);
  } else {
    console.log('Successfully inserted indicators!');
  }
}

importIndicators();
