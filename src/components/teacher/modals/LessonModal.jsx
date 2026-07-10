export default function LessonModal({
  isIndicatorModalOpen,
  setIsIndicatorModalOpen,
  indicatorForm,
  setIndicatorForm,
  handleSaveIndicator
}) {
  if (!isIndicatorModalOpen) return null;

  const generatedCode = `ว ${indicatorForm.standard_order || '-'} ${indicatorForm.grade || '-'}/${indicatorForm.indicator_order || '-'}`;

  return (
    <div className="modal-overlay" style={{zIndex: 1000}}>
      <div className="modal-content glass-panel" style={{maxWidth: '800px', background: 'white', maxHeight: '90vh', overflowY: 'auto'}}>
        <h3>{indicatorForm.id ? 'แก้ไขข้อมูลตัวชี้วัด' : 'เพิ่มตัวชี้วัดใหม่'}</h3>
        
        <div style={{ background: 'rgba(79, 70, 229, 0.1)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem' }}>
          <strong>รหัสตัวชี้วัด (สร้างอัตโนมัติ): </strong>
          <span className="text-primary" style={{fontSize: '1.2rem', fontWeight: 'bold'}}>{generatedCode}</span>
        </div>

        <form onSubmit={handleSaveIndicator}>
          <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem', marginBottom: '1rem'}}>
            <div className="input-group">
              <label>ลำดับสาระ (เช่น 1)</label>
              <input type="text" className="input-field" required
                value={indicatorForm.strand_order || ''} onChange={e => setIndicatorForm({...indicatorForm, strand_order: e.target.value})} />
            </div>
            <div className="input-group">
              <label>ชื่อของสาระ (เช่น วิทยาศาสตร์ชีวภาพ)</label>
              <input type="text" className="input-field" required
                value={indicatorForm.strand_name || ''} onChange={e => setIndicatorForm({...indicatorForm, strand_name: e.target.value})} />
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '1rem', marginBottom: '1rem'}}>
            <div className="input-group">
              <label>ลำดับมาตรฐาน (เช่น 1.1)</label>
              <input type="text" className="input-field" required
                value={indicatorForm.standard_order || ''} onChange={e => setIndicatorForm({...indicatorForm, standard_order: e.target.value})} />
            </div>
            <div className="input-group">
              <label>คุณภาพผู้เรียน</label>
              <textarea className="input-field" rows="2" required
                value={indicatorForm.standard_content || ''} onChange={e => setIndicatorForm({...indicatorForm, standard_content: e.target.value})}></textarea>
            </div>
          </div>

          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem'}}>
            <div className="input-group">
              <label>ชั้น (เช่น ป.1 หรือ ป.1-6)</label>
              <input type="text" className="input-field" required
                value={indicatorForm.grade || ''} onChange={e => setIndicatorForm({...indicatorForm, grade: e.target.value})} />
            </div>
            <div className="input-group">
              <label>ลำดับตัวชี้วัด (เช่น 1 หรือ 1-4)</label>
              <input type="text" className="input-field" required
                value={indicatorForm.indicator_order || ''} onChange={e => setIndicatorForm({...indicatorForm, indicator_order: e.target.value})} />
            </div>
          </div>

          <div className="input-group">
            <label>รายละเอียดตัวชี้วัด</label>
            <textarea className="input-field" rows="3" required
              value={indicatorForm.details || ''} onChange={e => setIndicatorForm({...indicatorForm, details: e.target.value})}></textarea>
          </div>
          <div className="input-group">
            <label>สาระการเรียนรู้แกนกลาง</label>
            <textarea className="input-field" rows="3" required
              value={indicatorForm.core_content || ''} onChange={e => setIndicatorForm({...indicatorForm, core_content: e.target.value})}></textarea>
          </div>
          <div className="input-group">
            <label>ลิงก์ VDO การสอน (Youtube หรือลิงก์ภายนอก) - ลิงก์แรกจะเป็นค่าเริ่มต้นค้นหาจาก YouTube เสมอ</label>
            {(() => {
              let urls = [];
              try {
                urls = indicatorForm.vdo_url ? (indicatorForm.vdo_url.startsWith('[') ? JSON.parse(indicatorForm.vdo_url) : [indicatorForm.vdo_url]) : [];
              } catch (e) {
                urls = [indicatorForm.vdo_url];
              }
              if (urls.length === 0) urls = [''];

              const updateUrl = (index, value) => {
                const newUrls = [...urls];
                newUrls[index] = value;
                setIndicatorForm({...indicatorForm, vdo_url: JSON.stringify(newUrls.filter(u => u.trim() !== ''))});
              };

              const addUrl = () => {
                setIndicatorForm({...indicatorForm, vdo_url: JSON.stringify([...urls, ''])});
              };

              const removeUrl = (index) => {
                const newUrls = urls.filter((_, i) => i !== index);
                setIndicatorForm({...indicatorForm, vdo_url: JSON.stringify(newUrls)});
              };

              return (
                <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
                  {urls.map((u, i) => (
                    <div key={i} style={{display: 'flex', gap: '0.5rem'}}>
                      <input type="text" className="input-field" placeholder="https://youtube.com/..." style={{marginBottom: 0, flex: 1}}
                        value={u} onChange={e => updateUrl(i, e.target.value)} />
                      <button type="button" className="btn btn-outline text-red" onClick={() => removeUrl(i)}>ลบ</button>
                    </div>
                  ))}
                  <button type="button" className="btn btn-outline btn-sm" onClick={addUrl} style={{alignSelf: 'flex-start', marginTop: '0.5rem'}}>+ เพิ่มลิงก์อื่น</button>
                </div>
              );
            })()}
          </div>
          <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn-outline" onClick={() => setIsIndicatorModalOpen(false)}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
