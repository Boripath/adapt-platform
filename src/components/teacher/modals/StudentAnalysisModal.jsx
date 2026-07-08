export default function StudentAnalysisModal({
  isAnalysisModalOpen,
  setIsAnalysisModalOpen,
  selectedStudentForAnalysis,
  testResults,
  handleResetStudentData
}) {
  if (!isAnalysisModalOpen || !selectedStudentForAnalysis) return null;

  const stResults = testResults.filter(tr => tr.student_id === selectedStudentForAnalysis.id).sort((a,b) => new Date(b.completed_at) - new Date(a.completed_at));
  const preTest = stResults.find(r => r.subject === 'Science');
  const postTest = stResults.find(r => r.subject === 'Science (Post-test)');
  
  const formatTimeSpent = (sec) => {
    if (sec == null) return '';
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `ใช้เวลา: ${m} นาที ${s} วินาที`;
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem'}}>
          <h3 style={{margin: 0}}>การวิเคราะห์ผู้เรียนรายบุคคล</h3>
          <button className="btn btn-outline btn-sm" onClick={() => setIsAnalysisModalOpen(false)}>ปิด</button>
        </div>
        
        <div style={{background: 'rgba(79, 70, 229, 0.05)', padding: '1rem', borderRadius: '8px', marginBottom: '1.5rem'}}>
          <h4 style={{margin: '0 0 0.5rem 0'}}>{selectedStudentForAnalysis.name} (ชั้น {selectedStudentForAnalysis.class})</h4>
          <p style={{margin: 0, fontSize: '0.9rem', color: 'var(--text-light)'}}>รหัสประจำตัว: {selectedStudentForAnalysis.national_id}</p>
        </div>

        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          <div style={{display: 'flex', gap: '1rem'}}>
            <div style={{flex: 1, padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px'}}>
              <p style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>คะแนน Pre-test</p>
              {preTest ? (
                <>
                  <div style={{fontSize: '1.5rem', color: 'var(--primary)', fontWeight: 'bold'}}>{preTest.score} / {preTest.total}</div>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>
                    {new Date(preTest.completed_at).toLocaleDateString('th-TH')}
                    <br />{formatTimeSpent(preTest.time_spent_seconds)}
                  </p>
                </>
              ) : <p style={{color: 'var(--text-light)'}}>ยังไม่ได้สอบ</p>}
            </div>
            
            <div style={{flex: 1, padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px'}}>
              <p style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>คะแนน Post-test</p>
              {postTest ? (
                <>
                  <div style={{fontSize: '1.5rem', color: '#10b981', fontWeight: 'bold'}}>{postTest.score} / {postTest.total}</div>
                  <p style={{fontSize: '0.8rem', color: 'var(--text-light)'}}>
                    {new Date(postTest.completed_at).toLocaleDateString('th-TH')}
                    <br />{formatTimeSpent(postTest.time_spent_seconds)}
                  </p>
                </>
              ) : <p style={{color: 'var(--text-light)'}}>ยังไม่ได้สอบ</p>}
            </div>
          </div>
          
          {preTest && preTest.weaknesses && preTest.weaknesses.length > 0 && (
            <div style={{padding: '1rem', border: '1px solid var(--border)', borderRadius: '8px'}}>
              <p style={{fontWeight: 'bold', marginBottom: '0.5rem', color: '#ef4444'}}>ตัวชี้วัดที่บกพร่อง (ต้องซ่อมเสริม)</p>
              <div style={{display: 'flex', flexWrap: 'wrap', gap: '0.5rem'}}>
                {preTest.weaknesses.map((w, idx) => {
                  const lessonResult = stResults.find(r => r.subject === 'Science (Lesson)' && r.exam_year === w);
                  const isCompleted = !!lessonResult;
                  
                  let completedText = '✅ เข้าเรียนแล้ว';
                  if (isCompleted) {
                    const attempts = lessonResult.total || 1;
                    const time = formatTimeSpent(lessonResult.time_spent_seconds);
                    completedText = `✅ ผ่าน (ลอง ${attempts} ครั้ง${time ? ', ' + time : ''})`;
                  }

                  return (
                    <span key={idx} className="badge" style={{
                      background: isCompleted ? 'rgba(16, 185, 129, 0.1)' : 'rgba(239, 68, 68, 0.1)', 
                      color: isCompleted ? '#10b981' : '#ef4444', 
                      padding: '4px 10px', 
                      borderRadius: '12px',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '4px',
                      fontSize: '0.85rem'
                    }}>
                      {w} {isCompleted ? `(${completedText})` : '(❌ ยังไม่เข้า)'}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          <div style={{marginTop: '1rem', paddingTop: '1.5rem', borderTop: '1px dashed var(--border)', textAlign: 'center'}}>
            <p style={{fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '1rem'}}>
              หากต้องการให้นักเรียนเริ่มสอบใหม่ทั้งหมด สามารถกดรีเซ็ตข้อมูลได้ (ข้อมูลเก่าจะหายไป)
            </p>
            <button className="btn btn-outline" style={{borderColor: '#ef4444', color: '#ef4444'}} onClick={() => handleResetStudentData(selectedStudentForAnalysis.id)}>
              รีเซ็ตข้อมูลการสอบของนักเรียนคนนี้
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
