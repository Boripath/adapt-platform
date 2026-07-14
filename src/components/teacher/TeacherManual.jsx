import React from 'react';
import { Users, FileText, Activity, ArrowRight, Settings } from 'lucide-react';

export default function TeacherManual() {
  const steps = [
    {
      id: 1,
      title: 'แดชบอร์ดภาพรวม (ใส่ใจ / ดูผล)',
      icon: <Activity size={32} className="text-primary" />,
      description: 'หน้าแรกที่ใช้ในการดูผลสัมฤทธิ์ภาพรวมของนักเรียนทั้งหมด',
      action: 'คลิกที่แท็บ "ภาพรวม" เพื่อดูสถิติการเข้าใช้งาน คะแนนเฉลี่ยก่อนเรียน-หลังเรียน และกราฟต่างๆ',
      result: 'ครูจะเห็นภาพรวมว่านักเรียนอ่อนในจุดไหนมากที่สุด และต้องพัฒนาส่วนใดเป็นพิเศษ',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 2,
      title: 'จัดการนักเรียน (เข้าถึง)',
      icon: <Users size={32} className="text-blue-500" />,
      description: 'ระบบที่ใช้เพิ่ม ลด และดูข้อมูลของนักเรียนรายบุคคล',
      action: 'ไปที่แท็บ "รายชื่อนักเรียน" ครูสามารถกดดูข้อมูลนักเรียนรายบุคคล เพื่อวิเคราะห์จุดอ่อนเฉพาะคนได้',
      result: 'ช่วยให้ครูเข้าใจนักเรียนรายบุคคล (Personalized) ว่าแต่ละคนมีปัญหาในตัวชี้วัดใด และติดตามความคืบหน้าได้',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      id: 3,
      title: 'จัดการเนื้อหาบทเรียน (ให้เป้า / พึ่งครู)',
      icon: <FileText size={32} className="text-secondary" />,
      description: 'ระบบที่ครูใช้สร้างหรือแก้ไขลิงก์สื่อการเรียนรู้และแบบฝึกหัดสำหรับแต่ละตัวชี้วัด',
      action: 'ไปที่แท็บ "จัดการเนื้อหาบทเรียน" เลือกตัวชี้วัดที่ต้องการ และกดปุ่มเพื่อแทรกลิงก์สื่อวิดีโอ หรือ เพิ่มแบบฝึกหัด',
      result: 'นักเรียนจะมีสื่อการเรียนรู้ที่ตรงกับปัญหาของตนเอง (Adaptive Learning) และสามารถฝึกฝนได้ทันที',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 4,
      title: 'การวิเคราะห์ข้อสอบ (Analytics)',
      icon: <Settings size={32} className="text-orange-500" />,
      description: 'หน้าจอสำหรับดูผลการวิเคราะห์ระดับความยากง่ายของข้อสอบแต่ละข้อ',
      action: 'ไปที่แท็บ "วิเคราะห์ผลสอบ" เพื่อดูว่าข้อสอบข้อไหนนักเรียนตอบผิดเยอะ',
      result: 'ครูนำข้อมูลเหล่านี้ไปปรับปรุงข้อสอบให้มีมาตรฐาน และจัดแผนการสอนได้แม่นยำขึ้น',
      color: 'bg-orange-50 border-orange-200'
    }
  ];

  return (
    <div className="glass-panel" style={{ padding: '2rem', animation: 'fadeIn 0.5s ease-out' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
        <h2 style={{ color: 'var(--primary)', marginBottom: '1rem', fontSize: '1.8rem' }}>📘 คู่มือการใช้งานระบบ ADAPT สำหรับคุณครู</h2>
        <p style={{ color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
          แนวทางการใช้งานแพลตฟอร์ม ADAPT เพื่อพัฒนาการจัดการเรียนการสอนแบบปรับเหมาะ (Adaptive Learning) 
          และช่วยให้สามารถวินิจฉัยจุดอ่อนของนักเรียนได้อย่างแม่นยำ
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
                  <div style={{ marginTop: '0.2rem' }}><span style={{ backgroundColor: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 'bold' }}>การใช้งาน</span></div>
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
    </div>
  );
}
