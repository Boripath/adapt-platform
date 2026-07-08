export default function ComplexInput({ currentQ, answers, handleSelectOption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {currentQ.options.map((optBlocks, idx) => (
        <div key={idx} style={{ padding: '1.25rem', borderRadius: '12px', border: '1px solid var(--border)', background: 'white' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem', fontSize: '1.1rem', fontFamily: 'Prompt' }}>
            {Array.isArray(optBlocks) ? optBlocks.map((block, bIdx) => (
              block.type === 'text' ? (
                <span key={bIdx}>{block.value}</span>
              ) : (
                <img key={bIdx} src={block.value} alt={`Option ${idx+1}`} style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px' }} />
              )
            )) : <span>{optBlocks}</span>}
          </div>
          <div style={{ display: 'flex', gap: '1rem' }}>
            <button 
              onClick={() => handleSelectOption(currentQ.id, 0, idx)}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: `2px solid ${(answers[currentQ.id] || [])[idx] === 0 ? 'var(--primary)' : 'var(--border)'}`, background: (answers[currentQ.id] || [])[idx] === 0 ? 'rgba(79, 70, 229, 0.05)' : 'white', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'Prompt' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', 
                  borderColor: (answers[currentQ.id] || [])[idx] === 0 ? 'var(--primary)' : 'var(--border)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: (answers[currentQ.id] || [])[idx] === 0 ? 'var(--primary)' : 'transparent'
                }}>
                  {(answers[currentQ.id] || [])[idx] === 0 && <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}></div>}
                </div>
                ใช่
              </div>
            </button>
            <button 
              onClick={() => handleSelectOption(currentQ.id, 1, idx)}
              style={{ flex: 1, padding: '0.75rem', borderRadius: '8px', border: `2px solid ${(answers[currentQ.id] || [])[idx] === 1 ? 'var(--primary)' : 'var(--border)'}`, background: (answers[currentQ.id] || [])[idx] === 1 ? 'rgba(79, 70, 229, 0.05)' : 'white', cursor: 'pointer', fontWeight: 'bold', fontFamily: 'Prompt' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '20px', height: '20px', borderRadius: '50%', border: '2px solid', 
                  borderColor: (answers[currentQ.id] || [])[idx] === 1 ? 'var(--primary)' : 'var(--border)', 
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: (answers[currentQ.id] || [])[idx] === 1 ? 'var(--primary)' : 'transparent'
                }}>
                  {(answers[currentQ.id] || [])[idx] === 1 && <div style={{width: '8px', height: '8px', borderRadius: '50%', background: 'white'}}></div>}
                </div>
                ไม่ใช่
              </div>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
