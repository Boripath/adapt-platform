export default function SubjectSelection() {
  return (
    <section className="glass-panel p-4 mb-4">
      <h3 className="section-title">เลือกรายวิชา</h3>
      <div style={{marginTop: '1rem', display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem', overflowX: 'auto'}}>
        <div className="glass-panel content-card" style={{border: '2px solid var(--primary)'}}>
          <div className="content-info">
            <h4 style={{fontSize: '1.1rem'}}>วิทยาศาสตร์</h4>
            <p className="text-sm">เปิดใช้งานระบบวินิจฉัยแล้ว</p>
            <span className="badge" style={{background: 'var(--primary)', color: 'white', padding: '2px 8px', borderRadius: '12px', fontSize: '0.7rem'}}>Active</span>
          </div>
        </div>
        <div className="glass-panel content-card" style={{opacity: 0.6}}>
          <div className="content-info">
            <h4 style={{fontSize: '1.1rem'}}>ภาษาไทย</h4>
            <p className="text-sm">กำลังพัฒนาระบบ...</p>
          </div>
        </div>
        <div className="glass-panel content-card" style={{opacity: 0.6}}>
          <div className="content-info">
            <h4 style={{fontSize: '1.1rem'}}>คณิตศาสตร์</h4>
            <p className="text-sm">กำลังพัฒนาระบบ...</p>
          </div>
        </div>
        <div className="glass-panel content-card" style={{opacity: 0.6}}>
          <div className="content-info">
            <h4 style={{fontSize: '1.1rem'}}>ภาษาอังกฤษ</h4>
            <p className="text-sm">กำลังพัฒนาระบบ...</p>
          </div>
        </div>
      </div>
    </section>
  );
}
