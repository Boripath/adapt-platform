import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Star, BarChart2, Users } from 'lucide-react';
import PlatformEvaluationModal from '../common/PlatformEvaluationModal';

export default function LessonRatings({ user, students }) {
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  const [studentStats, setStudentStats] = useState({ avgFamiliarity: 0, avgPlatform: 0, total: 0 });
  const [teacherStats, setTeacherStats] = useState({ avgAnalysis: 0, avgPlatform: 0, total: 0 });
  const [evaluatedStudentIds, setEvaluatedStudentIds] = useState(new Set());
  const [showStudentList, setShowStudentList] = useState(false);
  const [loading, setLoading] = useState(true);

  const isAdmin = user && user.role === 'admin';

  useEffect(() => {
    fetchData();
  }, [user, isEvaluationModalOpen]);

  const fetchData = async () => {
    setLoading(true);
    
    // Fetch student evaluations
    let studentQuery = supabase.from('student_evaluations').select('*, students!inner(id, teacher_id)');
    if (!isAdmin) {
      studentQuery = studentQuery.eq('students.teacher_id', user.id);
    }
    
    const { data: sEvals } = await studentQuery;
    
    if (sEvals && sEvals.length > 0) {
      const total = sEvals.length;
      const sumFam = sEvals.reduce((acc, curr) => acc + curr.familiarity_rating, 0);
      const sumPlat = sEvals.reduce((acc, curr) => acc + curr.platform_rating, 0);
      setStudentStats({
        avgFamiliarity: (sumFam / total).toFixed(2),
        avgPlatform: (sumPlat / total).toFixed(2),
        total
      });
      
      const ids = new Set(sEvals.map(evalRecord => evalRecord.student_id));
      setEvaluatedStudentIds(ids);
    } else {
      setStudentStats({ avgFamiliarity: 0, avgPlatform: 0, total: 0 });
      setEvaluatedStudentIds(new Set());
    }

    // Fetch teacher evaluations (Only for admin)
    if (isAdmin) {
      const { data: tEvals } = await supabase.from('teacher_evaluations').select('*');
      if (tEvals && tEvals.length > 0) {
        const total = tEvals.length;
        const sumAna = tEvals.reduce((acc, curr) => acc + curr.analysis_rating, 0);
        const sumPlat = tEvals.reduce((acc, curr) => acc + curr.platform_rating, 0);
        setTeacherStats({
          avgAnalysis: (sumAna / total).toFixed(2),
          avgPlatform: (sumPlat / total).toFixed(2),
          total
        });
      } else {
        setTeacherStats({ avgAnalysis: 0, avgPlatform: 0, total: 0 });
      }
    }

    setLoading(false);
  };

  const StatCard = ({ title, value, subtitle, icon }) => (
    <div className="glass-panel" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.5rem', flex: 1, minWidth: '250px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ margin: 0, color: 'var(--text-light)' }}>{title}</h4>
        {icon}
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.5rem' }}>
        <h2 style={{ margin: 0, color: 'var(--primary)', fontSize: '2.5rem' }}>{value}</h2>
        <span style={{ fontWeight: 'bold' }}>/ 5</span>
      </div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--text-light)' }}>จากผู้ประเมินทั้งหมด {subtitle} คน</p>
    </div>
  );

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>กำลังโหลดข้อมูล...</div>;

  return (
    <section className="glass-panel p-4" style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Star size={28} color="var(--primary)" />
          <h2 className="section-title" style={{ margin: 0 }}>ผลการประเมินความพึงพอใจ</h2>
        </div>
        {!isAdmin && (
          <button 
            className="btn btn-primary" 
            onClick={() => setIsEvaluationModalOpen(true)}
          >
            ประเมินความพึงพอใจ
          </button>
        )}
      </div>

      <div>
        <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
          ผลการประเมินของนักเรียน{isAdmin ? 'ทั้งหมด' : ''}
        </h3>
        {studentStats.total > 0 ? (
          <>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <StatCard 
                title="ด้านการสร้างความคุ้นเคยในการสอบ" 
                value={studentStats.avgFamiliarity} 
                subtitle={studentStats.total}
                icon={<BarChart2 size={24} color="var(--primary)" />}
              />
              <StatCard 
                title="ด้านความพึงพอใจในการใช้งาน" 
                value={studentStats.avgPlatform} 
                subtitle={studentStats.total}
                icon={<Star size={24} color="#fbbf24" />}
              />
            </div>

            <div style={{ marginTop: '1.5rem' }}>
              <button 
                className="btn btn-outline btn-sm" 
                onClick={() => setShowStudentList(!showStudentList)}
              >
                {showStudentList ? 'ซ่อนสถานะการประเมิน' : 'ดูสถานะการประเมินของนักเรียน'}
              </button>
              
              {showStudentList && students && (
                <div className="glass-panel mt-3 p-4" style={{display: 'flex', gap: '2rem'}}>
                  <div style={{flex: 1}}>
                    <h5 style={{color: '#10b981', marginBottom: '1rem'}}>✅ ประเมินแล้ว ({(students || []).filter(s => evaluatedStudentIds.has(s.id)).length} คน)</h5>
                    <ul style={{listStyle: 'none', padding: 0, maxHeight: '250px', overflowY: 'auto'}}>
                      {(students || []).filter(s => evaluatedStudentIds.has(s.id)).map(s => (
                        <li key={s.id} style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
                          {s.name} ({s.class})
                        </li>
                      ))}
                      {(students || []).filter(s => evaluatedStudentIds.has(s.id)).length === 0 && (
                        <li className="text-light">ไม่มีข้อมูล</li>
                      )}
                    </ul>
                  </div>
                  <div style={{flex: 1}}>
                    <h5 style={{color: '#ef4444', marginBottom: '1rem'}}>❌ ยังไม่ประเมิน ({(students || []).filter(s => !evaluatedStudentIds.has(s.id)).length} คน)</h5>
                    <ul style={{listStyle: 'none', padding: 0, maxHeight: '250px', overflowY: 'auto'}}>
                      {(students || []).filter(s => !evaluatedStudentIds.has(s.id)).map(s => (
                        <li key={s.id} style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
                          {s.name} ({s.class})
                        </li>
                      ))}
                      {(students || []).filter(s => !evaluatedStudentIds.has(s.id)).length === 0 && (
                        <li className="text-light">ไม่มีข้อมูล</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
            <p style={{ color: 'var(--text-light)', padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '8px', width: '100%' }}>ยังไม่มีข้อมูลการประเมินจากนักเรียน</p>
            
            <button 
              className="btn btn-outline btn-sm" 
              onClick={() => setShowStudentList(!showStudentList)}
            >
              {showStudentList ? 'ซ่อนสถานะการประเมิน' : 'ดูสถานะการประเมินของนักเรียน'}
            </button>
            
            {showStudentList && students && (
              <div className="glass-panel mt-3 p-4" style={{display: 'flex', gap: '2rem', width: '100%', textAlign: 'left'}}>
                <div style={{flex: 1}}>
                  <h5 style={{color: '#10b981', marginBottom: '1rem'}}>✅ ประเมินแล้ว (0 คน)</h5>
                  <ul style={{listStyle: 'none', padding: 0, maxHeight: '250px', overflowY: 'auto'}}>
                    <li className="text-light">ไม่มีข้อมูล</li>
                  </ul>
                </div>
                <div style={{flex: 1}}>
                  <h5 style={{color: '#ef4444', marginBottom: '1rem'}}>❌ ยังไม่ประเมิน ({(students || []).length} คน)</h5>
                  <ul style={{listStyle: 'none', padding: 0, maxHeight: '250px', overflowY: 'auto'}}>
                    {(students || []).map(s => (
                      <li key={s.id} style={{padding: '0.5rem 0', borderBottom: '1px solid var(--border)'}}>
                        {s.name} ({s.class})
                      </li>
                    ))}
                    {(students || []).length === 0 && (
                      <li className="text-light">ไม่มีข้อมูล</li>
                    )}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {isAdmin && (
        <div style={{ marginTop: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', borderBottom: '2px solid var(--border)', paddingBottom: '0.5rem' }}>
            ผลการประเมินของครูทั้งหมด
          </h3>
          {teacherStats.total > 0 ? (
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <StatCard 
                title="ด้านความพึงพอใจต่อผลการวิเคราะห์" 
                value={teacherStats.avgAnalysis} 
                subtitle={teacherStats.total}
                icon={<BarChart2 size={24} color="var(--primary)" />}
              />
              <StatCard 
                title="ด้านความพึงพอใจในการใช้งาน" 
                value={teacherStats.avgPlatform} 
                subtitle={teacherStats.total}
                icon={<Star size={24} color="#fbbf24" />}
              />
            </div>
          ) : (
            <p style={{ color: 'var(--text-light)', padding: '2rem', textAlign: 'center', backgroundColor: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>ยังไม่มีข้อมูลการประเมินจากครู</p>
          )}
        </div>
      )}

      <PlatformEvaluationModal 
        isOpen={isEvaluationModalOpen} 
        onClose={() => setIsEvaluationModalOpen(false)} 
        user={user} 
      />
    </section>
  );
}
