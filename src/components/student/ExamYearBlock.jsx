import { AlertCircle, BookOpen } from 'lucide-react';

export default function ExamYearBlock({
  year,
  testResultsByYear,
  remedialContentsByYear,
  allTestResults,
  expandedYears,
  toggleYear,
  navigate
}) {
  const yearData = testResultsByYear[year] || { pre: null, post: null };
  const { pre: preTestResult, post: postTestResult } = yearData;
  const remedialContents = remedialContentsByYear[year] || [];

  return (
    <div style={{marginBottom: '3rem', borderTop: '2px solid var(--border)', paddingTop: '2rem'}}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <h2 className="title" style={{fontSize: '1.4rem', margin: 0, color: 'var(--text-dark)'}}>
          ปีการศึกษาข้อสอบ: <span style={{color: 'var(--primary)'}}>{year}</span>
        </h2>
        <button className="btn btn-outline btn-sm" onClick={() => toggleYear(year)}>
          {expandedYears[year] === true ? 'ซ่อนข้อมูล' : 'แสดงข้อมูล'}
        </button>
      </div>

      {expandedYears[year] === true && (
        <div>
          {!preTestResult ? (
            <div className="glass-panel text-center p-4">
              <AlertCircle size={48} className="text-warning mb-2" style={{margin: '0 auto'}} />
              <h3 className="title text-lg">คุณยังไม่ได้ทำแบบทดสอบก่อนเรียนสำหรับ {year}</h3>
              <button className="btn btn-primary mt-2" onClick={() => navigate(`/exam?type=pre&year=${encodeURIComponent(year)}`)}>เริ่มทำแบบทดสอบ Pre-test {year}</button>
            </div>
          ) : (
            <>
              <div style={{display: 'flex', gap: '2rem'}}>
                <section className="glass-panel summary-section" style={{flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                  <div>
                    <h3 className="section-title">ผลการทดสอบวินิจฉัย (Pre-test)</h3>
                    <div className="score-display">
                      <span className="score">{preTestResult.score}</span>
                      <span className="total">/ {preTestResult.total}</span>
                    </div>
                    <p className="mt-2 text-light text-center">ทำแบบทดสอบเมื่อ: {new Date(preTestResult.completed_at).toLocaleDateString('th-TH')}</p>
                  </div>
                  <button className="btn btn-outline btn-sm mt-4" style={{alignSelf: 'center'}} onClick={() => {
                    if(window.confirm(`คุณต้องการทำแบบทดสอบวินิจฉัย (Pre-test) ปี ${year} ใหม่อีกครั้งใช่หรือไม่? (ระบบจะเก็บผลล่าสุด)`)) {
                      navigate(`/exam?type=pre&year=${encodeURIComponent(year)}`);
                    }
                  }}>สอบใหม่อีกครั้ง</button>
                </section>

                {postTestResult ? (
                  <section className="glass-panel summary-section" style={{flex: 1, border: '2px solid var(--primary)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                    <div>
                      <h3 className="section-title" style={{color: 'var(--primary)'}}>ผลการทดสอบหลังเรียน (Post-test)</h3>
                      <div className="score-display">
                        <span className="score" style={{color: 'var(--primary)'}}>{postTestResult.score}</span>
                        <span className="total">/ {postTestResult.total}</span>
                      </div>
                      <p className="mt-2 text-light text-center">ทำแบบทดสอบเมื่อ: {new Date(postTestResult.completed_at).toLocaleDateString('th-TH')}</p>
                    </div>
                    <button className="btn btn-outline btn-sm mt-4" style={{alignSelf: 'center', borderColor: 'var(--primary)', color: 'var(--primary)'}} onClick={() => {
                      if(window.confirm(`คุณต้องการทำแบบทดสอบหลังเรียน (Post-test) ปี ${year} ใหม่อีกครั้งใช่หรือไม่? (ระบบจะเก็บผลล่าสุด)`)) {
                        navigate(`/exam?type=post&year=${encodeURIComponent(year)}`);
                      }
                    }}>สอบใหม่อีกครั้ง</button>
                  </section>
                ) : (
                  <section className="glass-panel summary-section" style={{flex: 1, border: '2px dashed var(--border)', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                    <h3 className="section-title" style={{color: 'var(--text-light)'}}>การทดสอบหลังเรียน</h3>
                    <p className="text-light text-center mt-2 mb-4">คุณยังไม่ได้ทำแบบทดสอบหลังเรียน</p>
                    <button className="btn btn-primary" onClick={() => navigate(`/exam?type=post&year=${encodeURIComponent(year)}`)}>เริ่มสอบ Post-test {year}</button>
                  </section>
                )}
              </div>

              <section className="remedial-section mt-4">
                <h3 className="section-title">วิดีโอซ่อมเสริมเฉพาะจุด (ปรับตามผลสอบ)</h3>
                <p className="subtitle text-sm">ระบบตรวจพบว่าคุณมีจุดที่ต้องทบทวนเพิ่มเติมดังต่อไปนี้:</p>
                
                <div className="content-grid">
                  {remedialContents.length > 0 ? remedialContents.map((content, idx) => {
                    const isCompleted = allTestResults.some(r => r.subject === 'Science (Lesson)' && r.exam_year === content.indicator_code);
                    return (
                    <div key={idx} className="glass-panel content-card">
                      <div className="content-icon flex-center">
                        <BookOpen size={32} />
                      </div>
                      <div className="content-info">
                        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                          <h4 style={{margin: 0}}>{content.indicator_code}</h4>
                          {isCompleted ? (
                            <span style={{display: 'inline-block', background: '#10b981', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>✅ เข้าเรียนแล้ว</span>
                          ) : (
                            <span style={{display: 'inline-block', background: '#ef4444', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.75rem', fontWeight: 'bold'}}>❌ ยังไม่เข้าเรียน</span>
                          )}
                        </div>
                        <p className="text-sm" style={{color: 'var(--text-light)', marginTop: '8px', marginBottom: '8px'}}>{content.details.substring(0, 50)}...</p>
                        <button className="btn btn-outline btn-sm" onClick={() => navigate(`/lesson/${encodeURIComponent(content.indicator_code)}`)}>เข้าเรียนทบทวน</button>
                      </div>
                    </div>
                    );
                  }) : (
                    <p className="text-light mt-2">🎉 เก่งมาก! คุณไม่มีตัวชี้วัดที่บกพร่องในแบบทดสอบนี้</p>
                  )}
                </div>
              </section>
              
              {!postTestResult && (
                <div className="text-center mt-4">
                  <p className="text-sm mt-1 text-light">หลังจากเรียนซ่อมเสริมครบแล้ว ให้ทำแบบทดสอบหลังเรียนอีกครั้งเพื่อดูพัฒนาการ</p>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
