import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://wddachlocijpfpdimadb.supabase.co';
const supabaseKey = 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz';
const supabase = createClient(supabaseUrl, supabaseKey);

const ADMIN_ID = '5b986a96-2830-452f-94fc-0a599f2a3c7e';

async function run() {
  console.log('Fetching all indicators...');
  const { data: indicators, error: fetchError } = await supabase.from('indicators').select('*');
  
  if (fetchError) {
    console.error('Error fetching indicators:', fetchError);
    return;
  }
  
  console.log(`Found ${indicators.length} total indicators.`);
  
  const groups = {};
  for (const ind of indicators) {
    if (!groups[ind.indicator_code]) groups[ind.indicator_code] = [];
    groups[ind.indicator_code].push(ind);
  }
  
  const uniqueCodes = Object.keys(groups);
  console.log(`Found ${uniqueCodes.length} unique indicator codes.`);
  
  const toKeep = [];
  const toDelete = [];
  const toUpdateToAdmin = [];
  
  for (const code of uniqueCodes) {
    const items = groups[code];
    let keptItem = items.find(i => i.teacher_id === ADMIN_ID);
    
    if (keptItem) {
      // Keep admin's item, delete others
      toKeep.push(keptItem);
      const others = items.filter(i => i.id !== keptItem.id);
      toDelete.push(...others);
    } else {
      // Admin doesn't have it, keep the first one and change owner to admin
      keptItem = items[0];
      toKeep.push(keptItem);
      toUpdateToAdmin.push(keptItem);
      
      const others = items.slice(1);
      toDelete.push(...others);
    }
  }
  
  console.log(`Plan: Keep ${toKeep.length}, Delete ${toDelete.length}, Update to Admin ${toUpdateToAdmin.length}`);
  
  // Update to admin
  if (toUpdateToAdmin.length > 0) {
    console.log('Updating items to admin...');
    for (const item of toUpdateToAdmin) {
      const { error } = await supabase.from('indicators').update({ teacher_id: ADMIN_ID }).eq('id', item.id);
      if (error) console.error(`Error updating item ${item.id}:`, error);
    }
  }
  
  // Delete duplicates
  if (toDelete.length > 0) {
    console.log('Deleting duplicate items...');
    const deleteIds = toDelete.map(i => i.id);
    
    // Chunk deletes if there are many
    const CHUNK_SIZE = 50;
    for (let i = 0; i < deleteIds.length; i += CHUNK_SIZE) {
      const chunk = deleteIds.slice(i, i + CHUNK_SIZE);
      const { error } = await supabase.from('indicators').delete().in('id', chunk);
      if (error) console.error(`Error deleting chunk:`, error);
      else console.log(`Deleted chunk ${i / CHUNK_SIZE + 1}`);
    }
  }
  
  console.log('Database deduplication complete.');
}

run();
