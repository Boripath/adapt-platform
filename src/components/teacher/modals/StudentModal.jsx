export default function StudentModal({
  isStudentModalOpen,
  setIsStudentModalOpen,
  studentForm,
  setStudentForm,
  handleSaveStudent
}) {
  if (!isStudentModalOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel">
        <h3>{studentForm.id ? 'แก้ไขข้อมูลนักเรียน' : 'เพิ่มนักเรียนใหม่'}</h3>
        <form onSubmit={handleSaveStudent}>
          <div className="input-group" style={{marginTop: '1rem'}}>
            <label>รหัสประจำตัวประชาชน 13 หลัก</label>
            <input type="text" className="input-field" required maxLength={13} 
              value={studentForm.national_id} onChange={e => setStudentForm({...studentForm, national_id: e.target.value})} />
          </div>
          <div className="input-group">
            <label>ชื่อ-นามสกุล</label>
            <input type="text" className="input-field" required 
              value={studentForm.name} onChange={e => setStudentForm({...studentForm, name: e.target.value})} />
          </div>
          <div className="input-group">
            <label>ชั้นเรียน</label>
            <input type="text" className="input-field" required placeholder="เช่น ป.6/1"
              value={studentForm.class} onChange={e => setStudentForm({...studentForm, class: e.target.value})} />
          </div>
          <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn-outline" onClick={() => setIsStudentModalOpen(false)}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
