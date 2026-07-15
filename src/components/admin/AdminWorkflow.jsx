import React, { useRef } from 'react';
import { Target, BarChart2, UserCheck, ShieldCheck, Users, ArrowRight, ArrowDown, RefreshCw, Download } from 'lucide-react';
import html2canvas from 'html2canvas';

export default function AdminWorkflow() {
  const workflowRef = useRef(null);

  const handleExport = async () => {
    if (workflowRef.current) {
      try {
        const canvas = await html2canvas(workflowRef.current, { 
          scale: 2,
          backgroundColor: '#f8fafc', // match background color
        });
        const dataUrl = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.download = 'ADAPT_Workflow_Model.png';
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error("Failed to export image", err);
      }
    }
  };

  const steps = [
    {
      id: 1,
      title: 'ขั้นที่ 1: ใส่ใจ (วิเคราะห์ปัญหาและวางแผน)',
      subtitle: 'การรวมพลัง PLC เพื่อออกแบบแพลตฟอร์ม ADAPT',
      icon: <Users size={36} className="text-primary" />,
      description: 'วิเคราะห์สภาพปัญหาด้วยกระบวนการ PLC พบว่าข้อมูลผลสอบเดิมไม่สะท้อนจุดบกพร่องที่แท้จริงของผู้เรียนรุ่นปัจจุบัน จึงเริ่มออกแบบนวัตกรรม แพลตฟอร์ม ADAPT เพื่อใช้วินิจฉัยผู้เรียนเป็นรายบุคคล',
      result: 'เกิดการสร้างองค์ความรู้ใหม่ ได้แนวทางแก้ไขปัญหาที่ตรงจุดและสอดคล้องกับบริบทของโรงเรียน',
      color: 'bg-indigo-50 border-indigo-200'
    },
    {
      id: 2,
      title: 'ขั้นที่ 2: ให้เป้า (พัฒนาระบบและคลังทรัพยากร)',
      subtitle: 'สร้างคลังข้อสอบและให้นักเรียนทำแบบทดสอบก่อนเรียน (Pre-test)',
      icon: <Target size={36} className="text-red-500" />,
      description: 'ครูนำข้อสอบ O-NET เข้าสู่ระบบจัดหมวดหมู่ตามตัวชี้วัด และรวบรวมคลิปวิดีโอ/บทเรียนซ่อมเสริม จากนั้นให้นักเรียนทุกคนทำบททดสอบก่อนเรียน เพื่อให้ระบบประมวลผลและ "ชี้เป้า" จุดบกพร่องของแต่ละคน',
      result: 'ระบบประเมินและชี้เป้าหมายการซ่อมเสริมรายบุคคลได้อย่างรวดเร็วและแม่นยำ',
      color: 'bg-red-50 border-red-200'
    },
    {
      id: 3,
      title: 'ขั้นที่ 3: เข้าถึง (การทดสอบวินิจฉัยรายบุคคล)',
      subtitle: 'เข้าถึงข้อมูลจุดอ่อนรายบุคคลอย่างลึกซึ้ง (Diagnostic)',
      icon: <BarChart2 size={36} className="text-orange-500" />,
      description: 'ครูผู้สอนเข้าไปดูผลการวิเคราะห์สถิติของนักเรียนเป็นรายบุคคลผ่าน Dashboard ทำให้มองเห็นจุดอ่อนของนักเรียนแต่ละคนอย่างเป็นรูปธรรม เพื่อใช้เป็นฐานข้อมูลในการวางแผนจัดกลุ่มนักเรียน',
      result: 'ครูเข้าถึงข้อมูลพฤติกรรมการเรียนและจุดอ่อนของผู้เรียนแต่ละคนอย่างเจาะลึก',
      color: 'bg-orange-50 border-orange-200'
    },
    {
      id: 4,
      title: 'ขั้นที่ 4: พึ่งครู (การจัดการเรียนรู้ซ่อมเสริมแบบพุ่งเป้า)',
      subtitle: 'Targeted Remedial & Active Learning',
      icon: <UserCheck size={36} className="text-green-600" />,
      description: 'ดำเนินการเป็น 2 ระดับ คือ 1) ระดับบุคคล: นักเรียนศึกษาบทเรียนเฉพาะตัวชี้วัดที่ตนเองบกพร่องผ่านแพลตฟอร์ม 2) ระดับชั้นเรียน: ครูจัดกลุ่มนักเรียนที่มีจุดบกพร่องคล้ายกัน จัดกิจกรรมเชิงรุก (Active Learning) เฉพาะกลุ่ม',
      result: 'ช่วยลดเวลาการสอนซ้ำซ้อน นักเรียนได้รับการแก้ไขจุดอ่อนตรงตามความต้องการอย่างแท้จริง',
      color: 'bg-green-50 border-green-200'
    },
    {
      id: 5,
      title: 'ขั้นที่ 5: ดูผล (ประเมินผล สะท้อนกลับ และพัฒนา)',
      subtitle: 'ทดสอบหลังเรียน (Post-test) และปรับปรุงอย่างต่อเนื่อง',
      icon: <ShieldCheck size={36} className="text-purple-600" />,
      description: 'นักเรียนทำแบบทดสอบหลังเรียน (Post-test) ระบบจะเปรียบเทียบคะแนนก่อน-หลังเรียนให้เห็นความก้าวหน้า จากนั้นครูนำผลลัพธ์มาถอดบทเรียน ปรับปรุงคลังข้อสอบและสื่อซ่อมเสริมในรอบถัดไป',
      result: 'ยกระดับผลสัมฤทธิ์อย่างเป็นรูปธรรม และเกิดการพัฒนาแพลตฟอร์มให้มีประสิทธิภาพยิ่งขึ้นอย่างต่อเนื่อง',
      color: 'bg-purple-50 border-purple-200'
    }
  ];

  return (
    <div style={{ position: 'relative' }}>
      <button 
        onClick={handleExport}
        className="btn btn-outline"
        style={{ position: 'absolute', top: '1rem', right: '1rem', zIndex: 10, display: 'flex', alignItems: 'center', gap: '0.5rem', backgroundColor: 'white' }}
        title="บันทึกเป็นรูปภาพ"
      >
        <Download size={18} /> ดาวน์โหลดแผนภาพ (PNG)
      </button>

      <div ref={workflowRef} className="glass-panel" style={{ padding: '3rem 2rem', animation: 'fadeIn 0.5s ease-out', backgroundColor: '#f8fafc' }}>
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

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', maxWidth: '1000px', margin: '0 auto', gap: '1rem' }}>
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Container */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              width: '100%', 
              gap: '1rem',
              alignItems: 'stretch'
            }}>
              
              {/* Main Box (Inner Circle/Box) */}
              <div className={`${step.color} border`} style={{ 
                flex: '1 1 500px',
                borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column',
                boxShadow: '0 4px 15px rgba(0,0,0,0.03)', position: 'relative', overflow: 'hidden'
              }}>
                <div style={{ position: 'absolute', top: '-10px', right: '-10px', opacity: 0.1, transform: 'scale(2.5)' }}>
                  {step.icon}
                </div>
                
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', marginBottom: '1rem', position: 'relative', zIndex: 1 }}>
                  <div style={{ 
                    width: '45px', height: '45px', borderRadius: '12px', backgroundColor: 'white', 
                    display: 'flex', justifyContent: 'center', alignItems: 'center', 
                    boxShadow: '0 4px 10px rgba(0,0,0,0.05)', color: 'var(--text-main)', flexShrink: 0
                  }}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 style={{ margin: '0 0 0.3rem 0', fontSize: '1.2rem', color: 'var(--text-main)', fontWeight: 'bold' }}>{step.title}</h3>
                    <h4 style={{ margin: '0', fontSize: '0.95rem', color: 'var(--secondary)' }}>{step.subtitle}</h4>
                  </div>
                </div>
                
                <p style={{ color: 'var(--text-light)', fontSize: '0.95rem', lineHeight: '1.6', margin: '0', position: 'relative', zIndex: 1 }}>
                  {step.description}
                </p>
              </div>
              
              {/* Arrow pointing to Result */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} className="py-2 px-2">
                 <ArrowRight className="text-gray-400" size={32} />
              </div>

              {/* Result Box (Outer Box) */}
              <div style={{ 
                flex: '1 1 300px',
                backgroundColor: 'rgba(255,255,255,0.7)', 
                border: '2px dashed var(--secondary)',
                borderRadius: '16px', padding: '1.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center',
                boxShadow: '0 4px 15px rgba(0,0,0,0.02)'
              }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '1.05rem', color: 'var(--secondary)', marginBottom: '0.8rem', fontWeight: 'bold' }}>
                  ✨ ผลลัพธ์ที่ได้:
                </span>
                <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.6' }}>{step.result}</span>
              </div>
            </div>

            {/* Arrow connecting to next step */}
            {index < steps.length - 1 && (
              <div style={{ margin: '0.5rem 0' }}>
                <ArrowDown className="text-primary" size={36} />
              </div>
            )}
          </React.Fragment>
        ))}
        
        {/* Cycle indicator */}
        <div style={{ 
          marginTop: '1.5rem', padding: '1rem 2rem', backgroundColor: 'var(--primary)', color: 'white', 
          borderRadius: '30px', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '0.8rem',
          boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
        }}>
           <RefreshCw size={24} /> วนกลับไปพัฒนาอย่างต่อเนื่อง
        </div>
      </div>
    </div>
    </div>
  );
}
