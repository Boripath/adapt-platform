import { useState, useMemo } from 'react';
import { Activity, TrendingDown, TrendingUp } from 'lucide-react';

export default function CurrentYearAnalytics({ testResults, questions, openIndicatorInfo }) {
  const [topCount, setTopCount] = useState(5);
  
  // Calculate analytics from testResults
  const analyticsData = useMemo(() => {
    if (!testResults || !questions || questions.length === 0) return { weakest: [], strongest: [], totalStudents: 0 };
    
    // Filter only pre-tests (subject === 'Science')
    const preTests = testResults.filter(r => r.subject === 'Science');
    
    // Group by student_id to get only the latest result per student
    const latestResultsMap = {};
    preTests.forEach(r => {
      if (!latestResultsMap[r.student_id]) {
        latestResultsMap[r.student_id] = r;
      } else {
        const currentLatest = new Date(latestResultsMap[r.student_id].created_at || latestResultsMap[r.student_id].start_time || 0);
        const thisTime = new Date(r.created_at || r.start_time || 0);
        if (thisTime > currentLatest) {
          latestResultsMap[r.student_id] = r;
        }
      }
    });
    
    const uniqueResults = Object.values(latestResultsMap);
    const totalStudents = uniqueResults.length;
    
    if (totalStudents === 0) return { weakest: [], strongest: [], totalStudents: 0 };
    
    // Map all available indicators from questions
    const indicatorSet = new Set();
    questions.forEach(q => {
      if (q.exam_year !== 'LESSON') { // Only O-NET questions
        const codes = q.indicator_codes && q.indicator_codes.length > 0 ? q.indicator_codes : (q.indicator_code ? [q.indicator_code] : []);
        codes.forEach(c => indicatorSet.add(c));
      }
    });
    
    const indicatorStats = {};
    indicatorSet.forEach(ind => {
      indicatorStats[ind] = { weakCount: 0 };
    });
    
    // Count weaknesses
    uniqueResults.forEach(r => {
      if (r.weaknesses && Array.isArray(r.weaknesses)) {
        r.weaknesses.forEach(w => {
          if (indicatorStats[w] !== undefined) {
            indicatorStats[w].weakCount += 1;
          }
        });
      }
    });
    
    // Calculate percent correct
    const statsList = Object.keys(indicatorStats).map(ind => {
      const weakCount = indicatorStats[ind].weakCount;
      const percentCorrect = ((totalStudents - weakCount) / totalStudents) * 100;
      return {
        code: ind,
        avg: percentCorrect.toFixed(2)
      };
    }).sort((a,b) => Number(a.avg) - Number(b.avg)); // Sort asc (weakest first)
    
    return {
      weakest: statsList.slice(0, topCount),
      strongest: [...statsList].reverse().slice(0, topCount),
      totalStudents
    };
  }, [testResults, questions, topCount]);

  return (
    <section className="glass-panel p-4">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <div>
          <h3 className="section-title" style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <Activity size={24} color="var(--primary)" />
            วิเคราะห์ความแข็ง-อ่อน ของตัวชี้วัด (จากผลสอบปีการศึกษาปัจจุบัน)
          </h3>
          <p className="text-light text-sm mt-1">ระบบวิเคราะห์จุดแข็ง-จุดอ่อน จากผลการสอบในระบบของนักเรียนปีการศึกษาปัจจุบันแบบอัตโนมัติ</p>
        </div>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
          <label>แสดงอันดับ Top: </label>
          <input type="number" className="form-control" style={{width: '80px'}} value={topCount} onChange={(e) => setTopCount(Number(e.target.value) || 5)} min="1" max="50" />
        </div>
      </div>
      
      <div className="glass-panel mb-4" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem'}}>
          <h4 style={{ margin: 0 }}>ภาพรวมปีการศึกษาปัจจุบัน (Overall)</h4>
          <span className="badge" style={{background: 'var(--primary)', color: 'white', padding: '0.5rem 1rem', fontSize: '0.9rem'}}>
            จำนวนนักเรียนที่เข้าสอบ: {analyticsData.totalStudents} คน
          </span>
        </div>
        
        {analyticsData.totalStudents === 0 ? (
          <div style={{padding: '2rem', textAlign: 'center', color: 'var(--text-light)'}}>
            ยังไม่มีข้อมูลการสอบของนักเรียนในปีนี้
          </div>
        ) : (
          <div style={{ display: 'flex', gap: '2rem' }}>
            <div style={{ flex: 1 }}>
              <h5 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingDown size={18}/> {topCount} อันดับตัวชี้วัดที่อ่อนที่สุด</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {analyticsData.weakest.map((stat, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                    <span>{idx + 1}. <strong style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)'}} onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)} title="คลิกเพื่อดูสาระแกนกลาง">{stat.code}</strong></span>
                    <span style={{ fontWeight: 'bold', color: '#ef4444' }}>{stat.avg}%</span>
                  </li>
                ))}
                {analyticsData.weakest.length === 0 && <li style={{padding: '0.75rem', color: 'var(--text-light)'}}>ไม่มีข้อมูล</li>}
              </ul>
            </div>
            <div style={{ flex: 1 }}>
              <h5 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={18}/> {topCount} อันดับตัวชี้วัดที่แข็งที่สุด</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {analyticsData.strongest.map((stat, idx) => (
                  <li key={idx} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                    <span>{idx + 1}. <strong style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)'}} onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)} title="คลิกเพื่อดูสาระแกนกลาง">{stat.code}</strong></span>
                    <span style={{ fontWeight: 'bold', color: '#10b981' }}>{stat.avg}%</span>
                  </li>
                ))}
                {analyticsData.strongest.length === 0 && <li style={{padding: '0.75rem', color: 'var(--text-light)'}}>ไม่มีข้อมูล</li>}
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
