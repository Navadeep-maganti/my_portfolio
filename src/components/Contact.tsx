import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Mail, Send, Check, Phone, MapPin, Copy, MessageSquare, Briefcase, Users, Code2 } from 'lucide-react';

type ContactTopic = 'Opportunity' | 'Collaboration' | 'Project Discussion';

export const Contact: React.FC = () => {
  const { email, studentEmail, phone, location, status } = portfolioData;
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    topic: 'Collaboration' as ContactTopic,
    subject: 'Project Collaboration',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [copiedItem, setCopiedItem] = useState<string | null>(null);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(label);
    setTimeout(() => setCopiedItem(null), 2500);
  };

  const topicOptions: Array<{ label: ContactTopic; icon: React.ReactNode; subject: string }> = [
    { label: 'Collaboration', icon: <Users size={15} />, subject: 'Project Collaboration' },
    { label: 'Opportunity', icon: <Briefcase size={15} />, subject: 'Software Engineering Opportunity' },
    { label: 'Project Discussion', icon: <Code2 size={15} />, subject: 'Project Discussion' }
  ];

  const buildEmailBody = () => [
    `Hi Navadeep,`,
    '',
    formState.message.trim(),
    '',
    `Topic: ${formState.topic}`,
    `From: ${formState.name.trim()} (${formState.email.trim()})`
  ].join('\n');

  const generatedMessage = buildEmailBody();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = formState.subject.trim() || `${formState.topic} from ${formState.name.trim()}`;
    const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(generatedMessage)}`;
    window.location.href = mailtoLink;

    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormState({
        name: '',
        email: '',
        topic: 'Collaboration',
        subject: 'Project Collaboration',
        message: ''
      });
    }, 4000);
  };

  return (
    <section id="contact" className="contact-section">
      <div className="section-header">
        <span className="section-tag">
          <MessageSquare size={13} />
          <span>Get In Touch</span>
        </span>
        <h2 className="gradient-text">Let's Build Something Great</h2>
        <p>Whether you have a software engineering opportunity, collaborative project, or technical question, my inbox is always open.</p>
      </div>

      <div className="contact-grid">
        {/* Left Side: Contact Information & Quick Action Cards */}
        <div className="contact-info">
          {/* Availability Card */}
          <div className="glass-card status-card">
            <div className="status-header">
              <span className="status-live-indicator"></span>
              <h4>Current Availability</h4>
            </div>
            <p className="status-text">{status}</p>
            <div className="location-tag">
              <MapPin size={14} />
              <span>{location}</span>
            </div>
          </div>

          {/* Direct Email Card */}
          <div className="glass-card contact-item-card">
            <div className="contact-card-top">
              <div className="contact-icon-wrapper purple">
                <Mail size={20} />
              </div>
              <button 
                onClick={() => handleCopy(email, 'email')} 
                className="copy-chip-btn"
                title="Copy to clipboard"
              >
                {copiedItem === 'email' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{copiedItem === 'email' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="contact-details">
              <span className="contact-label">Primary Email</span>
              <a href={`mailto:${email}`} className="contact-value-link">{email}</a>
            </div>
          </div>

          {/* Student Email Card */}
          <div className="glass-card contact-item-card">
            <div className="contact-card-top">
              <div className="contact-icon-wrapper cyan">
                <Mail size={20} />
              </div>
              <button 
                onClick={() => handleCopy(studentEmail, 'studentEmail')} 
                className="copy-chip-btn"
                title="Copy to clipboard"
              >
                {copiedItem === 'studentEmail' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{copiedItem === 'studentEmail' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="contact-details">
              <span className="contact-label">Academic Email (NIT AP)</span>
              <a href={`mailto:${studentEmail}`} className="contact-value-link">{studentEmail}</a>
            </div>
          </div>

          {/* Phone Card */}
          <div className="glass-card contact-item-card">
            <div className="contact-card-top">
              <div className="contact-icon-wrapper emerald">
                <Phone size={20} />
              </div>
              <button 
                onClick={() => handleCopy(phone, 'phone')} 
                className="copy-chip-btn"
                title="Copy to clipboard"
              >
                {copiedItem === 'phone' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                <span>{copiedItem === 'phone' ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
            <div className="contact-details">
              <span className="contact-label">Direct Phone</span>
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className="contact-value-link">{phone}</a>
            </div>
          </div>
        </div>

        {/* Right Side: Interactive Message Form */}
        <div className="glass-card form-card">
          <div className="form-card-header">
            <h3>Compose a Quick Email</h3>
            <p>This prepares a clean email in your mail app. If the mail app does not open, copy the generated message below.</p>
          </div>
          
          <form onSubmit={handleSubmit} className="contact-form">
            <div className="topic-group" aria-label="Message topic">
              {topicOptions.map((topic) => (
                <button
                  key={topic.label}
                  type="button"
                  className={`topic-btn ${formState.topic === topic.label ? 'active' : ''}`}
                  onClick={() => setFormState({ ...formState, topic: topic.label, subject: topic.subject })}
                >
                  {topic.icon}
                  <span>{topic.label}</span>
                </button>
              ))}
            </div>

            <div className="form-row">
              <div className="input-group">
                <label htmlFor="name">Your Name</label>
                <input 
                  type="text" 
                  id="name" 
                  required 
                  value={formState.name}
                  onChange={e => setFormState({ ...formState, name: e.target.value })}
                  placeholder="Alex Mercer"
                />
              </div>

              <div className="input-group">
                <label htmlFor="email">Your Email</label>
                <input 
                  type="email" 
                  id="email" 
                  required 
                  value={formState.email}
                  onChange={e => setFormState({ ...formState, email: e.target.value })}
                  placeholder="alex@company.com"
                />
              </div>
            </div>

            <div className="input-group">
              <label htmlFor="subject">Subject</label>
              <input 
                type="text" 
                id="subject" 
                value={formState.subject}
                onChange={e => setFormState({ ...formState, subject: e.target.value })}
                placeholder="Software Engineering Internship / Project Collaboration"
              />
            </div>

            <div className="input-group">
              <label htmlFor="message">Your Message</label>
              <textarea 
                id="message" 
                required 
                rows={5}
                value={formState.message}
                onChange={e => setFormState({ ...formState, message: e.target.value })}
                placeholder="Hi Navadeep, I came across your portfolio and would like to discuss..."
              />
            </div>

            <button 
              type="submit" 
              className={`btn-primary submit-btn ${submitted ? 'success' : ''}`}
            >
              {submitted ? (
                <>
                  <Check size={18} />
                  <span>Opening Mail Client...</span>
                </>
              ) : (
                <>
                  <span>Send Message</span>
                  <Send size={18} />
                </>
              )}
            </button>

            <div className="message-preview">
              <div className="preview-header">
                <span>Generated email body</span>
                <button
                  type="button"
                  className="copy-chip-btn"
                  onClick={() => handleCopy(generatedMessage, 'generatedMessage')}
                  title="Copy generated message"
                >
                  {copiedItem === 'generatedMessage' ? <Check size={14} className="text-emerald" /> : <Copy size={14} />}
                  <span>{copiedItem === 'generatedMessage' ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre>{generatedMessage}</pre>
            </div>
          </form>
        </div>
      </div>

      <style>{`
        .contact-section {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 30px;
        }
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr;
          }
        }
        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        
        /* Status Card */
        .status-card {
          border-color: rgba(16, 185, 129, 0.25);
          background: rgba(16, 185, 129, 0.03);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .status-header {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .status-live-indicator {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 10px #10b981;
          animation: blink 2s infinite;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .status-header h4 {
          font-size: 0.95rem;
          color: #10b981;
          font-family: var(--font-display);
        }
        .status-text {
          font-size: 1.05rem;
          font-weight: 600;
          color: var(--text-primary);
        }
        .location-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.84rem;
          color: var(--text-muted);
          margin-top: 4px;
        }

        /* Contact item card */
        .contact-item-card {
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .contact-card-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .contact-icon-wrapper {
          padding: 8px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .contact-icon-wrapper.purple {
          background: rgba(139, 92, 246, 0.1);
          color: var(--accent-purple);
          border: 1px solid rgba(139, 92, 246, 0.2);
        }
        .contact-icon-wrapper.cyan {
          background: rgba(6, 182, 212, 0.1);
          color: var(--accent-cyan);
          border: 1px solid rgba(6, 182, 212, 0.2);
        }
        .contact-icon-wrapper.emerald {
          background: rgba(16, 185, 129, 0.1);
          color: #10b981;
          border: 1px solid rgba(16, 185, 129, 0.2);
        }
        .copy-chip-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 0.78rem;
          font-family: var(--font-mono);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .copy-chip-btn:hover {
          background: rgba(255, 255, 255, 0.08);
          color: var(--text-primary);
          border-color: var(--accent-cyan);
        }
        .text-emerald {
          color: #10b981 !important;
        }
        .contact-details {
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .contact-label {
          font-size: 0.78rem;
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          font-family: var(--font-mono);
        }
        .contact-value-link {
          font-family: var(--font-display);
          font-size: 1rem;
          font-weight: 600;
          color: var(--text-primary);
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .contact-value-link:hover {
          color: var(--accent-cyan);
        }

        /* Form Card */
        .form-card {
          padding: 35px;
          display: flex;
          flex-direction: column;
          gap: 25px;
        }
        .form-card-header h3 {
          font-size: 1.4rem;
          color: var(--text-primary);
          margin-bottom: 6px;
        }
        .form-card-header p {
          color: var(--text-secondary);
          font-size: 0.92rem;
        }
        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .topic-group {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        @media (max-width: 640px) {
          .topic-group {
            grid-template-columns: 1fr;
          }
        }
        .topic-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          min-height: 42px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 8px;
          color: var(--text-secondary);
          font-family: var(--font-display);
          font-size: 0.86rem;
          font-weight: 600;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .topic-btn:hover, .topic-btn.active {
          background: rgba(6, 182, 212, 0.1);
          border-color: rgba(6, 182, 212, 0.4);
          color: var(--text-primary);
        }
        .form-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        @media (max-width: 640px) {
          .form-row {
            grid-template-columns: 1fr;
          }
        }
        .input-group {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .input-group label {
          font-size: 0.86rem;
          font-weight: 500;
          color: var(--text-secondary);
          font-family: var(--font-display);
        }
        .input-group input, .input-group textarea {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          padding: 12px 16px;
          color: var(--text-primary);
          font-family: inherit;
          font-size: 0.94rem;
          transition: var(--transition-fast);
        }
        .input-group input:focus, .input-group textarea:focus {
          outline: none;
          border-color: var(--accent-purple);
          box-shadow: 0 0 12px var(--accent-purple-glow);
          background: rgba(0, 0, 0, 0.45);
        }
        .submit-btn {
          width: 100%;
          justify-content: center;
          padding: 14px;
          margin-top: 5px;
        }
        .submit-btn.success {
          background: linear-gradient(135deg, #10b981, #059669);
          box-shadow: 0 4px 20px rgba(16, 185, 129, 0.4);
        }
        .message-preview {
          background: rgba(0, 0, 0, 0.24);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .preview-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          color: var(--text-muted);
          font-family: var(--font-mono);
          font-size: 0.76rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }
        .message-preview pre {
          white-space: pre-wrap;
          word-break: break-word;
          color: var(--text-secondary);
          font-family: var(--font-body);
          font-size: 0.88rem;
          line-height: 1.5;
        }
      `}</style>
    </section>
  );
};
