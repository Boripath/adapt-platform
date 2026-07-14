import React, { useState } from 'react';
import { Users, FileText, Activity, Layers, Settings, ChevronDown, CheckCircle, Target, Monitor, BarChart, BookOpen, Star, Clock, Calendar } from 'lucide-react';

export default function TeacherManual({ setActiveTab }) {
  const [activeSection, setActiveSection] = useState('tabs');

  const tabsInfo = [
    {
      title: '1. แท็บ "ภาพรวม" (Dashboard)',
      icon: <Monitor size={24} className="text-primary" />,
      whatItDoes: 'แสดงผลสรุป (Dashboard) ของสถิติการใช้งานนักเรียนทั้งหมดในโรงเรียน รวมถึงกราฟเปรียบเทียบคะแนนเฉลี่ยการทดสอบก่อนเรียน-หลังเรียน และสถานะการเข้าสอบของนักเรียน',
      whatTeacherMustDo: 'ตรวจสอบความคืบหน้าภาพรวมของห้องเรียน เพื่อวิเคราะห์ว่านักเรียนในระดับชั้นต่างๆ มีความกระตือรือร้น หรือมีพัฒนาการโดยเฉลี่ยอยู่ในระดับที่น่าพึงพอใจหรือไม่ ผลลัพธ์จากการวิเคราะห์จะช่วยให้ครูทราบภาพรวมของผลสัมฤทธิ์ได้อย่างรวดเร็ว',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      title: '2. แท็บ "จัดการนักเรียน" (Student Management)',
      icon: <Users size={24} className="text-blue-500" />,
      whatItDoes: 'ใช้สำหรับจัดการฐานข้อมูลนักเรียน เพิ่ม-ลบ-แก้ไขข้อมูลนักเรียน รวมถึงมีระบบวิเคราะห์ผลรายบุคคล (Personalized Data Analysis) ที่แสดงจุดเด่น จุดด้อย และพฤติกรรมการเรียนของนักเรียนแต่ละคนอย่างละเอียด',
      whatTeacherMustDo: 'คุณครูต้องเพิ่มรายชื่อนักเรียนเข้าระบบให้เรียบร้อย (สามารถนำเข้าทีละห้องเรียนได้) เพื่อแจกจ่ายรหัสให้เข้าสอบ นอกจากนี้ยังสามารถกดดูผลสัมฤทธิ์รายบุคคลเพื่อนำไปวิเคราะห์ปัญหา และช่วยแก้ปัญหาเด็กที่มีจุดอ่อนเฉพาะตัวชี้วัด (Personalized Coaching)',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: '3. แท็บ "คลังข้อสอบ" (Question Bank)',
      icon: <Layers size={24} className="text-purple-500" />,
      whatItDoes: 'ระบบคลังข้อสอบที่จำแนกตามรายตัวชี้วัด คุณครูสามารถจัดการข้อสอบ แยกความยาก-ง่าย รวมถึงดูผลการวิเคราะห์สถิติความถี่ในการตอบผิดของตัวชี้วัดนั้นๆ ผ่านระบบนี้',
      whatTeacherMustDo: 'คุณครูต้องสร้างข้อสอบและผูกกับตัวชี้วัดต่างๆ ให้ครบถ้วน เพื่อที่นักเรียนจะมีแบบทดสอบสำหรับการประเมินตัวเองก่อนและหลังเรียน ผลลัพธ์จากการวิเคราะห์ที่ได้ คือครูจะเห็นว่าข้อสอบใดมีคุณภาพ หรือตัวชี้วัดใดที่นักเรียนตอบผิดมากที่สุด',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: '4. แท็บ "จัดการเนื้อหาบทเรียน" (Lesson Management)',
      icon: <FileText size={24} className="text-green-500" />,
      whatItDoes: 'ศูนย์รวมการสร้างสื่อการเรียนรู้แบบปรับเหมาะ (Adaptive Learning) คุณครูสามารถระบุเนื้อหา ลิงก์วิดีโออธิบาย และอัปโหลดแบบฝึกหัดเสริมที่ตรงกับระดับจุดอ่อนของแต่ละตัวชี้วัดได้',
      whatTeacherMustDo: 'คุณครูต้องนำลิงก์สื่อการสอน หรืออัปโหลดแบบฝึกหัดเข้ามาใส่ไว้ในแต่ละตัวชี้วัด ผลลัพธ์คือเมื่อมีนักเรียนคนใดสอบตัวชี้วัดนั้นไม่ผ่าน ระบบจะจัดการ "สั่งจ่ายสื่อการสอน" ให้นักเรียนคนนั้นทันทีโดยอัตโนมัติ',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: '5. แท็บ "ประเมินและวิเคราะห์เนื้อหา" (Content Evaluation)',
      icon: <BookOpen size={24} className="text-teal-500" />,
      whatItDoes: 'หน้าจอนี้เปิดให้คุณครูเข้ามาประเมินความสอดคล้องของสื่อการสอนและแบบฝึกหัด ว่ามีความยากง่ายเหมาะสมกับนักเรียนในแต่ละระดับหรือไม่',
      whatTeacherMustDo: 'เข้ามารีวิวสื่อและให้คะแนนความเหมาะสมของสื่อการสอน (Quality Assurance) เพื่อยืนยันว่าสื่อนี้ช่วยแก้นักเรียนได้ผลจริง ส่งผลให้นักเรียนได้รับสื่อที่มีคุณภาพสูงและแม่นยำ',
      color: 'bg-teal-50 border-teal-200'
    },
    {
      title: '6. แท็บ "ผลประเมินความพึงพอใจสื่อ" (Student Ratings)',
      icon: <Star size={24} className="text-yellow-500" />,
      whatItDoes: 'สรุปผลตอบรับและความพึงพอใจจากนักเรียน (Feedback) ที่มีต่อสื่อการสอนของแต่ละตัวชี้วัด แสดงเป็นคะแนนเฉลี่ยดาว',
      whatTeacherMustDo: 'ตรวจสอบความพึงพอใจของนักเรียน หากสื่อหรือวิดีโอตัวชี้วัดใดได้คะแนนน้อย ครูสามารถนำข้อมูลนี้ไปปรับปรุงหรือเปลี่ยนวิดีโอสื่อการสอนใหม่ให้น่าสนใจและเข้าใจง่ายยิ่งขึ้น',
      color: 'bg-yellow-50 border-yellow-200'
    },
    {
      title: '7. แท็บ "วิเคราะห์ผลสอบตามรายข้อ" (Question Analytics)',
      icon: <BarChart size={24} className="text-orange-500" />,
      whatItDoes: 'ระบบจะคำนวณค่าระดับความยากง่าย (p) และค่าอำนาจจำแนก (r) ของข้อสอบแต่ละข้อ เพื่อประเมินมาตรฐานข้อสอบอัตโนมัติ',
      whatTeacherMustDo: 'เข้ามาดูรายงานการวิเคราะห์ข้อสอบ หากระบบแจ้งว่าข้อใด "ยากเกินไป" หรือ "แยกแยะเด็กเก่ง/อ่อนไม่ได้" ครูควรพิจารณาแก้ไขโจทย์ข้อนี้น หรือตัดข้อนั้นทิ้งเพื่อรักษามาตรฐานข้อสอบ',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      title: '8. แท็บ "วิเคราะห์ผลสอบย้อนหลัง" (Historical Analytics)',
      icon: <Clock size={24} className="text-pink-500" />,
      whatItDoes: 'เก็บสถิติและเปรียบเทียบผลสัมฤทธิ์ทางการเรียนของนักเรียนข้ามปีการศึกษาต่างๆ เพื่อดูแนวโน้มการพัฒนา (Trend Analysis)',
      whatTeacherMustDo: 'ใช้สำหรับดูทิศทางการพัฒนาการศึกษาของโรงเรียน เปรียบเทียบผลระหว่างรุ่น และสามารถนำข้อมูลวิเคราะห์นี้ไปใช้ประกอบการทำเอกสารรายงานคุณภาพ หรือวิทยฐานะ (ว.PA)',
      color: 'bg-pink-50 border-pink-200'
    },
    {
      title: '9. แท็บ "วิเคราะห์ผลสอบปีปัจจุบัน" (Current Year Analytics)',
      icon: <Calendar size={24} className="text-cyan-500" />,
      whatItDoes: 'เจาะลึกข้อมูลของนักเรียนทั้งหมดในปีการศึกษาปัจจุบัน วิเคราะห์พฤติกรรมการเรียน การแก้โจทย์ปัญหา และเปอร์เซ็นต์ความสำเร็จหลังจากการเรียนซ่อมเสริม',
      whatTeacherMustDo: 'เข้ามาตรวจสอบเพื่อดูสรุปรายงานผลประจำปี และประเมินประสิทธิผลของแผนการสอนในปีนี้ว่าประสบความสำเร็จหรือไม่ เพื่อเตรียมแผนการรับมือสำหรับปีการศึกษาถัดไป',
      color: 'bg-cyan-50 border-cyan-200'
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'ตั้งค่าเริ่มต้นระบบ (Setup)',
      icon: <Settings size={28} className="text-gray-500" />,
      whatToDo: 'ครูทำการเพิ่มรายชื่อนักเรียนเข้าสู่ระบบ (แท็บ "จัดการนักเรียน") และจัดทำคลังข้อสอบ (แท็บ "คลังข้อสอบ") ให้ครบถ้วนครอบคลุมทุกตัวชี้วัด',
      result: 'ระบบมีฐานข้อมูลที่พร้อมใช้งาน นักเรียนแต่ละคนมีบัญชีสำหรับเข้าสู่ระบบ และมีชุดข้อสอบที่พร้อมสำหรับการประเมิน',
    },
    {
      step: 2,
      title: 'จัดเตรียมสื่อการสอนปรับเหมาะ (Prepare Adaptive Media)',
      icon: <Target size={28} className="text-blue-500" />,
      whatToDo: 'ครูนำลิงก์สื่อการสอน (เช่น วิดีโอ YouTube) และใบงานแบบฝึกหัดเสริม มาบรรจุไว้ใน "จัดการเนื้อหาบทเรียน" ของตัวชี้วัดนั้นๆ ตามระดับชั้น',
      result: 'ระบบสร้างระบบสั่งจ่ายอัตโนมัติ (Automated Intervention) เมื่อนักเรียนสอบไม่ผ่านตัวชี้วัดใด จะมีสื่อมารองรับเพื่อซ่อมเสริมจุดอ่อนของนักเรียนคนนั้นๆ แบบเฉพาะตัว (Personalized) ได้ทันที',
    },
    {
      step: 3,
      title: 'ให้นักเรียนใช้งานและทำแบบทดสอบ (Execute)',
      icon: <Activity size={28} className="text-green-500" />,
      whatToDo: 'ครูมอบหมายให้นักเรียนเข้าสู่ระบบด้วยรหัสของตนเอง ทำแบบทดสอบก่อนเรียน เข้าศึกษาเนื้อหาซ่อมเสริมจากระบบ ADAPT และทำแบบทดสอบหลังเรียน',
      result: 'นักเรียนได้รับการประเมินจุดแข็ง-จุดอ่อนรายบุคคล และได้รับการสอนซ่อมเสริมเฉพาะในตัวชี้วัดที่ไม่ผ่าน ทำให้ประหยัดเวลาและตรงจุดมากที่สุด',
    },
    {
      step: 4,
      title: 'ติดตามและวิเคราะห์ผลแบบเจาะลึก (Monitor & Analyze)',
      icon: <CheckCircle size={28} className="text-purple-500" />,
      whatToDo: 'หลังจากที่นักเรียนเข้าใช้งานแล้ว ครูสามารถคลิกเข้าไปดูรายงานผลวิเคราะห์เชิงลึกหลากหลายมิติ โดยสามารถนำผลวิเคราะห์ไปใช้ประโยชน์ได้ดังนี้:',
      result: 'ครูได้สารสนเทศทางการศึกษาที่แม่นยำด้วยกราฟและสถิติอัจฉริยะ สามารถคลิกที่ปุ่มด้านล่างเพื่อไปยังหน้าต่างวิเคราะห์ได้ทันที:',
      actionLinks: true
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', paddingBottom: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>📘 คู่มือการใช้งานระบบ ADAPT สำหรับคุณครู</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
          แนวทางการประยุกต์ใช้แพลตฟอร์ม ADAPT เพื่อพัฒนาการจัดการเรียนการสอนแบบปรับเหมาะ (Adaptive Learning)<br/>
          คุณครูสามารถคลิกเลือกดูแนวทางการใช้งานได้ 2 รูปแบบด้านล่างนี้
        </p>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '2rem' }}>
          <button 
            className={`btn ${activeSection === 'tabs' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveSection('tabs')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1.05rem' }}
          >
            1. อธิบายการใช้งานทีละเมนู (Tab-by-Tab)
          </button>
          <button 
            className={`btn ${activeSection === 'workflow' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveSection('workflow')}
            style={{ padding: '0.75rem 1.5rem', fontSize: '1.05rem' }}
          >
            2. ขั้นตอนการทำงานโดยรวม (Step-by-Step)
          </button>
        </div>
      </div>

      {activeSection === 'tabs' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '4px solid var(--primary)' }}>
            การใช้งานในแต่ละเมนูและผลการวิเคราะห์ที่ได้รับ (Tab-by-Tab Details)
          </h3>
          {tabsInfo.map((tab, idx) => (
            <div key={idx} className={`glass-panel ${tab.color}`} style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {tab.icon}
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>{tab.title}</h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '0.5rem' }}>📌 แท็บนี้ทำอะไรได้บ้าง? (What it does)</div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>{tab.whatItDoes}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>👩‍🏫 ครูต้องทำอะไรและได้ผลลัพธ์วิเคราะห์แบบใด?</div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.6' }}>{tab.whatTeacherMustDo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'workflow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
            ขั้นตอนการทำงานแบบ ADAPT (Step-by-Step Workflow)
          </h3>
          <div style={{ position: 'relative', paddingLeft: '2rem' }}>
            {/* Vertical Line */}
            <div style={{ position: 'absolute', left: '39px', top: '40px', bottom: '40px', width: '3px', backgroundColor: 'var(--border)', zIndex: 1 }}></div>
            
            {workflowSteps.map((step, idx) => (
              <div key={idx} style={{ display: 'flex', position: 'relative', marginBottom: idx === workflowSteps.length - 1 ? '0' : '2rem' }}>
                {/* Number Circle */}
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'white', 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  border: '3px solid var(--primary)', color: 'var(--primary)', fontWeight: 'bold',
                  zIndex: 2, flexShrink: 0, marginTop: '1rem'
                }}>
                  {step.step}
                </div>
                
                {/* Content */}
                <div className="glass-panel" style={{ marginLeft: '1.5rem', flex: 1, padding: '1.5rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                    {step.icon}
                    <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>ขั้นตอนที่ {step.step}: {step.title}</h4>
                  </div>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <div style={{ fontWeight: 'bold', color: 'var(--text-light)' }}>ครูต้องทำอะไร:</div>
                      <div style={{ color: 'var(--text-main)', lineHeight: '1.6', paddingLeft: '1rem', borderLeft: '2px solid var(--border)' }}>{step.whatToDo}</div>
                    </div>
                    
                    <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>
                    
                    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column' }}>
                      <div style={{ fontWeight: 'bold', color: 'var(--secondary)' }}>ผลลัพธ์และการวิเคราะห์ที่จะได้รับ:</div>
                      <div style={{ color: 'var(--text-main)', lineHeight: '1.6', paddingLeft: '1rem', borderLeft: '2px solid var(--secondary)' }}>✨ {step.result}</div>
                    </div>

                    {/* Action Links specifically for Step 4 */}
                    {step.actionLinks && setActiveTab && (
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginTop: '1rem', padding: '1rem', backgroundColor: 'rgba(255,255,255,0.5)', borderRadius: '8px' }}>
                        
                        <button onClick={() => setActiveTab('question-analytics')} className="btn btn-outline" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', height: 'auto', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--orange)' }}>
                            <BarChart size={18} /> <strong>วิเคราะห์ข้อสอบตามรายข้อ</strong>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'left', whiteSpace: 'normal' }}>ตรวจสอบค่าความยากง่าย (p) และค่าอำนาจจำแนก (r) เพื่อปรับปรุงคุณภาพข้อสอบ</span>
                        </button>

                        <button onClick={() => setActiveTab('lesson-qa')} className="btn btn-outline" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', height: 'auto', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--teal)' }}>
                            <BookOpen size={18} /> <strong>ประเมินและวิเคราะห์สื่อ</strong>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'left', whiteSpace: 'normal' }}>ตรวจสอบผลตอบรับจากนักเรียน และปรับปรุงสื่อที่ใช้ซ่อมเสริมให้ดียิ่งขึ้น</span>
                        </button>

                        <button onClick={() => setActiveTab('historical-analytics')} className="btn btn-outline" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', height: 'auto', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--pink)' }}>
                            <Clock size={18} /> <strong>วิเคราะห์ผลสอบย้อนหลัง</strong>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'left', whiteSpace: 'normal' }}>เปรียบเทียบสถิติและผลสัมฤทธิ์ทางการเรียนข้ามปีการศึกษา</span>
                        </button>

                        <button onClick={() => setActiveTab('current-year-analytics')} className="btn btn-outline" style={{ display: 'flex', flexDirection: 'column', padding: '1rem', height: 'auto', alignItems: 'flex-start' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem', color: 'var(--cyan)' }}>
                            <Calendar size={18} /> <strong>วิเคราะห์ผลปีปัจจุบัน</strong>
                          </div>
                          <span style={{ fontSize: '0.85rem', color: 'var(--text-light)', textAlign: 'left', whiteSpace: 'normal' }}>เจาะลึกความสำเร็จหลังการเรียนซ่อมเสริม ของนักเรียนกลุ่มปัจจุบัน</span>
                        </button>

                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
