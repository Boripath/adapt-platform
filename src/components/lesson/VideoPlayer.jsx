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

  const embedUrl = getYoutubeEmbedUrl(indicator.vdo_url);

  return (
    <section className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
      <h2 className="title flex-center" style={{ fontSize: '1.3rem', justifyContent: 'flex-start', gap: '0.5rem', marginBottom: '1.5rem' }}>
        <PlayCircle className="text-primary" /> วิดีโอประกอบการสอน
      </h2>
      
      {embedUrl ? (
        <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
          <iframe 
            src={embedUrl} 
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }} 
            allowFullScreen 
            title="VDO Tutorial"
          ></iframe>
        </div>
      ) : indicator.vdo_url ? (
        <div className="text-center p-4" style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
          <a href={indicator.vdo_url} target="_blank" rel="noreferrer" className="btn btn-primary">คลิกเพื่อดูวิดีโอ (เปิดหน้าต่างใหม่)</a>
        </div>
      ) : (
        <div className="text-center p-4 text-light" style={{ background: 'rgba(0,0,0,0.02)', borderRadius: '12px' }}>
          <p style={{marginBottom: '1rem'}}>ยังไม่มีวิดีโอสำหรับบทเรียนนี้</p>
          <a href={`https://www.youtube.com/results?search_query=วิทยาศาสตร์+${indicator.indicator_code}`} target="_blank" rel="noreferrer" className="btn btn-outline" style={{borderColor: '#f59e0b', color: '#f59e0b', display: 'inline-flex'}}>
            ค้นหาวิดีโอใน YouTube
          </a>
        </div>
      )}
    </section>
  );
}
