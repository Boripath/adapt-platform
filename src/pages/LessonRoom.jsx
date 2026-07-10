import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

import VideoPlayer from '../components/lesson/VideoPlayer';
import ExerciseSection from '../components/lesson/ExerciseSection';
import LessonComments from '../components/lesson/LessonComments';
import LessonRating from '../components/lesson/LessonRating';

export default function LessonRoom() {
  const { indicator_code } = useParams();
  const navigate = useNavigate();
  
  const [indicator, setIndicator] = useState(null);
  const [exercise, setExercise] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Exercise state
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [startTime] = useState(() => new Date().toISOString());

  useEffect(() => {
    window.scrollTo(0, 0);
    async function fetchData() {
      const userData = localStorage.getItem('user');
      const user = userData ? JSON.parse(userData) : null;
      
      // 1. Fetch indicator
      const { data: indData } = await supabase
        .from('indicators')
        .select('*')
        .eq('teacher_id', user?.teacher_id)
        .eq('indicator_code', decodeURIComponent(indicator_code))
        .single();
        
      if (indData) setIndicator(indData);
      
      // 2. Fetch exercise
      const { data: exData } = await supabase
        .from('questions')
        .select('*')
        .eq('teacher_id', user?.teacher_id)
        .eq('indicator_code', decodeURIComponent(indicator_code))
        .eq('note', 'lesson_exercise')
        .limit(1)
        .single();
        
      if (exData) setExercise(exData);
      
      setLoading(false);
    }
    
    if (indicator_code) {
      fetchData();
    }
  }, [indicator_code]);

  if (loading) return <div className="min-h-screen flex-center"><p>กำลังโหลดบทเรียน...</p></div>;
  if (!indicator) return <div className="min-h-screen flex-center"><p>ไม่พบบทเรียนนี้ในระบบ</p><button className="btn btn-outline mt-2" onClick={() => navigate('/student-dashboard')}>กลับ</button></div>;

  const handleCheckAnswer = async () => {
    if (selectedOption !== null) {
      setIsSubmitted(true);
      const currentAttempts = attempts + 1;
      setAttempts(currentAttempts);

      if (selectedOption === exercise.correct_answer_index) {
        const userData = localStorage.getItem('user');
        if (userData) {
          const user = JSON.parse(userData);
          const endTime = new Date().toISOString();
          const timeSpent = Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000);

          const { data } = await supabase
            .from('test_results')
            .select('id')
            .eq('student_id', user.id)
            .eq('subject', 'Science (Lesson)')
            .eq('exam_year', indicator.indicator_code);
            
          if (!data || data.length === 0) {
            await supabase.from('test_results').insert({
              student_id: user.id,
              teacher_id: user.teacher_id,
              subject: 'Science (Lesson)',
              score: 1,
              total: currentAttempts,
              weaknesses: [],
              exam_year: indicator.indicator_code,
              start_time: startTime,
              end_time: endTime,
              time_spent_seconds: timeSpent
            });
          }
        }
      }
    }
  };

  return (
    <div className="container" style={{ maxWidth: '900px', paddingTop: '2rem', paddingBottom: '4rem' }}>
      <button className="btn btn-outline btn-sm mb-4" onClick={() => navigate('/student-dashboard')}>
        <ArrowLeft size={16} /> กลับสู่หน้าหลัก
      </button>

      <header className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
          <div>
            <span className="badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px' }}>
              ตัวชี้วัด: {indicator.indicator_code}
            </span>
            <h1 className="title" style={{ fontSize: '1.5rem', marginTop: '1rem', marginBottom: '0.5rem' }}>{indicator.strand}</h1>
            <p style={{ fontWeight: 'bold', color: 'var(--text-dark)' }}>มาตรฐาน: {indicator.standard}</p>
          </div>
        </div>
        
        <div style={{ marginTop: '1.5rem', padding: '1.5rem', background: 'rgba(255,255,255,0.5)', borderRadius: '12px' }}>
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--primary)' }}>รายละเอียดตัวชี้วัด</h3>
          <p style={{ lineHeight: 1.6 }}>{indicator.details}</p>
          
          <h3 style={{ marginTop: '1.5rem', marginBottom: '0.5rem', color: 'var(--primary)' }}>สาระการเรียนรู้แกนกลาง</h3>
          <p style={{ lineHeight: 1.6, whiteSpace: 'pre-wrap' }}>{indicator.core_content}</p>
        </div>
      </header>

      <VideoPlayer indicator={indicator} />
      
      <ExerciseSection 
        exercise={exercise}
        selectedOption={selectedOption}
        setSelectedOption={setSelectedOption}
        isSubmitted={isSubmitted}
        setIsSubmitted={setIsSubmitted}
        handleCheckAnswer={handleCheckAnswer}
      />
      
      <LessonRating indicatorCode={indicator.indicator_code} user={JSON.parse(localStorage.getItem('user'))} />
      <LessonComments indicatorCode={indicator.indicator_code} user={JSON.parse(localStorage.getItem('user'))} />
    </div>
  );
}
