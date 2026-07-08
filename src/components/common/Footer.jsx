import React from 'react';
import './Footer.css';
import { Mail, Phone, MapPin, User, ShieldCheck } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="global-footer">
      <div className="footer-content glass-panel">
        <div className="footer-grid">
          
          <div className="footer-section">
            <h4 className="footer-title">
              <User size={18} className="text-primary" /> ผู้พัฒนา
            </h4>
            <div className="footer-info">
              <p className="developer-name">นายบริพัตร บุญฤทธิ์</p>
              <p className="developer-title">ครูชำนาญการ</p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">
              <MapPin size={18} className="text-primary" /> สถานที่ทำงาน
            </h4>
            <div className="footer-info">
              <p>โรงเรียนเหล่าหลวงวิทยาคาร</p>
              <p>สำนักงานเขตพื้นที่การศึกษาประถมศึกษากาฬสินธุ์ เขต 1</p>
            </div>
          </div>

          <div className="footer-section">
            <h4 className="footer-title">
              <Phone size={18} className="text-primary" /> ข้อมูลติดต่อ
            </h4>
            <div className="footer-info contact-links">
              <a href="tel:0639535355" className="contact-item">
                <Phone size={14} /> 063-953-5355
              </a>
              <a href="mailto:yeenboripath@gmail.com" className="contact-item">
                <Mail size={14} /> yeenboripath@gmail.com
              </a>
            </div>
          </div>

        </div>
        
        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ADAPT Learning Platform. All rights reserved.</p>
          <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-light)' }}>
            version. [001] [08-07-2569]
          </p>
        </div>
      </div>
    </footer>
  );
}
