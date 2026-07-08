const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://wddachlocijpfpdimadb.supabase.co', 'sb_publishable_35_5lyGv2i0GT-KuypPbDQ_UoMB8oOz');

const questions = [
  {
    subject: 'Science', indicator_code: 'ว 1.1 ป.6/1', note: 'O-NET 65 ข้อ 1', type: 'choice',
    content: [{type: 'text', value: 'สิ่งมีชีวิตชนิดต่างๆ ที่อาศัยอยู่บริเวณบึงน้ำจืดธรรมชาติ ได้แก่ ผักตบชวา ผักกระเฉด ปลา และ กบ ข้อใดกล่าวถึงการปรับโครงสร้างของร่างกายสิ่งมีชีวิตให้เหมาะสมกับแหล่งที่อยู่อาศัยได้ถูกต้อง'}],
    options: [
      [{type: 'text', value: '1. ปลา มีครีบเพื่อช่วยในการแลกเปลี่ยนแก๊สออกซิเจนในน้ำ'}],
      [{type: 'text', value: '2. ผักกระเฉด มีนวมสีขาวหุ้มลำต้นเพื่อป้องกันการถูกสัตว์น้ำกิน'}],
      [{type: 'text', value: '3. กบ มีพังผืดเชื่อมระหว่างนิ้วช่วยให้กระโดดได้ไกลในพื้นดินชื้นแฉะ'}],
      [{type: 'text', value: '4. ผักตบชวา มีก้านใบและลำต้นที่มีช่องอากาศจำนวนมากเพื่อช่วยในการลอยน้ำ'}]
    ], correct_answer_index: 3
  },
  {
    subject: 'Science', indicator_code: 'ว 1.2 ป.4/1', note: 'O-NET 65 ข้อ 2', type: 'choice',
    content: [{type: 'text', value: 'กระบวนการสังเคราะห์ด้วยแสงของพืชสร้างสารใดที่สำคัญสำหรับชีวิตของมนุษย์และสัตว์'}],
    options: [
      [{type: 'text', value: '1. น้ำ และออกซิเจน'}],
      [{type: 'text', value: '2. ออกซิเจน และน้ำตาล'}],
      [{type: 'text', value: '3. น้ำตาล และคาร์บอนไดออกไซด์'}],
      [{type: 'text', value: '4. คาร์บอนไดออกไซด์ และน้ำ'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 1.3 ป.6/1', note: 'O-NET 65 ข้อ 3', type: 'choice',
    content: [{type: 'text', value: 'ชายและหญิงคู่หนึ่งอาศัยอยู่ในบ้านหลังเล็กรินนาข้าว วันหนึ่งขณะที่พวกเขากำลังพาสุนัขตัวโปรดเดินไล่กาที่มากินเมล็ดข้าว พวกเขาสังเกตเห็นงูตัวใหญ่กำลังจ้องเต่าตัวเล็กอยู่ จึงได้หยิบลูกมะพร้าวที่ตกอยู่ใต้ต้นขว้างใส่งู ทำให้งูเลื้อยหนีไป\nข้อใดถูกต้องในการจัดกลุ่มสิ่งมีชีวิตในสถานการณ์ข้างต้น'}],
    options: [
      [{type: 'text', value: '1. ข้าวและมะพร้าวจัดอยู่ในกลุ่มพืชดอก'}],
      [{type: 'text', value: '2. งูและเต่าจัดอยู่ในกลุ่มสัตว์สะเทินน้ำสะเทินบก'}],
      [{type: 'text', value: '3. สุนัขเป็นสิ่งมีชีวิตชนิดเดียวที่อยู่ในกลุ่มสัตว์เลี้ยงลูกด้วยน้ำนม'}],
      [{type: 'text', value: '4. กาจัดอยู่ในกลุ่มสัตว์ปีกซึ่งมีขนลักษณะเป็นเส้นปกคลุมร่างกาย'}]
    ], correct_answer_index: 0
  },
  {
    subject: 'Science', indicator_code: 'ว 2.1 ป.5/1', note: 'O-NET 65 ข้อ 4', type: 'choice',
    content: [{type: 'text', value: 'สาร A B และ C เป็นสารที่มีมวลและต้องการที่อยู่ มีสมบัติของรูปร่างและปริมาตรดังนี้\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 4]\nข้อใดบอกสถานะของสาร A B และ C ได้ถูกต้อง'}],
    options: [
      [{type: 'text', value: '1. A ของแข็ง B ของเหลว C แก๊ส'}],
      [{type: 'text', value: '2. A ของแข็ง B แก๊ส C ของเหลว'}],
      [{type: 'text', value: '3. A แก๊ส B ของเหลว C ของแข็ง'}],
      [{type: 'text', value: '4. A ของเหลว B แก๊ส C ของแข็ง'}]
    ], correct_answer_index: 2
  },
  {
    subject: 'Science', indicator_code: 'ว 2.1 ป.5/2', note: 'O-NET 65 ข้อ 5', type: 'choice',
    content: [{type: 'text', value: 'สสารทั้งหมดในข้อใดเปลี่ยนสถานะด้วยการระเหิดที่อุณหภูมิห้อง'}],
    options: [
      [{type: 'text', value: '1. เกล็ดไอโอดีน เกลือแกง น้ำตาลทราย'}],
      [{type: 'text', value: '2. พิมเสน การบูร น้ำแข็งแห้ง'}],
      [{type: 'text', value: '3. ลูกเหม็น ผงฟู ด่างทับทิม'}],
      [{type: 'text', value: '4. น้ำแข็ง สารส้ม พิมเสน'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 2.1 ป.6/1', note: 'O-NET 65 ข้อ 6', type: 'choice',
    content: [{type: 'text', value: 'วิธีการใดเหมาะสมในการแยกสารผสม 2 ชนิดออกจากกัน\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 6]'}],
    options: [
      [{type: 'text', value: '1. น้ำตาล กับ เกลือ - แม่เหล็กดึงดูด'}],
      [{type: 'text', value: '2. ถั่วลิสง กับ งา - การหยิบออก'}],
      [{type: 'text', value: '3. ผงถ่าน กับ น้ำ - การร่อน'}],
      [{type: 'text', value: '4. รำข้าว กับ แป้งข้าวเจ้า - การฝัด'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 2.2 ป.5/1', note: 'O-NET 65 ข้อ 7', type: 'choice',
    content: [{type: 'text', value: 'เครื่องบินลำหนึ่งกำลังบินด้วยความเร็วสูง แรงโน้มถ่วงของโลกกระทำกับเครื่องบินในทิศใด'}],
    options: [
      [{type: 'text', value: '1. ทิศขึ้นในแนวดิ่ง'}],
      [{type: 'text', value: '2. ทิศลงในแนวดิ่ง'}],
      [{type: 'text', value: '3. ทิศเดียวกันกับการเคลื่อนที่ของเครื่องบิน'}],
      [{type: 'text', value: '4. ทิศตรงข้ามกับการเคลื่อนที่ของเครื่องบิน'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 2.2 ป.5/2', note: 'O-NET 65 ข้อ 8', type: 'choice',
    content: [{type: 'text', value: 'ข้อใดแสดงแรงลัพธ์เป็นศูนย์\n[รอคุณครูอัปโหลดรูปภาพข้อ 8]'}],
    options: [
      [{type: 'text', value: '1.'}], [{type: 'text', value: '2.'}], [{type: 'text', value: '3.'}], [{type: 'text', value: '4.'}]
    ], correct_answer_index: 2
  },
  {
    subject: 'Science', indicator_code: 'ว 2.2 ป.5/3', note: 'O-NET 65 ข้อ 9', type: 'choice',
    content: [{type: 'text', value: 'นักเรียนนำถุงทรายมาวางบนพื้นโต๊ะ จากนั้นนำเครื่องชั่งสปริงมาเกี่ยวที่หูของถุงทราย เมื่อออกแรงดึงเครื่องชั่งสปริงในแนวระดับ พบว่าถุงทรายหยุดนิ่ง ข้อใดกล่าวถูกต้อง'}],
    options: [
      [{type: 'text', value: '1. มีแรงเสียดทานกระทำต่อถุงทราย'}],
      [{type: 'text', value: '2. ถุงทรายอยู่ในสภาพไร้น้ำหนัก'}],
      [{type: 'text', value: '3. แรงลัพธ์ที่กระทำต่อถุงทรายมากกว่าศูนย์'}],
      [{type: 'text', value: '4. ถุงทรายมีการเปลี่ยนแปลงสภาพการเคลื่อนที่'}]
    ], correct_answer_index: 0
  },
  {
    subject: 'Science', indicator_code: 'ว 2.3 ป.4/1', note: 'O-NET 65 ข้อ 10', type: 'choice',
    content: [{type: 'text', value: 'หากนักเรียนต้องการจัดกิจกรรมโดยให้เพื่อนร่วมชั้นทายว่าวัตถุที่อยู่ด้านหลังฉากคืออะไร โดยให้เพื่อนเห็นเพียงแค่รูปร่างลางๆ ของวัตถุเท่านั้น นักเรียนควรเลือกวัสดุประเภทใดมาทำฉาก'}],
    options: [
      [{type: 'text', value: '1. วัสดุที่เป็นตัวกลางโปร่งใส'}],
      [{type: 'text', value: '2. วัสดุที่เป็นตัวกลางโปร่งแสง'}],
      [{type: 'text', value: '3. วัสดุที่เป็นวัตถุทึบแสง'}],
      [{type: 'text', value: '4. วัสดุที่เป็นวัตถุทึบใส'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 2.3 ป.6/1', note: 'O-NET 65 ข้อ 11', type: 'choice',
    content: [{type: 'text', value: 'จากรูปวงจรไฟฟ้า ต้องนำสายไฟเชื่อมต่อระหว่างจุด X กับจุดใดในวงจรไฟฟ้า จึงจะทำให้หลอดไฟ P สว่างที่สุด\n[รอคุณครูอัปโหลดรูปภาพข้อ 11]'}],
    options: [
      [{type: 'text', value: '1. A'}], [{type: 'text', value: '2. B'}], [{type: 'text', value: '3. C'}], [{type: 'text', value: '4. D'}]
    ], correct_answer_index: 3
  },
  {
    subject: 'Science', indicator_code: 'ว 3.1 ป.4/1', note: 'O-NET 65 ข้อ 12', type: 'choice',
    content: [{type: 'text', value: 'ในช่วงที่มองเห็นดวงจันทร์มีส่วนสว่างเพิ่มขึ้น วันที่ส่วนสว่างเป็นครึ่งดวงพอดี ตรงกับวันใด'}],
    options: [
      [{type: 'text', value: '1. ขึ้น 8 ค่ำ'}],
      [{type: 'text', value: '2. ขึ้น 15 ค่ำ'}],
      [{type: 'text', value: '3. แรม 8 ค่ำ'}],
      [{type: 'text', value: '4. แรม 15 ค่ำ'}]
    ], correct_answer_index: 0
  },
  {
    subject: 'Science', indicator_code: 'ว 3.1 ป.5/1', note: 'O-NET 65 ข้อ 13', type: 'choice',
    content: [{type: 'text', value: 'ขณะที่มานีมองไปบนท้องฟ้าตอน 1 ทุ่ม พบว่าทางมุมทิศ 180 องศา มุมเงย 75 องศา มีกลุ่มดาวแกะอยู่ ข้อใดไม่ถูกต้อง'}],
    options: [
      [{type: 'text', value: '1. ในวันถัดไปเมื่อสังเกตท้องฟ้าเวลาเดิม จะยังคงมองเห็นดาวในกลุ่มดาวแกะมีการเรียงตัวเหมือนเดิม'}],
      [{type: 'text', value: '2. ในวันถัดไปเมื่อสังเกตท้องฟ้าเวลาเดิม จะยังคงมองเห็นกลุ่มดาวแกะที่ตำแหน่งเดิม'}],
      [{type: 'text', value: '3. ในปีถัดไปเมื่อสังเกตท้องฟ้าในวันและเวลาเดิม จะยังคงมองเห็นดาวในกลุ่มดาวแกะมีการเรียงตัวเหมือนเดิม'}],
      [{type: 'text', value: '4. ในปีถัดไปเมื่อสังเกตท้องฟ้าในวันและเวลาเดิม จะยังคงมองเห็นกลุ่มดาวแกะที่ตำแหน่งเดิม'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 3.2 ป.6/1', note: 'O-NET 65 ข้อ 14', type: 'choice',
    content: [{type: 'text', value: 'กำหนดให้\n[รอคุณครูอัปโหลดรูปภาพตารางข้อ 14]\nถ้าต้องการหินแกรนิตเพื่อนำมาใช้ทำครกควรเลือกหินก้อนใด'}],
    options: [
      [{type: 'text', value: '1. A'}], [{type: 'text', value: '2. B'}], [{type: 'text', value: '3. C'}], [{type: 'text', value: '4. D'}]
    ], correct_answer_index: 2
  },
  {
    subject: 'Science', indicator_code: 'ว 3.2 ป.6/2', note: 'O-NET 65 ข้อ 15', type: 'choice',
    content: [{type: 'text', value: 'ข้อมูลการสำรวจทางธรณีวิทยาบริเวณภูเขาแห่งหนึ่งแสดงในสมุดบันทึก ดังนี้\nก. ชั้นหินทรายวางตัวอยู่ด้านบนชั้นหินกรวด\nข. พบซากดึกดำบรรพ์ไดโนเสาร์อยู่ในชั้นหินกรวด\nค. พบซากดึกดำบรรพ์รอยตีนไดโนเสาร์อยู่ในชั้นหินทราย\nง. ชั้นหินในบริเวณนี้วางตัวปกติไม่มีการพลิกตลบ\nข้อใดสรุปจากข้อมูลได้ถูกต้อง'}],
    options: [
      [{type: 'text', value: '1. ชั้นหินทรายมีอายุแก่กว่าชั้นหินกรวด'}],
      [{type: 'text', value: '2. ซากดึกดำบรรพ์ทั้งสองมีอายุเท่ากัน'}],
      [{type: 'text', value: '3. ซากดึกดำบรรพ์ทั้งสองมีกระบวนการเกิดต่างกัน'}],
      [{type: 'text', value: '4. ไดโนเสาร์ที่ทำให้เกิดรอยตีนในชั้นหินทรายมีวิวัฒนาการมากกว่าไดโนเสาร์ในชั้นหินกรวด'}]
    ], correct_answer_index: 2
  },
  {
    subject: 'Science', indicator_code: 'ว 3.2 ป.6/3', note: 'O-NET 65 ข้อ 16', type: 'choice',
    content: [{type: 'text', value: 'ข้อใดถูกต้องเกี่ยวกับช่วงที่ประเทศไทยได้รับผลจากมรสุมตะวันตกเฉียงใต้'}],
    options: [
      [{type: 'text', value: '1. เกิดขึ้นช่วงกลางเดือนตุลาคมถึงปลายเดือนเมษายน'}],
      [{type: 'text', value: '2. อากาศเหนือพื้นทวีปมีอุณหภูมิสูงกว่าอากาศเหนือพื้นมหาสมุทร'}],
      [{type: 'text', value: '3. อากาศเหนือพื้นมหาสมุทรเคลื่อนที่สูงขึ้นอากาศเหนือพื้นทวีปจึงเคลื่อนที่เข้ามาแทนที่'}],
      [{type: 'text', value: '4. ทำให้อากาศหนาวเย็นทั่วประเทศไทย'}]
    ], correct_answer_index: 1
  },
  {
    subject: 'Science', indicator_code: 'ว 4.2 ป.6/1', note: 'O-NET 65 ข้อ 17', type: 'choice',
    content: [{type: 'text', value: 'นักเรียนสร้างโปรแกรมเพื่อจำลองการปิดไฟอัตโนมัติ โดยกำหนดให้แสดง sprite แทนหลอดไฟเปิดใช้งานสว่าง (show) และเมื่อไม่มีการเคลื่อนที่ของเมาส์เป็นเวลา 5 วินาที จะทำการซ่อน sprite แทนการปิดหลอดไฟ (hide) ซึ่งเปรียบได้กับไม่มีคนอยู่ในห้องจึงไม่มีการใช้งานหลอดไฟ โดยนักเรียนเขียนโค้ดบล็อก scratch ออกมาได้ดังนี้\n[รอคุณครูอัปโหลดรูปภาพข้อ 17]'}],
    options: [
      [{type: 'text', value: '1. A'}], [{type: 'text', value: '2. B'}], [{type: 'text', value: '3. C'}], [{type: 'text', value: '4. D'}]
    ], correct_answer_index: 2
  },
  {
    subject: 'Science', indicator_code: 'ว 4.2 ป.6/2', note: 'O-NET 65 ข้อ 18', type: 'choice',
    content: [{type: 'text', value: 'จากโค้ดบล็อก scratch ของโปรแกรมจำลองการปิดไฟอัตโนมัติ ข้อใดคือสาเหตุที่ทำให้โปรแกรมไม่สามารถทำงานได้ตามที่ออกแบบไว้\n[ดูรูปจากข้อ 17]'}],
    options: [
      [{type: 'text', value: '1. การซ่อน sprite เมื่อตัวจับเวลา > 50 เป็นไปตามที่ออกแบบ แต่ควรใช้บล็อก wait 5 seconds เพื่อรอให้ครบ 5 วินาทีก่อนซ่อน'}],
      [{type: 'text', value: '2. บล็อก set ตำแหน่งก่อนหน้า mouse x และบล็อก set ตำแหน่งก่อนหน้า mouse y ไม่ถูกต้องเพราะควรใช้ค่าคงที่แทนที่จะเป็นค่าปัจจุบันของเมาส์'}],
      [{type: 'text', value: '3. บล็อก if สุดท้ายที่ใช้ในการตรวจสอบตัวจับเวลา (ตัวจับเวลา > 50) ถูกวางผิดตำแหน่ง แต่ควรไปวางในระดับเดียวกับบล็อก if แรกของบล็อก C (forever loop)'}],
      [{type: 'text', value: '4. การใช้บล็อก change เพิ่มค่าตัวจับเวลาทีละ 1 ต่อจากบล็อก if แรก ทำให้การนับเวลาไม่ถูกต้องเนื่องจากตัวจับเวลาอาจเพิ่มขึ้นเกิน 5 วินาทีเมื่อเมาส์หยุดนิ่ง'}]
    ], correct_answer_index: 2
  },
  {
    subject: 'Science', indicator_code: 'ว 1.2 ป.6/1', note: 'O-NET 65 ข้อ 19', type: 'complex',
    content: [{type: 'text', value: 'เมื่อเรารับประทานข้าวไข่เจียว ข้อความต่อไปนี้ถูกต้องใช่หรือไม่ใช่'}],
    options: [
      [{type: 'text', value: '19.1 การย่อยแป้งจากข้าวให้เป็นน้ำตาลเกิดขึ้นในปาก'}],
      [{type: 'text', value: '19.2 การย่อยโปรตีนจากไข่โดยเอนไซม์เริ่มเกิดขึ้นที่กระเพาะอาหาร'}],
      [{type: 'text', value: '19.3 การดูดซึมสารอาหารทั้งหมดเกิดขึ้นที่ลำไส้ใหญ่'}]
    ], complex_answers: [0, 0, 1] // 0=ใช่, 1=ไม่ใช่
  },
  {
    subject: 'Science', indicator_code: 'ว 2.3 ป.6/1', note: 'O-NET 65 ข้อ 20', type: 'complex',
    content: [{type: 'text', value: 'ทดสอบคุณสมบัติการนำไฟฟ้าของวัสดุ A และ B โดยตัดวัสดุเป็นแผ่นสี่เหลี่ยมจัตุรัสขนาดเท่ากัน แล้วประกอบเข้ากับชุดวงจรไฟฟ้าอย่างง่ายดังรูป\n[รอคุณครูอัปโหลดรูปภาพข้อ 20]'}],
    options: [
      [{type: 'text', value: '20.1 วัสดุ A มีสมบัติการนำไฟฟ้าเหมาะในการทำปลอกหุ้มสายไฟ'}],
      [{type: 'text', value: '20.2 วัสดุ B มีสมบัติการนำไฟฟ้าเหมือนเทปกาว'}],
      [{type: 'text', value: '20.3 วัสดุประกอบ BAB จะทำให้หลอดไฟติดสว่าง'}]
    ], complex_answers: [1, 0, 1]
  }
];

async function seed() {
  const { data, error } = await supabase.from('questions').insert(questions).select();
  if (error) {
    console.error('Error inserting questions:', error);
  } else {
    console.log('Successfully inserted', data.length, 'questions');
  }
}
seed();
