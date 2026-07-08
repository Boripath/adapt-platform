import { Clock } from 'lucide-react';

export default function ExamHeader({ examType, timeLeft, formatTime, navigate }) {
  return (
    <header className="dashboard-header glass-panel" style={{ padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
      <div className="header-content">
        <h2 className="title" style={{ margin: 0, fontSize: '1.2rem' }}>
          แบบทดสอบ {examType === 'post' ? 'หลังเรียน (Post-test)' : 'ก่อนเรียน (Pre-test)'} - วิชาวิทยาศาสตร์
        </h2>
        <p className="text-light" style={{ fontSize: '0.9rem', margin: '0.2rem 0 0 0' }}>กรุณาทำแบบทดสอบให้เสร็จภายในเวลาที่กำหนด</p>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: timeLeft < 300 ? '#ef4444' : 'var(--text-dark)', fontWeight: 'bold' }}>
          <Clock size={20} />
          <span style={{ fontSize: '1.2rem' }}>{formatTime(timeLeft)}</span>
        </div>
        <button 
          className="btn btn-outline" 
          style={{ borderColor: '#ef4444', color: '#ef4444', padding: '0.5rem 1rem' }}
          onClick={() => {
            if (window.confirm("คุณต้องการออกจากการสอบใช่หรือไม่? ข้อมูลการสอบในครั้งนี้จะไม่ถูกบันทึก")) {
              navigate('/student-dashboard');
            }
          }}
        >
          ออกจากการสอบ
        </button>
      </div>
    </header>
  );
}
