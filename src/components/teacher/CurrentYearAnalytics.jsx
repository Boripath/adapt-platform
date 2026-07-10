import { useState, useMemo } from 'react';
import { Activity, TrendingDown, TrendingUp, Trophy, Users, School } from 'lucide-react';

export default function CurrentYearAnalytics({ testResults, questions, openIndicatorInfo, user, students, teachersList }) {
  const [topCount, setTopCount] = useState(5);
  const [rankingMode, setRankingMode] = useState('school'); // 'school' or 'all'
  const [expandedRankingYears, setExpandedRankingYears] = useState({});
  const [expandedSchools, setExpandedSchools] = useState({});

  const toggleRankingYear = (year) => {
    setExpandedRankingYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const toggleSchool = (school) => {
    setExpandedSchools(prev => ({ ...prev, [school]: !prev[school] }));
  };
  
  // Calculate analytics from testResults
  const analyticsData = useMemo(() => {
    if (!testResults || !questions || questions.length === 0) return { weakest: [], strongest: [], totalStudents: 0 };
    
    // Filter only pre-tests (subject === 'Science')
    const preTests = testResults.filter(r => r.subject === 'Science');
    
    // Group by student_id AND exam_year to get only the latest result per student per exam year
    const latestResultsMap = {};
    preTests.forEach(r => {
      const year = r.exam_year || 'ไม่ระบุปี';
      const key = `${r.student_id}_${year}`;
      if (!latestResultsMap[key]) {
        latestResultsMap[key] = r;
      } else {
        const currentLatest = new Date(latestResultsMap[key].created_at || latestResultsMap[key].start_time || 0);
        const thisTime = new Date(r.created_at || r.start_time || 0);
        if (thisTime > currentLatest) {
          latestResultsMap[key] = r;
        }
      }
    });
    
    const uniqueResults = Object.values(latestResultsMap);
    
    // Count unique students for the display label
    const uniqueStudents = new Set(uniqueResults.map(r => r.student_id)).size;
    const totalAttempts = uniqueResults.length;
    
    if (totalAttempts === 0) return { weakest: [], strongest: [], totalStudents: 0, totalAttempts: 0 };
    
    // Map all available indicators from questions
    const indicatorSet = new Set();
    questions.forEach(q => {
      if (q.exam_year !== 'LESSON') {
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
      const percentCorrect = ((totalAttempts - weakCount) / totalAttempts) * 100;
      return {
        code: ind,
        avg: percentCorrect.toFixed(2)
      };
    }).sort((a,b) => Number(a.avg) - Number(b.avg));
    
    return {
      weakest: statsList.slice(0, topCount),
      strongest: [...statsList].reverse().slice(0, topCount),
      totalStudents: uniqueStudents,
      totalAttempts: totalAttempts
    };
  }, [testResults, questions, topCount]);

  // Calculate rankings data
  const rankingsData = useMemo(() => {
    if (!testResults || !students) return {};
    
    const studentMap = {};
    students.forEach(s => {
      studentMap[s.id] = s;
    });

    const teacherMap = {};
    if (teachersList) {
      teachersList.forEach(t => {
        teacherMap[t.id] = t;
      });
    }

    const latestResultsMap = {}; 
    
    testResults.forEach(r => {
      if (r.exam_year === 'LESSON') return;
      if (r.subject !== 'Science' && r.subject !== 'Science (Post-test)') return;
      
      const examType = r.subject === 'Science' ? 'pre' : 'post';
      const year = r.exam_year || 'ไม่ระบุปี';
      
      if (!studentMap[r.student_id]) return;

      if (!latestResultsMap[year]) {
        latestResultsMap[year] = { pre: {}, post: {} };
      }
      
      const currentLatest = latestResultsMap[year][examType][r.student_id];
      const thisTime = new Date(r.created_at || r.start_time || 0);
      
      if (!currentLatest || thisTime > new Date(currentLatest.created_at || currentLatest.start_time || 0)) {
        latestResultsMap[year][examType][r.student_id] = r;
      }
    });

    const finalRankings = {};
    
    Object.keys(latestResultsMap).forEach(year => {
      finalRankings[year] = { pre: [], post: [] };
      
      ['pre', 'post'].forEach(type => {
        const results = Object.values(latestResultsMap[year][type]);
        
        const mappedResults = results.map(r => {
          const student = studentMap[r.student_id];
          const studentName = student ? student.name : 'Unknown Student';
          const studentClass = student ? student.class : '';
          const teacherId = student ? student.teacher_id : r.teacher_id;
          const teacher = teacherMap[teacherId];
          const schoolName = teacher ? teacher.school_name : 'ไม่ระบุโรงเรียน';
          
          return {
            ...r,
            studentName,
            studentClass,
            schoolName,
            percent: r.total > 0 ? (r.score / r.total) * 100 : 0
          };
        });
        
        mappedResults.sort((a, b) => {
          if (b.score !== a.score) return b.score - a.score;
          return a.studentName.localeCompare(b.studentName);
        });
        
        finalRankings[year][type] = mappedResults;
      });
    });
    
    return finalRankings;
  }, [testResults, students, teachersList]);

  const PaginatedRankingTable = ({ records, showSchool = false, highlightStudentId = null, tableTitle = '' }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    
    if (records.length === 0) {
      return <div style={{padding: '1rem', color: 'var(--text-light)', textAlign: 'center'}}>ไม่มีข้อมูลนักเรียนที่สอบในส่วนนี้</div>;
    }
    
    // Find student's rank if highlightStudentId is provided
    let studentRankText = null;
    if (highlightStudentId) {
      const studentIndex = records.findIndex(r => r.student_id === highlightStudentId);
      if (studentIndex !== -1) {
        studentRankText = (
          <div style={{ padding: '0.75rem 1rem', backgroundColor: 'rgba(139, 92, 246, 0.1)', border: '1px solid rgba(139, 92, 246, 0.3)', borderRadius: '8px', marginBottom: '1rem', color: '#8b5cf6', fontWeight: 'bold' }}>
            คุณอยู่อันดับที่ {studentIndex + 1} จากนักเรียนทั้งหมด {records.length} คน
          </div>
        );
      }
    }

    const totalPages = Math.ceil(records.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentRecords = records.slice(startIndex, startIndex + itemsPerPage);

    const avgPercent = records.reduce((acc, r) => acc + r.percent, 0) / records.length;
    const avgScore = records.reduce((acc, r) => acc + r.score, 0) / records.length;
    const avgTotal = records.reduce((acc, r) => acc + r.total, 0) / records.length;

    return (
      <div style={{ marginBottom: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.5rem' }}>
          {tableTitle ? (
            <h6 style={{ color: 'var(--text-dark)', margin: 0, fontSize: '1.1rem' }}>{tableTitle}</h6>
          ) : <div></div>}
          <div style={{ padding: '0.5rem 1rem', background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: '8px', color: '#059669', fontWeight: '500', fontSize: '0.95rem' }}>
            คะแนนเฉลี่ย: {avgScore.toFixed(2)} / {avgTotal.toFixed(0)} ({avgPercent.toFixed(2)}%)
          </div>
        </div>
        {studentRankText}
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th style={{width: '10%', textAlign: 'center', padding: '1rem'}}>อันดับ</th>
                <th style={{width: showSchool ? '25%' : '40%', padding: '1rem'}}>ชื่อ-นามสกุล</th>
                <th style={{width: '15%', padding: '1rem'}}>ชั้น</th>
                {showSchool && <th style={{width: '25%', padding: '1rem'}}>โรงเรียน</th>}
                <th style={{width: '15%', textAlign: 'center', padding: '1rem'}}>คะแนนที่ได้</th>
                <th style={{width: '10%', textAlign: 'center', padding: '1rem'}}>ร้อยละ</th>
              </tr>
            </thead>
            <tbody>
              {currentRecords.map((r, i) => {
                const actualRank = startIndex + i + 1;
                const isHighlight = r.student_id === highlightStudentId;
                return (
                  <tr key={r.id || i} style={isHighlight ? { backgroundColor: 'rgba(139, 92, 246, 0.05)' } : {}}>
                    <td style={{textAlign: 'center', fontWeight: 'bold', padding: '1rem'}}>
                      {actualRank === 1 ? <span style={{color: '#fbbf24', fontSize: '1.2rem'}}>1</span> : 
                       actualRank === 2 ? <span style={{color: '#9ca3af', fontSize: '1.1rem'}}>2</span> : 
                       actualRank === 3 ? <span style={{color: '#b45309', fontSize: '1.1rem'}}>3</span> : 
                       actualRank}
                    </td>
                    <td style={{padding: '1rem', fontWeight: isHighlight ? 'bold' : 'normal', color: isHighlight ? '#8b5cf6' : 'inherit'}}>{r.studentName} {isHighlight && '(คุณ)'}</td>
                    <td style={{padding: '1rem'}}>{r.studentClass}</td>
                    {showSchool && <td style={{padding: '1rem'}}>{r.schoolName}</td>}
                    <td style={{textAlign: 'center', fontWeight: 'bold', color: 'var(--primary)', padding: '1rem'}}>{r.score} / {r.total}</td>
                    <td style={{textAlign: 'center', padding: '1rem'}}>{r.percent.toFixed(2)}%</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        {totalPages > 1 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1rem', padding: '0.5rem' }}>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              ← ก่อนหน้า
            </button>
            <span style={{ fontSize: '0.9rem', color: 'var(--text-light)' }}>หน้า {currentPage} จาก {totalPages}</span>
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              ถัดไป →
            </button>
          </div>
        )}
      </div>
    );
  };

  const examYearsList = Object.keys(rankingsData).sort((a, b) => b.localeCompare(a));

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
            นักเรียนเข้าสอบ: {analyticsData.totalStudents} คน (รวม {analyticsData.totalAttempts} ครั้ง)
          </span>
        </div>
        
        {analyticsData.totalAttempts === 0 ? (
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

      <div style={{ marginTop: '3rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
          <div>
            <h3 className="section-title" style={{margin: 0, display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <Trophy size={24} color="#fbbf24" />
              อันดับคะแนนสอบของนักเรียน ในแต่ละปีการศึกษา
            </h3>
            <p className="text-light text-sm mt-1">แสดงผลคะแนนสอบแยกตามแบบทดสอบก่อนเรียน (Pre-test) และหลังเรียน (Post-test)</p>
          </div>
          {user?.role === 'admin' && (
            <div style={{display: 'flex', gap: '0.5rem'}}>
              <button 
                className={`btn ${rankingMode === 'school' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setRankingMode('school')}
              >
                <School size={16} style={{marginRight: '8px'}} /> แยกตามโรงเรียน
              </button>
              <button 
                className={`btn ${rankingMode === 'all' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setRankingMode('all')}
              >
                <Users size={16} style={{marginRight: '8px'}} /> รวมนักเรียนทั้งหมด
              </button>
            </div>
          )}
        </div>

        {examYearsList.length === 0 ? (
          <div className="glass-panel" style={{padding: '2rem', textAlign: 'center', color: 'var(--text-light)'}}>
            ยังไม่มีข้อมูลคะแนนสอบของนักเรียน
          </div>
        ) : (
          examYearsList.map(year => {
            const isExpanded = expandedRankingYears[year] === true; // Default hidden
            return (
              <div key={year} className="glass-panel mb-4" style={{ padding: '0', overflow: 'hidden' }}>
                <div 
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem', background: 'rgba(255,255,255,0.02)', cursor: 'pointer', borderBottom: isExpanded ? '1px solid var(--border)' : 'none' }}
                  onClick={() => toggleRankingYear(year)}
                >
                  <h4 style={{ margin: 0, color: 'var(--primary)' }}>ปีการศึกษา / ข้อสอบ: {year}</h4>
                  <span>{isExpanded ? '▼ ซ่อน' : '▶ แสดง'}</span>
                </div>
                
                {isExpanded && (
                  <div style={{ padding: '1.5rem' }}>
                    {/* PRE-TEST SECTION */}
                    <div style={{ marginBottom: '2rem' }}>
                      <h5 style={{ borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>แบบทดสอบก่อนเรียน (Pre-test)</h5>
                      {user?.role === 'admin' && rankingMode === 'school' ? (
                        // Admin: Group by School
                        (() => {
                          const recordsBySchool = {};
                          rankingsData[year].pre.forEach(r => {
                            if (!recordsBySchool[r.schoolName]) recordsBySchool[r.schoolName] = [];
                            recordsBySchool[r.schoolName].push(r);
                          });
                          const schools = Object.keys(recordsBySchool).sort();
                          if (schools.length === 0) return <div style={{color: 'var(--text-light)', padding: '1rem 0'}}>ไม่มีข้อมูล</div>;
                          
                          return schools.map(school => (
                            <div key={school} style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                              <h6 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)', cursor: 'pointer' }} onClick={() => toggleSchool(`pre-${year}-${school}`)}>
                                โรงเรียน: {school} {expandedSchools[`pre-${year}-${school}`] !== false ? '▼' : '▶'}
                              </h6>
                              {expandedSchools[`pre-${year}-${school}`] !== false && <PaginatedRankingTable records={recordsBySchool[school]} showSchool={false} />}
                            </div>
                          ));
                        })()
                      ) : user?.role === 'admin' ? (
                        // Admin (All mode)
                        <PaginatedRankingTable records={rankingsData[year].pre} showSchool={true} tableTitle="อันดับรวมทุกโรงเรียน" />
                      ) : (
                        // Teacher or Student
                        <>
                          <PaginatedRankingTable 
                            records={rankingsData[year].pre.filter(r => r.schoolName === (user?.role === 'student' ? user?.teacher_school_name : teachersList?.find(t => t.id === user?.id)?.school_name || 'ไม่ระบุโรงเรียน'))} 
                            showSchool={false} 
                            highlightStudentId={user?.role === 'student' ? user?.id : null}
                            tableTitle={`อันดับภายในโรงเรียน ${user?.role === 'student' ? user?.teacher_school_name : teachersList?.find(t => t.id === user?.id)?.school_name || 'ไม่ระบุโรงเรียน'}`}
                          />
                          <PaginatedRankingTable 
                            records={rankingsData[year].pre} 
                            showSchool={true} 
                            highlightStudentId={user?.role === 'student' ? user?.id : null}
                            tableTitle="อันดับรวมทุกโรงเรียน"
                          />
                        </>
                      )}
                    </div>

                    {/* POST-TEST SECTION */}
                    <div>
                      <h5 style={{ borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem', marginBottom: '1rem', color: 'var(--text-dark)' }}>แบบทดสอบหลังเรียน (Post-test)</h5>
                      {user?.role === 'admin' && rankingMode === 'school' ? (
                        // Admin: Group by School
                        (() => {
                          const recordsBySchool = {};
                          rankingsData[year].post.forEach(r => {
                            if (!recordsBySchool[r.schoolName]) recordsBySchool[r.schoolName] = [];
                            recordsBySchool[r.schoolName].push(r);
                          });
                          const schools = Object.keys(recordsBySchool).sort();
                          if (schools.length === 0) return <div style={{color: 'var(--text-light)', padding: '1rem 0'}}>ไม่มีข้อมูล</div>;
                          
                          return schools.map(school => (
                            <div key={school} style={{ marginBottom: '1.5rem', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                              <h6 style={{ marginBottom: '0.5rem', color: 'var(--text-dark)', cursor: 'pointer' }} onClick={() => toggleSchool(`post-${year}-${school}`)}>
                                โรงเรียน: {school} {expandedSchools[`post-${year}-${school}`] !== false ? '▼' : '▶'}
                              </h6>
                              {expandedSchools[`post-${year}-${school}`] !== false && <PaginatedRankingTable records={recordsBySchool[school]} showSchool={false} />}
                            </div>
                          ));
                        })()
                      ) : user?.role === 'admin' ? (
                        // Admin (All mode)
                        <PaginatedRankingTable records={rankingsData[year].post} showSchool={true} tableTitle="อันดับรวมทุกโรงเรียน" />
                      ) : (
                        // Teacher or Student
                        <>
                          <PaginatedRankingTable 
                            records={rankingsData[year].post.filter(r => r.schoolName === (user?.role === 'student' ? user?.teacher_school_name : teachersList?.find(t => t.id === user?.id)?.school_name || 'ไม่ระบุโรงเรียน'))} 
                            showSchool={false} 
                            highlightStudentId={user?.role === 'student' ? user?.id : null}
                            tableTitle={`อันดับภายในโรงเรียน ${user?.role === 'student' ? user?.teacher_school_name : teachersList?.find(t => t.id === user?.id)?.school_name || 'ไม่ระบุโรงเรียน'}`}
                          />
                          <PaginatedRankingTable 
                            records={rankingsData[year].post} 
                            showSchool={true} 
                            highlightStudentId={user?.role === 'student' ? user?.id : null}
                            tableTitle="อันดับรวมทุกโรงเรียน"
                          />
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
