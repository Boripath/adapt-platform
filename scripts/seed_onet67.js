import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const onet67Questions = [
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 1',
    indicator_code: 'ว 1.1 ป.5/3',
    content: [
      { type: 'text', value: 'ในการสำรวจนาข้าวแห่งหนึ่ง พบสิ่งมีชีวิตต่างๆ ดังนี้ ข้าว หญ้า ควาย ตั๊กแตน นกกระจิบ หนอน งู หนูนา ปลาช่อน ลูกกบ\nข้อใดคือโซ่อาหารที่ถูกต้องในระบบนิเวศ ดังกล่าว' }
    ],
    options: [
      { type: 'text', value: 'หญ้า -> ควาย -> หนูนา -> งู' },
      { type: 'text', value: 'ข้าว -> หนอน -> นกกระจิบ -> ปลาช่อน' },
      { type: 'text', value: 'นกกระจิบ -> ลูกกบ -> ปลาช่อน -> งู' },
      { type: 'text', value: 'หญ้า -> ตั๊กแตน -> นกกระจิบ -> งู' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 2',
    indicator_code: 'ว 1.2 ป.6/4',
    content: [
      { type: 'text', value: 'ข้อใดระบุหน้าที่ของอวัยวะในระบบย่อยอาหารได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'ตับ สร้างน้ำย่อยที่ช่วยให้ไขมันแตกตัว' },
      { type: 'text', value: 'ตับอ่อน สร้างเอนไซม์เพื่อช่วยย่อยคาร์โบไฮเดรต' },
      { type: 'text', value: 'ลำไส้เล็ก สร้างกรดและเอนไซม์เพื่อช่วยย่อยโปรตีน' },
      { type: 'text', value: 'ลำไส้ใหญ่ ดูดซึมสารอาหารทุกประเภทเข้าสู่หลอดเลือด' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 3',
    indicator_code: 'ว 1.3 ป.4/4',
    content: [
      { type: 'text', value: 'สัตว์ในข้อใดเป็นสัตว์ไม่มีกระดูกสันหลัง' }
    ],
    options: [
      { type: 'text', value: 'ปูนา' },
      { type: 'text', value: 'ม้าน้ำ' },
      { type: 'text', value: 'คางคก' },
      { type: 'text', value: 'ปลานิล' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 4',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'นักเรียนต้องการศึกษาเปรียบเทียบสภาพยืดหยุ่นของวัสดุ A-D ซึ่งวัสดุทั้ง 4 ชนิด มีความยาวก่อนทดลองแขวนถุงทรายเท่ากัน คือ 20 เซนติเมตร ได้ผลการทดลองดังตาราง\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 4]\nวัสดุชนิดใดมีสภาพยืดหยุ่นดีที่สุด' }
    ],
    options: [
      { type: 'text', value: 'A' },
      { type: 'text', value: 'B' },
      { type: 'text', value: 'C' },
      { type: 'text', value: 'D' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 5',
    indicator_code: 'ว 2.1 ป.5/3',
    content: [
      { type: 'text', value: 'พิจารณาการเปลี่ยนแปลงต่อไปนี้\nA. ของแข็งสีแดงละลายได้ในของเหลว\nB. ของเหลว 2 ชนิดผสมกันแล้วเกิดฟองแก๊ส\nC. ของเหลวไม่มีสี 2 ชนิดผสมกันเกิดตะกอนสีเหลือง\nD. ของแข็งสีแดงผสมกับน้ำมีของแข็งบางส่วนลอยและมีบางส่วนตกตะกอน\nการเปลี่ยนแปลงใดเป็นการเปลี่ยนแปลงทางเคมี' }
    ],
    options: [
      { type: 'text', value: 'A และ B เท่านั้น' },
      { type: 'text', value: 'B และ C เท่านั้น' },
      { type: 'text', value: 'C และ D เท่านั้น' },
      { type: 'text', value: 'B และ D เท่านั้น' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 6',
    indicator_code: 'ว 2.1 ป.6/1',
    content: [
      { type: 'text', value: 'ข้อใดใช้วิธีการที่ไม่เหมาะสมในการแยกสารผสมออกจากกัน' }
    ],
    options: [
      { type: 'text', value: 'แยกน้ำมันที่ลอยบนน้ำแกงด้วยการกรองผ่านกระดาษกรอง' },
      { type: 'text', value: 'แยกผงเหล็กออกจากเมล็ดข้าวด้วยแม่เหล็ก' },
      { type: 'text', value: 'แยกกากมะพร้าวออกจากน้ำกะทิด้วยการกรองกระดาษกรอง' },
      { type: 'text', value: 'แยกเปลือกของเมล็ดถั่วลิสงกับเมล็ดถั่วลิสงคั่วด้วยการฝัด' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 7',
    indicator_code: 'ว 2.2 ป.4/1',
    content: [
      { type: 'text', value: 'ชั่งกระสอบบรรจุก้อนหินด้วยเครื่องชั่งสปริงได้ 30 นิวตัน จากนั้นชั่งกระสอบบรรจุใบไม้ด้วยเครื่องชั่งเดียวกันได้ 50 นิวตัน ข้อใดถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'แรงที่โลกดูดกระสอบบรรจุใบไม้มีค่ามากกว่าแรงที่โลกดูดกระสอบบรรจุก้อนหิน' },
      { type: 'text', value: 'กระสอบบรรจุก้อนหินมีน้ำหนักมากกว่ากระสอบบรรจุใบไม้' },
      { type: 'text', value: 'กระสอบบรรจุก้อนหินต้านการเคลื่อนที่มากกว่ากระสอบบรรจุใบไม้' },
      { type: 'text', value: 'หากนำกระสอบทั้งสองไปชั่งบนดวงจันทร์ด้วยเครื่องชั่งอันเดียวกัน จะอ่านค่าได้เท่ากับเมื่อชั่งบนโลก' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 8',
    indicator_code: 'ว 2.2 ป.5/1',
    content: [
      { type: 'text', value: 'เครื่องชั่งสปริง A และ B คล้องอยู่กับวัตถุดังรูป ออกแรงดึงเครื่องชั่งสปริงทั้งสองไปทางขวา ส่งผลให้เครื่องชั่งสปริง A อ่านค่าได้ 10 นิวตัน เครื่องชั่งสปริง B อ่านค่าได้ 5 นิวตัน ต้องออกแรงกระทำที่จุด C อย่างไร จึงจะทำให้วัตถุไม่เคลื่อนที่\n[รอคุณครูอัปโหลดรูปภาพข้อ 8]' }
    ],
    options: [
      { type: 'text', value: 'ออกแรง 5 นิวตันไปทางซ้าย' },
      { type: 'text', value: 'ออกแรง 15 นิวตันไปทางซ้าย' },
      { type: 'text', value: 'ออกแรง 5 นิวตันไปทางขวา' },
      { type: 'text', value: 'ออกแรง 15 นิวตันไปทางขวา' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 9',
    indicator_code: 'ว 2.2 ป.6/1',
    content: [
      { type: 'text', value: 'นำวัตถุ A และ B มาถูกัน หลังจากนั้นนำวัตถุ A มาเข้าใกล้แต่ไม่สัมผัสกับเศษกระดาษ ซึ่งเป็นกลางทางไฟฟ้า พบว่าวัตถุ A ดูดเศษกระดาษ จะเกิดอะไรขึ้นหากนำวัตถุ B มาเข้าใกล้แต่ไม่สัมผัสกับเศษกระดาษซึ่งเป็นกลางทางไฟฟ้า' }
    ],
    options: [
      { type: 'text', value: 'วัตถุ B ไม่ออกแรงกระทำกับเศษกระดาษ' },
      { type: 'text', value: 'วัตถุ B ผลักเศษกระดาษ' },
      { type: 'text', value: 'วัตถุ B ดูดเศษกระดาษ' },
      { type: 'text', value: 'ไม่สามารถสรุปได้เนื่องจากไม่ทราบชนิดของประจุไฟฟ้าบนวัตถุ B' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 10',
    indicator_code: 'ว 2.3 ป.5/1',
    content: [
      { type: 'text', value: 'สถานการณ์ใด ที่ผู้ฟังจะไม่ได้ยินเสียงเคาะแท่งเหล็ก' }
    ],
    options: [
      { type: 'text', value: 'เคาะแท่งเหล็กอยู่บนบก ริมสระน้ำ ผู้ฟังอยู่ใต้ผิวน้ำในสระน้ำ' },
      { type: 'text', value: 'เคาะแท่งเหล็กใต้ผิวน้ำในสระน้ำ ผู้ฟังดำน้ำอยู่ในสระน้ำ' },
      { type: 'text', value: 'เคาะแท่งเหล็กในห้องสุญญากาศ ผู้ฟังอยู่นอกห้อง' },
      { type: 'text', value: 'เคาะแท่งเหล็กในยานอวกาศนอกโลก ผู้ฟังอยู่ในยานอวกาศ' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 11',
    indicator_code: 'ว 2.3 ป.6/2',
    content: [
      { type: 'text', value: 'จากรูปวงจรไฟฟ้า หลอดไฟฟ้าหลอดใด เมื่อถอดออก หลอดไฟฟ้าที่เหลืออีกสามหลอด จะดับทั้งหมด\n[รอคุณครูอัปโหลดรูปภาพข้อ 11]' }
    ],
    options: [
      { type: 'text', value: 'A' },
      { type: 'text', value: 'B' },
      { type: 'text', value: 'C' },
      { type: 'text', value: 'D' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 12',
    indicator_code: 'ว 3.1 ป.4/2',
    content: [
      { type: 'text', value: 'ในวันแรม 15 ค่ำ เวลาเที่ยงคืน เราจะมองเห็นดวงจันทร์บนท้องฟ้ามีลักษณะเป็นอย่างไร' }
    ],
    options: [
      { type: 'text', value: 'มีรูปร่างกลม' },
      { type: 'text', value: 'มีรูปร่างประมาณครึ่งวงกลม' },
      { type: 'text', value: 'มีรูปร่างเป็นเสี้ยว' },
      { type: 'text', value: 'ไม่เห็นดวงจันทร์บนท้องฟ้า' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 13',
    indicator_code: 'ว 3.1 ป.5/2',
    content: [
      { type: 'text', value: 'ขณะที่มานีมองไปบนท้องฟ้าตอน 1 ทุ่ม พบว่าทางมุมทิศ 90 องศา มุมเงย 5 องศา มีกลุ่มดาววัวอยู่ ครั้งถัดไปที่มานีจะมองเห็นกลุ่มดาววัวที่ตำแหน่งเดิม ตอน 1 ทุ่ม คือเมื่อไร' }
    ],
    options: [
      { type: 'text', value: 'หนึ่งวันถัดไป' },
      { type: 'text', value: 'หนึ่งสัปดาห์ถัดไป' },
      { type: 'text', value: 'หนึ่งเดือนถัดไป' },
      { type: 'text', value: 'หนึ่งปีถัดไป' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 14',
    indicator_code: 'ว 3.2 ป.5/1',
    content: [
      { type: 'text', value: 'นักเรียนรวบรวมข้อมูลลักษณะและการเกิดของหยาดน้ำฟ้า A B และ C ดังตาราง\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 14]\nข้อใดเรียงลำดับของหยาดน้ำฟ้า A B และ C ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'หิมะ ลูกเห็บ ฝน' },
      { type: 'text', value: 'ลูกเห็บ ฝน หิมะ' },
      { type: 'text', value: 'ฝน หิมะ ลูกเห็บ' },
      { type: 'text', value: 'ลูกเห็บ หิมะ ฝน' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 15',
    indicator_code: 'ว 3.2 ป.6/1',
    content: [
      { type: 'text', value: 'ข้อใดเป็นลักษณะของหินตะกอน' }
    ],
    options: [
      { type: 'text', value: 'เนื้อหินแสดงผลึกขนาดใหญ่ของแร่องค์ประกอบชัดเจน' },
      { type: 'text', value: 'เนื้อหินเป็นแถบๆ เรียงตัวขนานกัน' },
      { type: 'text', value: 'เนื้อหินเป็นเม็ดๆ พบซากดึกดำบรรพ์ฝังตัวในเนื้อหิน' },
      { type: 'text', value: 'เนื้อหินละเอียด พบรูพรุนจำนวนมาก น้ำหนักเบา' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 16',
    indicator_code: 'ว 3.2 ป.6/4',
    content: [
      { type: 'text', value: 'พิบัติภัยใดที่น่าจะมีโอกาสเกิดขึ้นในบริเวณชุมชนที่ตั้งอยู่ในบริเวณที่ราบติดทะเล มากที่สุด' }
    ],
    options: [
      { type: 'text', value: 'สึนามิ และดินถล่ม' },
      { type: 'text', value: 'น้ำท่วม และดินถล่ม' },
      { type: 'text', value: 'สึนามิ และการกัดเซาะชายฝั่ง' },
      { type: 'text', value: 'ดินถล่ม และการกัดเซาะชายฝั่ง' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 17',
    indicator_code: 'ว 4.2 ป.6/1',
    content: [
      { type: 'text', value: 'นักเรียนได้รับการแจ้งข่าวจากครูเวรประจำวันว่า ค่าน้ำประปาของโรงเรียนมีแนวโน้มที่จะเพิ่มขึ้นในเดือนถัดไป นักเรียนและเพื่อนๆ ต้องการหาวิธีที่จะช่วยลดการใช้น้ำในห้องน้ำของโรงเรียน นักเรียนได้สร้างโปรแกรมเพื่อติดตามและวิเคราะห์การใช้น้ำในห้องน้ำในแต่ละช่วงเวลา ขั้นตอนการทำงานของโปรแกรมมีดังนี้\na. แสดงผลลัพธ์และแนะนำผ่านหน้าจอแสดงผล\nb. คำนวณและเปรียบเทียบค่าน้ำในแต่ละทางเลือกที่คาดว่าจะต้องจ่ายในเดือนถัดไป\nc. ให้โปรแกรมเก็บข้อมูลการใช้น้ำในแต่ละช่วงเวลา\nd. วิเคราะห์ข้อมูลเพื่อหาช่วงเวลาที่มีการใช้น้ำมากที่สุด\ne. สร้างทางเลือกในการลดการใช้น้ำในแต่ละช่วงเวลา\nf. กำหนดตัวแปรสำหรับการใช้น้ำทั้งหมดและการใช้น้ำในแต่ละช่วงเวลา\nข้อใดเป็นการเรียงลำดับขั้นตอนการทำงานของโปรแกรมได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'f -> d -> c -> b -> e -> a' },
      { type: 'text', value: 'f -> c -> d -> e -> b -> a' },
      { type: 'text', value: 'f -> c -> e -> d -> b -> a' },
      { type: 'text', value: 'f -> d -> c -> e -> b -> a' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 67',
    note: 'ข้อ 18',
    indicator_code: 'ว 4.2 ป.5/5',
    content: [
      { type: 'text', value: 'วันหนึ่งนักเรียนเห็นบุคคลที่มีอิทธิพลบนโซเชียลมีเดียโพสต์เนื้อหาที่ไม่เหมาะสม และส่งเสริมให้มีการก่อความรุนแรง วิธีการใดที่ควรปฏิบัติเพื่อทำให้สถานการณ์นี้ดีขึ้นโดยไม่ทำให้เกิดผลลบต่อตนเองและผู้อื่น' }
    ],
    options: [
      { type: 'text', value: 'บล็อกบุคคลนั้นและตัดสินใจไม่ทำอะไรเพิ่มเติม' },
      { type: 'text', value: 'ตอบโต้โพสต์นั้นโดยใช้คำหยาบคายและแสดงความไม่เห็นด้วย' },
      { type: 'text', value: 'แชร์โพสต์นั้นต่อไปในเครือข่ายของนักเรียนเพื่อแสดงความไม่เห็นด้วย' },
      { type: 'text', value: 'รายงานโพสต์นั้นให้กับผู้ดูแลระบบของโซเชียลมีเดียและอธิบายเหตุผลของการรายงาน' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 67',
    note: 'ข้อ 19',
    indicator_code: 'ว 1.2 ป.4/1',
    content: [
      { type: 'text', value: 'ตอนที่ 2: แบบปรนัยเลือกตอบเชิงซ้อน\nต้นไม้ต้นหนึ่งมีการแตกกิ่งก้านทางด้านขวามากกว่าด้านซ้าย ดังรูป\n[รอคุณครูอัปโหลดรูปภาพข้อ 19]' }
    ],
    complex_questions: [
      {
        question: '19.1 ด้านขวาของต้นปลดปล่อยออกซิเจนมากกว่าด้านซ้าย',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '19.2 ด้านซ้ายของต้นดูดแก๊สคาร์บอนไดออกไซด์มากกว่าด้านขวา',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '19.3 ด้านขวาของต้นสร้างน้ำตาลได้มากกว่าด้านซ้าย',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 67',
    note: 'ข้อ 20',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'นำวัสดุ 4 ชนิดคือ A B C และ D มาทดสอบการนำความร้อนด้วยอุปกรณ์ทดลอง ดังรูป โดยวางดินน้ำมันขนาดเท่ากันที่ปลายวัสดุ และเริ่มจับเวลาตั้งแต่เทน้ำร้อนจนดินน้ำมันเริ่มเยิ้ม\n[รอคุณครูอัปโหลดรูปภาพข้อ 20]\nผลการทดลองดังตาราง:\nวัสดุ A: 4 นาที\nวัสดุ B: 6 นาที\nวัสดุ C: 2 นาที\nวัสดุ D: 8 นาที' }
    ],
    complex_questions: [
      {
        question: '20.1 จากวัสดุทั้ง 4 ชนิด วัสดุ B นำความร้อนได้ดีที่สุด',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '20.2 จากวัสดุทั้ง 4 ชนิด วัสดุ D เหมาะสมในการนำไปทำเป็นด้ามกระทะที่สุด',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '20.3 จากวัสดุทั้ง 4 ชนิด วัสดุ C เหมาะสมในการนำไปทำเป็นกระทะที่สุด',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  }
];

async function seed() {
  console.log("Seeding O-NET 67 questions...");
  const formattedQuestions = onet67Questions.map(q => {
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
  console.log("Seeding complete!");
}

seed();
