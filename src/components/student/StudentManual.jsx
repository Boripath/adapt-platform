import React from 'react';
import { BookOpen, Target, PenTool, CheckCircle, ArrowRight } from 'lucide-react';

export default function StudentManual() {
  const steps = [
    {
      id: 1,
      title: 'ทำแบบทดสอบก่อนเรียน (Pre-test)',
      icon: <PenTool size={32} className="text-primary" />,
      description: 'ระบบจะให้ทำแบบทดสอบก่อนเรียน เพื่อประเมินความรู้พื้นฐาน',
      action: 'ไปที่หน้า "ทดสอบก่อนเรียน" และเริ่มทำข้อสอบให้ครบทุกข้อ',
      result: 'ระบบจะประมวลผลคะแนน และวิเคราะห์ว่านักเรียนมีจุดอ่อนในตัวชี้วัดใดบ้าง',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 2,
      title: 'ดูผลการวิเคราะห์จุดอ่อน',
      icon: <Target size={32} className="text-red" />,
      description: 'ระบบจะแสดงรายการ "ตัวชี้วัดที่เป็นจุดอ่อน" ของนักเรียนโดยเฉพาะ',
      action: 'คลิกดูที่ตารางผลการวิเคราะห์ในหน้าแดชบอร์ด เพื่อดูว่าต้องซ่อมเสริมเรื่องใด',
      result: 'รู้เป้าหมายที่ชัดเจนว่าต้องเน้นอ่านและฝึกทำโจทย์ในเนื้อหาเรื่องใด',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 3,
      title: 'เข้าสู่บทเรียนและแบบฝึกหัด (ซ่อมเสริม)',
      icon: <BookOpen size={32} className="text-secondary" />,
      description: 'ศึกษาเนื้อหาที่ครูเตรียมไว้ให้เฉพาะเรื่องที่เป็นจุดอ่อน และทำแบบฝึกหัดทบทวน',
      action: 'คลิกปุ่ม "เข้าสู่บทเรียน" ในตัวชี้วัดที่เป็นจุดอ่อน จากนั้นดูวิดีโอ/อ่านเนื้อหา และทำแบบฝึกหัด 3 ข้อ',
      result: 'นักเรียนมีความเข้าใจในเนื้อหาที่เป็นจุดอ่อนมากขึ้น และพร้อมสำหรับการทดสอบอีกครั้ง',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 4,
      title: 'ทำแบบทดสอบหลังเรียน (Post-test)',
      icon: <CheckCircle size={32} className="text-purple-600" />,
      description: 'ทดสอบความรู้หลังจากได้รับการซ่อมเสริมแล้ว เพื่อดูความก้าวหน้า',
      action: 'เมื่อซ่อมเสริมครบทุกจุดอ่อนแล้ว ให้ไปที่หน้า "ทดสอบหลังเรียน"',
      result: 'นักเรียนเห็นพัฒนาการของตนเอง (คะแนนที่เพิ่มขึ้น) และปิดจุดอ่อนได้สำเร็จ',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginTop: '1.5rem', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>📖 คู่มือการใช้งานระบบ ADAPT สำหรับนักเรียน</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          ยินดีต้อนรับเข้าสู่แพลตฟอร์มการเรียนรู้แบบ ADAPT! ระบบนี้ออกแบบมาเพื่อช่วยให้นักเรียนค้นพบจุดอ่อนของตัวเอง และพัฒนาให้เก่งขึ้นได้อย่างตรงจุด
          ลองทำตาม 4 ขั้นตอนง่ายๆ ด้านล่างนี้เลย
        </p>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', maxWidth: '800px', margin: '0 auto' }}>
        {steps.map((step, index) => (
          <div key={step.id} style={{ display: 'flex', position: 'relative' }}>
            {/* Step Number Circle */}
            <div style={{ 
              width: '60px', height: '60px', borderRadius: '50%', backgroundColor: 'white', 
              display: 'flex', justifyContent: 'center', alignItems: 'center', 
              boxShadow: '0 4px 15px rgba(0,0,0,0.1)', zIndex: 2, flexShrink: 0,
              border: '3px solid var(--primary)', color: 'var(--primary)', fontSize: '1.5rem', fontWeight: 'bold'
            }}>
              {step.id}
            </div>
            
            {/* Content Box */}
            <div className={step.color} style={{ 
              marginLeft: '1.5rem', padding: '1.5rem', borderRadius: '16px', 
              flex: 1, border: '1px solid', boxShadow: '0 4px 15px rgba(0,0,0,0.03)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', gap: '1rem' }}>
                {step.icon}
                <h3 style={{ margin: 0, fontSize: '1.3rem', color: 'var(--text-main)' }}>{step.title}</h3>
              </div>
              
              <p style={{ color: 'var(--text-light)', marginBottom: '1rem', lineHeight: '1.5' }}>
                {step.description}
              </p>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', backgroundColor: 'rgba(255,255,255,0.6)', padding: '0.8rem', borderRadius: '8px' }}>
                  <div style={{ marginTop: '0.2rem' }}><span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>สิ่งที่ต้องทำ</span></div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>👉 {step.action}</div>
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', backgroundColor: 'rgba(255,255,255,0.6)', padding: '0.8rem', borderRadius: '8px' }}>
                  <div style={{ marginTop: '0.2rem' }}><span style={{ backgroundColor: 'var(--secondary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>ผลลัพธ์ที่ได้</span></div>
                  <div style={{ color: 'var(--text-main)', fontSize: '0.95rem' }}>✨ {step.result}</div>
                </div>
              </div>
            </div>
            
            {/* Connection Line */}
            {index < steps.length - 1 && (
              <div style={{ 
                position: 'absolute', top: '60px', left: '29px', width: '3px', height: 'calc(100% + 2rem - 60px)', 
                backgroundColor: 'var(--border)', zIndex: 1 
              }}></div>
            )}
          </div>
        ))}
      </div>
      
      <div style={{ textAlign: 'center', marginTop: '3rem', padding: '1.5rem', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px' }}>
        <h4 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>🚀 พร้อมที่จะพัฒนาตัวเองหรือยัง?</h4>
        <p style={{ color: 'var(--text-light)', marginBottom: 0 }}>กลับไปที่หน้าหลักและเริ่มทำแบบทดสอบกันเลย!</p>
      </div>
    </div>
  );
}
