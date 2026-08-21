import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { ParticleMesh } from './ParticleMesh';
import { Github, Linkedin, Award, ArrowDown, FileText, Copy, Check, GraduationCap, Code2, Trophy } from 'lucide-react';

interface HeroProps {
  onOpenResume: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenResume }) => {
  const { name, roles, subTitle, githubUrl, linkedinUrl, leetcodeUrl, email } = portfolioData;

  // Typewriter effect state
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  useEffect(() => {
    const fullRole = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!isDeleting && currentText === fullRole) {
        // Pause at full word
        setTimeout(() => setIsDeleting(true), 1800);
      } else if (isDeleting && currentText === '') {
        setIsDeleting(false);
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      } else {
        const nextChar = isDeleting
          ? fullRole.substring(0, currentText.length - 1)
          : fullRole.substring(0, currentText.length + 1);
        setCurrentText(nextChar);
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, currentRoleIndex, roles]);

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section id="hero" className="hero-section">
      {/* 3D Interactive Particle Sphere Background */}
      <ParticleMesh />

      <div className="hero-content">
        {/* Availability Badge */}
        <div className="badge-container">
          <div className="availability-badge">
            <span className="live-status-dot"></span>
            <span>Open to Software Roles & Internships</span>
          </div>
        </div>

        {/* Hero Main Heading with Typewriter */}
        <div className="hero-heading-group">
          <p className="hero-greeting">Hello World, I'm</p>
          <h1 className="hero-name">
            <span className="gradient-text">{name}</span>
          </h1>
          <div className="hero-role-wrapper">
            <span className="role-prefix">&gt; </span>
            <span className="hero-role-text">{currentText}</span>
            <span className="typewriter-cursor">|</span>
          </div>
        </div>

        <p className="hero-description">{subTitle}</p>

        {/* Quick Highlights Bar */}
        <div className="hero-highlights">
          <div className="highlight-pill">
            <GraduationCap size={16} className="pill-icon purple" />
            <span>NIT Andhra Pradesh (CSE '28)</span>
          </div>
          <div className="highlight-pill">
            <Trophy size={16} className="pill-icon cyan" />
            <span>AIR 14,707 JEE Main</span>
          </div>
          <div className="highlight-pill">
            <Code2 size={16} className="pill-icon gold" />
            <span>177+ LeetCode Solved</span>
          </div>
        </div>

        {/* Actions Button Group */}
        <div className="hero-actions">
          <Link to="/projects" className="btn-primary">
            <span>Explore Projects</span>
            <ArrowDown size={18} />
          </Link>

          <Link to="/contact" className="btn-secondary">
            <span>Get In Touch</span>
          </Link>

          <button 
            onClick={handleCopyEmail} 
            className="btn-copy-email"
            title="Copy email to clipboard"
          >
            {copiedEmail ? (
              <>
                <Check size={16} className="text-emerald" />
                <span>Email Copied!</span>
              </>
            ) : (
              <>
                <Copy size={16} />
                <span>Copy Email</span>
              </>
            )}
          </button>
        </div>

        {/* Social Links Bar */}
        <div className="social-links-bar">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn github"
            title="GitHub Profile"
          >
            <Github size={20} />
            <span className="social-label">GitHub</span>
          </a>
          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn linkedin"
            title="LinkedIn Profile"
          >
            <Linkedin size={20} />
            <span className="social-label">LinkedIn</span>
          </a>
          <a
            href={leetcodeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon-btn leetcode"
            title="LeetCode Profile"
          >
            <Award size={20} />
            <span className="social-label">LeetCode</span>
          </a>
          <button
            onClick={onOpenResume}
            className="social-icon-btn resume"
            title="View Resume"
          >
            <FileText size={20} />
            <span className="social-label">Resume</span>
          </button>
        </div>
      </div>

      {/* Scroll Down Mouse Indicator */}
      <div className="scroll-indicator">
        <Link to="/about" aria-label="Go to About Page">
          <div className="mouse">
            <div className="wheel"></div>
          </div>
          <span className="scroll-text">View About</span>
        </Link>
      </div>

      <style>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          padding-top: 130px;
          padding-bottom: 80px;
          overflow: hidden;
        }
        .hero-content {
          position: relative;
          z-index: 2;
          max-width: 850px;
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .badge-container {
          display: flex;
          align-items: center;
        }
        .availability-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: var(--accent-cyan);
          padding: 6px 16px;
          border-radius: 999px;
          font-size: 0.86rem;
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: 0.03em;
          box-shadow: 0 0 20px rgba(6, 182, 212, 0.12);
        }
        .live-status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          box-shadow: 0 0 10px #10b981;
          animation: blink 2s infinite ease-in-out;
        }
        @keyframes blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.85); }
        }
        .hero-heading-group {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .hero-greeting {
          font-family: var(--font-mono);
          font-size: 1.1rem;
          color: var(--accent-purple);
          letter-spacing: 0.05em;
        }
        .hero-name {
          font-size: 4.2rem;
          line-height: 1.08;
          color: var(--text-primary);
          font-weight: 800;
          letter-spacing: -0.03em;
        }
        .hero-role-wrapper {
          display: flex;
          align-items: center;
          font-size: 1.9rem;
          font-family: var(--font-mono);
          font-weight: 600;
          color: var(--accent-cyan);
          min-height: 48px;
        }
        .role-prefix {
          color: var(--accent-pink);
          margin-right: 6px;
        }
        .typewriter-cursor {
          color: var(--accent-cyan);
          animation: blink-cursor 0.9s infinite;
          margin-left: 2px;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        .hero-description {
          font-size: 1.18rem;
          color: var(--text-secondary);
          line-height: 1.65;
          max-width: 680px;
        }

        /* Highlights row */
        .hero-highlights {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 4px;
        }
        .highlight-pill {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 6px 14px;
          border-radius: 8px;
          font-size: 0.86rem;
          font-family: var(--font-display);
          color: var(--text-secondary);
          backdrop-filter: blur(8px);
        }
        .pill-icon.purple { color: var(--accent-purple); }
        .pill-icon.cyan { color: var(--accent-cyan); }
        .pill-icon.gold { color: #fbbf24; }

        /* Actions */
        .hero-actions {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 14px;
          margin-top: 10px;
        }
        .btn-copy-email {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px dashed var(--glass-border);
          color: var(--text-secondary);
          padding: 13px 20px;
          border-radius: 999px;
          font-family: var(--font-display);
          font-size: 0.92rem;
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .btn-copy-email:hover {
          border-color: var(--accent-cyan);
          color: #fff;
          background: rgba(6, 182, 212, 0.08);
        }
        .text-emerald {
          color: #10b981 !important;
        }

        /* Social Icons */
        .social-links-bar {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
          margin-top: 10px;
        }
        .social-icon-btn {
          color: var(--text-secondary);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 9px 16px;
          border-radius: 10px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          font-family: var(--font-display);
          font-size: 0.88rem;
          font-weight: 500;
          transition: var(--transition-smooth);
          cursor: pointer;
        }
        .social-icon-btn:hover {
          color: #fff;
          transform: translateY(-3px);
        }
        .social-icon-btn.github:hover {
          border-color: #fff;
          box-shadow: 0 0 16px rgba(255, 255, 255, 0.25);
        }
        .social-icon-btn.linkedin:hover {
          border-color: #0077b5;
          box-shadow: 0 0 16px rgba(0, 119, 181, 0.4);
        }
        .social-icon-btn.leetcode:hover {
          border-color: #ffa116;
          box-shadow: 0 0 16px rgba(255, 161, 22, 0.4);
        }
        .social-icon-btn.resume:hover {
          border-color: var(--accent-purple);
          box-shadow: 0 0 16px var(--accent-purple-glow);
        }

        /* Scroll Mouse */
        .scroll-indicator {
          position: absolute;
          bottom: 25px;
          left: 50%;
          transform: translateX(-50%);
          z-index: 2;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .scroll-indicator a {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 8px;
          text-decoration: none;
          color: var(--text-muted);
          transition: var(--transition-fast);
        }
        .scroll-indicator a:hover {
          color: var(--accent-cyan);
        }
        .scroll-text {
          font-family: var(--font-mono);
          font-size: 0.72rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
        }
        .mouse {
          width: 24px;
          height: 38px;
          border: 2px solid var(--text-muted);
          border-radius: 14px;
          position: relative;
        }
        .wheel {
          width: 4px;
          height: 7px;
          background-color: var(--accent-cyan);
          border-radius: 2px;
          position: absolute;
          top: 6px;
          left: 50%;
          transform: translateX(-50%);
          animation: scroll-wheel 1.6s ease-out infinite;
        }
        @keyframes scroll-wheel {
          0% {
            opacity: 1;
            transform: translate(-50%, 0);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, 14px);
          }
        }

        @media (max-width: 768px) {
          .hero-name {
            font-size: 3rem;
          }
          .hero-role-wrapper {
            font-size: 1.4rem;
            min-height: 40px;
          }
          .hero-actions {
            flex-direction: column;
            align-items: stretch;
          }
          .hero-actions a, .hero-actions button {
            justify-content: center;
          }
          .social-links-bar {
            justify-content: flex-start;
          }
          .scroll-indicator {
            display: none;
          }
        }
      `}</style>
    </section>
  );
};
