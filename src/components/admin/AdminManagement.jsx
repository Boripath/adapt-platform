import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Edit2, Trash2, Copy, Users, Settings, Search, PlusCircle, CheckCircle } from 'lucide-react';

export default function AdminManagement({ user, setAcademicYear, academicYear }) {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ id: null, username: '', password_hash: '', name: '', school_name: '', phone: '', email: '', status: 'approved' });
  const [formPermissions, setFormPermissions] = useState({
    allow_add_question: true,
    allow_edit_question: true,
    allow_delete_question: true,
    allow_reorder_question: true,
    allow_add_indicator: true,
    allow_edit_indicator: true
  });
  const [searchTerm, setSearchTerm] = useState('');
  const [yearInput, setYearInput] = useState(academicYear);
  const [isSavingYear, setIsSavingYear] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  useEffect(() => {
    fetchTeachers();
    setYearInput(academicYear);
  }, [academicYear]);

  const fetchTeachers = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('teachers')
      .select('*')
      .neq('role', 'admin') // Exclude admin from list
      .order('created_at', { ascending: false });
      
    if (data) setTeachers(data);
    setLoading(false);
  };

  const handleSaveYear = async () => {
    if (!yearInput.trim()) return;
    setIsSavingYear(true);
    const { error } = await supabase.from('settings')
      .upsert({ key: 'current_academic_year', value: yearInput.trim() }, { onConflict: 'key' });
      
    if (!error) {
      setAcademicYear(yearInput.trim());
      alert('บันทึกปีการศึกษาสำเร็จ');
    } else {
      alert('เกิดข้อผิดพลาดในการบันทึกปีการศึกษา');
    }
    setIsSavingYear(false);
  };

  const handleOpenModal = async (teacher = null) => {
    if (teacher) {
      setForm(teacher);
      // Fetch permissions for this teacher
      const { data } = await supabase.from('settings').select('value').eq('key', `permissions_${teacher.id}`).maybeSingle();
      if (data && data.value) {
        try {
          const parsed = JSON.parse(data.value);
          setFormPermissions(prev => ({...prev, ...parsed}));
        } catch(e) { console.error(e); }
      } else {
        // Reset to default
        setFormPermissions({
          allow_add_question: true, allow_edit_question: true, allow_delete_question: true,
          allow_reorder_question: true, allow_add_indicator: true, allow_edit_indicator: true
        });
      }
    } else {
      setForm({ id: null, username: '', password_hash: '', name: '', school_name: '', phone: '', email: '', status: 'approved' });
      setFormPermissions({
        allow_add_question: true, allow_edit_question: true, allow_delete_question: true,
        allow_reorder_question: true, allow_add_indicator: true, allow_edit_indicator: true
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveTeacher = async (e) => {
    e.preventDefault();
    const payload = {
      username: form.username,
      password_hash: form.password_hash,
      name: form.name,
      school_name: form.school_name,
      phone: form.phone,
      email: form.email,
      status: form.status,
      role: 'teacher'
    };

    if (form.id) {
      const { data, error } = await supabase.from('teachers').update(payload).eq('id', form.id).select();
      if (!error && data) {
        setTeachers(teachers.map(t => t.id === form.id ? data[0] : t));
        await supabase.from('settings').upsert({ key: `permissions_${form.id}`, value: JSON.stringify(formPermissions) }, { onConflict: 'key' });
        setIsModalOpen(false);
      } else {
        alert('เกิดข้อผิดพลาด: ' + (error?.message || 'Unknown'));
      }
    } else {
      const { data, error } = await supabase.from('teachers').insert([payload]).select();
      if (!error && data) {
        setTeachers([data[0], ...teachers]);
        await supabase.from('settings').upsert({ key: `permissions_${data[0].id}`, value: JSON.stringify(formPermissions) }, { onConflict: 'key' });
        setIsModalOpen(false);
      } else {
        alert('เกิดข้อผิดพลาด หรือ Username ซ้ำ: ' + (error?.message || 'Unknown'));
      }
    }
  };

  const handleUpdateStatus = async (id, newStatus) => {
    if (!window.confirm(`คุณแน่ใจหรือไม่ที่จะเปลี่ยนสถานะเป็น ${newStatus}?`)) return;
    
    setActionLoading(`status-${id}`);
    const { data, error } = await supabase.from('teachers').update({ status: newStatus }).eq('id', id).select();
    
    if (!error && data) {
      setTeachers(teachers.map(t => t.id === id ? data[0] : t));
    } else {
      alert('เกิดข้อผิดพลาดในการเปลี่ยนสถานะ: ' + (error?.message || 'Unknown'));
    }
    setActionLoading(null);
  };


  const handleDeleteTeacher = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบบัญชีนี้? ข้อมูลทั้งหมดของครูท่านนี้จะถูกลบ (อาจใช้เวลาสักครู่)')) {
      // 1. Delete leaf records that depend on students and questions
      await supabase.from('lesson_comments').delete().eq('teacher_id', id);
      await supabase.from('lesson_ratings').delete().eq('teacher_id', id);
      await supabase.from('test_results').delete().eq('teacher_id', id);
      await supabase.from('historical_question_stats').delete().eq('teacher_id', id);
      
      // 2. Delete intermediate records
      await supabase.from('questions').delete().eq('teacher_id', id);
      await supabase.from('indicators').delete().eq('teacher_id', id);
      await supabase.from('students').delete().eq('teacher_id', id);

      // 3. Delete the teacher record
      const { error } = await supabase.from('teachers').delete().eq('id', id);
      if (!error) {
        setTeachers(teachers.filter(t => t.id !== id));
      } else {
        alert('เกิดข้อผิดพลาดในการลบ: ' + error.message);
      }
    }
  };

  const handleCopyQuestions = async (targetTeacherId) => {
    if (!window.confirm('ยืนยันการคัดลอกข้อสอบต้นแบบไปยังครูท่านนี้? (ข้อสอบเดิมของครูจะยังอยู่)')) return;
    
    setActionLoading(`questions-${targetTeacherId}`);
    
    // 1. Fetch admin's questions
    const { data: adminQuestions, error: fetchError } = await supabase
      .from('questions')
      .select('*')
      .eq('teacher_id', user.id)
      .eq('exam_year', 'LESSON');
      
    if (fetchError || !adminQuestions) {
      alert('ดึงข้อมูลต้นแบบไม่สำเร็จ');
      setActionLoading(null);
      return;
    }
    
    // 2. Prepare payload for target teacher
    const payload = adminQuestions.map(q => {
      const { id, created_at, ...rest } = q;
      return { ...rest, teacher_id: targetTeacherId };
    });
    
    // 3. Insert
    if (payload.length > 0) {
      const { error: insertError } = await supabase.from('questions').insert(payload);
      if (insertError) alert('คัดลอกไม่สำเร็จ: ' + insertError.message);
      else alert('คัดลอกข้อสอบสำเร็จ');
    } else {
      alert('ไม่มีข้อสอบต้นแบบให้คัดลอก');
    }
    setActionLoading(null);
  };

  const handleCopyLessons = async (targetTeacherId) => {
    if (!window.confirm('ยืนยันการคัดลอกบทเรียนต้นแบบไปยังครูท่านนี้?')) return;
    
    setActionLoading(`lessons-${targetTeacherId}`);
    
    // 1. Fetch admin's indicators
    const { data: adminIndicators, error: fetchError } = await supabase
      .from('indicators')
      .select('*')
      .eq('teacher_id', user.id);
      
    if (fetchError || !adminIndicators) {
      alert('ดึงข้อมูลต้นแบบไม่สำเร็จ');
      setActionLoading(null);
      return;
    }
    
    // 2. Prepare payload
    const payload = adminIndicators.map(ind => {
      const { id, created_at, ...rest } = ind;
      return { ...rest, teacher_id: targetTeacherId };
    });
    
    // 3. Upsert or Insert (Need to handle unique indicator_code per teacher)
    if (payload.length > 0) {
      // Upsert based on indicator_code + teacher_id
      const { error: insertError } = await supabase.from('indicators').upsert(payload, { onConflict: 'indicator_code, teacher_id' });
      if (insertError) alert('คัดลอกไม่สำเร็จ: ' + insertError.message);
      else alert('คัดลอกเนื้อหาบทเรียนสำเร็จ');
    } else {
      alert('ไม่มีเนื้อหาบทเรียนต้นแบบให้คัดลอก');
    }
    setActionLoading(null);
  };

  const filteredTeachers = teachers.filter(t => 
    t.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    t.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (t.school_name && t.school_name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="admin-management fade-in">
      <div className="dashboard-header mb-4 flex-between">
        <h2 className="title flex-center gap-2">
          <Settings size={28} className="text-primary" /> จัดการระบบและผู้ใช้งาน
        </h2>
      </div>

      <div className="glass-panel p-4 mb-4" style={{ display: 'flex', alignItems: 'flex-end', gap: '1rem', maxWidth: '500px' }}>
        <div style={{ flex: 1 }}>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>ปีการศึกษาปัจจุบันของระบบ</label>
          <input 
            type="text" 
            className="input-field" 
            value={yearInput} 
            onChange={(e) => setYearInput(e.target.value)} 
            placeholder="เช่น 2567"
          />
        </div>
        <button className="btn btn-primary" onClick={handleSaveYear} disabled={isSavingYear}>
          <CheckCircle size={18} /> {isSavingYear ? 'กำลังบันทึก...' : 'บันทึกปีการศึกษา'}
        </button>
      </div>

      <div className="glass-panel p-4">
        <div className="flex-between mb-4">
          <h3 className="title flex-center gap-2">
            <Users size={24} className="text-primary" /> บัญชีครูผู้ใช้งาน
          </h3>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <div className="input-with-icon" style={{ width: '250px' }}>
              <Search className="input-icon" size={18} />
              <input 
                type="text" 
                className="input-field" 
                placeholder="ค้นหาชื่อ, username, โรงเรียน..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="btn btn-primary" onClick={() => handleOpenModal()}>
              <PlusCircle size={18} /> เพิ่มผู้ใช้งาน
            </button>
          </div>
        </div>

        {loading ? (
          <p className="text-center py-4">กำลังโหลดข้อมูลผู้ใช้งาน...</p>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Username</th>
                  <th>ชื่อ-นามสกุล</th>
                  <th>โรงเรียน</th>
                  <th>เบอร์โทร</th>
                  <th>อีเมล</th>
                  <th>สถานะ</th>
                  <th>จัดการข้อมูล</th>
                  <th>คัดลอกต้นแบบให้ User</th>
                </tr>
              </thead>
              <tbody>
                {filteredTeachers.map(teacher => (
                  <tr key={teacher.id}>
                    <td>{teacher.username}</td>
                    <td>{teacher.name}</td>
                    <td>{teacher.school_name || '-'}</td>
                    <td>{teacher.phone || '-'}</td>
                    <td>{teacher.email || '-'}</td>
                    <td>
                      <span className="badge" style={{
                        background: teacher.status === 'pending' ? 'rgba(245, 158, 11, 0.1)' : teacher.status === 'suspended' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                        color: teacher.status === 'pending' ? '#d97706' : teacher.status === 'suspended' ? '#ef4444' : '#10b981',
                        padding: '4px 8px', borderRadius: '4px'
                      }}>
                        {teacher.status === 'pending' ? 'รออนุมัติ' : teacher.status === 'suspended' ? 'ระงับใช้งาน' : 'ใช้งานปกติ'}
                      </span>
                    </td>
                    <td>
                      <div className="flex-center gap-2">
                        <button className="btn-icon" onClick={() => handleOpenModal(teacher)} title="แก้ไข">
                          <Edit2 size={16} className="text-primary" />
                        </button>
                        <button className="btn-icon" onClick={() => handleDeleteTeacher(teacher.id)} title="ลบ">
                          <Trash2 size={16} className="text-red" />
                        </button>
                      </div>
                    </td>
                    <td>
                      <div className="flex-center gap-2 flex-wrap mb-2">
                        {teacher.status === 'pending' && (
                          <button 
                            className="btn btn-outline btn-sm" 
                            style={{borderColor: '#10b981', color: '#10b981'}}
                            onClick={() => handleUpdateStatus(teacher.id, 'approved')}
                            disabled={actionLoading === `status-${teacher.id}`}
                          >
                            <CheckCircle size={14} /> อนุมัติใช้งาน
                          </button>
                        )}
                        {(teacher.status === 'approved' || !teacher.status) && (
                          <button 
                            className="btn btn-outline btn-sm text-red" 
                            onClick={() => handleUpdateStatus(teacher.id, 'suspended')}
                            disabled={actionLoading === `status-${teacher.id}`}
                          >
                            <Trash2 size={14} /> ระงับใช้งาน
                          </button>
                        )}
                        {teacher.status === 'suspended' && (
                          <button 
                            className="btn btn-outline btn-sm" 
                            style={{borderColor: '#10b981', color: '#10b981'}}
                            onClick={() => handleUpdateStatus(teacher.id, 'approved')}
                            disabled={actionLoading === `status-${teacher.id}`}
                          >
                            <CheckCircle size={14} /> ปลดระงับ
                          </button>
                        )}
                      </div>
                      <div className="flex-center gap-2 flex-wrap">
                        <button 
                          className="btn btn-outline btn-sm text-primary" 
                          onClick={() => handleCopyQuestions(teacher.id)}
                          disabled={actionLoading === `questions-${teacher.id}`}
                        >
                          <Copy size={14} /> เลือกข้อสอบชุดนี้ให้กับ user
                        </button>
                        <button 
                          className="btn btn-outline btn-sm text-secondary" 
                          onClick={() => handleCopyLessons(teacher.id)}
                          disabled={actionLoading === `lessons-${teacher.id}`}
                        >
                          <Copy size={14} /> เลือกเนื้อหาบทเรียนนี้ให้กับ user
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredTeachers.length === 0 && (
                  <tr>
                    <td colSpan="6" className="text-center py-4">ไม่พบข้อมูลบัญชีครู</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content glass-panel" style={{ maxWidth: '500px', maxHeight: '90vh', overflowY: 'auto' }}>
            <h3 className="modal-title">{form.id ? 'แก้ไขข้อมูลผู้ใช้งาน' : 'เพิ่มผู้ใช้งานใหม่'}</h3>
            <form onSubmit={handleSaveTeacher}>
              <div className="input-group">
                <label>Username</label>
                <input required type="text" className="input-field" value={form.username} onChange={e => setForm({...form, username: e.target.value})} />
              </div>
              <div className="input-group">
                <label>รหัสผ่าน</label>
                <input required type="text" className="input-field" value={form.password_hash} onChange={e => setForm({...form, password_hash: e.target.value})} />
              </div>
              <div className="input-group">
                <label>ชื่อ-นามสกุล</label>
                <input required type="text" className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>ชื่อโรงเรียน</label>
                <input required type="text" className="input-field" value={form.school_name} onChange={e => setForm({...form, school_name: e.target.value})} />
              </div>
              <div className="input-group">
                <label>เบอร์โทร</label>
                <input type="text" className="input-field" value={form.phone || ''} onChange={e => setForm({...form, phone: e.target.value})} />
              </div>
              <div className="input-group">
                <label>อีเมล (Email)</label>
                <input type="email" className="input-field" value={form.email || ''} onChange={e => setForm({...form, email: e.target.value})} />
              </div>
              <div className="input-group mb-4">
                <label>สถานะบัญชี</label>
                <select className="input-field" value={form.status || 'approved'} onChange={e => setForm({...form, status: e.target.value})}>
                  <option value="approved">ใช้งานปกติ (Approved)</option>
                  <option value="pending">รออนุมัติ (Pending)</option>
                  <option value="suspended">ระงับการใช้งาน (Suspended)</option>
                </select>
              </div>
              
              <div style={{ marginTop: '1.5rem', marginBottom: '1.5rem', padding: '1rem', background: 'rgba(79, 70, 229, 0.05)', borderRadius: '8px' }}>
                <h4 style={{ marginBottom: '1rem', color: 'var(--primary-dark)' }}>ตั้งค่าสิทธิ์การใช้งาน</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formPermissions.allow_add_question} onChange={e => setFormPermissions({...formPermissions, allow_add_question: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    เพิ่มข้อสอบ O-NET
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formPermissions.allow_edit_question} onChange={e => setFormPermissions({...formPermissions, allow_edit_question: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    แก้ไขข้อสอบ O-NET
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formPermissions.allow_delete_question} onChange={e => setFormPermissions({...formPermissions, allow_delete_question: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    ลบข้อสอบ O-NET
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formPermissions.allow_reorder_question} onChange={e => setFormPermissions({...formPermissions, allow_reorder_question: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    เลื่อนลำดับข้อสอบ O-NET
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formPermissions.allow_add_indicator} onChange={e => setFormPermissions({...formPermissions, allow_add_indicator: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    เพิ่มตัวชี้วัด
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                    <input type="checkbox" checked={formPermissions.allow_edit_indicator} onChange={e => setFormPermissions({...formPermissions, allow_edit_indicator: e.target.checked})} style={{ width: '18px', height: '18px' }} />
                    แก้ไขตัวชี้วัด
                  </label>
                </div>
              </div>
              
              <div className="modal-actions">
                <button type="button" className="btn btn-outline text-red" onClick={() => setIsModalOpen(false)}>ยกเลิก</button>
                <button type="submit" className="btn btn-primary">บันทึกข้อมูล</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
