import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BookOpen, User, Lock, ArrowRight, GraduationCap } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Login.css';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('student'); // 'student' or 'teacher'
  const [nationalId, setNationalId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  
  // Registration fields
  const [regName, setRegName] = useState('');
  const [regSchoolName, setRegSchoolName] = useState('');
  const [regPhone, setRegPhone] = useState('');
  const [regEmail, setRegEmail] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (role === 'student') {
      try {
        const { data, error: dbError } = await supabase
          .from('students')
          .select('*')
          .eq('national_id', nationalId)
          .maybeSingle();

        if (dbError) {
          setError(`เกิดข้อผิดพลาด: ${dbError.message || dbError.details || JSON.stringify(dbError)}`);
        } else if (!data) {
          setError('ไม่พบข้อมูลนักเรียน กรุณาตรวจสอบรหัสประจำตัวประชาชน 13 หลัก');
        } else {
          localStorage.setItem('user', JSON.stringify({ ...data, role: 'student' }));
          navigate('/student-dashboard');
        }
      } catch (err) {
        setError(`Error: ${err.message}`);
      }
    } else {
      try {
        // ในระบบจริง password_hash ควรตรวจสอบด้วย bcrypt แต่เพื่อการทดสอบเราตรวจสอบ string ตรงๆ ตามฐานข้อมูล
        const { data, error: dbError } = await supabase
          .from('teachers')
          .select('*')
          .eq('username', username)
          .eq('password_hash', password)
          .maybeSingle();

        if (dbError || !data) {
          setError('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง');
        } else if (data.status === 'pending') {
          setError('บัญชีของคุณกำลังรอการอนุมัติจากผู้ดูแลระบบ กรุณารอการติดต่อกลับ');
        } else if (data.status === 'suspended') {
          setError('บัญชีของคุณถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ');
        } else {
          localStorage.setItem('user', JSON.stringify({ ...data, role: data.role || 'teacher' }));
          navigate('/teacher-dashboard');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล');
      }
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!username || !password || !regName || !regSchoolName || !regPhone || !regEmail) {
      setError('กรุณากรอกข้อมูลให้ครบถ้วน');
      return;
    }
    
    try {
      // Check if username exists
      const { data: existing } = await supabase
        .from('teachers')
        .select('username')
        .eq('username', username)
        .maybeSingle();
        
      if (existing) {
        setError('ชื่อผู้ใช้งานนี้มีคนใช้แล้ว กรุณาเลือกชื่ออื่น');
        return;
      }
      
      const { error: insertError } = await supabase
        .from('teachers')
        .insert([{
          username,
          password_hash: password,
          name: regName,
          school_name: regSchoolName,
          phone: regPhone,
          email: regEmail,
          role: 'teacher',
          status: 'pending' // New users need approval
        }]);
        
      if (insertError) {
        setError(`เกิดข้อผิดพลาดในการสมัครสมาชิก: ${insertError.message}`);
      } else {
        setSuccess('สมัครสมาชิกสำเร็จ! กรุณารอผู้ดูแลระบบอนุมัติบัญชีของคุณ');
        setIsRegistering(false);
        setPassword('');
      }
    } catch (err) {
      setError('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล');
    }
  };


  return (
    <div className="login-container min-h-screen flex-center">
      <div className="glass-panel login-box">
        <div className="login-header text-center">
          <div className="logo-icon flex-center">
            <BookOpen size={48} color="var(--primary)" />
          </div>
          <h1 className="title">ADAPT Platform</h1>
          <p className="subtitle">Adaptive Diagnostic Assessment & Personalized Teaching</p>
        </div>

        <div className="role-selector">
          <button 
            className={`role-btn ${role === 'student' ? 'active' : ''}`}
            onClick={() => setRole('student')}
            type="button"
          >
            <GraduationCap size={20} /> นักเรียน
          </button>
          <button 
            className={`role-btn ${role === 'teacher' ? 'active' : ''}`}
            onClick={() => setRole('teacher')}
            type="button"
          >
            <User size={20} /> คุณครู
          </button>
        </div>

        <form onSubmit={role === 'teacher' && isRegistering ? handleRegister : handleLogin} className="login-form">
          {error && <div className="error-message" style={{marginBottom: '1rem', padding: '0.75rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239, 68, 68, 0.3)'}}>{error}</div>}
          {success && <div className="success-message" style={{marginBottom: '1rem', padding: '0.75rem', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', borderRadius: '8px', border: '1px solid rgba(16, 185, 129, 0.3)'}}>{success}</div>}

          {role === 'student' ? (
            <div className="input-group">
              <label htmlFor="nationalId">รหัสประจำตัวประชาชน 13 หลัก</label>
              <div className="input-with-icon">
                <User className="input-icon" size={20} />
                <input 
                  type="text" 
                  id="nationalId"
                  className="input-field" 
                  placeholder="เช่น 1234567890123"
                  value={nationalId}
                  onChange={(e) => setNationalId(e.target.value)}
                  maxLength={13}
                  required 
                />
              </div>
            </div>
          ) : (
            <>
              {isRegistering && (
                <>
                  <div className="input-group">
                    <label htmlFor="regName">ชื่อ-นามสกุล</label>
                    <div className="input-with-icon">
                      <User className="input-icon" size={20} />
                      <input 
                        type="text" 
                        id="regName"
                        className="input-field" 
                        placeholder="ชื่อ-นามสกุล"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="regSchoolName">ชื่อโรงเรียน</label>
                    <div className="input-with-icon">
                      <BookOpen className="input-icon" size={20} />
                      <input 
                        type="text" 
                        id="regSchoolName"
                        className="input-field" 
                        placeholder="เช่น โรงเรียนเหล่าหลวงวิทยาคาร"
                        value={regSchoolName}
                        onChange={(e) => setRegSchoolName(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="regPhone">เบอร์โทรศัพท์</label>
                    <div className="input-with-icon">
                      <User className="input-icon" size={20} />
                      <input 
                        type="text" 
                        id="regPhone"
                        className="input-field" 
                        placeholder="เบอร์โทรศัพท์"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                  <div className="input-group">
                    <label htmlFor="regEmail">อีเมล (Email)</label>
                    <div className="input-with-icon">
                      <User className="input-icon" size={20} />
                      <input 
                        type="email" 
                        id="regEmail"
                        className="input-field" 
                        placeholder="อีเมล"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        required 
                      />
                    </div>
                  </div>
                </>
              )}
              
              <div className="input-group">
                <label htmlFor="username">ชื่อผู้ใช้งาน (Username)</label>
                <div className="input-with-icon">
                  <User className="input-icon" size={20} />
                  <input 
                    type="text" 
                    id="username"
                    className="input-field" 
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required 
                  />
                </div>
              </div>
              <div className="input-group">
                <label htmlFor="password">รหัสผ่าน (Password)</label>
                <div className="input-with-icon">
                  <Lock className="input-icon" size={20} />
                  <input 
                    type="password" 
                    id="password"
                    className="input-field" 
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required 
                  />
                </div>
              </div>
            </>
          )}

          <button type="submit" className="btn btn-primary login-submit-btn">
            {role === 'teacher' && isRegistering ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'} <ArrowRight size={20} />
          </button>
          
          {role === 'teacher' && (
            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <span style={{ color: 'var(--text-light)', fontSize: '0.95rem' }}>
                {isRegistering ? 'มีบัญชีอยู่แล้ว?' : 'ยังไม่มีบัญชี?'} 
              </span>
              <button 
                type="button" 
                onClick={() => {
                  setIsRegistering(!isRegistering);
                  setError('');
                  setSuccess('');
                }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--primary)',
                  fontWeight: 'bold',
                  cursor: 'pointer',
                  marginLeft: '0.5rem',
                  textDecoration: 'underline'
                }}
              >
                {isRegistering ? 'เข้าสู่ระบบ' : 'สมัครสมาชิก'}
              </button>
            </div>
          )}

        </form>
      </div>
    </div>
  );
}
