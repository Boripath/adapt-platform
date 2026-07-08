import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const onet64Questions = [
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 1',
    indicator_code: 'ว 1.1 ป.5/2',
    content: [
      { type: 'text', value: 'ความสัมพันธ์ระหว่างสิ่งมีชีวิตกับสิ่งมีชีวิตในข้อใด จัดเป็นการอยู่ร่วมกันในรูปแบบ "ภาวะพึ่งพาอาศัยกัน"' }
    ],
    options: [
      { type: 'text', value: 'ปลาการ์ตูนกับปะการัง' },
      { type: 'text', value: 'ผึ้งกับดอกไม้' },
      { type: 'text', value: 'เห็บกับสุนัข' },
      { type: 'text', value: 'กล้วยไม้กับต้นมะค่า' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 2',
    indicator_code: 'ว 1.2 ป.6/4',
    content: [
      { type: 'text', value: 'ในระบบย่อยอาหารของมนุษย์ การดูดซึมสารอาหารส่วนใหญ่เกิดขึ้นที่อวัยวะใด' }
    ],
    options: [
      { type: 'text', value: 'ลำไส้เล็ก' },
      { type: 'text', value: 'ตับอ่อน' },
      { type: 'text', value: 'ลำไส้ใหญ่' },
      { type: 'text', value: 'กระเพาะอาหาร' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 3',
    indicator_code: 'ว 1.3 ป.5/1',
    content: [
      { type: 'text', value: 'ครอบครัวหนึ่ง พ่อและแม่มีผมสั้นสีดำ พ่อมีผมเหยียดตรง แต่แม่มีผมหยิกเป็นคลื่น จากการดัดผม ลูกสาวทำสีผมเป็นสีเทาและดัดหยิกเป็นคลื่นเช่นเดียวกับคุณยาย ข้อใดเป็นลักษณะทางพันธุกรรม' }
    ],
    options: [
      { type: 'text', value: 'ลักษณะผมสั้นที่พบในพ่อและแม่' },
      { type: 'text', value: 'ลักษณะผมสีดำที่พบในพ่อและแม่' },
      { type: 'text', value: 'ลักษณะผมสีเทาของคุณยายและหลานที่เหมือนกัน' },
      { type: 'text', value: 'ลักษณะผมหยิกที่ถ่ายทอดจากรุ่นคุณยายสู่หลาน' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 4',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'ในการทดลองเกี่ยวกับสภาพยืดหยุ่น นำชิ้นงานที่มีความยาวเริ่มต้น 15 เซนติเมตร ทำการดึงด้วยแรงเท่ากัน ได้ผลการทดลองดังตาราง\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 4]\nวัสดุในข้อใดเหมาะในการนำมาทำเป็นยางรัดของ' }
    ],
    options: [
      { type: 'text', value: 'A' },
      { type: 'text', value: 'B' },
      { type: 'text', value: 'C' },
      { type: 'text', value: 'D' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 5',
    indicator_code: 'ว 2.1 ป.5/1',
    content: [
      { type: 'text', value: 'จากการสังเกตต่อไปนี้\nA การวางเกล็ดการบูรไว้ เกล็ดการบูรมีขนาดเล็กลง\nB การใส่เกลือลงไปในน้ำ เม็ดเกลือหายไป ได้ของเหลวใส ไม่มีสี\nC การฉีดสเปรย์แอลกอฮอล์บนผิวหนัง แล้วแอลกอฮอล์หายไป\nD การใส่น้ำแข็งลงไปในแก้วที่มีน้ำ น้ำแข็งหายไป ได้ของเหลวใส ไม่มีสี\nข้อใดเป็นการเปลี่ยนสถานะ' }
    ],
    options: [
      { type: 'text', value: 'A B C' },
      { type: 'text', value: 'A B D' },
      { type: 'text', value: 'B C D' },
      { type: 'text', value: 'A C D' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 6',
    indicator_code: 'ว 2.1 ป.6/1',
    content: [
      { type: 'text', value: 'นักเรียน 4 คน ทำการแยกสารด้วยวิธีการดังต่อไปนี้\nA แยกเกลือแกงออกจากทรายโดยการร่อน\nB แยกทรายออกจากเกลือแกงโดยการหยิบออก\nC แยกตะปูเหล็กออกจากทรายโดยการกรอง\nD แยกผงเหล็กออกจากทรายโดยการใช้แม่เหล็กดูด\nวิธีการใดเป็นการแยกสารที่เหมาะสมมากที่สุด' }
    ],
    options: [
      { type: 'text', value: 'A' },
      { type: 'text', value: 'B' },
      { type: 'text', value: 'C' },
      { type: 'text', value: 'D' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 7',
    indicator_code: 'ว 2.2 ป.4/1',
    content: [
      { type: 'text', value: 'ปล่อยก้อนหินขนาดเล็ก และใบไม้ ที่มีมวลเท่ากัน จากที่สูงเท่ากัน พบว่าก้อนหินตกถึงพื้นก่อนใบไม้ ข้อใดถูกต้องเกี่ยวกับน้ำหนักของก้อนหินและน้ำหนักของใบไม้' }
    ],
    options: [
      { type: 'text', value: 'ก้อนหินมีน้ำหนักมากกว่าใบไม้ เพราะก้อนหินตกถึงพื้นก่อน' },
      { type: 'text', value: 'ก้อนหินมีน้ำหนักน้อยกว่าใบไม้ เพราะก้อนหินตกถึงพื้นก่อน' },
      { type: 'text', value: 'ก้อนหินและใบไม้มีน้ำหนักเท่ากัน เพราะมีมวลเท่ากัน' },
      { type: 'text', value: 'ก้อนหินและใบไม้มีน้ำหนักเท่ากัน เพราะวัตถุทั้งสองตกลงสู่พื้นโลกเหมือนกัน' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 8',
    indicator_code: 'ว 2.2 ป.5/1',
    content: [
      { type: 'text', value: 'เด็กชายดำออกแรง 3 นิวตัน และเด็กชายแดงออกแรง 7 นิวตัน ดันกล่องใบหนึ่ง ดังแสดงในรูป พบว่ากล่องอยู่นิ่ง\n[รอคุณครูอัปโหลดรูปภาพข้อ 8]\nจงหาแรงเสียดทานที่พื้นกระทำต่อกล่อง' }
    ],
    options: [
      { type: 'text', value: '4 นิวตัน ไปทางซ้าย' },
      { type: 'text', value: '4 นิวตัน ไปทางขวา' },
      { type: 'text', value: '10 นิวตัน ไปทางซ้าย' },
      { type: 'text', value: '10 นิวตัน ไปทางขวา' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 9',
    indicator_code: 'ว 2.2 ป.6/1',
    content: [
      { type: 'text', value: 'ข้อใดอธิบายเกี่ยวกับแรงไฟฟ้าได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'เกิดได้โดยที่วัตถุไม่ต้องสัมผัสกัน' },
      { type: 'text', value: 'เป็นได้เฉพาะแรงผลักเท่านั้น' },
      { type: 'text', value: 'เป็นได้เฉพาะแรงดูดเท่านั้น' },
      { type: 'text', value: 'เป็นแรงต้านระหว่างวัตถุเท่านั้น' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 10',
    indicator_code: 'ว 2.3 ป.5/2',
    content: [
      { type: 'text', value: 'ขวดแก้วทึบขนาดเท่ากัน 3 ขวด ใส่น้ำปริมาตรต่างกัน นายมานะต้องการพิสูจน์ว่าขวดใดบรรจุน้ำไว้มากที่สุดโดยไม่เปิดขวด จึงเคาะที่ด้านล่างของขวดทั้ง 3 ขวด ด้วยแรงเท่าๆ กัน นายมานะพบว่าขวดน้ำแต่ละขวดมีเสียงแตกต่างกัน ข้อใดมีน้ำในขวดมากที่สุด' }
    ],
    options: [
      { type: 'text', value: 'ขวดที่เคาะแล้วได้ยินเสียงดังที่สุด' },
      { type: 'text', value: 'ขวดที่เคาะแล้วได้ยินเสียงค่อยที่สุด' },
      { type: 'text', value: 'ขวดที่เคาะแล้วได้ยินเสียงแหลมที่สุด' },
      { type: 'text', value: 'ขวดที่เคาะแล้วได้ยินเสียงทุ้มที่สุด' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 11',
    indicator_code: 'ว 2.3 ป.6/2',
    content: [
      { type: 'text', value: 'ให้พิจารณาการต่อเซลล์ไฟฟ้ากับมอเตอร์ในสี่รูปแบบ\n[รอคุณครูอัปโหลดรูปภาพข้อ 11]\nการต่อเซลล์ไฟฟ้ารูปแบบใดที่ทำให้มอเตอร์หมุนได้' }
    ],
    options: [
      { type: 'text', value: 'แบบที่ 1' },
      { type: 'text', value: 'แบบที่ 2' },
      { type: 'text', value: 'แบบที่ 3' },
      { type: 'text', value: 'แบบที่ 4' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 12',
    indicator_code: 'ว 3.1 ป.4/2',
    content: [
      { type: 'text', value: 'ในคืนที่ฟ้าโปร่งไม่มีเมฆบัง เมื่อเงยหน้ามองไปบนท้องฟ้า ด.ญ. มานี เห็นดวงจันทร์ปรากฏดังรูป\n[รอคุณครูอัปโหลดรูปภาพข้อ 12]\nด.ญ. มานี ต้องรออีกประมาณกี่วัน หากต้องการถ่ายรูปดวงจันทร์เต็มดวง' }
    ],
    options: [
      { type: 'text', value: '3 - 4 วัน' },
      { type: 'text', value: '6 - 8 วัน' },
      { type: 'text', value: '14 - 16 วัน' },
      { type: 'text', value: '29 - 31 วัน' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 13',
    indicator_code: 'ว 3.1 ป.6/1',
    content: [
      { type: 'text', value: 'จากรูปขณะที่ดวงจันทร์โคจรมาอยู่ระหว่างโลกและดวงอาทิตย์ เงาของดวงจันทร์จะทอดมาบนโลก ทำให้คนบนโลกในบริเวณเงาต่างๆ มองเห็นปรากฏการณ์บดบังดวงอาทิตย์แตกต่างกัน\n[รอคุณครูอัปโหลดรูปภาพข้อ 13]\nสำหรับคนบนโลก บริเวณ A จะมองเห็นปรากฏการณ์ดวงจันทร์บดบังดวงอาทิตย์ได้ในรูปแบบใด' }
    ],
    options: [
      { type: 'text', value: 'แบบที่ 1 (บดบังมิดดวง)' },
      { type: 'text', value: 'แบบที่ 2 (บดบังบางส่วน)' },
      { type: 'text', value: 'แบบที่ 3 (บดบังบางส่วนอีกแบบ)' },
      { type: 'text', value: 'แบบที่ 4 (สุริยุปราคาวงแหวน)' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 14',
    indicator_code: 'ว 3.2 ป.6/1',
    content: [
      { type: 'text', value: 'จากการสำรวจหินบริเวณหนึ่งพบหิน 4 ก้อน ได้แก่ A B C D ที่มีลักษณะแตกต่างกัน ดังตารางต่อไปนี้\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 14]\nหินก้อนใดเป็นหินแปร' }
    ],
    options: [
      { type: 'text', value: 'หิน A' },
      { type: 'text', value: 'หิน B' },
      { type: 'text', value: 'หิน C' },
      { type: 'text', value: 'หิน D' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 15',
    indicator_code: 'ว 3.2 ป.6/3',
    content: [
      { type: 'text', value: 'จากการสำรวจหินดินดานบริเวณชายทะเลแห่งหนึ่ง พบซากดึกดำบรรพ์เกล็ดปลาน้ำจืด และรอยเท้าไดโนเสาร์อยู่ในชั้นหินเดียวกัน จากสถานการณ์ ข้อใดสรุปได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'หินดินดานเกิดจากการสะสมตัวในสภาพแวดล้อมที่เป็นทะเล' },
      { type: 'text', value: 'ซากดึกดำบรรพ์ทั้งสองเกิดจากโครงร่างของสิ่งมีชีวิตในอดีตเหมือนกัน' },
      { type: 'text', value: 'ซากดึกดำบรรพ์ทั้งสองมีอายุเท่ากัน' },
      { type: 'text', value: 'ไดโนเสาร์ที่ทำให้เกิดรอยเท้ามีวิวัฒนาการมากกว่าปลาน้ำจืด' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 16',
    indicator_code: 'ว 3.2 ป.6/4',
    content: [
      { type: 'text', value: 'จากรูป เรือกำลังแล่นเข้าสู่ชายฝั่งด้วยแรงลมเท่านั้น\n[รอคุณครูอัปโหลดรูปภาพข้อ 16]\nข้อใดกล่าวไม่ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'เหตุการณ์นี้เกิดในเวลากลางคืน' },
      { type: 'text', value: 'ลมที่พัดพาเรือกลับสู่ชายฝั่งคือ ลมทะเล' },
      { type: 'text', value: 'อากาศเหนือชายฝั่งมีอุณหภูมิสูงกว่าพื้นผิวน้ำทะเล' },
      { type: 'text', value: 'บนบกบริเวณชายฝั่งมีความกดอากาศต่ำกว่าในทะเล' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 17',
    indicator_code: 'ว 4.2 ป.6/1',
    content: [
      { type: 'text', value: 'กำหนดให้นักเรียนได้รับเงินไปโรงเรียนจากผู้ปกครอง วันละ 100 บาท สำหรับเลือกซื้ออาหารและเครื่องดื่มเท่านั้น โดยคำนึงถึงหลักโภชนาการสารอาหารครบ 5 หมู่ ได้รับพลังงานที่เพียงพอและอิ่มท้อง โดยมีข้อจำกัดว่าอาหารชิ้นใดชิ้นหนึ่งจะไม่มีสารอาหารที่ครบถ้วนในชิ้นเดียว ดังนั้น นักเรียนจำเป็นต้องพิจารณาเลือกซื้ออาหารหลายชิ้นประกอบกัน โดยให้ซื้อได้ทีละหนึ่งชิ้นเพื่อให้รับสารอาหารที่เพียงพอและครบถ้วน จากสถานการณ์ดังกล่าว ผังงานแบบใดทำให้นักเรียนเลือกซื้ออาหารที่ได้รับสารอาหารครบ 5 หมู่ ได้อย่างมีประสิทธิภาพมากที่สุด\n[รอคุณครูอัปโหลดรูปภาพผังงานข้อ 17]' }
    ],
    options: [
      { type: 'text', value: 'ผังงานที่ 1' },
      { type: 'text', value: 'ผังงานที่ 2' },
      { type: 'text', value: 'ผังงานที่ 3' },
      { type: 'text', value: 'ผังงานที่ 4' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 64',
    note: 'ข้อ 18',
    indicator_code: 'ว 4.2 ป.6/3',
    content: [
      { type: 'text', value: 'กำหนดให้นักเรียนค้นหาไฟล์ pdf ที่เกี่ยวกับสถานการณ์วิกฤตโควิด-19 จากเว็บไซต์หน่วยงานภาครัฐ ในช่วงเดือนพฤศจิกายน พ.ศ. 2563 จงวิเคราะห์ว่าผลลัพธ์ที่แสดงบนหน้าจอด้านล่างจากการค้นหาในอินเทอร์เน็ต เกิดจากการค้นหาด้วยวิธีการตามข้อใด\n[รอคุณครูอัปโหลดรูปภาพข้อ 18]' }
    ],
    options: [
      { type: 'text', value: 'ระบุคำค้นว่า "โควิด-19 2563 site:go.th"' },
      { type: 'text', value: 'ระบุคำค้นว่า "โควิด-19 site:go.th filetype:pdf"' },
      { type: 'text', value: 'ระบุคำค้นว่า "โควิด-19 filetype:pdf" และ กำหนดช่วงเวลาเป็น 1 พ.ย. 2563 - 30 พ.ย. 2563' },
      { type: 'text', value: 'ระบุคำค้นว่า "โควิด-19 site:go.th filetype:pdf" และ กำหนดช่วงเวลาเป็น 1 พ.ย. 2563 - 30 พ.ย. 2563' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 64',
    note: 'ข้อ 19',
    indicator_code: 'ว 1.2 ป.4/1',
    content: [
      { type: 'text', value: 'ตอนที่ 2: แบบปรนัยเลือกตอบเชิงซ้อน\nในการสำรวจพื้นที่แห่งหนึ่งซึ่งเป็นดินชื้นแฉะ พบดอกเห็ดสีขาวนวล 1 ชนิด และพบพืชอีก 2 ชนิด ชนิดแรกเห็นส่วนของลำต้นสีเขียวชูขึ้นเหนือดินมีใบสีเขียว ไม่พบดอก ส่วนอีกชนิดหนึ่งไม่เห็นส่วนของลำต้น แต่มีส่วนคล้ายใบขนาดเล็กเรียงติดผิวดิน คล้ายพรม ไม่พบดอก\nจากข้อมูลข้างต้น ข้อความต่อไปนี้ถูกต้องใช่หรือไม่' }
    ],
    complex_questions: [
      {
        question: '19.1 เห็ดสร้างอาหารเองได้เช่นเดียวกับพืช เพราะพบอยู่ในพื้นที่เดียวกัน',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '19.2 ถ้าถอนพืชทั้งสองชนิดจะพบราก หรือส่วนคล้ายรากที่ทำหน้าที่ในการดูดน้ำ',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '19.3 เราสามารถสรุปว่า ดอกไม่ได้เป็นโครงสร้างในการสืบพันธุ์แบบอาศัยเพศของพืชทั้งสองชนิด เพราะไม่พบดอก',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 64',
    note: 'ข้อ 20',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'เด็กหญิงสมศรีทำการทดลองโดยนำน้ำตาเทียนหยดลงบนไม้บรรทัดที่ทำจากวัสดุต่างกัน 2 ชนิด ได้แก่ เหล็ก และอะลูมิเนียม แล้วใช้เปลวไฟจากเทียนไขจ่อที่ปลายอีกด้านหนึ่งของไม้บรรทัด โดยมีระยะห่างระหว่างเปลวไฟกับน้ำตาเทียนเท่ากัน บนไม้บรรทัดทั้งสองชนิด ดังภาพ\n[รอคุณครูอัปโหลดรูปภาพข้อ 20]\nเมื่อพิจารณาจากตัวแปรและวิธีการทดลองของสมศรี การตั้งสมมติฐานด้วยข้อความต่อไปนี้เหมาะสมแล้ว ใช่หรือไม่' }
    ],
    complex_questions: [
      {
        question: '20.1 ถ้าระยะห่างของน้ำตาเทียนกับเปลวไฟแตกต่างกัน ดังนั้นน้ำตาเทียนที่อยู่ใกล้เปลวไฟมากกว่า จะหลอมเหลวเร็วกว่า',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '20.2 ระยะห่างระหว่างน้ำตาเทียนกับเปลวไฟและชนิดของไม้บรรทัดมีผลต่อการหลอมเหลวของน้ำตาเทียน',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '20.3 ถ้าวัสดุต่างชนิดกันมีความสามารถในการนำความร้อนต่างกัน ดังนั้นไม้บรรทัดเหล็กสามารถนำความร้อนได้ดีกว่าอะลูมิเนียม',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  }
];

async function seed() {
  console.log("Seeding O-NET 64 questions...");
  const formattedQuestions = onet64Questions.map(q => {
    const newQ = { ...q, subject: 'Science' };
    if (newQ.type === 'complex' && newQ.complex_questions) {
      newQ.options = newQ.complex_questions.map(cq => ([{ type: 'text', value: cq.question }]));
      newQ.complex_answers = newQ.complex_questions.map(cq => cq.correct_answer === 'ใช่' ? 0 : 1);
      delete newQ.complex_questions;
    }
    return newQ;
  });

  for (const q of formattedQuestions) {
    const { error } = await supabase.from('questions').insert(q);
    if (error) {
      console.error("Error inserting question:", q.note, error.message);
    } else {
      console.log(`Inserted ${q.note}`);
    }
  }
  console.log("Seeding O-NET 64 complete!");
}

seed();
