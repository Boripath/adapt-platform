import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env file.");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const onet66Questions = [
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 1',
    indicator_code: 'ว 1.1 ป.5/1',
    content: [
      { type: 'text', value: 'ข้อใดเป็นความสัมพันธ์ระหว่างสิ่งมีชีวิตและสิ่งไม่มีชีวิตในแหล่งที่อยู่' }
    ],
    options: [
      { type: 'text', value: 'ผึ้งดูดน้ำหวานจากดอกไม้' },
      { type: 'text', value: 'กระรอกอาศัยอยู่บนต้นไม้' },
      { type: 'text', value: 'ผีเสื้อกินแร่ธาตุที่อยู่ในดินโป่ง' },
      { type: 'text', value: 'นกเอี้ยงอาศัยอยู่บนหลังควาย' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 2',
    indicator_code: 'ว 1.2 ป.6/4',
    content: [
      { type: 'text', value: 'เมื่อรับประทานถั่วลิสง การย่อยไขมันจากถั่วลิสงจะเกิดขึ้นที่อวัยวะใด และสารที่ใช้ในการย่อยสร้างขึ้นจากอวัยวะใด\n(ตัวเลือก: อวัยวะที่มีการย่อย / อวัยวะที่สร้างสารที่ใช้ในการย่อย)' }
    ],
    options: [
      { type: 'text', value: 'ลำไส้เล็ก / ตับ และ ตับอ่อน' },
      { type: 'text', value: 'ลำไส้ใหญ่ / ตับอ่อน และ ลำไส้ใหญ่' },
      { type: 'text', value: 'ลำไส้ใหญ่ / ตับ และ ตับอ่อน' },
      { type: 'text', value: 'ลำไส้เล็ก / ตับอ่อน และ ลำไส้ใหญ่' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 3',
    indicator_code: 'ว 1.3 ป.4/1',
    content: [
      { type: 'text', value: 'ข้อใดเกี่ยวข้องกับการสืบพันธุ์แบบไม่อาศัยเพศของสิ่งมีชีวิต' }
    ],
    options: [
      { type: 'text', value: 'การขุดหน่อกล้วยน้ำว้าพันธุ์ดีไปจำหน่ายเป็นรายได้เสริม' },
      { type: 'text', value: 'การผสมโคพันธุ์โฮลสไตน์กับพันธุ์ชาฮิวาลเพื่อให้ได้ลูกที่มีน้ำนมสูงขึ้น' },
      { type: 'text', value: 'การปลูกถั่วเขียวจากเมล็ดเพื่อบำรุงดินและสร้างรายได้หลังการทำนา' },
      { type: 'text', value: 'การผสมเทียมปลาบึกของกรมประมงเพื่อเพิ่มจำนวนประชากรปลาบึก' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 4',
    indicator_code: 'ว 2.1 ป.4/1',
    content: [
      { type: 'text', value: 'ตารางต่อไปนี้แสดงข้อมูลสสาร 3 ชนิด A B และ C ที่บรรจุในภาชนะใสปิดสนิท\nมวลของสสาร: A(4.0 กรัม), B(4.6 กิโลกรัม), C(5.0 กิโลกรัม)\nปริมาตรของสสาร: A(3 ลิตร), B(5 ลิตร), C(5 ลิตร)\nปริมาตรของภาชนะ: A(3 ลิตร), B(6 ลิตร), C(9 ลิตร)\nข้อสังเกตเมื่อยกเอียงภาชนะ: A(ไม่เห็นการเปลี่ยนแปลง), B(สสารยังคงรูปร่างเดิม), C(ผิวหน้ารักษาระดับในแนวราบ)\nข้อใดจำแนกชนิดของสาร A B และ C ได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'A: แก๊ส, B: ของแข็ง, C: ของเหลว' },
      { type: 'text', value: 'A: ของแข็ง, B: ของเหลว, C: แก๊ส' },
      { type: 'text', value: 'A: ของเหลว, B: แก๊ส, C: ของแข็ง' },
      { type: 'text', value: 'A: แก๊ส, B: ของเหลว, C: ของแข็ง' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 5',
    indicator_code: 'ว 2.1 ป.5/2',
    content: [
      { type: 'text', value: 'เมื่อนำของแข็ง A มารวมตัวกับของเหลว B เกิดเป็นของเหลวเนื้อเดียว โดยหลังการเปลี่ยนแปลงสารแต่ละชนิดยังคงเป็นสารเดิม แบบจำลองใดแสดงลักษณะอนุภาคในของเหลวเนื้อเดียวนี้ได้ถูกต้อง เมื่อ วงกลมดำ แทนอนุภาคของ A, วงกลมขาว แทนอนุภาคของ B\n[รอคุณครูอัปโหลดรูปภาพข้อ 5]' }
    ],
    options: [
      { type: 'text', value: 'แบบจำลอง 1' },
      { type: 'text', value: 'แบบจำลอง 2' },
      { type: 'text', value: 'แบบจำลอง 3' },
      { type: 'text', value: 'แบบจำลอง 4' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 6',
    indicator_code: 'ว 2.1 ป.6/1',
    content: [
      { type: 'text', value: 'ข้อใดเป็นวิธีแยกถั่วเขียวและลูกเกดที่มีขนาดใกล้เคียงกันออกจากกัน' }
    ],
    options: [
      { type: 'text', value: 'การฝัด' },
      { type: 'text', value: 'การร่อน' },
      { type: 'text', value: 'การกรอง' },
      { type: 'text', value: 'การหยิบออก' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 7',
    indicator_code: 'ว 2.2 ป.4/1',
    content: [
      { type: 'text', value: 'เหล็กมวล 3 กิโลกรัม และไม้ซึ่งมีขนาดใหญ่กว่าเหล็ก แต่มีมวล 3 กิโลกรัมเท่ากัน วางอยู่นิ่งบนพื้น ข้อใดถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'แรงที่โลกดูดเหล็ก มากกว่า แรงที่โลกดูดไม้' },
      { type: 'text', value: 'แรงที่โลกดูดเหล็ก เท่ากับ แรงที่โลกดูดไม้' },
      { type: 'text', value: 'แรงที่โลกดูดเหล็ก น้อยกว่า แรงที่โลกดูดไม้' },
      { type: 'text', value: 'โลกไม่ได้ออกแรงดูดเหล็กหรือไม้ที่วางนิ่งอยู่' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 8',
    indicator_code: 'ว 2.2 ป.5/1',
    content: [
      { type: 'text', value: 'นักเรียนออกแรงดันกล่องที่วางอยู่บนพื้นในแนวระดับ แสดงในรูป พบว่ากล่องอยู่นิ่ง โดยที่แรงเสียดทานที่เกิดขึ้นมีขนาด 3 นิวตัน และมีทิศไปทางซ้าย\n[รอคุณครูอัปโหลดรูปภาพข้อ 8]\nข้อใดถูกต้องเกี่ยวกับแรงที่นักเรียนดันกล่อง' }
    ],
    options: [
      { type: 'text', value: '2 นิวตัน ไปทางซ้าย' },
      { type: 'text', value: '2 นิวตัน ไปทางขวา' },
      { type: 'text', value: '3 นิวตัน ไปทางซ้าย' },
      { type: 'text', value: '3 นิวตัน ไปทางขวา' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 9',
    indicator_code: 'ว 2.2 ป.6/1',
    content: [
      { type: 'text', value: 'เม็ดโฟมสองเม็ดต่างก็มีประจุเดียวกัน นำมาวางใกล้ๆ กัน แต่ไม่สัมผัสกัน ข้อใดอธิบายเกี่ยวกับแรงไฟฟ้าระหว่างเม็ดโฟมทั้งสองเม็ดนี้ได้ถูกต้อง' }
    ],
    options: [
      { type: 'text', value: 'เป็นแรงดูด' },
      { type: 'text', value: 'เป็นแรงผลัก' },
      { type: 'text', value: 'เป็นได้ทั้งแรงผลักและแรงดูด' },
      { type: 'text', value: 'ไม่มีแรงไฟฟ้าเพราะเม็ดโฟมไม่ได้สัมผัสกัน' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 10',
    indicator_code: 'ว 2.3 ป.5/2',
    content: [
      { type: 'text', value: 'มีนาต้องการประดิษฐ์เครื่องดนตรีจากขวดน้ำ ขณะเขาทำการทดสอบเสียงที่เกิดจากขวดบรรจุน้ำใบหนึ่งด้วยการเคาะไปที่ข้างๆ ขวด มีนาพบว่าเสียงที่เกิดขึ้นแหลมเกินไป มีนาควรทำอย่างไร' }
    ],
    options: [
      { type: 'text', value: 'เติมน้ำเพิ่มและเคาะด้วยแรงเท่าเดิม' },
      { type: 'text', value: 'เทน้ำออกบางส่วนและเคาะด้วยแรงเท่าเดิม' },
      { type: 'text', value: 'ใช้ระดับน้ำเท่าเดิมแต่เคาะด้วยแรงที่น้อยกว่าเดิม' },
      { type: 'text', value: 'ใช้ระดับน้ำเท่าเดิมแต่เคาะด้วยแรงที่มากกว่าเดิม' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 11',
    indicator_code: 'ว 2.3 ป.6/2',
    content: [
      { type: 'text', value: 'จากรูปวงจรไฟฟ้า ข้อใดถูกต้อง\n[รอคุณครูอัปโหลดรูปภาพข้อ 11]' }
    ],
    options: [
      { type: 'text', value: 'หลอดไฟ A สว่าง ออดไฟฟ้าดัง' },
      { type: 'text', value: 'หลอดไฟ A ไม่สว่าง ออดไฟฟ้าดัง' },
      { type: 'text', value: 'หลอดไฟ A สว่าง ออดไฟฟ้าไม่ดัง' },
      { type: 'text', value: 'หลอดไฟ A ไม่สว่าง ออดไฟฟ้าไม่ดัง' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 12',
    indicator_code: 'ว 3.1 ป.4/2',
    content: [
      { type: 'text', value: 'การที่ดวงจันทร์เป็นดาวคล้ายทรงกลม ไม่มีแสงในตัวเอง แต่สะท้อนแสงจากดวงอาทิตย์ ทำให้คนบนโลกสามารถเห็นดวงจันทร์ในช่วงเวลาใด' }
    ],
    options: [
      { type: 'text', value: 'ข้างขึ้นเท่านั้น' },
      { type: 'text', value: 'ข้างแรมเท่านั้น' },
      { type: 'text', value: 'ข้างขึ้นและข้างแรม' },
      { type: 'text', value: 'พระจันทร์เต็มดวงเท่านั้น' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 13',
    indicator_code: 'ว 3.1 ป.5/2',
    content: [
      { type: 'text', value: 'ชูใจได้ข้อมูลมาว่า คืนนี้เวลา 2 ทุ่ม จะสามารถมองเห็นกลุ่มดาวเป้าหมายที่มุมเงย 22 องศา มุมทิศ 90 องศา ถ้าชูใจจะสังเกตกลุ่มดาวนี้บนท้องฟ้า ชูใจควรหันหน้าไปทางทิศใด' }
    ],
    options: [
      { type: 'text', value: 'ทิศเหนือ' },
      { type: 'text', value: 'ทิศใต้' },
      { type: 'text', value: 'ทิศตะวันออก' },
      { type: 'text', value: 'ทิศตะวันตก' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 14',
    indicator_code: 'ว 3.2 ป.6/1',
    content: [
      { type: 'text', value: 'จากการสำรวจหิน พบหิน 3 ก้อน ดังตาราง\nหินก้อนที่ 1: เนื้อหินแสดงผลึกขนาดใหญ่ของแร่องค์ประกอบ / เกิดจากการเย็นตัวของแมกมาใต้ผิวโลก\nหินก้อนที่ 2: เนื้อหินเป็นเม็ดๆ พบซากดึกดำบรรพ์ฝังในเนื้อหิน / เกิดในแอ่งสะสมตะกอน ถูกแรงกดทับและเชื่อมประสาน\nหินก้อนที่ 3: เนื้อหินเป็นแถบๆ เรียงตัวขนานกัน / เกิดจากการถูกความร้อนและความดันมากระทำ\nข้อใดมีลักษณะตรงตามหินก้อนที่ 1 2 และ 3 ตามลำดับ' }
    ],
    options: [
      { type: 'text', value: 'หินแกรนิต หินไนส์ หินทราย' },
      { type: 'text', value: 'หินไนส์ หินทราย หินแกรนิต' },
      { type: 'text', value: 'หินแกรนิต หินทราย หินไนส์' },
      { type: 'text', value: 'หินไนส์ หินแกรนิต หินทราย' }
    ],
    correct_answer_index: 2,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 15',
    indicator_code: 'ว 3.2 ป.6/3',
    content: [
      { type: 'text', value: 'ไดโนเสาร์เป็นสิ่งมีชีวิตที่อยู่ในยุคไทรแอสสิก จูแรสสิก และครีเทเชียส ข้อใดคือชนิดของซากดึกดำบรรพ์ที่สามารถเกิดขึ้นได้ในชั้นหินที่ไดโนเสาร์เคยเดินผ่าน' }
    ],
    options: [
      { type: 'text', value: 'รูปพิมพ์' },
      { type: 'text', value: 'รอยพิมพ์' },
      { type: 'text', value: 'รูปพิมพ์และรอยพิมพ์' },
      { type: 'text', value: 'ซากดึกดำบรรพ์โครงร่างแข็ง' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 16',
    indicator_code: 'ว 3.2 ป.6/4',
    content: [
      { type: 'text', value: 'ลมบริเวณชายฝั่งทะเลเกิดจากความแตกต่างของอุณหภูมิอากาศระหว่างพื้นดินและพื้นน้ำ จากการตรวจวัดอุณหภูมิอากาศเหนือพื้นดินบริเวณชายฝั่งดังรูป\n[รอคุณครูอัปโหลดรูปภาพกราฟข้อ 16]\nจากข้อมูลดังกล่าว ช่วงเวลาใดที่เกิดลมทะเล' }
    ],
    options: [
      { type: 'text', value: '23:00 น.' },
      { type: 'text', value: '21:00 น.' },
      { type: 'text', value: '19:00 น.' },
      { type: 'text', value: '17:00 น.' }
    ],
    correct_answer_index: 3,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 17',
    indicator_code: 'ว 4.2 ป.6/1',
    content: [
      { type: 'text', value: 'กำหนดให้ (A•B) - 1 มีผลลัพธ์เป็นจำนวนคู่ที่มากกว่า 0 ดังนั้นค่าของ A และ B ที่ทำให้ข้อความด้านบนเป็นจริงจะมีค่าตรงกับข้อใด' }
    ],
    options: [
      { type: 'text', value: 'A และ B เป็นจำนวนคู่' },
      { type: 'text', value: 'A และ B เป็นจำนวนคี่' },
      { type: 'text', value: 'A เป็นจำนวนคู่ และ B เป็นจำนวนคี่' },
      { type: 'text', value: 'A เป็นจำนวนคี่ และ B เป็นจำนวนคู่' }
    ],
    correct_answer_index: 1,
    shared_context: null
  },
  {
    type: 'choice',
    exam_year: 'O-NET 66',
    note: 'ข้อ 18',
    indicator_code: 'ว 4.2 ป.5/5',
    content: [
      { type: 'text', value: 'กัปตันได้แอบถ่ายภาพ จูเนียร์ในท่าที่คล้ายนั่งหลับในห้องเรียน และโพสต์รูปภาพบนสื่อสังคมออนไลน์ ทำให้ จูเนียร์โกรธ และกัปตันปฏิเสธที่จะลบรูปถ่าย จากสถานการณ์ข้างต้น ถ้านักเรียนเป็นเพื่อนของจูเนียร์ต้องปฏิบัติตามข้อใด จึงถือว่ามีจริยธรรมและไม่ละเมิดสิทธิ์ของผู้อื่น' }
    ],
    options: [
      { type: 'text', value: 'ช่วยจูเนียร์แจ้งผู้ให้บริการสื่อสังคมออนไลน์ เพื่อลบรูปภาพออก' },
      { type: 'text', value: 'บอกจูเนียร์ ว่าไม่ควรไปอยู่ในภาพตั้งแต่แรก และกัปตันไม่ควรต้องลบภาพ' },
      { type: 'text', value: 'ลบภาพออกจากมือถือและบัญชีสื่อสังคมออนไลน์ โดยการแกล้งยืมมือถือของกัปตันมาเล่น' },
      { type: 'text', value: 'ใช้เครื่องมือที่พบบนอินเทอร์เน็ตเพื่อเข้าบัญชีสื่อสังคมออนไลน์ของกัปตันและลบรูปภาพออก' }
    ],
    correct_answer_index: 0,
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 66',
    note: 'ข้อ 19',
    indicator_code: 'ว 1.2 ป.4/1',
    content: [
      { type: 'text', value: 'ตอนที่ 2: แบบปรนัยเลือกตอบเชิงซ้อน\nเมื่อซื้อต้นมะลิจากตลาดนัด แม่ค้านำต้นมะลิใส่ถุงพลาสติกแล้วมัดปากถุงเพื่อให้กลับบ้าน เมื่อถึงบ้าน ในถุงพลาสติกมีหยดน้ำเกาะอยู่ที่ผิวด้านในของถุง\nจากข้อมูล ข้อความต่อไปนี้ถูกต้องใช่หรือไม่ใช่' }
    ],
    complex_questions: [
      {
        question: '19.1 การมีหยดน้ำเกาะในถุงเช่นนี้แสดงว่าต้นมะลิยังมีชีวิต',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '19.2 หยดน้ำส่วนใหญ่มาจากกระบวนการหายใจของต้นมะลิ',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      },
      {
        question: '19.3 การมีหยดน้ำเช่นนี้แสดงว่าต้นมะลิน่าจะมีการดูดน้ำจากดินได้',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      }
    ],
    shared_context: null
  },
  {
    type: 'complex',
    exam_year: 'O-NET 66',
    note: 'ข้อ 20',
    indicator_code: 'ว 2.1 ป.4/2',
    content: [
      { type: 'text', value: 'ในการออกแบบ ตัวแปรต้นและตัวแปรตาม สำหรับการทดลองเพื่อศึกษาสมบัติทางกายภาพของวัสดุด้านสภาพยืดหยุ่น การนำความร้อน และการนำไฟฟ้าของวัสดุ จากข้อมูล ข้อความต่อไปนี้ถูกต้องใช่หรือไม่ใช่' }
    ],
    complex_questions: [
      {
        question: '20.1 ชนิดของวัสดุเป็นตัวแปรต้น ในการทดลองเพื่อศึกษาว่าการนำความร้อนของวัสดุแต่ละชนิดแตกต่างกันหรือไม่',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '20.2 สภาพยืดหยุ่นของวัสดุเป็นตัวแปรตาม ในการทดลองเพื่อศึกษาว่าชนิดของวัสดุสัมพันธ์กับสภาพยืดหยุ่นหรือไม่',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ใช่'
      },
      {
        question: '20.3 การนำไฟฟ้าของวัสดุเป็นตัวแปรต้น ในการทดลองเพื่อศึกษาว่าการนำไฟฟ้าของวัสดุแต่ละชนิดแตกต่างกันหรือไม่',
        options: ['ใช่', 'ไม่ใช่'],
        correct_answer: 'ไม่ใช่'
      }
    ],
    shared_context: null
  }
];

async function seed() {
  console.log("Seeding O-NET 66 questions...");
  const formattedQuestions = onet66Questions.map(q => {
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
  console.log("Seeding O-NET 66 complete!");
}

seed();
