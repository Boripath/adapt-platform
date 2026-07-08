import { useState } from 'react';

export default function ExerciseModal({
  isExerciseModalOpen,
  setIsExerciseModalOpen,
  selectedIndicatorForExercise,
  questions,
  openAddExerciseModal,
  openEditQuestionModal,
  handleDeleteQuestion,
  getQuestionPreview,
  user,
  teachersList
}) {
  if (!isExerciseModalOpen || !selectedIndicatorForExercise) return null;

  const isAdmin = user?.role === 'admin';
  
  const [showMaster, setShowMaster] = useState(true);
  const [showUserExercises, setShowUserExercises] = useState(false);
  
  const allExercises = questions.filter(q => q.exam_year === 'LESSON' && (
    (q.indicator_codes && q.indicator_codes.includes(selectedIndicatorForExercise.indicator_code)) ||
    (q.indicator_code === selectedIndicatorForExercise.indicator_code)
  ));
  
  const masterExercises = allExercises.filter(q => q.teacher_id === user.id);
  const userExercises = allExercises.filter(q => q.teacher_id !== user.id);

  const getTeacherName = (id) => {
    if (!teachersList) return id;
    const t = teachersList.find(teacher => teacher.id === id);
    return t ? t.name : id;
  };

  const renderTable = (exercises, showTeacherName) => (
    <table style={{width: '100%', borderCollapse: 'collapse', marginBottom: '2rem'}}>
      <thead>
        <tr style={{borderBottom: '2px solid var(--border)', textAlign: 'left', backgroundColor: 'rgba(79, 70, 229, 0.05)'}}>
          <th style={{padding: '1rem', width: '10%'}}>ข้อที่</th>
          <th style={{padding: '1rem', width: showTeacherName ? '45%' : '60%'}}>โจทย์</th>
          {showTeacherName && <th style={{padding: '1rem', width: '25%'}}>สร้างโดย</th>}
          <th style={{padding: '1rem', width: '20%'}}>จัดการ</th>
        </tr>
      </thead>
      <tbody>
        {exercises.length === 0 ? (
          <tr><td colSpan={showTeacherName ? 4 : 3} style={{padding: '2rem', textAlign: 'center'}}>ไม่มีข้อมูลแบบฝึกหัดในส่วนนี้</td></tr>
        ) : (
          exercises.map((q, index) => (
            <tr key={q.id} style={{borderBottom: '1px solid var(--border)'}}>
              <td style={{padding: '1rem'}}>{index + 1}</td>
              <td style={{padding: '1rem'}}>{getQuestionPreview(q.content)}</td>
              {showTeacherName && <td style={{padding: '1rem', color: 'var(--text-light)', fontSize: '0.9rem'}}>{getTeacherName(q.teacher_id)}</td>}
              <td style={{padding: '1rem', whiteSpace: 'nowrap'}}>
                <button className="btn btn-outline btn-sm" style={{marginRight: '0.5rem'}} onClick={() => openEditQuestionModal(q)}>แก้ไข</button>
                <button className="btn btn-outline btn-sm text-red" onClick={() => handleDeleteQuestion(q.id)}>ลบ</button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  return (
    <div className="modal-overlay" style={{zIndex: 50}}>
      <div className="modal-content glass-panel" style={{maxWidth: '900px', maxHeight: '90vh', overflowY: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h3 style={{margin: 0}}>จัดการแบบฝึกหัด: {selectedIndicatorForExercise.indicator_code}</h3>
          <button className="btn btn-outline btn-sm" onClick={() => setIsExerciseModalOpen(false)}>ปิด</button>
        </div>
        
        <div style={{marginBottom: '1rem'}}>
          <button className="btn btn-primary" onClick={() => openAddExerciseModal(selectedIndicatorForExercise.indicator_code)}>
            ➕ เพิ่มแบบฝึกหัดใหม่
          </button>
        </div>
        
        {isAdmin ? (
          <>
            <div 
              style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: showMaster ? '1rem' : '1.5rem', background: 'rgba(79, 70, 229, 0.05)', padding: '0.75rem 1rem', borderRadius: '8px'}}
              onClick={() => setShowMaster(!showMaster)}
            >
              <h4 style={{margin: 0, color: 'var(--primary)'}}>📌 แบบฝึกหัดต้นแบบ (ของ Admin)</h4>
              <button className="btn btn-outline btn-sm">{showMaster ? 'ซ่อนตาราง 🔼' : 'แสดงตาราง 🔽'}</button>
            </div>
            {showMaster && renderTable(masterExercises, false)}
            
            <div 
              style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: showUserExercises ? '1rem' : '1.5rem', background: 'rgba(79, 70, 229, 0.05)', padding: '0.75rem 1rem', borderRadius: '8px'}}
              onClick={() => setShowUserExercises(!showUserExercises)}
            >
              <h4 style={{margin: 0, color: 'var(--secondary)'}}>🧑‍🏫 คลังแบบฝึกหัดที่คุณครูสร้าง/แก้ไข</h4>
              <button className="btn btn-outline btn-sm">{showUserExercises ? 'ซ่อนตาราง 🔼' : 'แสดงตาราง 🔽'}</button>
            </div>
            {showUserExercises && renderTable(userExercises, true)}
          </>
        ) : (
          <>
            <div 
              style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', marginBottom: showMaster ? '1rem' : '1.5rem', background: 'rgba(79, 70, 229, 0.05)', padding: '0.75rem 1rem', borderRadius: '8px'}}
              onClick={() => setShowMaster(!showMaster)}
            >
              <h4 style={{margin: 0, color: 'var(--primary)'}}>📌 แบบฝึกหัดบทเรียนของคุณครู</h4>
              <button className="btn btn-outline btn-sm">{showMaster ? 'ซ่อนตาราง 🔼' : 'แสดงตาราง 🔽'}</button>
            </div>
            {showMaster && renderTable(masterExercises, false)}
          </>
        )}
      </div>
    </div>
  );
}
