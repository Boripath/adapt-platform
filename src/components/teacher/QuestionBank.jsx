export default function QuestionBank({
  questions,
  user,
  userPermissions,
  openAddQuestionModal,
  expandedYears,
  toggleYear,
  getQuestionPreview,
  handleMoveItem,
  openEditQuestionModal,
  handleDeleteQuestion,
  openIndicatorInfo
}) {
  const isAdmin = user?.role === 'admin';
  const oNetQuestions = questions.filter(q => q.exam_year !== 'LESSON');
  const uniqueYears = [...new Set(oNetQuestions.map(q => q.exam_year))].sort((a,b) => b.localeCompare(a));

  return (
    <section className="glass-panel p-4">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <h3 className="section-title" style={{marginBottom: 0}}>ระบบจัดการคลังข้อสอบ (O-NET วิทยาศาสตร์)</h3>
        {isAdmin && (
          <button className="btn btn-primary" onClick={openAddQuestionModal}>➕ เพิ่มข้อสอบใหม่</button>
        )}
      </div>

      {uniqueYears.map(year => {
        const yearQuestions = oNetQuestions.filter(q => q.exam_year === year);
        const isExpanded = expandedYears[year] === true;

        return (
          <div key={year} style={{marginBottom: '1rem'}}>
            <div 
              className="glass-panel"
              style={{padding: '1rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', background: 'rgba(79, 70, 229, 0.05)', border: '1px solid var(--border)'}}
              onClick={() => toggleYear(year)}
            >
              <h4 style={{margin: 0, fontSize: '1.1rem', color: 'var(--primary)'}}>คลังข้อสอบวิทยาศาสตร์ {year} <span style={{fontSize: '0.9rem', color: 'var(--text-light)', fontWeight: 'normal'}}>({yearQuestions.length} ข้อ)</span></h4>
              <button className="btn btn-outline btn-sm">
                {isExpanded ? 'ซ่อนตาราง 🔼' : 'แสดงตาราง 🔽'}
              </button>
            </div>

            {isExpanded && (
              <div style={{marginTop: '0.5rem', overflowX: 'auto'}}>
                <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)'}}>
                  <thead style={{backgroundColor: 'rgba(0,0,0,0.02)'}}>
                    <tr style={{borderBottom: '2px solid var(--border)', textAlign: 'left'}}>
                      <th style={{padding: '1rem'}}>ข้อที่</th>
                      <th style={{padding: '1rem', width: '40%'}}>โจทย์</th>
                      <th style={{padding: '1rem'}}>หมายเหตุ / ปีการศึกษา</th>
                      <th style={{padding: '1rem'}}>ตัวชี้วัด</th>
                      <th style={{padding: '1rem'}}>เฉลย</th>
                      <th style={{padding: '1rem'}}>จัดการ</th>
                    </tr>
                  </thead>
                  <tbody>
                    {yearQuestions.map((q, localIndex) => {
                      const globalIndex = oNetQuestions.findIndex(quest => quest.id === q.id);
                      return (
                        <tr key={q.id} style={{borderBottom: '1px solid var(--border)'}}>
                          <td style={{padding: '1rem'}}>{localIndex + 1}</td>
                          <td style={{padding: '1rem'}}>{getQuestionPreview(q.content)}</td>
                          <td style={{padding: '1rem', color: 'var(--text-light)', fontSize: '0.85rem'}}>{q.note || '-'}<br/><span style={{color:'var(--primary)', fontWeight:'bold'}}>{q.exam_year}</span></td>
                          <td style={{padding: '1rem'}}>
                            <div style={{display: 'flex', gap: '4px', flexWrap: 'wrap'}}>
                              {q.indicator_codes && q.indicator_codes.length > 0 
                                ? q.indicator_codes.map((code, idx) => (
                                    <span 
                                      key={idx} 
                                      className="badge" 
                                      style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                                      onClick={() => openIndicatorInfo && openIndicatorInfo(code)}
                                      title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                                    >
                                      {code}
                                    </span>
                                  ))
                                : <span 
                                    className="badge" 
                                    style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px', cursor: 'pointer', textDecoration: 'underline' }}
                                    onClick={() => openIndicatorInfo && openIndicatorInfo(q.indicator_code)}
                                    title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                                  >
                                    {q.indicator_code}
                                  </span>
                              }
                            </div>
                          </td>
                          <td style={{padding: '1rem'}}>{q.type === 'choice' ? q.correct_answer_index + 1 : 'เชิงซ้อน'}</td>
                          <td style={{padding: '1rem', whiteSpace: 'nowrap'}}>
                            {isAdmin && (
                              <>
                                <button className="btn btn-outline btn-sm" style={{marginRight: '0.25rem', padding: '0.25rem 0.5rem'}} onClick={() => handleMoveItem('questions', globalIndex, 'up')} disabled={globalIndex === 0}>⬆️</button>
                                <button className="btn btn-outline btn-sm" style={{marginRight: '0.5rem', padding: '0.25rem 0.5rem'}} onClick={() => handleMoveItem('questions', globalIndex, 'down')} disabled={globalIndex === oNetQuestions.length - 1}>⬇️</button>
                              </>
                            )}
                            {isAdmin && (
                              <button className="btn btn-outline btn-sm" style={{marginRight: '0.5rem'}} onClick={() => openEditQuestionModal(q)}>แก้ไข</button>
                            )}
                            {isAdmin && (
                              <button className="btn btn-outline btn-sm text-red" onClick={() => handleDeleteQuestion(q.id)}>ลบ</button>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
