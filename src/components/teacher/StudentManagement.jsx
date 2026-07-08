import React, { useState, useMemo } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';

export default function StudentManagement({
  students,
  user,
  teachersList,
  openAddStudentModal,
  handleMoveItem,
  openStudentAnalysis,
  openEditStudentModal,
  handleDeleteStudent
}) {
  const isAdmin = user && user.role === 'admin';

  // Group students by teacher if admin
  const groupedStudents = useMemo(() => {
    if (!isAdmin) return null;
    const groups = {};
    students.forEach(student => {
      const tid = student.teacher_id;
      if (!groups[tid]) groups[tid] = [];
      groups[tid].push(student);
    });
    return groups;
  }, [students, isAdmin]);

  // Collapsed state for groups
  const [expandedGroups, setExpandedGroups] = useState({});

  const toggleGroup = (tid) => {
    setExpandedGroups(prev => ({
      ...prev,
      [tid]: !prev[tid]
    }));
  };

  const renderStudentRow = (student, index, isGrouped = false) => (
    <tr key={student.id} style={{borderBottom: '1px solid var(--border)'}}>
      <td style={{padding: '1rem'}}>{index + 1}</td>
      <td style={{padding: '1rem', fontFamily: 'monospace', fontSize: '1.1rem'}}>{student.national_id}</td>
      <td style={{padding: '1rem'}}>{student.name}</td>
      <td style={{padding: '1rem'}}>{student.class}</td>
      <td style={{padding: '1rem', whiteSpace: 'nowrap'}}>
        {!isGrouped && (
          <>
            <button className="btn btn-outline btn-sm" style={{marginRight: '0.25rem', padding: '0.25rem 0.5rem'}} onClick={() => handleMoveItem('students', index, 'up')} disabled={index === 0}>⬆️</button>
            <button className="btn btn-outline btn-sm" style={{marginRight: '0.5rem', padding: '0.25rem 0.5rem'}} onClick={() => handleMoveItem('students', index, 'down')} disabled={index === students.length - 1}>⬇️</button>
          </>
        )}
        <button className="btn btn-primary btn-sm" style={{marginRight: '0.5rem'}} onClick={() => openStudentAnalysis(student)}>วิเคราะห์ผู้เรียน</button>
        <button className="btn btn-outline btn-sm" style={{marginRight: '0.5rem'}} onClick={() => openEditStudentModal(student)}>แก้ไข</button>
        <button className="btn btn-outline btn-sm text-red" onClick={() => handleDeleteStudent(student.id)}>ลบ</button>
      </td>
    </tr>
  );

  return (
    <section className="glass-panel p-4 fade-in">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h3 className="section-title" style={{marginBottom: 0}}>ระบบจัดการข้อมูลผู้เรียน {isAdmin && '(โหมดผู้ดูแลระบบ)'}</h3>
        <div style={{display: 'flex', gap: '1rem'}}>
          <button className="btn btn-outline" style={{display: 'none'}}>📥 อัปโหลดรายชื่อจากไฟล์ Excel</button>
          {!isAdmin && <button className="btn btn-primary" onClick={openAddStudentModal}>➕ เพิ่มนักเรียนใหม่</button>}
        </div>
      </div>

      <table style={{width: '100%', borderCollapse: 'collapse'}}>
        <thead>
          <tr style={{borderBottom: '2px solid var(--border)', textAlign: 'left', backgroundColor: 'rgba(79, 70, 229, 0.05)'}}>
            <th style={{padding: '1rem', width: '80px'}}>ลำดับ</th>
            <th style={{padding: '1rem'}}>รหัสประจำตัวประชาชน 13 หลัก</th>
            <th style={{padding: '1rem'}}>ชื่อ - นามสกุล</th>
            <th style={{padding: '1rem'}}>ชั้นเรียน</th>
            <th style={{padding: '1rem'}}>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {!isAdmin ? (
            students.length > 0 ? (
              students.map((student, index) => renderStudentRow(student, index))
            ) : (
              <tr><td colSpan="5" style={{textAlign: 'center', padding: '2rem'}}>ยังไม่มีข้อมูลนักเรียน</td></tr>
            )
          ) : (
            Object.keys(groupedStudents || {}).map(tid => {
              const teacher = teachersList?.find(t => t.id === tid);
              const teacherName = teacher ? (teacher.name || teacher.username) : 'ไม่ทราบชื่อครูผู้สอน';
              const groupStudents = groupedStudents[tid];
              const isExpanded = !!expandedGroups[tid];

              return (
                <React.Fragment key={tid}>
                  <tr 
                    style={{backgroundColor: 'var(--bg-gradient-start)', cursor: 'pointer'}} 
                    onClick={() => toggleGroup(tid)}
                  >
                    <td colSpan="5" style={{padding: '1rem', fontWeight: 'bold'}}>
                      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                        {isExpanded ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                        รายชื่อนักเรียนของคุณครู {teacherName} ({groupStudents.length} คน)
                      </div>
                    </td>
                  </tr>
                  {isExpanded && groupStudents.map((student, index) => renderStudentRow(student, index, true))}
                </React.Fragment>
              );
            })
          )}
        </tbody>
      </table>
    </section>
  );
}
