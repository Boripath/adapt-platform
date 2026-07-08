import { LogOut } from 'lucide-react';

export default function StudentHeader({ user, handleLogout, academicYear = '2567', openEvaluationModal }) {
  return (
    <header className="dashboard-header glass-panel">
      <div className="header-content">
        <div className="user-info">
          <div className="avatar">{user.name.charAt(0)}</div>
          <div>
            <h2>{user.name}</h2>
            <p>ชั้น {user.class} | รหัส: {user.national_id}</p>
            <p className="text-sm text-light mt-1">{user.teacher_school_name || 'โรงเรียนเหล่าหลวงวิทยาคาร'} | ปีการศึกษา {academicYear}</p>
          </div>
        </div>
        <div style={{display: 'flex', gap: '0.5rem'}}>
          <button onClick={openEvaluationModal} className="btn btn-outline" style={{borderColor: 'var(--primary)', color: 'var(--primary)'}}>
            ประเมินความพึงพอใจ
          </button>
          <button onClick={handleLogout} className="btn btn-outline text-red">
            <LogOut size={18} /> ออกจากระบบ
          </button>
        </div>
      </div>
    </header>
  );
}
