import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { BarChart2, AlertCircle } from 'lucide-react';

export default function QuestionBankAnalytics({ openIndicatorInfo, user }) {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [topCount, setTopCount] = useState(20);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    // Fetch all indicators (central) and deduplicate by code
    const { data: allIndicators } = await supabase.from('indicators').select('*');
    let indicators = [];
    if (allIndicators) {
      const uniqueInds = {};
      allIndicators.forEach(ind => {
        if (!uniqueInds[ind.indicator_code]) {
          uniqueInds[ind.indicator_code] = ind;
        }
      });
      indicators = Object.values(uniqueInds);
    }
    
    // Fetch all O-NET questions (central)
    const { data: questions } = await supabase.from('questions').select('indicator_code, indicator_codes').neq('exam_year', 'LESSON');
    
    if (indicators && questions) {
      const qCountMap = {};
      questions.forEach(q => {
        const codes = q.indicator_codes && q.indicator_codes.length > 0 ? q.indicator_codes : (q.indicator_code ? [q.indicator_code] : []);
        codes.forEach(code => {
          qCountMap[code] = (qCountMap[code] || 0) + 1;
        });
      });
      
      const strandMap = {};
      const standardMap = {};

      const indicatorStats = indicators.map(ind => {
        const count = qCountMap[ind.indicator_code] || 0;
        
        if (ind.strand) {
          strandMap[ind.strand] = (strandMap[ind.strand] || 0) + count;
        }
        if (ind.standard) {
          standardMap[ind.standard] = (standardMap[ind.standard] || 0) + count;
        }

        return {
          code: ind.indicator_code,
          strand: ind.strand,
          count: count
        };
      }).sort((a, b) => b.count - a.count);
      
      const topList = indicatorStats.filter(i => i.count > 0);
      const zeroQuestions = indicatorStats.filter(i => i.count === 0);
      
      const strandStats = Object.entries(strandMap)
        .map(([strand, count]) => ({ strand, count }))
        .sort((a, b) => b.count - a.count)
        .filter(s => s.count > 0);

      const standardStats = Object.entries(standardMap)
        .map(([standard, count]) => ({ standard, count }))
        .sort((a, b) => b.count - a.count)
        .filter(s => s.count > 0);
      
      setAnalytics({
        totalIndicators: indicators.length,
        totalQuestions: questions.length,
        indicatorStats,
        topList,
        zeroQuestions,
        strandStats,
        standardStats
      });
    }
    
    setLoading(false);
  };

  if (loading) return <div>กำลังโหลดข้อมูลการวิเคราะห์...</div>;
  if (!analytics) return <div>ไม่สามารถโหลดข้อมูลได้</div>;

  return (
    <section className="glass-panel p-4">
      <h3 className="section-title" style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
        <BarChart2 className="text-primary" /> วิเคราะห์คลังข้อสอบ O-net เปรียบเทียบกับตัวชี้วัด (ป.1 - ป.6)
      </h3>
      
      <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
        <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', textAlign: 'center' }}>
          <h4 className="text-light m-0">จำนวนตัวชี้วัดทั้งหมด</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', margin: '0.5rem 0 0 0' }}>{analytics.totalIndicators}</p>
        </div>
        <div className="glass-panel" style={{ flex: 1, padding: '1.5rem', textAlign: 'center' }}>
          <h4 className="text-light m-0">จำนวนข้อสอบ O-NET ในคลัง</h4>
          <p style={{ fontSize: '2rem', fontWeight: 'bold', color: 'var(--primary)', margin: '0.5rem 0 0 0' }}>{analytics.totalQuestions}</p>
        </div>
      </div>

      {/* ตัวชี้วัดที่ยังไม่มีข้อสอบ (ด้านบน) */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: '#ef4444', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <AlertCircle size={20} /> ตัวชี้วัดที่ยังไม่มีข้อสอบ ({analytics.zeroQuestions.length} ตัวชี้วัด)
        </h4>
        <div style={{ maxHeight: '200px', overflowY: 'auto', background: 'white', borderRadius: '8px', border: '1px solid var(--border)', padding: '1rem' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {analytics.zeroQuestions.map(stat => (
              <span 
                key={stat.code} 
                style={{ background: '#fee2e2', color: '#b91c1c', padding: '4px 8px', borderRadius: '4px', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}
                onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)}
                title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
              >
                {stat.code}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Main Section for the 3 tables */}
      <div className="glass-panel mb-4" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h4 style={{ color: 'var(--primary)', margin: 0, fontSize: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            🏆 สถิติข้อสอบที่ถูกนำมาออกสอบ บ่อย
          </h4>
          <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
            <label style={{fontWeight: 'bold'}}>จำนวนสูงสุดที่จะแสดง:</label>
            <input type="number" className="form-control" style={{width: '60px', padding: '0.25rem 0.5rem'}} value={topCount} onChange={(e) => setTopCount(Number(e.target.value) || 20)} min="1" max="100" />
          </div>
        </div>
        
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {/* Column 1: แยกตาม ตัวชี้วัด */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', minHeight: '32px' }}>
              <h5 style={{ margin: 0, fontSize: '1.05rem', whiteSpace: 'nowrap' }}>แยกตาม ตัวชี้วัด</h5>
            </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', fontSize: '0.9rem'}}>
              <thead style={{backgroundColor: 'rgba(79, 70, 229, 0.05)'}}>
                <tr style={{textAlign: 'left'}}>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>อันดับ</th>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>ตัวชี้วัด</th>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>ข้อ</th>
                </tr>
              </thead>
              <tbody>
                {analytics.topList.length === 0 ? <tr><td colSpan="3" style={{padding: '1rem', textAlign: 'center'}}>ไม่มีข้อมูล</td></tr> : analytics.topList.slice(0, topCount).map((stat, index) => (
                  <tr key={stat.code}>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold'}}>{index + 1}</td>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>
                      <span 
                        style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)', fontWeight: 'bold'}} 
                        onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)}
                        title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                      >
                        {stat.code}
                      </span>
                    </td>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold', color: 'var(--primary)'}}>{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 2: แยกตาม สาระ */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', minHeight: '32px' }}>
            <h5 style={{ margin: 0, fontSize: '1.05rem', whiteSpace: 'nowrap' }}>แยกตาม สาระ</h5>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', fontSize: '0.9rem'}}>
              <thead style={{backgroundColor: 'rgba(79, 70, 229, 0.05)'}}>
                <tr style={{textAlign: 'left'}}>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>อันดับ</th>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>สาระ</th>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>ข้อ</th>
                </tr>
              </thead>
              <tbody>
                {analytics.strandStats.length === 0 ? <tr><td colSpan="3" style={{padding: '1rem', textAlign: 'center'}}>ไม่มีข้อมูล</td></tr> : analytics.strandStats.slice(0, topCount).map((stat, index) => (
                  <tr key={stat.strand}>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold'}}>{index + 1}</td>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', maxWidth: '150px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={stat.strand}>{stat.strand}</td>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold', color: 'var(--primary)'}}>{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Column 3: แยกตาม มาตรฐาน */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem', minHeight: '32px' }}>
            <h5 style={{ margin: 0, fontSize: '1.05rem', whiteSpace: 'nowrap' }}>แยกตาม มาตรฐาน</h5>
          </div>
          <div style={{ overflowX: 'auto' }}>
            <table style={{width: '100%', borderCollapse: 'collapse', background: 'white', borderRadius: '8px', overflow: 'hidden', border: '1px solid var(--border)', fontSize: '0.9rem'}}>
              <thead style={{backgroundColor: 'rgba(79, 70, 229, 0.05)'}}>
                <tr style={{textAlign: 'left'}}>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>อันดับ</th>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>มาตรฐาน</th>
                  <th style={{padding: '0.75rem', borderBottom: '1px solid var(--border)'}}>ข้อ</th>
                </tr>
              </thead>
              <tbody>
                {analytics.standardStats.length === 0 ? <tr><td colSpan="3" style={{padding: '1rem', textAlign: 'center'}}>ไม่มีข้อมูล</td></tr> : analytics.standardStats.slice(0, topCount).map((stat, index) => (
                  <tr key={stat.standard}>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold'}}>{index + 1}</td>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', maxWidth: '120px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'}} title={stat.standard}>{stat.standard}</td>
                    <td style={{padding: '0.75rem', borderBottom: '1px solid var(--border)', fontWeight: 'bold', color: 'var(--primary)'}}>{stat.count}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      </div>
    </section>
  );
}

