import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Star } from 'lucide-react';

export default function LessonRating({ indicatorCode, user }) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkExistingRating();
  }, [indicatorCode]);

  const checkExistingRating = async () => {
    if (!user || user.role === 'teacher') {
      setLoading(false);
      return;
    }
    
    const { data } = await supabase
      .from('lesson_ratings')
      .select('*')
      .eq('indicator_code', indicatorCode)
      .eq('student_id', user.id)
      .single();
      
    if (data) {
      setRating(data.rating);
      setSubmitted(true);
    }
    setLoading(false);
  };

  const handleSubmitRating = async (selectedRating) => {
    if (!user || user.role === 'teacher' || submitted) return;
    
    setRating(selectedRating);
    setSubmitted(true);
    
    const { error } = await supabase.from('lesson_ratings').insert([{
      indicator_code: indicatorCode,
      student_id: user.id,
      rating: selectedRating,
      teacher_id: user.teacher_id
    }]);
    
    if (error) {
      console.error('Error saving rating:', error);
      alert('เกิดข้อผิดพลาดในการบันทึกคะแนนประเมิน');
      setSubmitted(false);
      setRating(0);
    }
  };

  if (loading || (user && user.role === 'teacher')) return null;

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem', textAlign: 'center' }}>
      <h3 style={{ marginBottom: '1rem' }}>คุณพึงพอใจกับบทเรียนนี้มากน้อยเพียงใด?</h3>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star} 
            size={36} 
            onClick={() => handleSubmitRating(star)}
            onMouseEnter={() => !submitted && setHoverRating(star)}
            onMouseLeave={() => !submitted && setHoverRating(0)}
            fill={(hoverRating || rating) >= star ? '#fbbf24' : 'transparent'}
            color={(hoverRating || rating) >= star ? '#fbbf24' : '#cbd5e1'}
            style={{ 
              cursor: submitted ? 'default' : 'pointer', 
              transition: 'all 0.2s',
              transform: (hoverRating || rating) >= star ? 'scale(1.1)' : 'scale(1)'
            }}
          />
        ))}
      </div>
      {submitted && (
        <p className="text-sm text-primary" style={{ fontWeight: 'bold' }}>ขอบคุณสำหรับการประเมินครับ!</p>
      )}
    </div>
  );
}
