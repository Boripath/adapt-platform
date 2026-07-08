import { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { MessageSquare, Send } from 'lucide-react';

export default function LessonQA({ user, openIndicatorInfo }) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [replyMessages, setReplyMessages] = useState({});
  const [expandedIndicators, setExpandedIndicators] = useState({});
  const [expandedStudents, setExpandedStudents] = useState({});
  const [editingMessageId, setEditingMessageId] = useState(null);
  const [editMessageText, setEditMessageText] = useState('');

  const toggleIndicator = (code) => {
    setExpandedIndicators(prev => ({...prev, [code]: !prev[code]}));
  };

  const toggleStudent = (key) => {
    setExpandedStudents(prev => ({...prev, [key]: !prev[key]}));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const { data: commentsData } = await supabase
      .from('lesson_comments')
      .select('*')
      .eq('teacher_id', user.id)
      .order('created_at', { ascending: false });
      
    if (commentsData) setComments(commentsData);
    setLoading(false);
  };

  const handleReplyChange = (key, text) => {
    setReplyMessages(prev => ({...prev, [key]: text}));
  };

  const handleReply = async (indicatorCode, studentId, threadKey) => {
    const text = replyMessages[threadKey];
    if (!text || !text.trim()) return;
    
    const payload = {
      indicator_code: indicatorCode,
      user_id: user.id,
      role: 'teacher',
      user_name: user.name,
      message: text.trim(),
      parent_id: null,
      thread_student_id: studentId
    };

    const { data, error } = await supabase.from('lesson_comments').insert([payload]).select();
    
    if (!error && data) {
      setComments([data[0], ...comments]);
      setReplyMessages(prev => ({...prev, [threadKey]: ''}));
    }
  };

  const handleDeleteMessage = async (id) => {
    if (window.confirm('ยืนยันการลบข้อความนี้?')) {
      const { error } = await supabase.from('lesson_comments').delete().eq('id', id);
      if (!error) {
        setComments(comments.filter(c => c.id !== id));
      } else alert('เกิดข้อผิดพลาดในการลบข้อความ: ' + error.message);
    }
  };

  const startEditMessage = (msg) => {
    setEditingMessageId(msg.id);
    setEditMessageText(msg.message);
  };

  const handleUpdateMessage = async (id) => {
    if (!editMessageText.trim()) return;
    const { error } = await supabase.from('lesson_comments').update({ message: editMessageText.trim() }).eq('id', id);
    if (!error) {
      setComments(comments.map(c => c.id === id ? { ...c, message: editMessageText.trim() } : c));
      setEditingMessageId(null);
      setEditMessageText('');
    } else alert('เกิดข้อผิดพลาดในการแก้ไขข้อความ: ' + error.message);
  };

  if (loading) return <div>กำลังโหลดข้อมูล...</div>;

  return (
    <section className="glass-panel p-4">
      <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem'}}>
        <MessageSquare size={24} color="var(--primary)" />
        <h3 className="section-title" style={{margin: 0}}>กระดานถาม-ตอบ บทเรียน</h3>
      </div>

      {comments.length === 0 ? <p>ยังไม่มีข้อความ</p> : (
        <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
          {/* Group by indicator */}
          {[...new Set(comments.map(c => c.indicator_code))].map(indicatorCode => {
            const indComments = comments.filter(c => c.indicator_code === indicatorCode);
            const studentIds = [...new Set(indComments.map(c => c.thread_student_id))].filter(Boolean);
            const isIndExpanded = !!expandedIndicators[indicatorCode];

            return (
              <div key={indicatorCode} className="glass-panel" style={{padding: '1.5rem', background: 'rgba(255,255,255,0.8)'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isIndExpanded ? '1.5rem' : '0'}}>
                  <h4 style={{margin: 0, color: 'var(--text-dark)', display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                    บทเรียนตัวชี้วัด: 
                    <span 
                      className="badge" 
                      style={{ background: 'rgba(79, 70, 229, 0.1)', color: 'var(--primary)', cursor: 'pointer', textDecoration: 'underline' }}
                      onClick={() => openIndicatorInfo && openIndicatorInfo(indicatorCode)}
                      title="คลิกเพื่อดูรายละเอียดสาระแกนกลาง"
                    >
                      {indicatorCode}
                    </span>
                    <span className="text-sm text-light" style={{fontWeight: 'normal', marginLeft: '0.5rem'}}>
                      ({indComments.length} ข้อความ, {studentIds.length} นักเรียน)
                    </span>
                  </h4>
                  <button className="btn btn-outline btn-sm" onClick={() => toggleIndicator(indicatorCode)}>
                    {isIndExpanded ? 'ซ่อน' : 'แสดง'}
                  </button>
                </div>

                {isIndExpanded && (
                  studentIds.length === 0 ? <p className="text-light text-sm">ยังไม่มีการสนทนาที่ระบุตัวนักเรียนได้ (ข้อมูลเก่า)</p> : (
                  <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem'}}>
                    {studentIds.map(studentId => {
                      const threadKey = `${indicatorCode}-${studentId}`;
                      const threadComments = indComments.filter(c => c.thread_student_id === studentId).sort((a,b) => new Date(a.created_at) - new Date(b.created_at));
                      const studentName = threadComments.find(c => c.role === 'student')?.user_name || 'นักเรียน';
                      const isStudentExpanded = !!expandedStudents[threadKey];
                      
                      return (
                        <div key={studentId} style={{borderLeft: '3px solid var(--primary)', paddingLeft: '1rem'}}>
                          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: isStudentExpanded ? '1rem' : '0'}}>
                            <h5 style={{margin: 0, color: 'var(--primary)'}}>สนทนากับ: {studentName} <span className="text-sm text-light" style={{fontWeight: 'normal'}}>({threadComments.length} ข้อความ)</span></h5>
                            <button className="btn btn-outline btn-sm" style={{padding: '0.25rem 0.5rem', fontSize: '0.75rem'}} onClick={() => toggleStudent(threadKey)}>
                              {isStudentExpanded ? 'ซ่อน' : 'แสดง'}
                            </button>
                          </div>
                          
                          {isStudentExpanded && (
                            <>
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1rem' }}>
                                {threadComments.map(c => (
                                  <div key={c.id} style={{ 
                                    background: c.role === 'teacher' ? 'rgba(16, 185, 129, 0.1)' : '#f8fafc', 
                                    padding: '1rem', 
                                    borderRadius: '8px',
                                    border: c.role === 'teacher' ? '1px solid rgba(16, 185, 129, 0.3)' : '1px solid var(--border)'
                                  }}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                                      <span style={{ fontWeight: 'bold', color: c.role === 'teacher' ? '#10b981' : 'var(--text-dark)' }}>
                                        {c.user_name} {c.role === 'teacher' && '(คุณครู)'}
                                      </span>
                                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <span className="text-sm text-light">{new Date(c.created_at).toLocaleString('th-TH')}</span>
                                        <div style={{ display: 'flex', gap: '0.25rem' }}>
                                          {c.role === 'teacher' && (
                                            <button className="btn btn-outline btn-sm" style={{ padding: '0.1rem 0.3rem', fontSize: '0.75rem' }} onClick={() => startEditMessage(c)}>แก้ไข</button>
                                          )}
                                          <button className="btn btn-outline text-red btn-sm" style={{ padding: '0.1rem 0.3rem', fontSize: '0.75rem' }} onClick={() => handleDeleteMessage(c.id)}>ลบ</button>
                                        </div>
                                      </div>
                                    </div>
                                    {editingMessageId === c.id ? (
                                      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem' }}>
                                        <input type="text" className="input-field" style={{ flex: 1, padding: '0.5rem' }} value={editMessageText} onChange={(e) => setEditMessageText(e.target.value)} />
                                        <button className="btn btn-primary btn-sm" onClick={() => handleUpdateMessage(c.id)}>บันทึก</button>
                                        <button className="btn btn-outline btn-sm" onClick={() => setEditingMessageId(null)}>ยกเลิก</button>
                                      </div>
                                    ) : (
                                      <p style={{ margin: 0, whiteSpace: 'pre-wrap' }}>{c.message}</p>
                                    )}
                                  </div>
                                ))}
                              </div>
                              
                              <div style={{ display: 'flex', gap: '0.5rem' }}>
                                <input 
                                  type="text" 
                                  className="form-control" 
                                  placeholder={`พิมพ์ตอบกลับ ${studentName}...`}
                                  value={replyMessages[threadKey] || ''}
                                  onChange={(e) => handleReplyChange(threadKey, e.target.value)}
                                  style={{ flex: 1 }}
                                />
                                <button className="btn btn-primary" onClick={() => handleReply(indicatorCode, studentId, threadKey)} disabled={!replyMessages[threadKey]?.trim()}>
                                  <Send size={18} /> ส่ง
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  )
                )}
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
