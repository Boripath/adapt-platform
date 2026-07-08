export default function QuestionDisplay({ currentQ }) {
  return (
    <div style={{ marginBottom: '2rem', lineHeight: 1.5 }}>
      {currentQ.shared_context && (
        <div style={{ padding: '1.5rem', marginBottom: '1.5rem', backgroundColor: 'rgba(79, 70, 229, 0.05)', borderRadius: '12px', borderLeft: '4px solid var(--primary)' }}>
          <p style={{ margin: 0, fontSize: '1.1rem', whiteSpace: 'pre-wrap', color: 'var(--text-dark)' }}>
            <strong>ข้อมูลอ้างอิง:</strong><br />
            {currentQ.shared_context}
          </p>
        </div>
      )}
      {currentQ.content && currentQ.content.map((block, idx) => (
        block.type === 'text' ? (
          <p key={idx} style={{ fontSize: '1.5rem', marginBottom: '1rem', whiteSpace: 'pre-wrap' }}>{block.value}</p>
        ) : (
          <div key={idx} style={{ textAlign: 'center', marginBottom: '1rem' }}>
            <img src={block.value} alt="Question figure" style={{ maxWidth: '100%', maxHeight: '400px', borderRadius: '8px' }} />
          </div>
        )
      ))}
    </div>
  );
}
