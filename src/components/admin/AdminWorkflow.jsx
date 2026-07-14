import React from 'react';
import { Target, BarChart2, UserCheck, ShieldCheck } from 'lucide-react';

export default function AdminWorkflow() {
  const steps = [
    {
      id: 1,
      title: 'การประเมินเพื่อวินิจฉัย (Diagnostic Assessment)',
      subtitle: 'ค้นหาจุดบกพร่องที่แท้จริงของผู้เรียนรายบุคคล',
      icon: <Target size={36} className="text-primary" />,
      description: 'ระบบจัดให้มีการทดสอบก่อนเรียน (Pre-test) ที่เชื่อมโยงกับมาตรฐานและตัวชี้วัด เพื่อวินิจฉัยความรู้พื้นฐานและระบุ "จุดอ่อน" หรือความบกพร่องที่แท้จริงของผู้เรียนแต่ละคน แทนการใช้ข้อมูลผลสอบจากรุ่นเก่า',
      model: 'ใส่ใจ / ให้เป้า',
      result: 'ได้ข้อมูลสถานะความพร้อมของผู้เรียนรายบุคคล (Baseline Data) ที่แม่นยำ',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 2,
      title: 'การวิเคราะห์จุดอ่อน (Analytic Processing)',
      subtitle: 'ประมวลผลข้อมูลสารสนเทศที่เข้าใจง่าย',
      icon: <BarChart2 size={36} className="text-red" />,
      description: 'ระบบนำผลการทำแบบทดสอบมาประมวลผลเชิงวิเคราะห์ เพื่อชี้ชัดว่านักเรียนมีจุดอ่อนใน "ตัวชี้วัดใดบ้าง" อย่างละเอียด พร้อมนำเสนอผ่านแดชบอร์ดที่ครูและนักเรียนสามารถเข้าใจได้ทันที',
      model: 'ดูผล',
      result: 'ครูและผู้เรียนรับรู้เป้าหมายการซ่อมเสริมที่ชัดเจน ลดภาระการสอนเนื้อหาซ้ำซ้อน',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 3,
      title: 'การจัดการเรียนรู้แบบปรับเหมาะ (Personalized Teaching)',
      subtitle: 'การซ่อมเสริมที่ตรงจุดและตอบสนองความแตกต่าง',
      icon: <UserCheck size={36} className="text-green-600" />,
      description: 'ผู้เรียนเข้าสู่บทเรียนซ่อมเสริมเฉพาะในตัวชี้วัดที่เป็นจุดอ่อนของตนเอง (Adaptive Learning) ผ่านสื่อคลิปวิดีโอและแบบฝึกหัดที่ครูจัดเตรียมไว้ในระบบ',
      model: 'เข้าถึง / พึ่งครู',
      result: 'ผู้เรียนได้รับการพัฒนาตรงตามความต้องการ (Personalized) อย่างมีประสิทธิภาพสูงสุด',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 4,
      title: 'การประเมินความก้าวหน้า (Re-evaluation)',
      subtitle: 'ความยั่งยืนของนวัตกรรมและการติดตามผล',
      icon: <ShieldCheck size={36} className="text-purple-600" />,
      description: 'ผู้เรียนทำแบบทดสอบหลังเรียน (Post-test) เพื่อตรวจสอบพัฒนาการหลังจากการซ่อมเสริม ระบบจะเก็บข้อมูลไว้เป็นคลังข้อมูลทางดิจิทัล (Digital Asset) เพื่อใช้พัฒนาอย่างต่อเนื่อง',
      model: 'ดูผล (การสะท้อนกลับ)',
      result: 'สามารถยกระดับผลสัมฤทธิ์ได้อย่างเป็นรูปธรรม และสร้างคลังข้อสอบเพื่อใช้งานอย่างยั่งยืน',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '0.5rem', fontSize: '1.8rem' }}>⚙️ กระบวนการทำงานแบบ ADAPT (ADAPT Workflow)</h2>
        <h3 style={{ color: 'var(--secondary)', marginBottom: '1.5rem', fontWeight: 'normal' }}>
          Analytic and Diagnostic Assessment for Personalized Teaching
        </h3>
        <p style={{ color: 'var(--text-light)', maxWidth: '700px', margin: '0 auto', lineHeight: '1.6' }}>
          แพลตฟอร์มนี้บูรณาการแนวคิดทฤษฎีการจัดการเรียนรู้รายบุคคลเข้ากับ <b>"โปงลางโมเดล"</b> 
          ของ สพป.กาฬสินธุ์ เขต 1 เพื่อสร้างกระบวนการเรียนรู้ที่ยั่งยืน และยกระดับผลสัมฤทธิ์อย่างเป็นระบบ
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
        {steps.map((step) => (
          <div key={step.id} className={`${step.color} border`} style={{ 
            borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column',
            boxShadow: '0 4px 15px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden'
          }}>
            <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1, transform: 'scale(2.5)' }}>
              {step.icon}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '8px', backgroundColor: 'white', 
                display: 'flex', justifyContent: 'center', alignItems: 'center', 
                boxShadow: '0 4px 10px rgba(0,0,0,0.05)', color: 'var(--text-main)'
              }}>
                {step.icon}
              </div>
              <div style={{ 
                backgroundColor: 'var(--primary)', color: 'white', padding: '4px 12px', 
                borderRadius: '20px', fontSize: '0.8rem', fontWeight: 'bold' 
              }}>
                ขั้นตอนที่ {step.id}
              </div>
            </div>
            
            <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.2rem', color: 'var(--text-main)', position: 'relative', zIndex: 1 }}>{step.title}</h3>
            <h4 style={{ margin: '0 0 1rem 0', fontSize: '0.9rem', color: 'var(--secondary)', position: 'relative', zIndex: 1 }}>{step.subtitle}</h4>
            
            <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '1.5rem', flex: 1, position: 'relative', zIndex: 1 }}>
              {step.description}
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.7)', padding: '0.5rem 0.8rem', borderRadius: '8px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>สอดคล้องกับโมเดล:</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 'bold', color: 'var(--primary)' }}>{step.model}</span>
              </div>
              
              <div style={{ backgroundColor: 'white', padding: '0.8rem', borderRadius: '8px', borderLeft: '4px solid var(--secondary)' }}>
                <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-light)', marginBottom: '0.2rem' }}>ผลลัพธ์ที่ได้:</span>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '500' }}>{step.result}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
