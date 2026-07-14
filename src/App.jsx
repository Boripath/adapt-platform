import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import StudentDashboard from './pages/StudentDashboard';
import TeacherDashboard from './pages/TeacherDashboard';
import ExamRoom from './pages/ExamRoom';
import LessonRoom from './pages/LessonRoom';
import Header from './components/common/Header';
import Footer from './components/common/Footer';

function AppContent() {
  const location = useLocation();
  const isDashboard = location.pathname.includes('dashboard') || location.pathname.includes('exam') || location.pathname.includes('lesson');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', overflow: 'hidden' }}>
      <Header />
      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflowY: isDashboard ? 'hidden' : 'auto' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: isDashboard ? 'hidden' : 'visible' }}>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/student-dashboard" element={<StudentDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/exam" element={<ExamRoom />} />
            <Route path="/lesson/:indicator_code" element={<LessonRoom />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        {!isDashboard && <Footer />}
      </main>
    </div>
  );
}

function App() {
  return <AppContent />;
}

export default App;
