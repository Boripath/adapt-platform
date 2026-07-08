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
        } else {
          localStorage.setItem('user', JSON.stringify({ ...data, role: data.role || 'teacher' }));
          navigate('/teacher-dashboard');
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการเชื่อมต่อฐานข้อมูล');
      }
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

        <form onSubmit={handleLogin} className="login-form">
          {error && <div className="error-message">{error}</div>}

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
              <div className="input-group">
                <label htmlFor="username">ชื่อผู้ใช้งาน</label>
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
                <label htmlFor="password">รหัสผ่าน</label>
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
            เข้าสู่ระบบ <ArrowRight size={20} />
          </button>
        </form>
      </div>
    </div>
  );
}
