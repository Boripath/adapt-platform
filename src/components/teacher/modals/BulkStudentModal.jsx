import React, { useState } from 'react';

export default function BulkStudentModal({
  isOpen,
  setIsOpen,
  handleSaveBulkStudents
}) {
  const [grid, setGrid] = useState(Array(15).fill().map(() => ['', '', '']));

  const handlePaste = (e, rowIndex, colIndex) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text/plain');
    if (!pasteData) return;

    const rows = pasteData.split(/\r?\n/).filter(row => row.trim() !== '');
    const newGrid = [...grid.map(row => [...row])];

    for (let i = 0; i < rows.length; i++) {
      const targetRow = rowIndex + i;
      if (targetRow >= newGrid.length) {
        newGrid.push(['', '', '']); // Auto expand
      }
      
      const cols = rows[i].split('\t');
      for (let j = 0; j < cols.length; j++) {
        const targetCol = colIndex + j;
        if (targetCol < 3) {
          newGrid[targetRow][targetCol] = cols[j].trim();
        }
      }
    }
    
    // Ensure we always have some empty rows at the bottom
    if (newGrid.length < 15) {
       while(newGrid.length < 15) newGrid.push(['', '', '']);
    }

    setGrid(newGrid);
  };

  const handleInputChange = (e, rowIndex, colIndex) => {
    const newGrid = [...grid];
    newGrid[rowIndex][colIndex] = e.target.value;
    setGrid(newGrid);
  };

  const addRow = () => {
    setGrid([...grid, ['', '', '']]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Filter out empty rows
    const validStudents = grid.filter(row => row[0].trim() || row[1].trim() || row[2].trim());
    handleSaveBulkStudents(validStudents);
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content glass-panel" style={{width: '90%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto'}}>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <h3>เพิ่มรายชื่อนักเรียน (หลายคน)</h3>
          <button className="btn btn-outline btn-sm" onClick={() => setIsOpen(false)}>ปิด</button>
        </div>
        <p className="text-sm text-light mt-2">
          สามารถคัดลอกข้อมูลจาก Excel (รหัสประจำตัวประชาชน, ชื่อ-นามสกุล, ชั้นเรียน) มาวางในตารางด้านล่างได้เลย
        </p>
        
        <form onSubmit={handleSubmit} style={{marginTop: '1rem'}}>
          <div className="table-responsive" style={{maxHeight: '60vh', overflowY: 'auto'}}>
            <table className="table" style={{width: '100%', borderCollapse: 'collapse'}}>
              <thead style={{position: 'sticky', top: 0, background: '#f8fafc', zIndex: 1, boxShadow: '0 1px 2px rgba(0,0,0,0.1)'}}>
                <tr>
                  <th style={{width: '50px', textAlign: 'center', border: '1px solid #cbd5e1', padding: '0.5rem', background: '#e2e8f0', color: '#334155'}}>ลำดับ</th>
                  <th style={{width: '30%', border: '1px solid #cbd5e1', padding: '0.5rem', color: '#334155'}}>รหัสประจำตัวประชาชน 13 หลัก</th>
                  <th style={{width: '40%', border: '1px solid #cbd5e1', padding: '0.5rem', color: '#334155'}}>ชื่อ - นามสกุล</th>
                  <th style={{width: '30%', border: '1px solid #cbd5e1', padding: '0.5rem', color: '#334155'}}>ชั้นเรียน</th>
                </tr>
              </thead>
              <tbody>
                {grid.map((row, rowIndex) => (
                  <tr key={rowIndex}>
                    <td style={{textAlign: 'center', border: '1px solid #cbd5e1', background: '#f1f5f9', color: '#64748b', fontWeight: 'bold'}}>{rowIndex + 1}</td>
                    <td style={{border: '1px solid #cbd5e1', padding: 0}}>
                      <input 
                        type="text" 
                        style={{width: '100%', padding: '0.5rem', border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem'}}
                        value={row[0]} 
                        onChange={(e) => handleInputChange(e, rowIndex, 0)}
                        onPaste={(e) => handlePaste(e, rowIndex, 0)}
                        placeholder="รหัส 13 หลัก"
                        maxLength={13}
                      />
                    </td>
                    <td style={{border: '1px solid #cbd5e1', padding: 0}}>
                      <input 
                        type="text" 
                        style={{width: '100%', padding: '0.5rem', border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem'}}
                        value={row[1]} 
                        onChange={(e) => handleInputChange(e, rowIndex, 1)}
                        onPaste={(e) => handlePaste(e, rowIndex, 1)}
                        placeholder="ชื่อ-นามสกุล"
                      />
                    </td>
                    <td style={{border: '1px solid #cbd5e1', padding: 0}}>
                      <input 
                        type="text" 
                        style={{width: '100%', padding: '0.5rem', border: 'none', outline: 'none', background: 'transparent', fontSize: '0.9rem'}}
                        value={row[2]} 
                        onChange={(e) => handleInputChange(e, rowIndex, 2)}
                        onPaste={(e) => handlePaste(e, rowIndex, 2)}
                        placeholder="ชั้นเรียน"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{marginTop: '1rem', display: 'flex', gap: '1rem'}}>
            <button type="button" className="btn btn-outline btn-sm" onClick={addRow}>+ เพิ่มแถว</button>
          </div>
          <div style={{display: 'flex', gap: '1rem', marginTop: '2rem', justifyContent: 'flex-end'}}>
            <button type="button" className="btn btn-outline" onClick={() => setIsOpen(false)}>ยกเลิก</button>
            <button type="submit" className="btn btn-primary">บันทึกรายชื่อทั้งหมด</button>
          </div>
        </form>
      </div>
    </div>
  );
}
