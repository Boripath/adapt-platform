import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

import ExamHeader from '../components/exam/ExamHeader';
import QuestionDisplay from '../components/exam/QuestionDisplay';
import ChoiceInput from '../components/exam/ChoiceInput';
import ComplexInput from '../components/exam/ComplexInput';

export default function ExamRoom() {
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const examType = urlParams.get('type') || 'pre'; // 'pre' or 'post'
  const examYear = urlParams.get('year') || 'O-NET 65';
  const subjectName = examType === 'post' ? 'Science (Post-test)' : 'Science';

  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [isFinished, setIsFinished] = useState(false);
  const [timeLeft, setTimeLeft] = useState(3 * 60 * 60); // 3 hours in seconds
  const [startTime] = useState(() => new Date().toISOString());

  useEffect(() => {
    async function fetchQuestions() {
      const { data, error } = await supabase
        .from('questions')
        .select('*')
        .eq('subject', 'Science')
        .eq('exam_year', examYear)
        .order('created_at', { ascending: true });
        
      if (data) setQuestions(data);
      setLoading(false);
    }
    fetchQuestions();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsFinished(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSelectOption = (qId, optionIdx, subIdx = null) => {
    if (subIdx !== null) {
      setAnswers(prev => {
        const currentAns = prev[qId] || [null, null, null];
        const newAns = [...currentAns];
        newAns[subIdx] = optionIdx;
        return { ...prev, [qId]: newAns };
      });
    } else {
      setAnswers({ ...answers, [qId]: optionIdx });
    }
  };

  const handleSubmit = async () => {
    // Calculate score
    let score = 0;
    let totalScore = 0;
    const weaknesses = [];
    
    questions.forEach(q => {
      if (q.type === 'complex') {
        totalScore += 5;
        const studentAns = answers[q.id] || [];
        let correctCount = 0;
        [0, 1, 2].forEach(i => {
          if (studentAns[i] === q.complex_answers[i]) correctCount++;
        });
        
        if (correctCount === 3) score += 5;
        else if (correctCount === 2) score += 2.5;
        else {
          const codes = q.indicator_codes && q.indicator_codes.length > 0 ? q.indicator_codes : (q.indicator_code ? [q.indicator_code] : []);
          codes.forEach(code => {
            if (!weaknesses.includes(code)) weaknesses.push(code);
          });
        }
      } else {
        totalScore += 5;
        if (answers[q.id] === q.correct_answer_index) {
          score += 5;
        } else {
          const codes = q.indicator_codes && q.indicator_codes.length > 0 ? q.indicator_codes : (q.indicator_code ? [q.indicator_code] : []);
          codes.forEach(code => {
            if (!weaknesses.includes(code)) weaknesses.push(code);
          });
        }
      }
    });

    const userData = localStorage.getItem('user');
    if (userData) {
      const user = JSON.parse(userData);
      const endTime = new Date().toISOString();
      const timeSpent = Math.floor((new Date(endTime).getTime() - new Date(startTime).getTime()) / 1000);

      // Save to Supabase
      const { data, error } = await supabase.from('test_results').insert([
        {
          student_id: user.id,
          teacher_id: user.teacher_id,
          subject: subjectName,
          score: score,
          total: totalScore,
          weaknesses: examType === 'pre' ? weaknesses : [], // Only save weaknesses for pre-test
          exam_year: examYear,
          start_time: startTime,
          end_time: endTime,
          time_spent_seconds: timeSpent
        }
      ]);
      
      if (error) {
        console.error('Error saving results:', error);
        alert('เกิดข้อผิดพลาดในการบันทึกผลสอบ: ' + (error.message || JSON.stringify(error)));
        return; // Stop here so it doesn't say "ส่งคำตอบเรียบร้อย"
      }
    }

    setIsFinished(true);
  };

  const handleNext = () => {
    if (currentQuestionIdx < questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      if (window.confirm('คุณต้องการส่งคำตอบใช่หรือไม่?')) {
        handleSubmit();
      }
    }
  };

  if (loading) return <div className="min-h-screen flex-center"><p>กำลังโหลดข้อสอบ...</p></div>;
  if (questions.length === 0) return <div className="min-h-screen flex-center"><p>ยังไม่มีข้อสอบในระบบสำหรับปีการศึกษานี้</p></div>;

  const currentQ = questions[currentQuestionIdx];

  if (isFinished) {
    return (
      <div className="container" style={{ maxWidth: '800px', paddingTop: '4rem' }}>
        <div className="glass-panel text-center" style={{ padding: '4rem 2rem' }}>
          <CheckCircle size={64} className="text-secondary mb-2" style={{ margin: '0 auto' }} />
          <h2 className="title">ส่งคำตอบเรียบร้อย!</h2>
          <p className="subtitle mt-2">ระบบกำลังประมวลผลและวิเคราะห์จุดบกพร่องของคุณ...</p>
          <button 
            className="btn btn-primary mt-4" 
            onClick={() => navigate('/student-dashboard')}
          >
            กลับสู่หน้า Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container" style={{ maxWidth: '800px', paddingTop: '2rem' }}>
      <ExamHeader examType={examType} timeLeft={timeLeft} formatTime={formatTime} navigate={navigate} />

      <main className="glass-panel" style={{ padding: '3rem 2rem' }}>
        <div style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: 600, color: 'var(--text-light)' }}>ข้อที่ {currentQuestionIdx + 1} จาก {questions.length}</span>
          <span className="badge" style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem' }}>
            ตัวชี้วัด: {currentQ.indicator_code}
          </span>
        </div>

        <QuestionDisplay currentQ={currentQ} />

        {currentQ.type === 'choice' ? (
          <ChoiceInput currentQ={currentQ} answers={answers} handleSelectOption={handleSelectOption} />
        ) : (
          <ComplexInput currentQ={currentQ} answers={answers} handleSelectOption={handleSelectOption} />
        )}

        <div style={{ marginTop: '3rem', display: 'flex', justifyContent: 'space-between' }}>
          <button 
            className="btn btn-outline"
            disabled={currentQuestionIdx === 0}
            onClick={() => setCurrentQuestionIdx(prev => prev - 1)}
          >
            ย้อนกลับ
          </button>
          
          <button 
            className="btn btn-primary"
            onClick={handleNext}
            disabled={
              currentQ.type === 'choice' 
                ? answers[currentQ.id] === undefined 
                : !(answers[currentQ.id] && answers[currentQ.id][0] !== null && answers[currentQ.id][1] !== null && answers[currentQ.id][2] !== null)
            }
          >
            {currentQuestionIdx === questions.length - 1 ? 'ส่งคำตอบ' : 'ข้อถัดไป'}
          </button>
        </div>
      </main>
    </div>
  );
}
