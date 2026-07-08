import { BookOpen, X } from 'lucide-react';

export default function IndicatorInfoModal({ isOpen, setIsOpen, indicator }) {
  if (!isOpen || !indicator) return null;

  return (
    <div className="modal-overlay" style={{zIndex: 1000}}>
      <div className="modal-content glass-panel" style={{maxWidth: '600px', background: 'white', opacity: 1}}>
        <div className="modal-header">
          <h2 style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <BookOpen className="text-primary" /> รายละเอียดตัวชี้วัด {indicator.indicator_code}
          </h2>
          <button className="btn-close" onClick={() => setIsOpen(false)}><X /></button>
        </div>
        
        <div className="modal-body" style={{lineHeight: 1.6}}>
          <h4 style={{color: 'var(--primary)', marginBottom: '0.5rem'}}>{indicator.strand}</h4>
          <p style={{fontWeight: 'bold', marginBottom: '1rem'}}>มาตรฐาน: {indicator.standard}</p>
          
          <div style={{background: 'rgba(0,0,0,0.03)', padding: '1rem', borderRadius: '8px', marginBottom: '1rem'}}>
            <h5 style={{margin: '0 0 0.5rem 0'}}>รายละเอียดตัวชี้วัด:</h5>
            <p style={{margin: 0, fontSize: '0.95rem'}}>{indicator.details}</p>
          </div>
          
          <div style={{background: 'rgba(16, 185, 129, 0.05)', padding: '1rem', borderRadius: '8px'}}>
            <h5 style={{margin: '0 0 0.5rem 0', color: '#10b981'}}>สาระการเรียนรู้แกนกลาง:</h5>
            <p style={{margin: 0, fontSize: '0.95rem', whiteSpace: 'pre-wrap'}}>{indicator.core_content}</p>
          </div>
        </div>
        
        <div className="modal-footer">
          <button type="button" className="btn btn-primary" onClick={() => setIsOpen(false)}>
            ปิดหน้าต่าง
          </button>
        </div>
      </div>
    </div>
  );
}
