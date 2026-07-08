import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Activity, Save, TrendingDown, TrendingUp } from 'lucide-react';

export default function HistoricalAnalytics({ questions, getQuestionPreview, openIndicatorInfo, user }) {
  const isAdmin = user && user.role === 'admin';
  const [activeSubTab, setActiveSubTab] = useState(isAdmin ? 'analytics' : 'entry');
  const [selectedYear, setSelectedYear] = useState('');
  const [availableYears, setAvailableYears] = useState([]);
  const [yearQuestions, setYearQuestions] = useState([]);
  const [statsInput, setStatsInput] = useState({});
  const [saving, setSaving] = useState(false);
  const [topCount, setTopCount] = useState(5);
  
  const [analyticsData, setAnalyticsData] = useState({
    yearly: {},
    overallWeakest: [],
    overallStrongest: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Extract available years from questions
    const oNetQ = questions.filter(q => q.exam_year !== 'LESSON');
    const years = [...new Set(oNetQ.map(q => q.exam_year))].sort((a,b) => b.localeCompare(a));
    setAvailableYears(years);
    if (years.length > 0 && !selectedYear) {
      setSelectedYear(years[0]);
    }
    
    fetchHistoricalStats();
  }, [questions]);

  useEffect(() => {
    if (selectedYear) {
      const qForYear = questions.filter(q => q.exam_year === selectedYear);
      setYearQuestions(qForYear);
      
      // Initialize inputs based on existing db records if they exist
      const initializeInputs = async () => {
        const { data } = await supabase
          .from('historical_question_stats')
          .select('*')
          .eq('exam_year', selectedYear)
          .eq('teacher_id', user.id);
          
        const initialStats = {};
        if (data) {
          data.forEach(d => {
            initialStats[d.question_id] = d.percent_correct;
          });
        }
        setStatsInput(initialStats);
      };
      initializeInputs();
    }
  }, [selectedYear, questions]);

  const fetchHistoricalStats = async () => {
    let query = supabase.from('historical_question_stats').select('*');
    if (!isAdmin) {
      query = query.eq('teacher_id', user.id);
    }
    const { data } = await query;
    if (data && data.length > 0) {
      // Group by year and indicator
      const yearIndMap = {};
      const overallIndMap = {};
      
      data.forEach(row => {
        const q = questions.find(q => q.id === row.question_id);
        const codes = q && q.indicator_codes && q.indicator_codes.length > 0 ? q.indicator_codes : (row.indicator_code ? [row.indicator_code] : []);
        
        codes.forEach(code => {
          // Yearly
          if (!yearIndMap[row.exam_year]) yearIndMap[row.exam_year] = {};
          if (!yearIndMap[row.exam_year][code]) yearIndMap[row.exam_year][code] = { total: 0, count: 0 };
          yearIndMap[row.exam_year][code].total += Number(row.percent_correct);
          yearIndMap[row.exam_year][code].count += 1;
          
          // Overall
          if (!overallIndMap[code]) overallIndMap[code] = { total: 0, count: 0 };
          overallIndMap[code].total += Number(row.percent_correct);
          overallIndMap[code].count += 1;
        });
      });
      
      const yearly = {};
      Object.keys(yearIndMap).forEach(year => {
        const stats = Object.keys(yearIndMap[year]).map(ind => ({
          code: ind,
          avg: (yearIndMap[year][ind].total / yearIndMap[year][ind].count).toFixed(2)
        })).sort((a,b) => Number(a.avg) - Number(b.avg)); // Sort asc (weakest first)
        
        yearly[year] = {
          weakest: stats.slice(0, topCount),
          strongest: [...stats].reverse().slice(0, topCount) // Strongest first
        };
      });
      
      const overallStats = Object.keys(overallIndMap).map(ind => ({
        code: ind,
        avg: (overallIndMap[ind].total / overallIndMap[ind].count).toFixed(2)
      })).sort((a,b) => Number(a.avg) - Number(b.avg));
      
      setAnalyticsData({
        yearly,
        overallWeakest: overallStats.slice(0, topCount),
        overallStrongest: [...overallStats].reverse().slice(0, topCount)
      });
    }
    setLoading(false);
  };

  useEffect(() => {
    // refetch if topCount changes to apply new slice, or just apply it in render.
    // Since fetchHistoricalStats depends on DB, we can just call it again, but it's better to store all stats.
    // For simplicity, I'll just refetch.
    fetchHistoricalStats();
  }, [topCount]);

  const handleInputChange = (questionId, value) => {
    // allow only numbers 0-100
    if (value === '' || (Number(value) >= 0 && Number(value) <= 100)) {
      setStatsInput({ ...statsInput, [questionId]: value });
    }
  };

  const handleSaveStats = async () => {
    setSaving(true);
    const upserts = yearQuestions
      .filter(q => statsInput[q.id] !== undefined && statsInput[q.id] !== '')
      .map(q => ({
        exam_year: selectedYear,
        question_id: q.id,
        indicator_code: q.indicator_codes && q.indicator_codes.length > 0 ? q.indicator_codes[0] : q.indicator_code,
        percent_correct: Number(statsInput[q.id]),
        teacher_id: user.id
      }));

    if (upserts.length > 0) {
      const { error } = await supabase.from('historical_question_stats').upsert(upserts, { onConflict: 'exam_year, question_id, teacher_id' });
      if (error) {
        alert('เกิดข้อผิดพลาดในการบันทึกข้อมูล: ' + error.message);
      } else {
        alert('บันทึกข้อมูลสำเร็จ!');
        fetchHistoricalStats(); // refresh analytics
      }
    }
    setSaving(false);
  };

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <section className="glass-panel p-4 fade-in">
      {!isAdmin && (
        <div style={{display: 'flex', gap: '1rem', marginBottom: '2rem'}}>
          <button className={`btn ${activeSubTab === 'entry' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveSubTab('entry')}>
            <Save size={18} style={{marginRight: '8px'}} /> บันทึกผลสอบปีการศึกษาที่ผ่านมา
          </button>
          <button className={`btn ${activeSubTab === 'analytics' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setActiveSubTab('analytics')}>
            <Activity size={18} style={{marginRight: '8px'}} /> วิเคราะห์ผลสอบปีการศึกษาที่ผ่านมา
          </button>
        </div>
      )}

      {activeSubTab === 'entry' && !isAdmin && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <h3 className="section-title" style={{margin: 0}}>บันทึกร้อยละนักเรียนที่ตอบถูก (รายข้อ)</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <label style={{ fontWeight: 'bold' }}>เลือกปีการศึกษา:</label>
              <select className="form-control" style={{ width: 'auto' }} value={selectedYear} onChange={e => setSelectedYear(e.target.value)}>
                {availableYears.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="glass-panel" style={{ padding: '1.5rem', background: 'rgba(255,255,255,0.8)' }}>
            <p className="text-light text-sm mb-4">
              กรอก <b>"ร้อยละของนักเรียนที่ตอบถูก"</b> (0 - 100) สำหรับแต่ละข้อสอบในปี {selectedYear} ระบบจะนำไปคำนวณหาค่าเฉลี่ยความแข็ง/อ่อนของแต่ละตัวชี้วัดอัตโนมัติ
            </p>
            
            <table style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead>
                <tr style={{borderBottom: '2px solid var(--border)', textAlign: 'left'}}>
                  <th style={{padding: '1rem', width: '60px'}}>ข้อที่</th>
                  <th style={{padding: '1rem', width: '150px'}}>ตัวชี้วัด</th>
                  <th style={{padding: '1rem'}}>โจทย์พอสังเขป</th>
                  <th style={{padding: '1rem', width: '150px'}}>ร้อยละที่ตอบถูก (%)</th>
                </tr>
              </thead>
              <tbody>
                {yearQuestions.length === 0 ? <tr><td colSpan="4" style={{padding: '1rem', textAlign: 'center'}}>ไม่มีข้อสอบในปีนี้</td></tr> : null}
                {yearQuestions.map((q, idx) => (
                  <tr key={q.id} style={{borderBottom: '1px solid var(--border)'}}>
                    <td style={{padding: '1rem', textAlign: 'center'}}>{idx + 1}</td>
                    <td style={{padding: '1rem'}}>
                      <div style={{display: 'flex', gap: '4px', flexWrap: 'wrap'}}>
                        {q.indicator_codes && q.indicator_codes.length > 0
                          ? q.indicator_codes.map((code, cIdx) => (
                              <span 
                                key={cIdx}
                                className="badge" 
                                style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => openIndicatorInfo && openIndicatorInfo(code)}
                                title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                              >
                                {code}
                              </span>
                            ))
                          : (
                              <span 
                                className="badge" 
                                style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                                onClick={() => openIndicatorInfo && openIndicatorInfo(q.indicator_code)}
                                title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                              >
                                {q.indicator_code}
                              </span>
                            )
                        }
                      </div>
                    </td>
                    <td style={{padding: '1rem', fontSize: '0.9rem', color: 'var(--text-dark)'}}>{getQuestionPreview(q.content).substring(0, 100)}...</td>
                    <td style={{padding: '1rem'}}>
                      <input 
                        type="number" 
                        className="form-control" 
                        min="0" max="100" 
                        placeholder="0-100"
                        value={statsInput[q.id] !== undefined ? statsInput[q.id] : ''}
                        onChange={e => handleInputChange(q.id, e.target.value)}
                        style={{ textAlign: 'center', borderColor: statsInput[q.id] ? 'var(--primary)' : 'var(--border)' }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            <div style={{ marginTop: '2rem', textAlign: 'right' }}>
              <button className="btn btn-primary" onClick={handleSaveStats} disabled={saving || yearQuestions.length === 0}>
                {saving ? 'กำลังบันทึก...' : 'บันทึกข้อมูลทั้งหมด'}
              </button>
            </div>
          </div>
        </div>
      )}

      {activeSubTab === 'analytics' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <div>
              <h3 className="section-title" style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <Activity size={24} color="var(--primary)" />
                วิเคราะห์ความแข็ง-อ่อน ของตัวชี้วัด (จากผลสอบปีการศึกษาที่ผ่านมา)
              </h3>
              <p className="text-light text-sm mt-1">ระบบวิเคราะห์จุดแข็ง-จุดอ่อน ของตัวชี้วัดจากข้อมูลการสอบปีการศึกษาที่ผ่านมาแบบอัตโนมัติ</p>
            </div>
            <div style={{display: 'flex', alignItems: 'center', gap: '1rem'}}>
              <label>แสดงอันดับ Top: </label>
              <input type="number" className="form-control" style={{width: '80px'}} value={topCount} onChange={(e) => setTopCount(Number(e.target.value) || 5)} min="1" max="50" />
            </div>
          </div>
          
          <div className="glass-panel mb-4" style={{ padding: '1.5rem', borderLeft: '4px solid var(--primary)' }}>
            <h4 style={{ margin: '0 0 1rem 0' }}>ภาพรวมทุกปีการศึกษาที่ผ่านมา (Overall)</h4>
            <div style={{ display: 'flex', gap: '2rem' }}>
              <div style={{ flex: 1 }}>
                <h5 style={{ color: '#ef4444', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingDown size={18}/> {topCount} อันดับตัวชี้วัดที่อ่อนที่สุด</h5>
                <ol style={{ paddingLeft: '1.5rem', margin: 0, lineHeight: 1.8 }}>
                  {analyticsData.overallWeakest.length > 0 ? analyticsData.overallWeakest.map((stat, i) => (
                    <li key={i}>
                      <strong style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)'}} onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)} title="คลิกเพื่อดูสาระแกนกลาง">{stat.code}</strong> 
                      (ตอบถูกเฉลี่ย <span style={{color: '#ef4444'}}>{stat.avg}%</span>)
                    </li>
                  )) : <li className="text-light">ไม่มีข้อมูล</li>}
                </ol>
              </div>
              <div style={{ flex: 1 }}>
                <h5 style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.5rem' }}><TrendingUp size={18}/> {topCount} อันดับตัวชี้วัดที่แข็งที่สุด</h5>
                <ol style={{ paddingLeft: '1.5rem', margin: 0, lineHeight: 1.8 }}>
                  {analyticsData.overallStrongest.length > 0 ? analyticsData.overallStrongest.map((stat, i) => (
                    <li key={i}>
                      <strong style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)'}} onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)} title="คลิกเพื่อดูสาระแกนกลาง">{stat.code}</strong> 
                      (ตอบถูกเฉลี่ย <span style={{color: '#10b981'}}>{stat.avg}%</span>)
                    </li>
                  )) : <li className="text-light">ไม่มีข้อมูล</li>}
                </ol>
              </div>
            </div>
          </div>

          <h4 style={{ marginBottom: '1rem' }}>วิเคราะห์แยกรายปี</h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' }}>
            {Object.keys(analyticsData.yearly).sort().reverse().map(year => (
              <div key={year} className="glass-panel" style={{ padding: '1.5rem', background: 'white' }}>
                <h4 style={{marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem'}}>
                  ปีการศึกษา {year}
                </h4>
                <div style={{ display: 'flex', gap: '2rem' }}>
                  <div style={{ flex: 1 }}>
                    <h6 style={{ color: '#ef4444', margin: '0 0 0.5rem 0' }}>อ่อนที่สุด (Top {topCount})</h6>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0, fontSize: '0.9rem' }}>
                      {analyticsData.yearly[year].weakest.map((stat, i) => (
                        <li key={i}>
                          <span style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)', fontWeight: 'bold'}} onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)}>{stat.code}</span> 
                          <span className="text-light"> ({stat.avg}%)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div style={{ flex: 1 }}>
                    <h6 style={{ color: '#10b981', margin: '0 0 0.5rem 0' }}>แข็งที่สุด (Top {topCount})</h6>
                    <ul style={{ paddingLeft: '1.5rem', margin: 0, fontSize: '0.9rem' }}>
                      {analyticsData.yearly[year].strongest.map((stat, i) => (
                        <li key={i}>
                          <span style={{cursor: 'pointer', textDecoration: 'underline', color: 'var(--primary)', fontWeight: 'bold'}} onClick={() => openIndicatorInfo && openIndicatorInfo(stat.code)}>{stat.code}</span> 
                          <span className="text-light"> ({stat.avg}%)</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
            {Object.keys(analyticsData.yearly).length === 0 && <p className="text-light">ยังไม่มีข้อมูลผลสอบย้อนหลัง</p>}
          </div>
        </div>
      )}
    </section>
  );
}
