import { CheckCircle, XCircle } from 'lucide-react';

export default function ExerciseSection({ 
  exercise, 
  selectedOption, 
  setSelectedOption, 
  isSubmitted, 
  setIsSubmitted, 
  handleCheckAnswer 
}) {
  if (!exercise) return null;

  return (
    <section className="glass-panel" style={{ padding: '2rem' }}>
      <h2 className="title" style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>แบบฝึกหัดทบทวน</h2>
      
      <div style={{ marginBottom: '2rem', lineHeight: 1.5 }}>
        {exercise.content && exercise.content.map((block, idx) => (
          block.type === 'text' ? (
            <p key={idx} style={{ fontSize: '1.25rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{block.value}</p>
          ) : (
            <div key={idx} style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <img src={block.value} alt="Question figure" style={{ maxWidth: '100%', maxHeight: '300px', borderRadius: '8px' }} />
            </div>
          )
        ))}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {exercise.options.map((optBlocks, idx) => {
          const isCorrectOpt = exercise.correct_answer_index === idx;
          const isSelectedOpt = selectedOption === idx;
          
          let borderStyle = `2px solid var(--border)`;
          let bgStyle = 'white';
          
          if (isSelectedOpt && !isSubmitted) {
            borderStyle = `2px solid var(--primary)`;
            bgStyle = 'rgba(16, 185, 129, 0.05)';
          } else if (isSubmitted) {
            if (isCorrectOpt) {
              borderStyle = `2px solid #10b981`; // Green
              bgStyle = 'rgba(16, 185, 129, 0.1)';
            } else if (isSelectedOpt && !isCorrectOpt) {
              borderStyle = `2px solid #ef4444`; // Red
              bgStyle = 'rgba(239, 68, 68, 0.1)';
            }
          }

          return (
            <button
              key={idx}
              onClick={() => !isSubmitted && setSelectedOption(idx)}
              disabled={isSubmitted}
              style={{
                textAlign: 'left',
                padding: '1.25rem',
                borderRadius: '12px',
                border: borderStyle,
                background: bgStyle,
                cursor: isSubmitted ? 'default' : 'pointer',
                fontSize: '1.1rem',
                fontFamily: 'Prompt',
                transition: 'all 0.2s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{
                  width: '24px', height: '24px', borderRadius: '50%', border: isSubmitted && isCorrectOpt ? '2px solid #10b981' : isSubmitted && isSelectedOpt && !isCorrectOpt ? '2px solid #ef4444' : isSelectedOpt ? '2px solid var(--primary)' : '2px solid var(--border)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                  background: isSubmitted && isCorrectOpt ? '#10b981' : isSubmitted && isSelectedOpt && !isCorrectOpt ? '#ef4444' : isSelectedOpt ? 'var(--primary)' : 'transparent'
                }}>
                  {isSelectedOpt && !isSubmitted && <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'white'}}></div>}
                  {isSubmitted && isCorrectOpt && <CheckCircle size={16} color="white" />}
                  {isSubmitted && isSelectedOpt && !isCorrectOpt && <XCircle size={16} color="white" />}
                </div>
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
                  {Array.isArray(optBlocks) ? optBlocks.map((block, bIdx) => (
                    block.type === 'text' ? (
                      <span key={bIdx}>{block.value}</span>
                    ) : (
                      <img key={bIdx} src={block.value} alt={`Option ${idx+1}`} style={{ maxWidth: '100%', maxHeight: '100px', borderRadius: '4px' }} />
                    )
                  )) : <span>{optBlocks}</span>}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center' }}>
        {!isSubmitted ? (
          <button 
            className="btn btn-primary" 
            onClick={handleCheckAnswer}
            disabled={selectedOption === null}
          >
            ตรวจคำตอบ
          </button>
        ) : (
          <div>
            {selectedOption === exercise.correct_answer_index ? (
              <p style={{ color: '#10b981', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>🎉 เก่งมาก! ตอบถูกต้อง</p>
            ) : (
              <p style={{ color: '#ef4444', fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '1rem' }}>❌ ตอบผิด ลองทบทวนวิดีโอและเนื้อหาอีกครั้งนะ</p>
            )}
            <button className="btn btn-outline" onClick={() => { setIsSubmitted(false); setSelectedOption(null); }}>ทำอีกครั้ง</button>
          </div>
        )}
      </div>
    </section>
  );
}
