import { Users, Activity } from 'lucide-react';

export default function TeacherOverview({ students, testResults, setActiveTab }) {
  const totalStudents = students.length;

  const preTestResults = testResults.filter(r => r.subject === 'Science');
  const postTestResults = testResults.filter(r => r.subject === 'Science (Post-test)');
  const preTestCount = preTestResults.length;
  const postTestCount = postTestResults.length;

  // Calculate weakness summary
  const preWeaknesses = {};
  const postWeaknesses = {};

  preTestResults.forEach(result => {
    if (result.weaknesses) {
      result.weaknesses.forEach(indicator => {
        if (!preWeaknesses[indicator]) preWeaknesses[indicator] = [];
        preWeaknesses[indicator].push(result.student_id);
      });
    }
  });

  postTestResults.forEach(result => {
    if (result.weaknesses) {
      result.weaknesses.forEach(indicator => {
        if (!postWeaknesses[indicator]) postWeaknesses[indicator] = [];
        postWeaknesses[indicator].push(result.student_id);
      });
    }
  });

  let weakestPre = '-';
  let maxPre = 0;
  for (const [ind, studentIds] of Object.entries(preWeaknesses)) {
    if (studentIds.length > maxPre) {
      maxPre = studentIds.length;
      weakestPre = ind;
    }
  }

  let weakestPost = '-';
  let maxPost = 0;
  for (const [ind, studentIds] of Object.entries(postWeaknesses)) {
    if (studentIds.length > maxPost) {
      maxPost = studentIds.length;
      weakestPost = ind;
    }
  }

  const improvementCounts = {};
  for (const [ind, preStudentIds] of Object.entries(preWeaknesses)) {
    const postStudentIds = postWeaknesses[ind] || [];
    const improvedCount = preStudentIds.filter(id => !postStudentIds.includes(id)).length;
    improvementCounts[ind] = improvedCount;
  }

  let mostImproved = '-';
  let maxImprovement = 0;
  for (const [ind, count] of Object.entries(improvementCounts)) {
    if (count > maxImprovement && count > 0) {
      maxImprovement = count;
      mostImproved = ind;
    }
  }

  // List for the table (using Pre-test weaknesses)
  const weaknessList = Object.keys(preWeaknesses).map(indicator => {
    const studentNames = preWeaknesses[indicator].map(id => {
      const student = students.find(s => s.id === id);
      return student ? student.name : 'Unknown';
    });
    return {
      indicator,
      count: preWeaknesses[indicator].length,
      students: studentNames.join(', ')
    };
  }).sort((a, b) => b.count - a.count);

  return (
    <>
      <section className="glass-panel p-4 mb-4">
        <h3 className="section-title">จัดการข้อมูลรายวิชา</h3>
        <div className="content-grid" style={{marginTop: '1rem', gridTemplateColumns: 'repeat(4, 1fr)'}}>
          <div className="glass-panel content-card" style={{border: '2px solid var(--primary)'}}>
            <div className="content-info">
              <h4 style={{fontSize: '1.1rem'}}>วิทยาศาสตร์</h4>
              <p className="text-sm">ดูสถิติและจัดการข้อสอบ</p>
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

      <h3 className="section-title">ภาพรวมวิชา: วิทยาศาสตร์</h3>
      <div className="content-grid" style={{marginTop: 0, marginBottom: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem'}}>
        <div className="glass-panel content-card flex-center text-center" style={{flexDirection: 'column', padding: '1rem'}}>
          <Users size={32} className="text-warning mb-2" />
          <h3 className="title text-lg">{preTestCount} / {totalStudents}</h3>
          <p className="text-sm">สอบก่อนเรียนเสร็จแล้ว</p>
        </div>
        <div className="glass-panel content-card flex-center text-center" style={{flexDirection: 'column', padding: '1rem'}}>
          <Users size={32} className="text-warning mb-2" style={{color: 'var(--primary)'}} />
          <h3 className="title text-lg">{postTestCount} / {totalStudents}</h3>
          <p className="text-sm">สอบหลังเรียนเสร็จแล้ว</p>
        </div>
        <div className="glass-panel content-card flex-center text-center" style={{flexDirection: 'column', padding: '1rem'}}>
          <Activity size={32} className="text-warning mb-2" style={{color: '#ef4444'}}/>
          <h3 className="title text-lg">{weakestPre}</h3>
          <p className="text-sm">คะแนนน้อยสุด (ก่อนเรียน)</p>
        </div>
        <div className="glass-panel content-card flex-center text-center" style={{flexDirection: 'column', padding: '1rem'}}>
          <Activity size={32} className="text-warning mb-2" style={{color: '#ef4444'}}/>
          <h3 className="title text-lg">{weakestPost}</h3>
          <p className="text-sm">คะแนนน้อยสุด (หลังเรียน)</p>
        </div>
        <div className="glass-panel content-card flex-center text-center" style={{flexDirection: 'column', padding: '1rem'}}>
          <Activity size={32} className="text-warning mb-2" style={{color: '#10b981'}}/>
          <h3 className="title text-lg">{mostImproved}</h3>
          <p className="text-sm">พัฒนาการมากที่สุด</p>
        </div>
      </div>

      <section className="glass-panel p-4">
        <h3 className="section-title">สรุปผลวิเคราะห์และการจัดกลุ่มซ่อมเสริม (Active Learning)</h3>
        <table style={{width: '100%', marginTop: '1rem', borderCollapse: 'collapse'}}>
          <thead>
            <tr style={{borderBottom: '2px solid var(--border)', textAlign: 'left'}}>
              <th style={{padding: '1rem'}}>ตัวชี้วัดที่บกพร่อง</th>
              <th style={{padding: '1rem'}}>จำนวนนักเรียน</th>
              <th style={{padding: '1rem'}}>รายชื่อ</th>
              <th style={{padding: '1rem'}}>การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {weaknessList.length > 0 ? (
              weaknessList.map((item, idx) => (
                <tr key={idx} style={{borderBottom: '1px solid var(--border)'}}>
                  <td style={{padding: '1rem', fontWeight: 500}}>{item.indicator}</td>
                  <td style={{padding: '1rem'}}>{item.count} คน</td>
                  <td style={{padding: '1rem'}}>{item.students}</td>
                  <td style={{padding: '1rem'}}><button className="btn btn-primary btn-sm" onClick={() => setActiveTab('lessons')}>ดูบทเรียนตัวชี้วัด</button></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{padding: '2rem', textAlign: 'center'}}>ยังไม่มีข้อมูลผลการสอบ</td>
              </tr>
            )}
          </tbody>
        </table>
      </section>
    </>
  );
}
