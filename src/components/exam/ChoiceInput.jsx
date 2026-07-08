export default function ChoiceInput({ currentQ, answers, handleSelectOption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {currentQ.options.map((optBlocks, idx) => (
        <button
          key={idx}
          onClick={() => handleSelectOption(currentQ.id, idx)}
          style={{
            textAlign: 'left',
            padding: '1.25rem',
            borderRadius: '12px',
            border: `2px solid ${answers[currentQ.id] === idx ? 'var(--primary)' : 'var(--border)'}`,
            background: answers[currentQ.id] === idx ? 'rgba(79, 70, 229, 0.05)' : 'white',
            cursor: 'pointer',
            fontSize: '1.1rem',
            fontFamily: 'Prompt',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              width: '24px', height: '24px', borderRadius: '50%', border: '2px solid var(--primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              background: answers[currentQ.id] === idx ? 'var(--primary)' : 'transparent'
            }}>
              {answers[currentQ.id] === idx && <div style={{width: '10px', height: '10px', borderRadius: '50%', background: 'white'}}></div>}
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem', alignItems: 'flex-start' }}>
              {Array.isArray(optBlocks) ? optBlocks.map((block, bIdx) => (
                block.type === 'text' ? (
                  <span key={bIdx}>{block.value}</span>
                ) : (
                  <img key={bIdx} src={block.value} alt={`Option ${idx+1}`} style={{ maxWidth: '100%', maxHeight: '150px', borderRadius: '4px' }} />
                )
              )) : <span>{typeof optBlocks === 'string' ? optBlocks : JSON.stringify(optBlocks)}</span>}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
