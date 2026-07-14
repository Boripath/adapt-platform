import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogOut, Users, FileText, Activity } from 'lucide-react';
import { supabase } from '../lib/supabase';
import './Dashboard.css';

import TeacherOverview from '../components/teacher/TeacherOverview';
import StudentManagement from '../components/teacher/StudentManagement';
import QuestionBank from '../components/teacher/QuestionBank';
import LessonManagement from '../components/teacher/LessonManagement';
import LessonQA from '../components/teacher/LessonQA';
import LessonRatings from '../components/teacher/LessonRatings';
import QuestionBankAnalytics from '../components/teacher/QuestionBankAnalytics';
import HistoricalAnalytics from '../components/teacher/HistoricalAnalytics';
import CurrentYearAnalytics from '../components/teacher/CurrentYearAnalytics';
import AdminManagement from '../components/admin/AdminManagement';
import AdminWorkflow from '../components/admin/AdminWorkflow';
import TeacherManual from '../components/teacher/TeacherManual';
import StudentModal from '../components/teacher/modals/StudentModal';
import QuestionModal from '../components/teacher/modals/QuestionModal';
import LessonModal from '../components/teacher/modals/LessonModal';
import IndicatorInfoModal from '../components/teacher/modals/IndicatorInfoModal';
import StudentAnalysisModal from '../components/teacher/modals/StudentAnalysisModal';
import ExerciseModal from '../components/teacher/modals/ExerciseModal';
import BulkStudentModal from '../components/teacher/modals/BulkStudentModal';

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [students, setStudents] = useState([]);
  const [testResults, setTestResults] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [indicators, setIndicators] = useState([]);
  const [teachersList, setTeachersList] = useState([]);
  const [userPermissions, setUserPermissions] = useState({
    allow_add_question: true,
    allow_edit_question: true,
    allow_delete_question: true,
    allow_reorder_question: true,
    allow_add_indicator: true,
    allow_edit_indicator: true
  });
  const [loading, setLoading] = useState(true);

  const [expandedYears, setExpandedYears] = useState({});

  // Modals state
  const [isStudentModalOpen, setIsStudentModalOpen] = useState(false);
  const [isBulkStudentModalOpen, setIsBulkStudentModalOpen] = useState(false);
  const [isQuestionModalOpen, setIsQuestionModalOpen] = useState(false);
  const [isIndicatorModalOpen, setIsIndicatorModalOpen] = useState(false);
  const [isAnalysisModalOpen, setIsAnalysisModalOpen] = useState(false);
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);
  
  // Indicator info modal state
  const [isIndicatorInfoOpen, setIsIndicatorInfoOpen] = useState(false);
  const [selectedInfoIndicator, setSelectedInfoIndicator] = useState(null);

  // Form states
  const [studentForm, setStudentForm] = useState({ id: null, national_id: '', name: '', class: '' });
  const [questionForm, setQuestionForm] = useState({
    id: null, indicator_code: '', content: [{type: 'text', value: ''}], type: 'choice',
    options: [[{type: 'text', value: ''}], [{type: 'text', value: ''}], [{type: 'text', value: ''}], [{type: 'text', value: ''}]],
    correct_answer_index: 0, complex_answers: [0, 0, 0], note: '', exam_year: '', shared_context: ''
  });
  const [indicatorForm, setIndicatorForm] = useState({ id: null, indicator_code: '', vdo_url: '' });

  const [selectedStudentForAnalysis, setSelectedStudentForAnalysis] = useState(null);
  const [selectedIndicatorForExercise, setSelectedIndicatorForExercise] = useState(null);
  const [isEditingExerciseMode, setIsEditingExerciseMode] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  const [academicYear, setAcademicYear] = useState('');
  
  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (!userData) {
      navigate('/');
      return;
    }
    const parsedUser = JSON.parse(userData);
    async function fetchData() {
      try {
        const userData = localStorage.getItem('user');
        if (!userData) {
          navigate('/login');
          return;
        }
        
        const parsedUser = JSON.parse(userData);
        const isAdmin = parsedUser.role === 'admin';
        
        const [
          { data: studentsData },
          { data: resultsData },
          { data: questionsData },
          { data: indicatorsData },
          { data: settingsData },
          { data: permissionsData },
          { data: freshUserData },
          { data: allTeachersData }
        ] = await Promise.all([
          isAdmin ? supabase.from('students').select('*').order('created_at', { ascending: true }) : supabase.from('students').select('*').eq('teacher_id', parsedUser.id).order('created_at', { ascending: true }),
          isAdmin ? supabase.from('test_results').select('*') : supabase.from('test_results').select('*').eq('teacher_id', parsedUser.id),
          isAdmin ? supabase.from('questions').select('*').order('created_at', { ascending: true }) : supabase.from('questions').select('*').or(`exam_year.neq.LESSON,teacher_id.eq.${parsedUser.id},teacher_id.eq.5b986a96-2830-452f-94fc-0a599f2a3c7e`).order('created_at', { ascending: true }),
          supabase.from('indicators').select('*').eq('teacher_id', '5b986a96-2830-452f-94fc-0a599f2a3c7e').order('id', { ascending: true }),
          supabase.from('settings').select('value').eq('key', 'current_academic_year').maybeSingle(),
          supabase.from('settings').select('value').eq('key', `permissions_${parsedUser.id}`).maybeSingle(),
          supabase.from('teachers').select('*').eq('id', parsedUser.id).maybeSingle(),
          supabase.from('teachers').select('id, name, username, school_name')
        ]);

        if (studentsData) setStudents(studentsData);
        if (resultsData) setTestResults(resultsData);
        if (questionsData) setQuestions(questionsData);
        if (indicatorsData) setIndicators(indicatorsData);
        if (allTeachersData) setTeachersList(allTeachersData);
        
        if (permissionsData && permissionsData.value) {
          try {
            const parsedPerms = JSON.parse(permissionsData.value);
            setUserPermissions(prev => ({...prev, ...parsedPerms}));
          } catch(e) { console.error(e); }
        }
        
        if (freshUserData) {
          const updatedUser = { ...freshUserData, role: freshUserData.role || 'teacher' };
          setUser(updatedUser);
          localStorage.setItem('user', JSON.stringify(updatedUser));
        }
        
        if (settingsData) {
          setAcademicYear(settingsData.value || '2567');
        } else {
          // Fallback or fetching failed
          setAcademicYear('2567');
        }

        // Check if teacher has evaluated the platform
        const { data: evalData } = await supabase
          .from('teacher_evaluations')
          .select('id')
          .eq('teacher_id', parsedUser.id)
          .limit(1);
        
        if (!evalData || evalData.length === 0) {
          setIsEvaluationModalOpen(true);
        }
      } catch (error) {
        console.error("Teacher Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [navigate]);

  const toggleYear = (year) => {
    setExpandedYears(prev => ({ ...prev, [year]: !prev[year] }));
  };

  const handleImageUpload = async (file) => {
    if (!file) return null;
    setUploadingImage(true);
    const fileExt = file.name.split('.').pop();
    const fileName = `${Math.random()}.${fileExt}`;
    const filePath = `questions/${fileName}`;

    const { error: uploadError } = await supabase.storage.from('images').upload(filePath, file);

    if (uploadError) {
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ: ' + uploadError.message);
      setUploadingImage(false);
      return null;
    }

    const { data } = supabase.storage.from('images').getPublicUrl(filePath);
    setUploadingImage(false);
    return data.publicUrl;
  };

  const openAddStudentModal = () => {
    setStudentForm({ id: null, national_id: '', name: '', class: '' });
    setIsStudentModalOpen(true);
  };

  const openEditStudentModal = (student) => {
    setStudentForm(student);
    setIsStudentModalOpen(true);
  };

  const handleDeleteStudent = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบนักเรียนคนนี้? (ข้อมูลการสอบจะถูกลบไปด้วย)')) {
      await supabase.from('test_results').delete().eq('student_id', id);
      const { error } = await supabase.from('students').delete().eq('id', id);
      if (!error) setStudents(students.filter(s => s.id !== id));
      else alert('เกิดข้อผิดพลาดในการลบนักเรียน: ' + error.message);
    }
  };

  const handleSaveStudent = async (e) => {
    e.preventDefault();
    
    const nid = studentForm.national_id.trim();
    if (nid.length !== 13 || !/^\d{13}$/.test(nid)) {
      alert('กรุณากรอกรหัสประจำตัวประชาชนให้ครบ 13 หลัก และต้องเป็นตัวเลขเท่านั้น');
      return;
    }

    const isDuplicate = students.some(s => s.national_id === nid && s.id !== studentForm.id);
    if (isDuplicate) {
      alert('ไม่สามารถบันทึกได้ เนื่องจากรหัสประจำตัวประชาชนนี้มีอยู่ในระบบแล้ว');
      return;
    }

    if (studentForm.id) {
      const { data, error } = await supabase.from('students').update({
        national_id: nid, name: studentForm.name, class: studentForm.class
      }).eq('id', studentForm.id).select();
      if (!error && data) {
        setStudents(students.map(s => s.id === studentForm.id ? data[0] : s));
        setIsStudentModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการแก้ไขข้อมูล: ' + (error?.message || 'Unknown'));
    } else {
      const { data, error } = await supabase.from('students').insert([{
        national_id: nid, name: studentForm.name, class: studentForm.class, teacher_id: user.id
      }]).select();
      if (!error && data) {
        setStudents([...students, data[0]]);
        setIsStudentModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการเพิ่มนักเรียน: ' + (error?.message || 'Unknown'));
    }
  };

  const openBulkAddStudentModal = () => {
    setIsBulkStudentModalOpen(true);
  };

  const handleSaveBulkStudents = async (validStudents) => {
    if (validStudents.length === 0) {
      alert('ไม่มีข้อมูลที่ถูกต้องในการบันทึก');
      return;
    }
    
    const newStudentsData = [];
    const seenIds = new Set();

    for (let i = 0; i < validStudents.length; i++) {
      const row = validStudents[i];
      const nid = row[0].trim();
      const name = row[1].trim();
      const sClass = row[2].trim();

      if (nid.length !== 13 || !/^\d{13}$/.test(nid)) {
         alert(`แถวที่ ${i + 1} (${name || 'ไม่มีชื่อ'}): กรุณากรอกรหัสประจำตัวประชาชนให้ครบ 13 หลัก และต้องเป็นตัวเลขเท่านั้น`);
         return;
      }
      
      if (seenIds.has(nid) || students.some(s => s.national_id === nid)) {
         alert(`แถวที่ ${i + 1} (${name || 'ไม่มีชื่อ'}): ไม่สามารถบันทึกได้ เนื่องจากรหัสประจำตัวประชาชน ${nid} ซ้ำซ้อน (อาจซ้ำกับข้อมูลที่มีอยู่แล้ว หรือซ้ำกันเองในตาราง)`);
         return;
      }
      seenIds.add(nid);
      
      newStudentsData.push({
        national_id: nid,
        name: name,
        class: sClass,
        teacher_id: user.id
      });
    }

    const { data, error } = await supabase.from('students').insert(newStudentsData).select();
    
    if (!error && data) {
      setStudents([...students, ...data]);
      setIsBulkStudentModalOpen(false);
      alert(`เพิ่มนักเรียนสำเร็จ ${data.length} คน`);
    } else {
      alert('เกิดข้อผิดพลาดในการเพิ่มนักเรียน: ' + (error?.message || 'Unknown'));
    }
  };

  const openAddQuestionModal = () => {
    setIsEditingExerciseMode(false);
    setQuestionForm({
      id: null, indicator_codes: [], content: [{type: 'text', value: ''}], type: 'choice',
      options: [[{type: 'text', value: ''}], [{type: 'text', value: ''}], [{type: 'text', value: ''}], [{type: 'text', value: ''}]],
      correct_answer_index: 0, complex_answers: [0, 0, 0], note: '', exam_year: '', shared_context: ''
    });
    setIsQuestionModalOpen(true);
  };

  const openAddExerciseModal = (indicatorCode) => {
    setIsEditingExerciseMode(true);
    setQuestionForm({
      id: null, indicator_codes: [indicatorCode], content: [{type: 'text', value: ''}], type: 'choice',
      options: [[{type: 'text', value: ''}], [{type: 'text', value: ''}], [{type: 'text', value: ''}], [{type: 'text', value: ''}]],
      correct_answer_index: 0, complex_answers: [0, 0, 0], note: 'lesson_exercise', exam_year: 'LESSON', shared_context: ''
    });
    setIsQuestionModalOpen(true);
  };

  const openEditQuestionModal = (q) => {
    setIsEditingExerciseMode(q.exam_year === 'LESSON');
    setQuestionForm({
      id: q.id, indicator_codes: q.indicator_codes || (q.indicator_code ? [q.indicator_code] : []), content: q.content, type: q.type || 'choice',
      options: q.options, correct_answer_index: q.correct_answer_index || 0,
      complex_answers: q.complex_answers || [0, 0, 0], note: q.note || '', exam_year: q.exam_year || '', shared_context: q.shared_context || ''
    });
    setIsQuestionModalOpen(true);
  };

  const handleDeleteQuestion = async (id) => {
    if (window.confirm('คุณแน่ใจหรือไม่ที่จะลบข้อสอบนี้?')) {
      const { error } = await supabase.from('questions').delete().eq('id', id);
      if (!error) setQuestions(questions.filter(q => q.id !== id));
      else alert('เกิดข้อผิดพลาดในการลบข้อสอบ: ' + error.message);
    }
  };

  const handleSaveQuestion = async (e) => {
    e.preventDefault();
    const payload = {
      subject: 'Science', indicator_codes: questionForm.indicator_codes, content: questionForm.content,
      type: questionForm.type, options: questionForm.options, correct_answer_index: parseInt(questionForm.correct_answer_index),
      complex_answers: questionForm.complex_answers, note: questionForm.note, exam_year: questionForm.exam_year, shared_context: questionForm.shared_context
    };

    if (questionForm.id) {
      const { data, error } = await supabase.from('questions').update(payload).eq('id', questionForm.id).select();
      if (!error && data) {
        setQuestions(questions.map(q => q.id === questionForm.id ? data[0] : q));
        setIsQuestionModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการแก้ไขข้อสอบ: ' + (error?.message || 'Unknown'));
    } else {
      payload.teacher_id = user.id;
      const { data, error } = await supabase.from('questions').insert([payload]).select();
      if (!error && data) {
        setQuestions([...questions, data[0]]);
        setIsQuestionModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการเพิ่มข้อสอบ: ' + (error?.message || 'Unknown'));
    }
  };

  const openExerciseModal = (indicator) => {
    setSelectedIndicatorForExercise(indicator);
    setIsExerciseModalOpen(true);
  };

  const openAddIndicatorModal = () => {
    setIndicatorForm({ 
      id: null, 
      strand_order: '', strand_name: '',
      standard_order: '', standard_content: '',
      grade: '', indicator_order: '',
      details: '', core_content: '', vdo_url: '' 
    });
    setIsIndicatorModalOpen(true);
  };

  const openEditIndicatorModal = (ind) => {
    let strand_order = '', strand_name = '';
    let standard_order = '', standard_content = '';
    let grade = '', indicator_order = '';

    if (ind.indicator_code) {
      const match = ind.indicator_code.match(/ว\s+([\d\.]+)\s+(.*?)\/(.*)/);
      if (match) {
        standard_order = match[1];
        grade = match[2];
        indicator_order = match[3];
      }
    }
    if (ind.strand) {
      const match = ind.strand.match(/สาระที่\s+(\S+)\s+(.*)/);
      if (match) {
        strand_order = match[1];
        strand_name = match[2];
      }
    }
    if (ind.standard) {
      const match = ind.standard.match(/มาตรฐาน\s+ว\s+[\d\.]+\s+(.*)/);
      if (match) {
        standard_content = match[1];
      } else {
        standard_content = ind.standard;
      }
    }

    setIndicatorForm({
      id: ind.id,
      strand_order, strand_name,
      standard_order, standard_content,
      grade, indicator_order,
      details: ind.details || '',
      core_content: ind.core_content || '',
      vdo_url: ind.vdo_url || ''
    });
    setIsIndicatorModalOpen(true);
  };

  const handleSaveIndicator = async (e) => {
    e.preventDefault();
    
    const indicator_code = `ว ${indicatorForm.standard_order} ${indicatorForm.grade}/${indicatorForm.indicator_order}`;
    const strand = `สาระที่ ${indicatorForm.strand_order} ${indicatorForm.strand_name}`;
    const standard = `มาตรฐาน ว ${indicatorForm.standard_order} ${indicatorForm.standard_content}`;
    
    // Ensure default VDO URL if empty
    let finalVdoUrl = indicatorForm.vdo_url;
    if (!finalVdoUrl && indicator_code) {
      finalVdoUrl = `https://www.youtube.com/results?search_query=วิทยาศาสตร์+${indicator_code}`;
    }

    const payload = {
      indicator_code,
      strand,
      standard,
      details: indicatorForm.details,
      core_content: indicatorForm.core_content,
      vdo_url: finalVdoUrl
    };

    if (indicatorForm.id) {
      const { data, error } = await supabase.from('indicators').update(payload).eq('id', indicatorForm.id).select();
      if (!error && data) {
        setIndicators(indicators.map(ind => ind.id === indicatorForm.id ? data[0] : ind));
        setIsIndicatorModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการแก้ไขตัวชี้วัด: ' + (error?.message || 'Unknown'));
    } else {
      payload.teacher_id = user.id;
      const { data, error } = await supabase.from('indicators').insert([payload]).select();
      if (!error && data) {
        setIndicators([...indicators, data[0]]);
        setIsIndicatorModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการเพิ่มตัวชี้วัด: ' + (error?.message || 'Unknown'));
    }
  };

  const openStudentAnalysis = (student) => {
    setSelectedStudentForAnalysis(student);
    setIsAnalysisModalOpen(true);
  };

  const handleResetStudentData = async (studentId) => {
    if(window.confirm('ยืนยันการลบประวัติการสอบทั้งหมดของนักเรียนคนนี้? ข้อมูลจะไม่สามารถกู้คืนได้')) {
      const { error } = await supabase.from('test_results').delete().eq('student_id', studentId);
      if(!error) {
        setTestResults(testResults.filter(tr => tr.student_id !== studentId));
        alert('รีเซ็ตข้อมูลสำเร็จ');
        setIsAnalysisModalOpen(false);
      } else alert('เกิดข้อผิดพลาดในการรีเซ็ตข้อมูล: ' + error.message);
    }
  };

  const handleMoveItem = async (type, index, direction) => {
    let list;
    if (type === 'students') list = students;
    else if (type === 'questions') list = questions.filter(q => q.exam_year !== 'LESSON');
    else return;

    if (direction === 'up' && index === 0) return;
    if (direction === 'down' && index === list.length - 1) return;

    const item1 = list[index];
    const item2 = list[direction === 'up' ? index - 1 : index + 1];

    const tempTime = item1.created_at;

    const { error: err1 } = await supabase.from(type).update({ created_at: item2.created_at }).eq('id', item1.id);
    const { error: err2 } = await supabase.from(type).update({ created_at: tempTime }).eq('id', item2.id);

    if (!err1 && !err2) {
      if (type === 'students') {
        const newList = [...students];
        const actualIdx1 = newList.findIndex(s => s.id === item1.id);
        const actualIdx2 = newList.findIndex(s => s.id === item2.id);
        newList[actualIdx1] = { ...item1, created_at: item2.created_at };
        newList[actualIdx2] = { ...item2, created_at: tempTime };
        setStudents(newList.sort((a,b) => new Date(a.created_at) - new Date(b.created_at)));
      } else if (type === 'questions') {
        const newList = [...questions];
        const actualIdx1 = newList.findIndex(q => q.id === item1.id);
        const actualIdx2 = newList.findIndex(q => q.id === item2.id);
        newList[actualIdx1] = { ...item1, created_at: item2.created_at };
        newList[actualIdx2] = { ...item2, created_at: tempTime };
        setQuestions(newList.sort((a,b) => new Date(a.created_at) - new Date(b.created_at)));
      }
    } else alert('เกิดข้อผิดพลาดในการเลื่อนลำดับ');
  };

  const openIndicatorInfo = (indicatorCode) => {
    if (!indicatorCode) return;
    
    // 1. Exact match
    let ind = indicators.find(i => i.indicator_code === indicatorCode);
    
    // 2. Range match (e.g., matching "ว 4.2 ป.6/1" against "ว 4.2 ป.6/1-4")
    if (!ind) {
      ind = indicators.find(i => {
        if (!i.indicator_code) return false;
        const rangeMatch = i.indicator_code.match(/^(.*\/)(\d+)-(\d+)$/);
        const searchMatch = indicatorCode.match(/^(.*\/)(\d+)$/);
        
        if (rangeMatch && searchMatch && rangeMatch[1] === searchMatch[1]) {
          const start = parseInt(rangeMatch[2]);
          const end = parseInt(rangeMatch[3]);
          const searchNum = parseInt(searchMatch[2]);
          return searchNum >= start && searchNum <= end;
        }
        return false;
      });
    }

    // 3. Fallback dummy indicator if really not found
    if (!ind) {
      ind = {
        indicator_code: indicatorCode,
        strand: 'ไม่พบข้อมูลสาระ',
        standard: 'ไม่พบข้อมูลมาตรฐาน',
        details: 'ไม่พบรายละเอียดสำหรับตัวชี้วัดนี้ในฐานระบบ อาจเป็นตัวชี้วัดที่พิมพ์ผิด หรือไม่มีอยู่ในหลักสูตรแกนกลาง',
        core_content: '-'
      };
    }

    setSelectedInfoIndicator(ind);
    setIsIndicatorInfoOpen(true);
  };

  const getQuestionPreview = (content) => {
    if (!content || !Array.isArray(content)) return '';
    const textBlock = content.find(c => c.type === 'text');
    return textBlock ? textBlock.value : '[รูปภาพ]';
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  };

  if (!user) return null;
  if (loading) return <div className="min-h-screen flex-center"><p>กำลังโหลดข้อมูล...</p></div>;

  return (
    <div className="dashboard-container layout-sidebar">
      <aside className="dashboard-sidebar glass-panel">
        <div className="user-info-vertical">
          <div style={{ width: '100%' }}>
            <h2 
              style={{ 
                margin: '0 0 0.25rem 0', 
                fontSize: user.name.length > 18 ? `${Math.max(0.75, 20 / user.name.length)}rem` : '1.1rem'
              }} 
              title={user.name}
            >
              {user.name}
            </h2>
            <p style={{ margin: 0, fontWeight: 'bold', fontSize: '0.85rem' }}>{user.role === 'admin' ? 'ผู้ดูแลระบบ (Admin)' : 'ระบบจัดการสำหรับครูผู้สอน'}</p>
            <p className="text-sm text-light mt-1" style={{ margin: 0, fontSize: '0.8rem' }}>{user.school_name || 'โรงเรียนเหล่าหลวงวิทยาคาร'}<br/>ปีการศึกษา {academicYear}</p>
          </div>
        </div>
        
        <nav className="sidebar-nav">
          <button 
            className={`btn ${activeTab === 'dashboard' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </button>
          <button 
            className={`btn ${activeTab === 'students' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('students')}
          >
            จัดการรายชื่อนักเรียน
          </button>
          <button 
            className={`btn ${activeTab === 'questions' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('questions')}
          >
            คลังข้อสอบ O-net
          </button>
          <button 
            className={`btn ${activeTab === 'question-analytics' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('question-analytics')}
          >
            วิเคราะห์คลังข้อสอบ O-net
          </button>
          <button 
            className={`btn ${activeTab === 'historical-analytics' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('historical-analytics')}
          >
            ผลการทดสอบปีการศึกษาที่ผ่านมา
          </button>
          <button 
            className={`btn ${activeTab === 'current-year-analytics' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('current-year-analytics')}
          >
            ผลการทดสอบปีการศึกษาปัจจุบัน
          </button>
          <button 
            className={`btn ${activeTab === 'lessons' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('lessons')}
          >
            จัดการเนื้อหาบทเรียน
          </button>
          {user.role !== 'admin' && (
            <button 
              className={`btn ${activeTab === 'lesson-qa' ? 'btn-primary' : 'btn-outline'}`}
              onClick={() => setActiveTab('lesson-qa')}
            >
              ถาม-ตอบ
            </button>
          )}
          <button 
            className={`btn ${activeTab === 'lesson-ratings' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('lesson-ratings')}
          >
            ผลการประเมินความพึงพอใจ
          </button>
          <div style={{marginTop: 'auto', paddingTop: '1rem', borderTop: '1px solid var(--border)'}}>
            {user.role === 'admin' && (
              <button 
                className={`btn ${activeTab === 'admin' ? 'btn-primary' : 'btn-outline'} mb-2`}
                onClick={() => setActiveTab('admin')}
                style={{width: '100%', justifyContent: 'center'}}
              >
                จัดการบัญชีครูผู้ใช้งาน
              </button>
            )}
            <button onClick={handleLogout} className="btn btn-outline text-red" style={{width: '100%', justifyContent: 'center'}}>
              <LogOut size={18} style={{marginRight: '8px'}} /> ออกจากระบบ
            </button>
          </div>
        </nav>
      </aside>

      <main className="dashboard-main">
        {activeTab === 'dashboard' && <TeacherOverview students={students} testResults={testResults} setActiveTab={setActiveTab} />}
        {activeTab === 'students' && <StudentManagement students={students} user={user} teachersList={teachersList} openAddStudentModal={openAddStudentModal} openBulkAddStudentModal={openBulkAddStudentModal} handleMoveItem={handleMoveItem} openStudentAnalysis={openStudentAnalysis} openEditStudentModal={openEditStudentModal} handleDeleteStudent={handleDeleteStudent} />}
        {activeTab === 'questions' && <QuestionBank questions={questions} user={user} userPermissions={userPermissions} openAddQuestionModal={openAddQuestionModal} expandedYears={expandedYears} toggleYear={toggleYear} getQuestionPreview={getQuestionPreview} handleMoveItem={handleMoveItem} openEditQuestionModal={openEditQuestionModal} handleDeleteQuestion={handleDeleteQuestion} openIndicatorInfo={openIndicatorInfo} />}
        {activeTab === 'lessons' && <LessonManagement indicators={indicators} user={user} userPermissions={userPermissions} openExerciseModal={openExerciseModal} openAddIndicatorModal={openAddIndicatorModal} openEditIndicatorModal={openEditIndicatorModal} openIndicatorInfo={openIndicatorInfo} />}
        {activeTab === 'lesson-qa' && <LessonQA user={user} openIndicatorInfo={openIndicatorInfo} />}
        {activeTab === 'lesson-ratings' && <LessonRatings user={user} openIndicatorInfo={openIndicatorInfo} students={students} />}
        {activeTab === 'question-analytics' && <QuestionBankAnalytics user={user} openIndicatorInfo={openIndicatorInfo} />}
        {activeTab === 'historical-analytics' && <HistoricalAnalytics questions={questions} getQuestionPreview={getQuestionPreview} openIndicatorInfo={openIndicatorInfo} user={user} />}
        {activeTab === 'current-year-analytics' && <CurrentYearAnalytics testResults={testResults} questions={questions} openIndicatorInfo={openIndicatorInfo} user={user} students={students} teachersList={teachersList} />}
        {activeTab === 'manual' && <TeacherManual />}
        {activeTab === 'admin' && user.role === 'admin' && <AdminManagement user={user} setAcademicYear={setAcademicYear} academicYear={academicYear} />}
        {activeTab === 'admin-workflow' && user.role === 'admin' && <AdminWorkflow />}
      </main>

      <StudentModal isStudentModalOpen={isStudentModalOpen} setIsStudentModalOpen={setIsStudentModalOpen} studentForm={studentForm} setStudentForm={setStudentForm} handleSaveStudent={handleSaveStudent} />
      <BulkStudentModal isOpen={isBulkStudentModalOpen} setIsOpen={setIsBulkStudentModalOpen} handleSaveBulkStudents={handleSaveBulkStudents} />
      <QuestionModal isQuestionModalOpen={isQuestionModalOpen} setIsQuestionModalOpen={setIsQuestionModalOpen} questionForm={questionForm} setQuestionForm={setQuestionForm} isEditingExerciseMode={isEditingExerciseMode} handleSaveQuestion={handleSaveQuestion} handleImageUpload={handleImageUpload} uploadingImage={uploadingImage} />
      <LessonModal isIndicatorModalOpen={isIndicatorModalOpen} setIsIndicatorModalOpen={setIsIndicatorModalOpen} indicatorForm={indicatorForm} setIndicatorForm={setIndicatorForm} handleSaveIndicator={handleSaveIndicator} />
      <IndicatorInfoModal isOpen={isIndicatorInfoOpen} setIsOpen={setIsIndicatorInfoOpen} indicator={selectedInfoIndicator} />
      <StudentAnalysisModal isAnalysisModalOpen={isAnalysisModalOpen} setIsAnalysisModalOpen={setIsAnalysisModalOpen} selectedStudentForAnalysis={selectedStudentForAnalysis} testResults={testResults} handleResetStudentData={handleResetStudentData} />
      <ExerciseModal isExerciseModalOpen={isExerciseModalOpen} setIsExerciseModalOpen={setIsExerciseModalOpen} selectedIndicatorForExercise={selectedIndicatorForExercise} questions={questions} openAddExerciseModal={openAddExerciseModal} openEditQuestionModal={openEditQuestionModal} handleDeleteQuestion={handleDeleteQuestion} getQuestionPreview={getQuestionPreview} user={user} teachersList={teachersList} />
    </div>
  );
}
