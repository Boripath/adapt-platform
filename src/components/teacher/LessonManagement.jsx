import { Plus } from 'lucide-react';

export default function LessonManagement({
  indicators,
  user,
  userPermissions,
  openExerciseModal,
  openAddIndicatorModal,
  openEditIndicatorModal,
  openIndicatorInfo
}) {
  const isAdmin = user?.role === 'admin';
  const sortedIndicators = [...indicators].sort((a, b) => 
    a.indicator_code.localeCompare(b.indicator_code, 'th', { numeric: true })
  );

  return (
    <section className="glass-panel p-4">
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem'}}>
        <div>
          <h3 className="section-title" style={{marginBottom: 0}}>จัดการบทเรียนและตัวชี้วัด</h3>
          <p className="text-light text-sm">อ้างอิงตามหลักสูตรแกนกลาง P.1 - P.6 ({indicators.length} ตัวชี้วัด)</p>
        </div>
        {(isAdmin || userPermissions?.allow_add_indicator !== false) && (
          <button className="btn btn-primary" onClick={openAddIndicatorModal}>
            <Plus size={18} /> เพิ่มตัวชี้วัด
          </button>
        )}
      </div>

      <div style={{ overflowX: 'auto' }}>
        <table style={{width: '100%', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid var(--border)', textAlign: 'left', backgroundColor: 'rgba(16, 185, 129, 0.05)'}}>
              <th style={{padding: '0.75rem', width: '5%'}}>ลำดับที่</th>
              <th style={{padding: '0.75rem', width: '10%'}}>รหัส</th>
              <th style={{padding: '0.75rem', width: '15%'}}>สาระ</th>
              <th style={{padding: '0.75rem', width: '15%'}}>มาตรฐาน</th>
              <th style={{padding: '0.75rem', width: '20%'}}>รายละเอียด</th>
              <th style={{padding: '0.75rem', width: '20%'}}>แกนกลาง</th>
              <th style={{padding: '0.75rem'}}>VDO</th>
              <th style={{padding: '0.75rem', width: '10%'}}>จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {sortedIndicators.map((ind, index) => (
              <tr key={ind.id} style={{borderBottom: '1px solid var(--border)'}}>
                <td style={{padding: '0.75rem', fontWeight: 'bold', verticalAlign: 'top'}}>{index + 1}</td>
                <td style={{padding: '0.75rem', verticalAlign: 'top'}}>
                  <span 
                    className="badge" 
                    style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline', whiteSpace: 'nowrap' }}
                    onClick={() => openIndicatorInfo && openIndicatorInfo(ind.indicator_code)}
                    title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                  >
                    {ind.indicator_code}
                  </span>
                </td>
                <td style={{padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-dark)', verticalAlign: 'top'}} title={ind.strand}>{ind.strand ? ind.strand.substring(0, 25) + (ind.strand.length > 25 ? '...' : '') : '-'}</td>
                <td style={{padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-dark)', verticalAlign: 'top'}} title={ind.standard}>{ind.standard ? ind.standard.substring(0, 25) + (ind.standard.length > 25 ? '...' : '') : '-'}</td>
                <td style={{padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-dark)', verticalAlign: 'top'}} title={ind.details}>{ind.details ? ind.details.substring(0, 40) + (ind.details.length > 40 ? '...' : '') : '-'}</td>
                <td style={{padding: '0.75rem', fontSize: '0.85rem', color: 'var(--text-light)', verticalAlign: 'top'}} title={ind.core_content}>{(ind.core_content || '').substring(0, 40)}...</td>
                <td style={{padding: '0.75rem', whiteSpace: 'nowrap', verticalAlign: 'top'}}>
                  {ind.vdo_url ? (
                    <a href={ind.vdo_url} target="_blank" rel="noreferrer" style={{color: 'var(--primary)', textDecoration: 'underline'}}>ดูคลิป</a>
                  ) : (
                    <a href={`https://www.youtube.com/results?search_query=วิทยาศาสตร์+${ind.indicator_code}`} target="_blank" rel="noreferrer" style={{color: '#f59e0b', textDecoration: 'underline', fontSize: '0.85rem'}}>Youtube</a>
                  )}
                </td>
                <td style={{padding: '0.75rem', verticalAlign: 'top'}}>
                  <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                    <button className="btn btn-outline btn-sm" style={{width: '100%', padding: '0.4rem'}} onClick={() => openExerciseModal(ind)}>แบบฝึกหัด</button>
                    {(isAdmin || userPermissions?.allow_edit_indicator !== false) && (
                      <button className="btn btn-outline btn-sm" style={{width: '100%', padding: '0.4rem'}} onClick={() => openEditIndicatorModal(ind)}>แก้ไข</button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
