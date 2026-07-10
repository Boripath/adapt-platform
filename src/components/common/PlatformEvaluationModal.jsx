import { useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Star } from 'lucide-react';

export default function PlatformEvaluationModal({ isOpen, onClose, user }) {
  const [rating1, setRating1] = useState(0);
  const [rating2, setRating2] = useState(0);
  const [hover1, setHover1] = useState(0);
  const [hover2, setHover2] = useState(0);
  const [suggestion, setSuggestion] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !user) return null;

  const isStudent = user.role === 'student';

  const question1 = isStudent
    ? "แพลตฟอร์มการเรียนรู้แบบ ADAPT ช่วยให้นักเรียนมีความคุ้นเคยกับรูปแบบการสอง O-net มากน้อยเพียงใด"
    : "คุณครูมีความพึงพอใจในผลการวิเคราะห์โดย การใช้แพลตฟอร์มการเรียนรู้แบบ ADAPT มากน้อยเพียงใด";

  const question2 = isStudent
    ? "นักเรียนมีความพึงพอใจในการใช้แพลตฟอร์มการเรียนรู้แบบ ADAPT มากน้อยเพียงใด"
    : "คุณครูมีความพึงพอใจในการใช้แพลตฟอร์มการเรียนรู้แบบ ADAPT มากน้อยเพียงใด";

  const ratingDescriptions = {
    1: 'น้อยที่สุด',
    2: 'น้อย',
    3: 'ปานกลาง',
    4: 'มาก',
    5: 'มากที่สุด'
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating1 === 0 || rating2 === 0) {
      alert("กรุณาให้คะแนนให้ครบทุกข้อ");
      return;
    }

    setIsSubmitting(true);
    let error;

    if (isStudent) {
      const res = await supabase.from('student_evaluations').insert([{
        student_id: user.id,
        familiarity_rating: rating1,
        platform_rating: rating2,
        suggestion: suggestion
      }]);
      error = res.error;
    } else {
      const res = await supabase.from('teacher_evaluations').insert([{
        teacher_id: user.id,
        analysis_rating: rating1,
        platform_rating: rating2,
        suggestion: suggestion
      }]);
      error = res.error;
    }

    setIsSubmitting(false);

    if (error) {
      alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล: " + error.message);
    } else {
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        // Reset states for next open
        setSubmitted(false);
        setRating1(0);
        setRating2(0);
        setSuggestion('');
      }, 2000);
    }
  };

  const renderStars = (rating, setRating, hover, setHover) => {
    return (
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <div
            key={star}
            style={{ cursor: 'pointer' }}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
          >
            <Star
              size={32}
              fill={(hover || rating) >= star ? "#fbbf24" : "transparent"}
              color={(hover || rating) >= star ? "#fbbf24" : "var(--border)"}
            />
          </div>
        ))}
        <span style={{ marginLeft: '1rem', fontWeight: 'bold', minWidth: '80px', color: 'var(--primary)' }}>
          {ratingDescriptions[rating || hover] || ''}
        </span>
      </div>
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{ maxWidth: '600px', width: '90%', maxHeight: '90vh', overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <h3 style={{ margin: 0, color: 'var(--primary)' }}>ประเมินความพึงพอใจการใช้งาน</h3>
          <button className="btn btn-outline btn-sm" onClick={onClose} disabled={isSubmitting || submitted}>ปิด</button>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center', padding: '2rem 0' }}>
            <h2 style={{ color: 'var(--primary)' }}>ขอบคุณสำหรับการประเมิน</h2>
            <p>ระบบได้บันทึกข้อมูลของคุณเรียบร้อยแล้ว</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '8px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>1. {question1}</p>
              {renderStars(rating1, setRating1, hover1, setHover1)}
            </div>

            <div style={{ marginBottom: '1.5rem', padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '8px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>2. {question2}</p>
              {renderStars(rating2, setRating2, hover2, setHover2)}
            </div>

            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: 'rgba(0,0,0,0.04)', borderRadius: '8px' }}>
              <p style={{ fontWeight: 'bold', marginBottom: '1rem' }}>3. ความคิดเห็น/ข้อเสนอแนะ</p>
              <textarea 
                className="input-field" 
                rows="3" 
                placeholder="พิมพ์ข้อเสนอแนะเพื่อการพัฒนาแพลตฟอร์ม (ไม่บังคับ)"
                value={suggestion}
                onChange={(e) => setSuggestion(e.target.value)}
                style={{ width: '100%', resize: 'vertical' }}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem' }}>
              <button type="button" className="btn btn-outline" onClick={onClose} disabled={isSubmitting}>
                ยังไม่ประเมินตอนนี้
              </button>
              <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                {isSubmitting ? 'กำลังบันทึก...' : 'ส่งผลประเมิน'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
