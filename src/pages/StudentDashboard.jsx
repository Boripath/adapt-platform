import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

import StudentHeader from '../components/student/StudentHeader';
import SubjectSelection from '../components/student/SubjectSelection';
import ExamYearBlock from '../components/student/ExamYearBlock';
import PlatformEvaluationModal from '../components/common/PlatformEvaluationModal';
import PreTestComponent from '../components/student/PreTestComponent';
import PostTestComponent from '../components/student/PostTestComponent';
import StudentManual from '../components/student/StudentManual';

import CurrentYearAnalytics from '../components/teacher/CurrentYearAnalytics';

export default function StudentDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showManual, setShowManual] = useState(false);
  const [globalData, setGlobalData] = useState({ testResults: [], questions: [], students: [], teachersList: [] });
  const [loadingAnalytics, setLoadingAnalytics] = useState(false);
  const [testResultsByYear, setTestResultsByYear] = useState({});
  const [remedialContentsByYear, setRemedialContentsByYear] = useState({});
  const [allTestResults, setAllTestResults] = useState([]);
  const [expandedYears, setExpandedYears] = useState({});
  const [loading, setLoading] = useState(true);
  const [academicYear, setAcademicYear] = useState('2567');
  const [examYears, setExamYears] = useState(['O-NET 68', 'O-NET 67', 'O-NET 66', 'O-NET 65']);
  const [isEvaluationModalOpen, setIsEvaluationModalOpen] = useState(false);
  
  const toggleYear = (year) => {
    setExpandedYears(prev => ({ ...prev, [year]: prev[year] === undefined ? true : !prev[year] }));
  };

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    if (parsedUser.role !== 'student') {
      navigate('/');
      return;
    }
    setUser(parsedUser);

    async function fetchData() {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          navigate('/login');
          return;
        }
        
        const parsedUser = JSON.parse(userData);
        let updatedUser = parsedUser;
        
        const [
          { data: settingsData },
          { data: results },
          { data: freshStudentData },
          { data: teacherData }
        ] = await Promise.all([
          supabase.from('settings').select('value').eq('key', 'current_academic_year').maybeSingle(),
          supabase.from('test_results').select('*').eq('student_id', parsedUser.id).order('completed_at', { ascending: false }),
          supabase.from('students').select('*').eq('id', parsedUser.id).maybeSingle(),
          supabase.from('teachers').select('school_name').eq('id', parsedUser.teacher_id).maybeSingle()
        ]);
        
        if (freshStudentData) {
          updatedUser = { ...freshStudentData, role: 'student', teacher_school_name: updatedUser.teacher_school_name };
        }

        if (teacherData && teacherData.school_name) {
          updatedUser.teacher_school_name = teacherData.school_name;
        }
        
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));

        // Check if student has evaluated the platform
        const { data: evalData } = await supabase
          .from('student_evaluations')
          .select('id')
          .eq('student_id', updatedUser.id)
          .limit(1);
        
        if (!evalData || evalData.length === 0) {
          setIsEvaluationModalOpen(true);
        }
        
        if (settingsData) {
          setAcademicYear(settingsData.value || '2567');
        }

        if (results && results.length > 0) {
          setAllTestResults(results);
          const resultsByYear = {};
          const allWeaknesses = new Set();
          
          results.forEach(r => {
            const year = r.exam_year || 'O-NET 65';
            if (!resultsByYear[year]) {
              resultsByYear[year] = { pre: null, post: null };
            }
            // Since it's ordered by completed_at desc, the first one we see is the newest
            if (r.subject === 'Science' && !resultsByYear[year].pre) {
              resultsByYear[year].pre = r;
              if (r.weaknesses) r.weaknesses.forEach(w => allWeaknesses.add(w));
            } else if (r.subject === 'Science (Post-test)' && !resultsByYear[year].post) {
              resultsByYear[year].post = r;
            }
          });
          
          setTestResultsByYear(resultsByYear);
          
          if (allWeaknesses.size > 0) {
            const { data: contents } = await supabase
              .from('indicators')
              .select('*')
              .eq('teacher_id', '5b986a96-2830-452f-94fc-0a599f2a3c7e')
              .in('indicator_code', Array.from(allWeaknesses));
              
            if (contents) {
              const contentsByYear = {};
              Object.keys(resultsByYear).forEach(year => {
                if (resultsByYear[year].pre && resultsByYear[year].pre.weaknesses) {
                   contentsByYear[year] = contents.filter(c => resultsByYear[year].pre.weaknesses.includes(c.indicator_code));
                }
              });
              setRemedialContentsByYear(contentsByYear);
            }
          }
        }

        const { data: qData } = await supabase.from('questions').select('exam_year').neq('exam_year', 'LESSON');
        if (qData && qData.length > 0) {
          const uniqueYears = [...new Set(qData.map(q => q.exam_year))].sort().reverse();
          setExamYears(uniqueYears);
        }
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  const handleOpenManual = () => {
    setShowManual(true);
    setShowAnalytics(false);
  };
  
  const handleOpenAnalytics = async () => {
    setShowAnalytics(true);
    setShowManual(false);
    if (globalData.testResults.length === 0) {
      setLoadingAnalytics(true);
      const [
        { data: tResults },
        { data: qData },
        { data: sData },
        { data: teachers }
      ] = await Promise.all([
        supabase.from('test_results').select('*'),
        supabase.from('questions').select('*').neq('exam_year', 'LESSON'),
        supabase.from('students').select('*'),
        supabase.from('teachers').select('*')
      ]);
      
      setGlobalData({
        testResults: tResults || [],
        questions: qData || [],
        students: sData || [],
        teachersList: teachers || []
      });
      setLoadingAnalytics(false);
    }
  };

  if (!user) return null;
  if (loading) return <div className="min-h-screen flex-center"><p>กำลังโหลดข้อมูล...</p></div>;

  return (
    <div className="dashboard-container">
      <StudentHeader user={user} handleLogout={handleLogout} academicYear={academicYear} openEvaluationModal={() => setIsEvaluationModalOpen(true)} openAnalytics={handleOpenAnalytics} openManual={handleOpenManual} />

      <main className="dashboard-main">
        {showManual ? (
           <div style={{marginTop: '1rem'}}>
               <button className="btn btn-outline mb-4" onClick={() => setShowManual(false)}>← กลับไปหน้าหลัก</button>
               <StudentManual />
           </div>
        ) : showAnalytics ? (
          loadingAnalytics ? (
            <div style={{padding: '3rem', textAlign: 'center'}}>กำลังโหลดข้อมูลอันดับ...</div>
          ) : (
            <div style={{marginTop: '1rem'}}>
               <button className="btn btn-outline mb-4" onClick={() => setShowAnalytics(false)}>← กลับไปหน้าหลัก</button>
               <CurrentYearAnalytics 
                 testResults={globalData.testResults} 
                 questions={globalData.questions} 
                 user={user} 
                 students={globalData.students} 
                 teachersList={globalData.teachersList} 
               />
            </div>
          )
        ) : (
          <>
            <SubjectSelection />

            {examYears.map((year) => (
              <ExamYearBlock 
                key={year}
                year={year}
                testResultsByYear={testResultsByYear}
                remedialContentsByYear={remedialContentsByYear}
                allTestResults={allTestResults}
                expandedYears={expandedYears}
                toggleYear={toggleYear}
                navigate={navigate}
              />
            ))}
          </>
        )}
      </main>

      <PlatformEvaluationModal 
        isOpen={isEvaluationModalOpen} 
        onClose={() => setIsEvaluationModalOpen(false)} 
        user={user} 
      />
    </div>
  );
}
