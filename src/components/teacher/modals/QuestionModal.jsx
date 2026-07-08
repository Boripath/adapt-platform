export default function QuestionModal({
  isQuestionModalOpen,
  setIsQuestionModalOpen,
  questionForm,
  setQuestionForm,
  isEditingExerciseMode,
  handleSaveQuestion,
  handleImageUpload,
  uploadingImage
}) {
  if (!isQuestionModalOpen) return null;

  const handlePasteImage = async (e, pathInfo, currentIdx) => {
    if (!e.clipboardData || !e.clipboardData.files || e.clipboardData.files.length === 0) return;
    const file = e.clipboardData.files[0];
    if (!file.type.startsWith('image/')) return;
    
    e.preventDefault();
    const url = await handleImageUpload(file);
    if (!url) return;

    if (pathInfo.type === 'content') {
      const newContent = [...questionForm.content];
      if (newContent[currentIdx].type === 'text' && !newContent[currentIdx].value) {
        newContent[currentIdx] = { type: 'image', value: url };
      } else {
        newContent.splice(currentIdx + 1, 0, { type: 'image', value: url });
      }
      setQuestionForm({ ...questionForm, content: newContent });
    } else if (pathInfo.type === 'options') {
      const optIdx = pathInfo.optIdx;
      const newOptions = [...questionForm.options];
      if (newOptions[optIdx][currentIdx].type === 'text' && !newOptions[optIdx][currentIdx].value) {
        newOptions[optIdx][currentIdx] = { type: 'image', value: url };
      } else {
        newOptions[optIdx].splice(currentIdx + 1, 0, { type: 'image', value: url });
      }
      setQuestionForm({ ...questionForm, options: newOptions });
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{maxWidth: '600px', maxHeight: '90vh', overflowY: 'auto'}}>
        <h3>{questionForm.id ? 'แก้ไขข้อสอบ' : 'เพิ่มข้อสอบใหม่'}</h3>
        <form onSubmit={handleSaveQuestion}>
          {!isEditingExerciseMode && (
            <>
              <div className="input-group" style={{marginTop: '1rem'}}>
                <label>รหัสตัวชี้วัด (ใส่ได้หลายตัวชี้วัด)</label>
                <div style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', flexWrap: 'wrap'}}>
                  {questionForm.indicator_codes && questionForm.indicator_codes.map((code, idx) => (
                    <span key={idx} style={{background: 'var(--primary)', color: 'white', padding: '0.2rem 0.5rem', borderRadius: '4px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.25rem'}}>
                      {code}
                      <button type="button" onClick={() => {
                        const newCodes = questionForm.indicator_codes.filter((_, i) => i !== idx);
                        setQuestionForm({...questionForm, indicator_codes: newCodes});
                      }} style={{background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: 0, fontWeight: 'bold'}}>×</button>
                    </span>
                  ))}
                </div>
                <div style={{display: 'flex', gap: '0.5rem'}}>
                  <input type="text" className="input-field" placeholder="พิมพ์รหัสตัวชี้วัด (เช่น ว 1.2 ป.6/1) แล้วกดเพิ่ม"
                    id="new-indicator-input"
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        const val = e.target.value.trim();
                        if (val && (!questionForm.indicator_codes || !questionForm.indicator_codes.includes(val))) {
                          setQuestionForm({...questionForm, indicator_codes: [...(questionForm.indicator_codes || []), val]});
                          e.target.value = '';
                        }
                      }
                    }}
                  />
                  <button type="button" className="btn btn-outline" onClick={() => {
                    const input = document.getElementById('new-indicator-input');
                    const val = input.value.trim();
                    if (val && (!questionForm.indicator_codes || !questionForm.indicator_codes.includes(val))) {
                      setQuestionForm({...questionForm, indicator_codes: [...(questionForm.indicator_codes || []), val]});
                      input.value = '';
                    }
                  }}>เพิ่ม</button>
                </div>
              </div>
              <div className="input-group">
                <label>ปีการศึกษา (Exam Year)</label>
                <input type="text" className="input-field" placeholder="เช่น O-NET 65, O-NET 68 หรือ LESSON สำหรับแบบฝึกหัด"
                  value={questionForm.exam_year || ''} onChange={e => setQuestionForm({...questionForm, exam_year: e.target.value})} />
              </div>
            </>
          )}
          <div className="input-group">
            <label>ข้อมูลอ้างอิง (Shared Context) - ใส่เฉพาะถ้าต้องใช้ร่วมกันหลายข้อ</label>
            <textarea className="input-field" rows="3" placeholder="บทความ, กลอน, หรือเรื่องราวที่ใช้อ้างอิง..."
              value={questionForm.shared_context || ''} onChange={e => setQuestionForm({...questionForm, shared_context: e.target.value})} />
          </div>
          <div className="input-group">
            <label>หมายเหตุ</label>
            <input type="text" className="input-field" placeholder="เช่น O-NET 65 หรือ ครูสร้างเอง"
              value={questionForm.note || ''} onChange={e => setQuestionForm({...questionForm, note: e.target.value})} />
          </div>

          <div className="input-group" style={{display: 'flex', gap: '2rem', margin: '1rem 0'}}>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <input type="radio" name="question_type" 
                checked={questionForm.type === 'choice'} 
                onChange={() => setQuestionForm({...questionForm, type: 'choice', options: [[{ type: 'text', value: '' }], [{ type: 'text', value: '' }], [{ type: 'text', value: '' }], [{ type: 'text', value: '' }]]})} 
              /> ปรนัย 4 ตัวเลือก
            </label>
            <label style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
              <input type="radio" name="question_type" 
                checked={questionForm.type === 'complex'} 
                onChange={() => setQuestionForm({...questionForm, type: 'complex', options: [[{ type: 'text', value: '' }], [{ type: 'text', value: '' }], [{ type: 'text', value: '' }]], complex_answers: [0, 0, 0]})} 
              /> เลือกตอบเชิงซ้อน (ใช่/ไม่ใช่)
            </label>
          </div>
          
          <div className="input-group" style={{padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border)'}}>
            <label style={{display: 'block', marginBottom: '0.5rem', fontWeight: 600}}>โจทย์ข้อสอบ</label>
            {questionForm.content.map((block, idx) => (
              <div key={idx} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start'}}>
                {block.type === 'text' ? (
                  <textarea className="input-field" rows="2" placeholder="ข้อความ... (สามารถกด CTRL+V วางรูปภาพได้)" style={{flex: 1}}
                    value={block.value}
                    onChange={e => {
                      const newContent = [...questionForm.content];
                      newContent[idx].value = e.target.value;
                      setQuestionForm({...questionForm, content: newContent});
                    }}
                    onPaste={(e) => handlePasteImage(e, { type: 'content' }, idx)}
                  ></textarea>
                ) : (
                  <div style={{flex: 1}}>
                    {block.value ? (
                      <img src={block.value} alt="Preview" style={{maxHeight: '100px', borderRadius: '4px'}} />
                    ) : (
                      <input type="file" accept="image/*" onChange={async (e) => {
                        if (e.target.files && e.target.files[0]) {
                          const url = await handleImageUpload(e.target.files[0]);
                          if (url) {
                            const newContent = [...questionForm.content];
                            newContent[idx].value = url;
                            setQuestionForm({...questionForm, content: newContent});
                          }
                        }
                      }} />
                    )}
                  </div>
                )}
                <button type="button" className="btn btn-outline text-red btn-sm" onClick={() => {
                  const newContent = [...questionForm.content];
                  newContent.splice(idx, 1);
                  setQuestionForm({...questionForm, content: newContent});
                }}>ลบ</button>
              </div>
            ))}
            <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
              <button type="button" className="btn btn-outline btn-sm" onClick={() => {
                setQuestionForm({...questionForm, content: [...questionForm.content, {type: 'text', value: ''}]});
              }}>➕ ข้อความ</button>
              <button type="button" className="btn btn-outline btn-sm" disabled={uploadingImage} onClick={() => {
                setQuestionForm({...questionForm, content: [...questionForm.content, {type: 'image', value: ''}]});
              }}>{uploadingImage ? 'กำลังโหลด...' : '➕ รูปภาพ'}</button>
            </div>
          </div>
          
          <label style={{display: 'block', marginTop: '1.5rem', marginBottom: '0.5rem', fontWeight: 600}}>ตัวเลือก</label>
          {questionForm.type === 'choice' ? (
            <>
            {[0, 1, 2, 3].map(optIdx => (
              <div key={optIdx} className="input-group" style={{padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                <div style={{paddingTop: '0.5rem'}}>
                  <input type="radio" name="correct_answer" required
                    checked={parseInt(questionForm.correct_answer_index) === optIdx}
                    onChange={() => setQuestionForm({...questionForm, correct_answer_index: optIdx})} />
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>ตัวเลือกที่ {optIdx + 1}</div>
                  {questionForm.options[optIdx] && questionForm.options[optIdx].map((block, idx) => (
                    <div key={idx} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start'}}>
                      {block.type === 'text' ? (
                        <input type="text" className="input-field" placeholder="ข้อความ... (วางรูปภาพได้)" style={{flex: 1}}
                          value={block.value}
                          onChange={e => {
                            const newOptions = [...questionForm.options];
                            newOptions[optIdx][idx].value = e.target.value;
                            setQuestionForm({...questionForm, options: newOptions});
                          }}
                          onPaste={(e) => handlePasteImage(e, { type: 'options', optIdx }, idx)}
                        />
                      ) : (
                        <div style={{flex: 1}}>
                          {block.value ? (
                            <img src={block.value} alt="Preview" style={{maxHeight: '100px', borderRadius: '4px'}} />
                          ) : (
                            <input type="file" accept="image/*" onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleImageUpload(e.target.files[0]);
                                if (url) {
                                  const newOptions = [...questionForm.options];
                                  newOptions[optIdx][idx].value = url;
                                  setQuestionForm({...questionForm, options: newOptions});
                                }
                              }
                            }} />
                          )}
                        </div>
                      )}
                      <button type="button" className="btn btn-outline text-red btn-sm" onClick={() => {
                        const newOptions = [...questionForm.options];
                        newOptions[optIdx].splice(idx, 1);
                        setQuestionForm({...questionForm, options: newOptions});
                      }}>ลบ</button>
                    </div>
                  ))}
                  <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => {
                      const newOptions = [...questionForm.options];
                      newOptions[optIdx].push({type: 'text', value: ''});
                      setQuestionForm({...questionForm, options: newOptions});
                    }}>➕ ข้อความ</button>
                    <button type="button" className="btn btn-outline btn-sm" disabled={uploadingImage} onClick={() => {
                      const newOptions = [...questionForm.options];
                      newOptions[optIdx].push({type: 'image', value: ''});
                      setQuestionForm({...questionForm, options: newOptions});
                    }}>{uploadingImage ? 'กำลังโหลด...' : '➕ รูปภาพ'}</button>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-sm text-light mb-4 mt-2">คลิกที่วงกลมด้านซ้ายเพื่อเลือกข้อที่ถูกต้องเป็นเฉลย</p>
            </>
          ) : (
            <>
            {[0, 1, 2].map(optIdx => (
              <div key={optIdx} className="input-group" style={{padding: '1rem', background: 'rgba(0,0,0,0.02)', borderRadius: '8px', border: '1px solid var(--border)', display: 'flex', gap: '1rem', alignItems: 'flex-start'}}>
                <div style={{paddingTop: '0.5rem'}}>
                  <select 
                    className="input-field" 
                    style={{padding: '0.5rem', width: 'auto'}}
                    value={questionForm.complex_answers[optIdx]}
                    onChange={e => {
                      const newAns = [...questionForm.complex_answers];
                      newAns[optIdx] = parseInt(e.target.value);
                      setQuestionForm({...questionForm, complex_answers: newAns});
                    }}
                  >
                    <option value={0}>ใช่</option>
                    <option value={1}>ไม่ใช่</option>
                  </select>
                </div>
                <div style={{flex: 1}}>
                  <div style={{fontWeight: 'bold', marginBottom: '0.5rem'}}>ข้อย่อยที่ {optIdx + 1}</div>
                  {questionForm.options[optIdx] && questionForm.options[optIdx].map((block, idx) => (
                    <div key={idx} style={{display: 'flex', gap: '0.5rem', marginBottom: '0.5rem', alignItems: 'flex-start'}}>
                      {block.type === 'text' ? (
                        <input type="text" className="input-field" placeholder="ข้อความ... (วางรูปภาพได้)" style={{flex: 1}}
                          value={block.value}
                          onChange={e => {
                            const newOptions = [...questionForm.options];
                            newOptions[optIdx][idx].value = e.target.value;
                            setQuestionForm({...questionForm, options: newOptions});
                          }}
                          onPaste={(e) => handlePasteImage(e, { type: 'options', optIdx }, idx)}
                        />
                      ) : (
                        <div style={{flex: 1}}>
                          {block.value ? (
                            <img src={block.value} alt="Preview" style={{maxHeight: '100px', borderRadius: '4px'}} />
                          ) : (
                            <input type="file" accept="image/*" onChange={async (e) => {
                              if (e.target.files && e.target.files[0]) {
                                const url = await handleImageUpload(e.target.files[0]);
                                if (url) {
                                  const newOptions = [...questionForm.options];
                                  newOptions[optIdx][idx].value = url;
                                  setQuestionForm({...questionForm, options: newOptions});
                                }
                              }
                            }} />
                          )}
                        </div>
                      )}
                      <button type="button" className="btn btn-outline text-red btn-sm" onClick={() => {
                        const newOptions = [...questionForm.options];
                        newOptions[optIdx].splice(idx, 1);
                        setQuestionForm({...questionForm, options: newOptions});
                      }}>ลบ</button>
                    </div>
                  ))}
                  <div style={{display: 'flex', gap: '0.5rem', marginTop: '0.5rem'}}>
                    <button type="button" className="btn btn-outline btn-sm" onClick={() => {
                      const newOptions = [...questionForm.options];
                      newOptions[optIdx].push({type: 'text', value: ''});
                      setQuestionForm({...questionForm, options: newOptions});
                    }}>➕ ข้อความ</button>
                    <button type="button" className="btn btn-outline btn-sm" disabled={uploadingImage} onClick={() => {
                      const newOptions = [...questionForm.options];
                      newOptions[optIdx].push({type: 'image', value: ''});
                      setQuestionForm({...questionForm, options: newOptions});
                    }}>{uploadingImage ? 'กำลังโหลด...' : '➕ รูปภาพ'}</button>
                  </div>
                </div>
              </div>
            ))}
            <p className="text-sm text-light mb-4 mt-2">เลือก "ใช่" หรือ "ไม่ใช่" ให้เป็นเฉลยที่ถูกต้องสำหรับแต่ละข้อย่อย</p>
            </>
          )}

          <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn-outline" onClick={() => setIsQuestionModalOpen(false)}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary">บันทึก</button>
          </div>
        </form>
      </div>
    </div>
  );
}
