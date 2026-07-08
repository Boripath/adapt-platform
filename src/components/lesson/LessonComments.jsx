import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, Send } from 'lucide-react';

export default function LessonComments({ indicatorCode, user }) {
  const [comments, setComments] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, [indicatorCode]);

  const fetchComments = async () => {
    const { data } = await supabase
      .from('lesson_comments')
      .select('*')
      .eq('indicator_code', indicatorCode)
      .eq('thread_student_id', user.id)
      .order('created_at', { ascending: true });
    
    if (data) {
      setComments(data);
    }
    setLoading(false);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const payload = {
      indicator_code: indicatorCode,
      user_id: user.id,
      role: user.role || 'student',
      user_name: user.name,
      message: newMessage.trim(),
      parent_id: null,
      thread_student_id: user.id,
      teacher_id: user.teacher_id
    };

    const { data, error } = await supabase.from('lesson_comments').insert([payload]).select();
    
    if (!error && data) {
      setComments([...comments, data[0]]);
      setNewMessage('');
    }
  };

  if (loading) return <div>กำลังโหลดการสนทนา...</div>;

  return (
    <div className="glass-panel" style={{ padding: '2rem', marginTop: '2rem' }}>
      <h3 style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <MessageSquare size={20} className="text-primary" /> ถาม-ตอบ และแสดงความคิดเห็น
      </h3>
      
      <div style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px' }}>
        {comments.length === 0 ? (
          <p className="text-center text-light" style={{ padding: '2rem 0' }}>ยังไม่มีคำถามหรือความคิดเห็นในบทเรียนนี้</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {comments.map((comment) => (
              <div key={comment.id} style={{ 
                background: comment.role === 'teacher' ? 'rgba(16, 185, 129, 0.1)' : 'white', 
                padding: '1rem', 
                borderRadius: '8px',
                border: comment.role === 'teacher' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border)'
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <span style={{ fontWeight: 'bold', color: comment.role === 'teacher' ? '#10b981' : 'var(--text-dark)' }}>
                    {comment.user_name} {comment.role === 'teacher' && '(ครูผู้สอน)'}
                  </span>
                  <span className="text-sm text-light">{new Date(comment.created_at).toLocaleString('th-TH')}</span>
                </div>
                <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{comment.message}</p>
              </div>
            ))}
          </div>
        )}
      </div>

      <form onSubmit={handleSendMessage} style={{ display: 'flex', gap: '0.5rem' }}>
        <input 
          type="text" 
          className="form-control" 
          placeholder="พิมพ์คำถามหรือความคิดเห็นที่นี่..." 
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" disabled={!newMessage.trim()}>
          <Send size={18} /> ส่ง
        </button>
      </form>
    </div>
  );
}
