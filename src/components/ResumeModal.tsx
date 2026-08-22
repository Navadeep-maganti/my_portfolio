import React from 'react';
import { X, Printer } from 'lucide-react';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const pdfUrl = '/Navadeep_Maganti_Resume.pdf';

  const handlePrint = () => {
    window.open(pdfUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="resume-modal-overlay" onClick={onClose}>
      <div className="resume-modal-content glass-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title-group">
            <h2>Professional Resume</h2>
            <span className="modal-subtitle">Uploaded PDF Preview</span>
          </div>
          <div className="modal-buttons">
            <button onClick={handlePrint} className="btn-primary print-btn" title="Open PDF in new tab / print">
              <Printer size={16} />
              <span>Open / Print PDF</span>
            </button>
            <button onClick={onClose} className="close-btn" title="Close Modal">
              <X size={22} />
            </button>
          </div>
        </div>

        <div className="resume-pdf-shell">
          <iframe
            src={pdfUrl}
            className="resume-pdf-frame"
            title="Navadeep Maganti Resume PDF"
            loading="lazy"
          />
        </div>
      </div>

      <style>{`
        .resume-modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.78);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          z-index: 1000;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 18px;
        }

        .resume-modal-content {
          width: min(94vw, 980px);
          max-width: 980px;
          height: min(92vh, 980px);
          display: flex;
          flex-direction: column;
          gap: 16px;
          background: var(--bg-secondary) !important;
          border-color: var(--glass-border-hover) !important;
          overflow: hidden;
          padding: 20px;
          box-sizing: border-box;
        }

        .modal-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 12px;
        }

        .modal-title-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .modal-title-group h2 {
          margin: 0;
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
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .close-btn:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.12);
        }

        .resume-pdf-shell {
          flex: 1;
          min-height: 0;
          background: #ffffff;
          border: 1px solid rgba(0, 0, 0, 0.08);
          border-radius: 10px;
          overflow: hidden;
        }

        .resume-pdf-frame {
          width: 100%;
          height: 100%;
          border: 0;
          min-height: 700px;
          background: #ffffff;
        }

        @media (max-width: 640px) {
          .resume-modal-content {
            width: 100%;
            max-width: 100%;
            height: 100vh;
            padding: 12px;
            border-radius: 16px;
          }

          .modal-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 10px;
          }

          .modal-buttons {
            width: 100%;
            justify-content: space-between;
          }

          .print-btn {
            flex: 1;
            justify-content: center;
          }

          .resume-pdf-frame {
            min-height: 540px;
          }
        }
      `}</style>
    </div>
  );
};
