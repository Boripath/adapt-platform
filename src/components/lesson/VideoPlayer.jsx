import { PlayCircle } from 'lucide-react';

export default function VideoPlayer({ indicator }) {
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1]?.split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1]?.split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return null;
  };

  let urls = [];
  if (indicator.vdo_url) {
    try {
      urls = indicator.vdo_url.startsWith('[') ? JSON.parse(indicator.vdo_url) : [indicator.vdo_url];
    } catch (e) {
      urls = [indicator.vdo_url];
    }
  }
  urls = urls.filter(u => u.trim() !== '');

  return (
    <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 className="title flex-center" style={{ fontSize: '1.3rem', justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <PlayCircle className="text-primary" /> วิดีโอและสื่อประกอบการสอน
      </h2>
      
      {/* 1. Default YouTube Search Link */}
      <div className="text-center p-4 mb-4" style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
        <p style={{marginBottom: '1rem', color: 'var(--text-dark)'}}>ค้นหาสื่อการสอนเพิ่มเติมสำหรับตัวชี้วัดนี้โดยตรงจาก YouTube</p>
        <a href={`https://www.youtube.com/results?search_query=วิทยาศาสตร์+${indicator.indicator_code}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{borderColor: '#f59e0b', color: '#f59e0b', display: 'inline-flex'}}>
          <PlayCircle size={18} style={{marginRight: '0.5rem'}} /> ค้นหาวิดีโอใน YouTube
        </a>
      </div>

      {/* 2. Teacher's Added Links */}
      {urls.map((url, index) => {
        const embedUrl = getYoutubeEmbedUrl(url);
        return (
          <div key={index} style={{ marginBottom: '2rem' }}>
            {embedUrl ? (
              <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <iframe 
                  src={embedUrl} 
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
                  allowFullScreen 
                  title={`VDO Tutorial ${index + 1}`}
                ></iframe>
              </div>
            ) : (
              <div className="text-center p-4" style={{ background: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', border: '1px solid rgba(79, 70, 229, 0.2)' }}>
                <a href={url} target="_blank" rel="noreferrer" className="btn btn-primary">คลิกเพื่อเปิดสื่อการสอนที่ {index + 1} (เปิดหน้าต่างใหม่)</a>
              </div>
            )}
          </div>
        );
      })}
    </section>
  );
}
