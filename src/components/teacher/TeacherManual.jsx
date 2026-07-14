import React, { useState } from 'react';
import { Users, FileText, Activity, Layers, Settings, ChevronDown, CheckCircle, Target, Monitor, BarChart } from 'lucide-react';

export default function TeacherManual() {
  const [activeSection, setActiveSection] = useState('tabs'); // 'tabs' or 'workflow'

  const tabsInfo = [
    {
      title: '1. แท็บ "ภาพรวม"',
      icon: <Monitor size={24} className="text-primary" />,
      whatItDoes: 'แสดงหน้าปัด (Dashboard) สถิติการใช้งาน และคะแนนเฉลี่ยการทดสอบก่อนเรียน-หลังเรียนภาพรวมของห้องเรียน',
      whatTeacherMustDo: 'ตรวจสอบความคืบหน้าโดยรวม เพื่อดูว่านักเรียนมีความกระตือรือร้นและมีพัฒนาการโดยเฉลี่ยอยู่ในระดับใด',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      title: '2. แท็บ "จัดการนักเรียน"',
      icon: <Users size={24} className="text-blue-500" />,
      whatItDoes: 'ใช้สำหรับจัดการฐานข้อมูลนักเรียนในความดูแลของคุณครู รวมถึงสามารถกดดูผลการเรียนรายบุคคล (Personalized Data) ได้',
      whatTeacherMustDo: 'เพิ่มรายชื่อนักเรียนเข้าระบบ (รายคน หรือ นำเข้าทีละห้อง) เพื่อให้นักเรียนมีบัญชีสำหรับล็อกอินเข้าสอบ',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      title: '3. แท็บ "คลังข้อสอบ"',
      icon: <Layers size={24} className="text-purple-500" />,
      whatItDoes: 'ระบบจัดการข้อสอบที่ผูกติดกับแต่ละตัวชี้วัด โดยสามารถแบ่งระดับความยาก-ง่าย และมีฟังก์ชันสุ่มข้อสอบ',
      whatTeacherMustDo: 'สร้างและจัดเตรียมข้อสอบสำหรับแต่ละตัวชี้วัดให้พร้อม เพื่อให้นักเรียนได้ใช้สอบวัดผลก่อนเรียน-หลังเรียน',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      title: '4. แท็บ "จัดการเนื้อหาบทเรียน"',
      icon: <FileText size={24} className="text-green-500" />,
      whatItDoes: 'ศูนย์รวมการจัดการสื่อการเรียนรู้แบบปรับเหมาะ (Adaptive) เช่น ลิงก์วิดีโอ YouTube หรือแบบฝึกหัดเสริม สำหรับรายตัวชี้วัด',
      whatTeacherMustDo: 'แทรกลิงก์สื่อการสอน หรืออัปโหลดแบบฝึกหัดเข้าไปในแต่ละตัวชี้วัด เพื่อให้ระบบนำไปสั่งจ่ายแก่นักเรียนที่ไม่ผ่าน',
      color: 'bg-green-50 border-green-200'
    },
    {
      title: '5. แท็บ "กลุ่มการวิเคราะห์ (Analytics)"',
      icon: <BarChart size={24} className="text-orange-500" />,
      whatItDoes: 'รวบรวมข้อมูลเชิงลึก เช่น ค่าความยากง่ายของข้อสอบ ผลประเมินความพึงพอใจสื่อ และสถิติย้อนหลังรายปี',
      whatTeacherMustDo: 'นำข้อมูลที่ระบบประมวลผลให้ไปวิเคราะห์ต่อ เพื่อปรับปรุงข้อสอบ ปรับแผนการสอน หรือนำไปใช้ประกอบการทำวิทยฐานะ',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  const workflowSteps = [
    {
      step: 1,
      title: 'ตั้งค่าเริ่มต้น (Setup)',
      icon: <Settings size={28} className="text-gray-500" />,
      whatToDo: 'ครูทำการเพิ่มรายชื่อนักเรียนเข้าสู่ระบบ และจัดทำคลังข้อสอบให้ครบถ้วนตามตัวชี้วัดที่ต้องการสอน',
      result: 'ระบบมีฐานข้อมูลพร้อมใช้งาน นักเรียนมีบัญชีเข้าสู่ระบบ และมีข้อสอบมารองรับการประเมิน',
    },
    {
      step: 2,
      title: 'เตรียมสื่อการสอนปรับเหมาะ (Prepare)',
      icon: <Target size={28} className="text-blue-500" />,
      whatToDo: 'ครูนำลิงก์สื่อการสอน (เช่น วิดีโอ YouTube) และใบงานแบบฝึกหัด มาใส่ไว้ใน "จัดการเนื้อหาบทเรียน" ของตัวชี้วัดนั้นๆ',
      result: 'เมื่อนักเรียนสอบไม่ผ่านตัวชี้วัดใด ระบบจะมีสื่อเนื้อหามารองรับเพื่อซ่อมเสริมให้นักเรียนคนนั้นๆ ได้ทันทีแบบอัตโนมัติ',
    },
    {
      step: 3,
      title: 'ให้นักเรียนใช้งาน (Execute)',
      icon: <Activity size={28} className="text-green-500" />,
      whatToDo: 'ครูให้นักเรียนเข้าสู่ระบบ ทำแบบทดสอบก่อนเรียน เข้าศึกษาเนื้อหาที่ระบบจัดให้ และทำแบบทดสอบหลังเรียน',
      result: 'นักเรียนได้รับการวินิจฉัยจุดอ่อนรายบุคคล และได้รับการสอนซ่อมเสริมเฉพาะจุด (Personalized & Adaptive Learning)',
    },
    {
      step: 4,
      title: 'ติดตามและวิเคราะห์ผล (Monitor & Analyze)',
      icon: <CheckCircle size={28} className="text-purple-500" />,
      whatToDo: 'ครูเข้ามาดูผลผ่านแท็บ "ภาพรวม" และแท็บ "วิเคราะห์ต่างๆ (Analytics)" เพื่อดูพัฒนาการและคุณภาพของสื่อ/ข้อสอบ',
      result: 'ครูได้สารสนเทศทางการศึกษาที่แม่นยำ สามารถนำไปปรับปรุงการสอน และลดภาระงานตรวจข้อสอบ/วิเคราะห์ผลด้วยตนเอง',
    }
  ];

  return (
    <div style={{ animation: 'fadeIn 0.5s ease-out', paddingBottom: '2rem' }}>
      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', textAlign: 'center' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>📘 คู่มือการใช้งานระบบ ADAPT สำหรับคุณครู</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          ยินดีต้อนรับสู่คู่มือการใช้งาน คุณครูสามารถเลือกดูแนวทางการใช้งานได้ 2 รูปแบบ <br/>
          เพื่อให้เข้าใจระบบและนำไปปรับใช้ในการจัดการเรียนการสอนได้อย่างเต็มประสิทธิภาพ
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
            การใช้งานในแต่ละเมนู (Tab)
          </h3>
          {tabsInfo.map((tab, idx) => (
            <div key={idx} className={`glass-panel ${tab.color}`} style={{ padding: '1.5rem', borderRadius: '12px', border: '1px solid' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem' }}>
                {tab.icon}
                <h4 style={{ margin: 0, fontSize: '1.2rem', color: 'var(--text-main)' }}>{tab.title}</h4>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--secondary)', marginBottom: '0.5rem' }}>📌 แท็บนี้ทำอะไรได้บ้าง?</div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>{tab.whatItDoes}</div>
                </div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.7)', padding: '1rem', borderRadius: '8px' }}>
                  <div style={{ fontWeight: 'bold', color: 'var(--primary)', marginBottom: '0.5rem' }}>👩‍🏫 สิ่งที่ครูต้องทำ</div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem', lineHeight: '1.5' }}>{tab.whatTeacherMustDo}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeSection === 'workflow' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <h3 style={{ color: 'var(--text-dark)', marginBottom: '0.5rem', paddingLeft: '0.5rem', borderLeft: '4px solid var(--secondary)' }}>
            ขั้นตอนการทำงานแบบ ADAPT (Workflow)
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
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ minWidth: '120px', fontWeight: 'bold', color: 'var(--text-light)' }}>ครูต้องทำอะไร:</div>
                      <div style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>{step.whatToDo}</div>
                    </div>
                    <div style={{ height: '1px', backgroundColor: 'var(--border)' }}></div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <div style={{ minWidth: '120px', fontWeight: 'bold', color: 'var(--secondary)' }}>ผลลัพธ์ที่ได้:</div>
                      <div style={{ color: 'var(--text-main)', lineHeight: '1.5' }}>✨ {step.result}</div>
                    </div>
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
