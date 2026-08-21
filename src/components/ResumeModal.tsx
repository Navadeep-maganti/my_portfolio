import React from 'react';
import { portfolioData } from '../data/portfolioData';
import { X, Printer, Phone, Mail, Github, Linkedin } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  const { 
    name, 
    email, 
    phone, 
    studentEmail, 
    githubUrl, 
    linkedinUrl, 
    bio, 
    education, 
    experiences, 
    projects, 
    skills, 
    achievements, 
    leadership 
  } = portfolioData;

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        {/* Modal Controls */}
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>Professional Resume</h2>
            <span className="modal-subtitle">ATS-Optimized Printable Document</span>
          </div>
          <div className="modal-buttons">
            <button onClick={handlePrint} className="btn-primary print-btn" title="Print/Save as PDF">
              <Printer size={16} />
              <span>Print / Save PDF</span>
            </button>
            <button onClick={onClose} className="close-btn" title="Close Modal">
              <X size={22} />
            </button>
          </div>
        </div>

        {/* Printable Resume Document Area */}
        <div className="resume-print-area" id="resume-document">
          {/* Resume Header */}
          <div className="resume-doc-header">
            <h1 className="resume-name">{name}</h1>
            <div className="resume-doc-contacts">
              <span><Phone size={13} /> {phone}</span>
              <span><Mail size={13} /> {email}</span>
              <span><Mail size={13} /> {studentEmail}</span>
            </div>
            <div className="resume-doc-links">
              <a href={linkedinUrl} target="_blank" rel="noreferrer">
                <Linkedin size={13} /> linkedin.com/in/navadeep-maganti
              </a>
              <a href={githubUrl} target="_blank" rel="noreferrer">
                <Github size={13} /> github.com/Navadeep-maganti
              </a>
            </div>
          </div>

          <hr className="resume-divider" />

          {/* Section: Profile */}
          <div className="resume-doc-section">
            <h3 className="section-title">Summary</h3>
            <p className="section-body">{bio}</p>
          </div>

          {/* Section: Education */}
          <div className="resume-doc-section">
            <h3 className="section-title">Education</h3>
            {education.map((edu, idx) => (
              <div key={idx} className="resume-item" style={{ marginBottom: idx < education.length - 1 ? '10px' : '0' }}>
                <div className="item-header">
                  <strong>{edu.institution}</strong>
                  <span>{edu.period}</span>
                </div>
                <div className="item-sub">
                  <em>{edu.degree} &bull; {edu.field}</em>
                  <strong>{edu.scoreLabel}: {edu.score}</strong>
                </div>
                <ul className="item-bullets">
                  {edu.highlights.map((hl, i) => (
                    <li key={i}>{hl}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Experience */}
          <div className="resume-doc-section">
            <h3 className="section-title">Experience</h3>
            {experiences.map((exp, i) => (
              <div key={i} className="resume-item" style={{ marginBottom: i < experiences.length - 1 ? '12px' : 0 }}>
                <div className="item-header">
                  <strong>{exp.role}</strong>
                  <span>{exp.period}</span>
                </div>
                <div className="item-sub">
                  <em>{exp.company} &bull; {exp.location || 'India'}</em>
                </div>
                <ul className="item-bullets">
                  {exp.description.map((bullet, idx) => (
                    <li key={idx}>{bullet}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Section: Projects */}
          <div className="resume-doc-section">
            <h3 className="section-title">Projects</h3>
            {projects.map((proj, i) => (
              <div key={i} className="resume-item" style={{ marginBottom: i < projects.length - 1 ? '12px' : 0 }}>
                <div className="item-header">
                  <strong>{proj.title}</strong>
                  <span>Featured Project</span>
                </div>
                <div className="item-sub">
                  <em>Technologies: {proj.tags.join(', ')}</em>
                </div>
                <p className="item-description">{proj.description}</p>
                {proj.highlights && (
                  <ul className="item-bullets" style={{ marginTop: '4px' }}>
                    {proj.highlights.map((h, hIdx) => (
                      <li key={hIdx}>{h}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>

          {/* Section: Technical Skills */}
          <div className="resume-doc-section">
            <h3 className="section-title">Technical Skills</h3>
            <div className="skills-line">
              <strong>Programming Languages:</strong> {skills.filter(s => s.category === 'Languages').map(s => s.name).join(', ')}
            </div>
            <div className="skills-line">
              <strong>Frontend Development:</strong> {skills.filter(s => s.category === 'Frontend').map(s => s.name).join(', ')}
            </div>
            <div className="skills-line">
              <strong>Backend & Systems:</strong> {skills.filter(s => s.category === 'Backend').map(s => s.name).join(', ')}
            </div>
            <div className="skills-line">
              <strong>Developer Tools:</strong> {skills.filter(s => s.category === 'Tools & Others').map(s => s.name).join(', ')}
            </div>
          </div>

          {/* Section: Achievements */}
          <div className="resume-doc-section">
            <h3 className="section-title">Achievements</h3>
            <ul className="item-bullets">
              {achievements.map((ach, i) => (
                <li key={i}><strong>{ach.title}</strong>: {ach.description}</li>
              ))}
            </ul>
          </div>

          {/* Section: Leadership */}
          <div className="resume-doc-section">
            <h3 className="section-title">Leadership & Activities</h3>
            <ul className="item-bullets">
              {leadership.map((lead, i) => (
                <li key={i}><strong>{lead.role}</strong> ({lead.organization}): {lead.description}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <style>{`
        .resume-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .resume-modal-content {
          width: 100%;
          max-width: 900px;
          height: 90vh;
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--bg-secondary) !important;
          border-color: var(--glass-border-hover) !important;
          overflow: hidden;
          padding: 24px;
        }
        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 14px;
        }
        .modal-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }
        .modal-title-group h2 {
          font-family: var(--font-display);
          font-size: 1.4rem;
          color: var(--text-primary);
        }
        .modal-subtitle {
          font-size: 0.78rem;
          font-family: var(--font-mono);
          color: var(--accent-cyan);
        }
        .modal-buttons {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .print-btn {
          padding: 8px 18px;
          font-size: 0.88rem;
          gap: 8px;
        }
        .close-btn {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 6px;
          border-radius: 8px;
          cursor: pointer;
          transition: var(--transition-fast);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .close-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.12);
        }

        /* Printable Sheet */
        .resume-print-area {
          overflow-y: auto;
          flex-grow: 1;
          background: #ffffff;
          color: #1a1a1a;
          padding: 40px 48px;
          border-radius: 8px;
          font-family: 'Outfit', sans-serif;
          line-height: 1.5;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
        }
        
        .resume-doc-header {
          text-align: center;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .resume-name {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          color: #111827;
          letter-spacing: -0.02em;
        }
        .resume-doc-contacts {
          display: flex;
          justify-content: center;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.88rem;
          color: #4b5563;
        }
        .resume-doc-contacts span {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .resume-doc-links {
          display: flex;
          justify-content: center;
          gap: 20px;
          font-size: 0.88rem;
          margin-top: 2px;
        }
        .resume-doc-links a {
          color: #6366f1;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 5px;
          font-weight: 500;
        }
        .resume-doc-links a:hover {
          text-decoration: underline;
        }
        .resume-divider {
          border: 0;
          height: 1px;
          background: #e5e7eb;
          margin: 14px 0 18px 0;
        }
        
        .resume-doc-section {
          margin-bottom: 18px;
        }
        .section-title {
          font-family: 'Space Grotesk', sans-serif;
          font-size: 1.05rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: #111827;
          border-bottom: 1.5px solid #1f2937;
          padding-bottom: 3px;
          margin-bottom: 8px;
          font-weight: 700;
        }
        .section-body {
          font-size: 0.92rem;
          color: #374151;
          line-height: 1.55;
          text-align: justify;
        }
        
        .item-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.92rem;
          color: #111827;
        }
        .item-sub {
          display: flex;
          justify-content: space-between;
          font-size: 0.88rem;
          color: #4b5563;
          margin-bottom: 4px;
        }
        .item-bullets {
          padding-left: 18px;
          font-size: 0.88rem;
          color: #374151;
          margin-bottom: 0;
        }
        .item-bullets li {
          margin-bottom: 3px;
        }
        .item-description {
          font-size: 0.88rem;
          color: #374151;
          line-height: 1.5;
        }
        
        .skills-line {
          font-size: 0.88rem;
          color: #374151;
          margin-bottom: 5px;
          line-height: 1.5;
        }
        
        /* Print media stylesheet */
        @media print {
          body * {
            visibility: hidden;
          }
          .resume-print-area, .resume-print-area * {
            visibility: visible;
          }
          .resume-print-area {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            padding: 0;
            margin: 0;
            border-radius: 0;
            box-shadow: none;
            overflow: visible;
          }
          .resume-modal-overlay {
            position: absolute;
            background: transparent;
            backdrop-filter: none;
            padding: 0;
            margin: 0;
            width: 100%;
            height: auto;
            overflow: visible;
          }
          .resume-modal-content {
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
            padding: 0;
            margin: 0;
            width: 100%;
            height: auto;
            overflow: visible;
          }
          .modal-header {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
};
