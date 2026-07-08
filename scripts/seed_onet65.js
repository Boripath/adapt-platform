import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const onet65Questions = [
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 1',
    indicator_code: 'ว 1.2 ป.5/1',
    content: [
      { type: 'text', value: 'ข้อใดแสดงโครงสร้างของร่างกายสิ่งมีชีวิตที่เหมาะสมกับการดำรงชีวิตในแหล่งที่อยู่' }
    ],
    options: [
      { type: 'text', value: 'กบมีพังผืดเชื่อมระหว่างนิ้วเท้า ทำให้เคลื่อนที่ในน้ำได้ดี' },
      { type: 'text', value: 'ผักกระเฉดมีนวมสีขาวคล้ายฟองน้ำ ทำให้ดูดซึมออกซิเจนได้ดี' },
      { type: 'text', value: 'อูฐมีโหนกขนาดใหญ่เพื่อเก็บน้ำไว้ใช้เมื่ออาศัยอยู่ในทะเลทราย' },
      { type: 'text', value: 'นกเพนกวินมีขนสีขาวและดำทำให้สามารถเก็บรักษาอุณหภูมิร่างกายให้อบอุ่นได้' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 2',
    indicator_code: 'ว 1.2 ป.6/4',
    content: [
      { type: 'text', value: 'จากภาพอวัยวะในระบบย่อยอาหาร (A-E) ของมนุษย์เมื่อรับประทานข้าวเหนียวไก่ทอด จะมีการย่อยอาหารและมีการดูดซึมสารอาหารที่อวัยวะใด\n[รอคุณครูอัปโหลดรูปภาพข้อ 2]' }
    ],
    options: [
      { type: 'text', value: 'อวัยวะที่มีการย่อย: A, B และ C / อวัยวะที่มีการดูดซึม: C และ D' },
      { type: 'text', value: 'อวัยวะที่มีการย่อย: A, B และ C / อวัยวะที่มีการดูดซึม: D และ E' },
      { type: 'text', value: 'อวัยวะที่มีการย่อย: A, C และ D / อวัยวะที่มีการดูดซึม: C และ D' },
      { type: 'text', value: 'อวัยวะที่มีการย่อย: A, C และ D / อวัยวะที่มีการดูดซึม: D และ E' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 3',
    indicator_code: 'ว 1.3 ป.5/1',
    content: [
      { type: 'text', value: 'เด็กชายคนหนึ่งไม่สามารถห่อลิ้นได้ แต่พ่อแม่และพี่สาวห่อลิ้นได้ ข้อใดต่อไปนี้สามารถอธิบายสถานการณ์นี้ได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'ลักษณะห่อลิ้นได้และไม่ได้ไม่ใช่ลักษณะทางพันธุกรรม' },
      { type: 'text', value: 'ลักษณะห่อลิ้นไม่ได้เป็นลักษณะแฝงในพ่อแม่ที่มาปรากฏในรุ่นลูก' },
      { type: 'text', value: 'เด็กชายคนนี้น่าจะไม่ใช่ลูกของพ่อแม่คู่นี้เพราะมีลักษณะไม่เหมือนพ่อแม่' },
      { type: 'text', value: 'เด็กชายสามารถห่อลิ้นได้เหมือนพ่อแม่และพี่สาว ถ้ามีความพยายามในการฝึกฝน' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 4',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'นักเรียนคนหนึ่งต้องการเปรียบเทียบความแข็งของวัสดุชนิดต่างๆ โดยนำวัสดุ A-D แต่ละชนิดมาขูดขีดกัน แล้วสังเกตรอยบนเนื้อวัสดุ โดยได้ข้อมูลดังตาราง\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 4]\nข้อใดลำดับความแข็งของวัสดุจากมากไปน้อยได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'A B D C' },
      { type: 'text', value: 'A D C B' },
      { type: 'text', value: 'B C A D' },
      { type: 'text', value: 'D C B A' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 5',
    indicator_code: 'ว 2.1 ป.6/1',
    content: [
      { type: 'text', value: 'วิธีใดเหมาะสมที่สุดในการแยกสารผสมระหว่างทรายและเกลือแกงปริมาณมากออกจากกัน' }
    ],
    options: [
      { type: 'text', value: 'การร่อน' },
      { type: 'text', value: 'การหยิบออก' },
      { type: 'text', value: 'การใช้แม่เหล็กดึงดูด' },
      { type: 'text', value: 'การละลายน้ำ กรอง และระเหยน้ำออก' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 6',
    indicator_code: 'ว 2.1 ป.5/2',
    content: [
      { type: 'text', value: 'เมื่อเทน้ำลงในแก้วที่มีน้ำตาลอยู่ แล้วใช้ช้อนคนสารจนมองไม่เห็นเกล็ดน้ำตาลในแก้ว หากนักเรียนสามารถมองเห็นอนุภาคของสารในแก้วน้ำหลังจากคนสารแล้ว นักเรียนคิดว่าสิ่งที่นักเรียนเห็นสอดคล้องกับรูปภาพในข้อใดมากที่สุด โดยกำหนดให้ (วงกลมดำ) แทนอนุภาคของน้ำ, (วงกลมขาว) แทนอนุภาคของน้ำตาล\n[รอคุณครูอัปโหลดรูปภาพข้อ 6]' }
    ],
    options: [
      { type: 'text', value: 'แบบจำลอง 1' },
      { type: 'text', value: 'แบบจำลอง 2' },
      { type: 'text', value: 'แบบจำลอง 3' },
      { type: 'text', value: 'แบบจำลอง 4' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 7',
    indicator_code: 'ว 2.2 ป.4/1',
    content: [
      { type: 'text', value: 'เหล็กมวล 3 กิโลกรัมและไม้มวล 2 กิโลกรัม วางอยู่นิ่งบนพื้นข้อใดต่อไปนี้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'แรงที่โลกดูดเหล็ก มากกว่า แรงที่โลกดูดไม้' },
      { type: 'text', value: 'แรงที่โลกดูดเหล็ก เท่ากับ แรงที่โลกดูดไม้' },
      { type: 'text', value: 'แรงที่โลกดูดเหล็ก น้อยกว่า แรงที่โลกดูดไม้' },
      { type: 'text', value: 'โลกไม่ได้ออกแรงดูดเหล็กหรือไม้ที่วางนิ่งอยู่' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 8',
    indicator_code: 'ว 2.2 ป.5/1',
    content: [
      { type: 'text', value: 'ดำออกแรงดัน 3 นิวตัน ดันกล่องใบหนึ่งดังแสดงในรูป พบว่ากล่องอยู่นิ่ง\n[รอคุณครูอัปโหลดรูปภาพข้อ 8]\nจงหาแรงเสียดทานที่พื้นกระทำต่อกล่อง' }
    ],
    options: [
      { type: 'text', value: '4 นิวตัน ไปทางซ้าย' },
      { type: 'text', value: '4 นิวตัน ไปทางขวา' },
      { type: 'text', value: '3 นิวตัน ไปทางซ้าย' },
      { type: 'text', value: '3 นิวตัน ไปทางขวา' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 9',
    indicator_code: 'ว 2.2 ป.6/1',
    content: [
      { type: 'text', value: 'เม็ดโฟมสองเม็ด เม็ดหนึ่งมีประจุบวก อีกเม็ดหนึ่งมีประจุลบ นำมาวางใกล้ๆ กัน แต่ไม่สัมผัสกัน ข้อใดอธิบายเกี่ยวกับแรงไฟฟ้าระหว่างเม็ดโฟมทั้งสองเม็ดนี้ได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'เป็นแรงดูด' },
      { type: 'text', value: 'เป็นแรงผลัก' },
      { type: 'text', value: 'เป็นได้ทั้งแรงผลักและแรงดูด' },
      { type: 'text', value: 'ไม่มีแรงไฟฟ้าเพราะเม็ดโฟมไม่ได้สัมผัสกัน' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 10',
    indicator_code: 'ว 2.3 ป.5/2',
    content: [
      { type: 'text', value: 'ปิติไปวัดแล้วตีระฆังใบหนึ่ง พบว่าเสียงระฆังที่ได้ยินดังเกินไปและรู้สึกว่าเสียงที่ออกมาสูงเกินไป ดังนั้นเพื่อให้ได้ยินเสียงที่ค่อยกว่าเดิมและเสียงที่ออกมาต่ำลง ปิติจะตีระฆังอันใดและอย่างไร' }
    ],
    options: [
      { type: 'text', value: 'ตีระฆังใบที่ใหญ่กว่าเดิมด้วยแรงที่น้อยกว่าเดิม' },
      { type: 'text', value: 'ตีระฆังใบที่ใหญ่กว่าเดิมด้วยแรงที่มากกว่าเดิม' },
      { type: 'text', value: 'ตีระฆังใบที่เล็กกว่าเดิมด้วยแรงที่น้อยกว่าเดิม' },
      { type: 'text', value: 'ตีระฆังใบที่เล็กกว่าเดิมด้วยแรงที่มากกว่าเดิม' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 11',
    indicator_code: 'ว 2.3 ป.6/2',
    content: [
      { type: 'text', value: 'จากรูปวงจรไฟฟ้า 2 รูป ข้อใดกล่าวถูกต้อง\n[รอคุณครูอัปโหลดรูปภาพข้อ 11]' }
    ],
    options: [
      { type: 'text', value: 'มอเตอร์ทั้งสองรูปหมุน' },
      { type: 'text', value: 'มอเตอร์ในรูปที่ 1 หมุน แต่มอเตอร์ในรูปที่ 2 ไม่หมุน' },
      { type: 'text', value: 'มอเตอร์ในรูปที่ 1 ไม่หมุน แต่มอเตอร์ในรูปที่ 2 หมุน' },
      { type: 'text', value: 'มอเตอร์ทั้งสองรูปไม่หมุน' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 12',
    indicator_code: 'ว 3.1 ป.4/2',
    content: [
      { type: 'text', value: 'แสงสว่างจากดวงจันทร์มีที่มาจากข้อใด' }
    ],
    options: [
      { type: 'text', value: 'ความร้อนจากผิวดวงจันทร์' },
      { type: 'text', value: 'แร่เปล่งแสงบนผิวดวงจันทร์' },
      { type: 'text', value: 'แสงสะท้อนจากโลก' },
      { type: 'text', value: 'แสงสะท้อนจากดวงอาทิตย์' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 13',
    indicator_code: 'ว 3.1 ป.5/2',
    content: [
      { type: 'text', value: 'ชูใจได้ข้อมูลมาว่า คืนนี้เวลา 2 ทุ่ม จะสามารถมองเห็นกลุ่มดาวคันชั่งที่มุมเงย 20 องศา มุมทิศ 270 องศา ดังนั้นขณะที่ชูใจสังเกตกลุ่มดาวนี้ในท้องฟ้าจริง ชูใจควรหันหน้าไปทางทิศใด' }
    ],
    options: [
      { type: 'text', value: 'ทิศเหนือ' },
      { type: 'text', value: 'ทิศใต้' },
      { type: 'text', value: 'ทิศตะวันออก' },
      { type: 'text', value: 'ทิศตะวันตก' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 14',
    indicator_code: 'ว 3.2 ป.6/1',
    content: [
      { type: 'text', value: 'จากการสำรวจหินพบหิน 3 ก้อน ดังตาราง\nหิน A: เกิดจากการเย็นตัวของแมกมาใต้ผิวโลก / เนื้อหินแสดงผลึกขนาดใหญ่ของแร่องค์ประกอบ\nหิน B: เกิดในแอ่งสะสมตะกอน ถูกแรงกดทับและเชื่อมประสาน / เนื้อหินเป็นเม็ดๆ\nหิน C: เกิดจากการถูกความร้อนและความดันมากระทำ / เนื้อหินเป็นแถบๆ เรียงตัวขนานกัน\nหินชนิด A B และ C เป็นหินประเภทใดตามลำดับ' }
    ],
    options: [
      { type: 'text', value: 'หินแปร หินอัคนี หินตะกอน' },
      { type: 'text', value: 'หินตะกอน หินแปร หินอัคนี' },
      { type: 'text', value: 'หินอัคนี หินตะกอน หินแปร' },
      { type: 'text', value: 'หินแปร หินตะกอน หินอัคนี' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 15',
    indicator_code: 'ว 3.2 ป.6/3',
    content: [
      { type: 'text', value: 'จากการสำรวจชั้นหิน A B C D E จากพื้นที่ 2 บริเวณ พบข้อมูลซากดึกดำบรรพ์ดัชนี ดังรูป\n[รอคุณครูอัปโหลดรูปภาพข้อ 15]\nซากดึกดำบรรพ์ดัชนี ก ในชั้นหิน C น่าจะเปรียบเทียบอายุได้กับซากดึกดำบรรพ์ดัชนีในชั้นหินข้อใดมากที่สุด' }
    ],
    options: [
      { type: 'text', value: 'A' },
      { type: 'text', value: 'B' },
      { type: 'text', value: 'D' },
      { type: 'text', value: 'E' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 16',
    indicator_code: 'ว 3.2 ป.6/4',
    content: [
      { type: 'text', value: 'ฤดูของประเทศไทยเป็นผลจากมรสุมตะวันตกเฉียงใต้และมรสุมตะวันออกเฉียงเหนือ โดยมรสุมตะวันตกเฉียงใต้เป็นลมที่นำความชื้นจากมหาสมุทรอินเดียผ่านทะเลอันดามันเข้ามาบริเวณประเทศไทย ทำให้ฝนตกชุก ในขณะที่มรสุมตะวันออกเฉียงเหนือพัดพาลมที่มีอุณหภูมิต่ำและความชื้นน้อยจากตอนเหนือของประเทศจีนเข้ามาบริเวณประเทศไทย ทำให้ปริมาณน้ำฝนลดลง\nข้อมูลแสดงปริมาณน้ำฝนรายเดือนบริเวณประเทศไทย\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 16]\nจากข้อมูลข้างต้นประเทศไทยได้รับอิทธิพลจากมรสุมตะวันออกเฉียงเหนือในเดือนใด' }
    ],
    options: [
      { type: 'text', value: 'มกราคม' },
      { type: 'text', value: 'มีนาคม' },
      { type: 'text', value: 'มิถุนายน' },
      { type: 'text', value: 'กันยายน' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 17',
    indicator_code: 'ว 4.2 ป.6/1',
    content: [
      { type: 'text', value: 'จากภาพที่ 1 จะมีลูกปัดรูปวงกลม หัวใจ ดาว เสียบอยู่บนเข็ม A หากต้องการนำลูกปัดจากเข็ม A ไปวางในเข็ม B และ C ตามภาพที่ 2 โดยมีเงื่อนไขว่าให้ยกลูกปัดได้เพียงครั้งละ 1 ลูก นักเรียนต้องยกลูกปัดให้น้อยที่สุดจำนวนกี่ครั้ง เพื่อให้ได้ผลลัพธ์ตามภาพที่ 2\n[รอคุณครูอัปโหลดรูปภาพข้อ 17]' }
    ],
    options: [
      { type: 'text', value: '5 ครั้ง' },
      { type: 'text', value: '6 ครั้ง' },
      { type: 'text', value: '7 ครั้ง' },
      { type: 'text', value: '8 ครั้ง' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 65',
    note: 'ข้อ 18',
    indicator_code: 'ว 4.2 ป.6/3',
    content: [
      { type: 'text', value: 'ครูสอนรายวิชาประวัติศาสตร์ได้มอบหมายงานกลุ่มให้นักเรียนค้นหาข้อมูลเกี่ยวกับ วันปิยมหาราช จากแหล่งข้อมูลที่มีความน่าเชื่อถือบนเว็บไซต์ของหน่วยงานทางการศึกษา ข้อใดเป็นการพิมพ์คำค้นหาตามสถานการณ์ที่กำหนดได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: '"วันปิยมหาราช site:org"' },
      { type: 'text', value: '"วันปิยมหาราช site:go.th"' },
      { type: 'text', value: '"วันปิยมหาราช site:or.th"' },
      { type: 'text', value: '"วันปิยมหาราช site:ac.th"' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 65',
    note: 'ข้อ 19',
    indicator_code: 'ว 1.2 ป.4/1',
    content: [
      { type: 'text', value: 'ตอนที่ 2: แบบปรนัยเลือกตอบเชิงซ้อน\nพืชชนิดหนึ่งมีโครงสร้างใต้ดินโป่งพองเป็นหัว ไม่มีข้อปล้อง แต่มีตา เมื่อนำหัวดังกล่าววางทิ้งไว้และมีความชื้นพอสมควร พบว่ามียอดอ่อนเจริญขึ้นจากตาได้\nจากข้อมูล ข้อความต่อไปนี้ถูกต้องใช่หรือไม่ใช่' }
    ],
    complex_questions: [
      {
        question: '19.1 พืชชนิดนี้มีลำต้นใต้ดิน',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '19.2 หัวใต้ดินนี้คือรากสะสมอาหาร',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '19.3 เราสามารถใช้หัวใต้ดินนี้ในการขยายพันธุ์ได้',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 65',
    note: 'ข้อ 20',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'การทดลองต่อไปนี้สอดคล้องกับนิยามเชิงปฏิบัติการเพื่อศึกษาสมบัติทางกายภาพของวัสดุด้านสภาพยืดหยุ่น การนำความร้อน และการนำไฟฟ้าของวัสดุ ใช่หรือไม่ใช่' }
    ],
    complex_questions: [
      {
        question: '20.1 ศึกษาความยืดหยุ่นโดยวัดความยาวของวัสดุขนาด 10.00 cm เมื่อถ่วงด้วยลูกตุ้มวัดได้ 12.00 cm และเมื่อนำลูกตุ้มออกวัดได้ 10.00 cm',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '20.2 ศึกษาการนำความร้อนของวัสดุ โดยนำวัสดุไปต้มเป็นเวลา 5 นาที จากนั้นตั้งทิ้งไว้ 5 นาทีแล้ววัดอุณหภูมิ',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '20.3 ศึกษาการนำไฟฟ้าของวัสดุ โดยการสังเกตว่าหลอดไฟติดหรือไม่เมื่อต่อวัสดุเข้ากับวงจรไฟฟ้า',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  }
];

async function seed() {
  console.log("Seeding O-NET 65 questions...");
  const formattedQuestions = onet65Questions.map(q => {
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
  console.log("Seeding O-NET 65 complete!");
}

seed();
