import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData, type ProjectIdea } from '../data/portfolioData';
import { 
  Lightbulb, 
  ArrowRight, 
  Sparkles, 
  MessageSquareShare, 
  Lock, 
  ShieldCheck, 
  Target, 
  TrendingUp,
  Layers
} from 'lucide-react';

export const IdeasLab: React.FC = () => {
  const { ideas, email } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ideas.map((idea) => idea.category)))];

  const filteredIdeas = activeCategory === 'All'
    ? ideas
    : ideas.filter((idea: ProjectIdea) => idea.category === activeCategory);

  const getStatusColor = (status: ProjectIdea['status']) => {
    switch (status) {
      case 'Stealth Concept':
        return { bg: 'rgba(168, 85, 247, 0.12)', border: 'rgba(168, 85, 247, 0.4)', text: '#c084fc', icon: '🔒' };
      case 'Active Research':
        return { bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.4)', text: '#22d3ee', icon: '⚡' };
      case 'Open for Discussion':
        return { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.4)', text: '#34d399', icon: '🌱' };
      case 'Prototyping':
      default:
        return { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.4)', text: '#fbbf24', icon: '🔬' };
    }
  };

  return (
    <section id="ideas" className="ideas-section">
      <div className="section-header">
        <span className="section-tag">
          <Lightbulb size={13} />
          <span>Concepts & Research Initiatives</span>
        </span>
        <h2 className="gradient-text">Problem Spaces & Sector Opportunities</h2>
        <p>
          High-level overview of real-world domains and impact areas I am actively investigating. 
          To protect intellectual property, proprietary system architectures and deep technical implementations are kept private and shared selectively with mentors, researchers, and potential collaborators.
        </p>
      </div>

      {/* Stealth & IP Protection Notice Banner */}
      <div className="glass-card stealth-banner">
        <div className="stealth-banner-icon">
          <ShieldCheck size={26} />
        </div>
        <div className="stealth-banner-text">
          <div className="stealth-banner-title">
            <span>Intellectual Property & Stealth R&D Notice</span>
            <span className="stealth-badge">Protected Concepts</span>
          </div>
          <p>
            The cards below outline the <strong>domain challenges</strong> and <strong>projected real-world impact</strong> of my ideas. 
            Full technical specifications, data pipelines, and system architectures remain proprietary. If you are a founder, researcher, or mentor interested in exploring one of these sectors together, let's connect.
          </p>
        </div>
        <Link to="/contact" className="btn-primary collab-btn">
          <span>Discuss Under NDA</span>
          <ArrowRight size={16} />
        </Link>
      </div>

      {/* Category Filter Pills */}
      <div className="ideas-filters">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ideas Grid */}
      <div className="ideas-grid">
        {filteredIdeas.map((idea) => {
          const statusStyle = getStatusColor(idea.status);
          const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(`Sector Inquiry: ${idea.title}`)}&body=${encodeURIComponent(`Hi Navadeep,\n\nI came across your concept "${idea.title}" in the ${idea.sector} domain on your portfolio.\n\nI'd like to discuss the problem space, share insights, or explore collaboration under mutual alignment.\n\nBest regards,`)}`;

          return (
            <div key={idea.id} className="glass-card idea-card">
              {/* Header: Sector Tag + Status Badge */}
              <div className="idea-header">
                <span className="idea-sector-tag">
                  <Layers size={13} className="sector-icon" />
                  <span>{idea.sector}</span>
                </span>
                <span 
                  className="idea-status-pill"
                  style={{
                    background: statusStyle.bg,
                    borderColor: statusStyle.border,
                    color: statusStyle.text
                  }}
                >
                  <span className="status-indicator-dot" style={{ background: statusStyle.text }}></span>
                  <span>{idea.status}</span>
                </span>
              </div>

              {/* Title & Vision Tagline */}
              <div className="idea-content">
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-tagline">{idea.tagline}</p>

                {/* Problem Space Block */}
                <div className="idea-meta-block problem-block">
                  <div className="meta-block-title">
                    <Target size={14} className="meta-icon-cyan" />
                    <span>Industry Challenge & Problem Space</span>
                  </div>
                  <p className="meta-block-body">{idea.problemSpace}</p>
                </div>

                {/* Projected Impact Block */}
                <div className="idea-meta-block impact-block">
                  <div className="meta-block-title">
                    <TrendingUp size={14} className="meta-icon-emerald" />
                    <span>Projected Impact & Value</span>
                  </div>
                  <p className="meta-block-body impact-text">{idea.impact}</p>
                </div>

                {/* Broad Domain Tags */}
                {idea.focusDomains && idea.focusDomains.length > 0 && (
                  <div className="focus-domains-wrapper">
                    <span className="focus-label">Sector Focus:</span>
                    <div className="focus-chips">
                      {idea.focusDomains.map((domain) => (
                        <span key={domain} className="focus-chip">
                          {domain}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Confidential Notice Pill */}
                <div className="idea-stealth-notice">
                  <Lock size={12} className="lock-icon" />
                  <span>Concept Blueprint & Architecture: <strong>Private (Stealth Mode)</strong></span>
                </div>

                {/* Collaboration Scope */}
                {idea.collaborationScope && (
                  <div className="idea-meta-block collab-scope-block">
                    <div className="meta-block-title">
                      <Sparkles size={13} className="meta-icon-gold" />
                      <span>Collaboration Scope</span>
                    </div>
                    <p className="meta-block-body">{idea.collaborationScope}</p>
                  </div>
                )}
              </div>

              {/* Tags & Action Footer */}
              <div className="idea-footer">
                <div className="idea-tags">
                  {idea.tags.map((tag) => (
                    <span key={tag} className="tag-pill">{tag}</span>
                  ))}
                </div>

                <a 
                  href={mailtoLink}
                  className="idea-discuss-btn"
                  title="Send an email to discuss this sector"
                >
                  <MessageSquareShare size={15} />
                  <span>Connect On This Sector</span>
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        .ideas-section {
          display: flex;
          flex-direction: column;
          gap: 35px;
        }

        /* Stealth Banner */
        .stealth-banner {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 24px 30px;
          border-color: rgba(168, 85, 247, 0.3);
          background: linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(6, 182, 212, 0.06) 100%);
          border-radius: 16px;
        }
        .stealth-banner-icon {
          padding: 14px;
          border-radius: 14px;
          background: rgba(168, 85, 247, 0.12);
          border: 1px solid rgba(168, 85, 247, 0.3);
          color: #c084fc;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .stealth-banner-text {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .stealth-banner-title {
          display: flex;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
          font-size: 1.15rem;
          font-weight: 600;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .stealth-badge {
          font-size: 0.72rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          background: rgba(168, 85, 247, 0.2);
          color: #e9d5ff;
          border: 1px solid rgba(168, 85, 247, 0.4);
          padding: 2px 8px;
          border-radius: 4px;
        }
        .stealth-banner-text p {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.55;
          margin: 0;
        }
        .stealth-banner-text strong {
          color: var(--text-primary);
        }
        .collab-btn {
          flex-shrink: 0;
          white-space: nowrap;
        }
        @media (max-width: 900px) {
          .stealth-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 16px;
            padding: 20px;
          }
          .collab-btn {
            width: 100%;
            justify-content: center;
          }
        }

        /* Filters */
        .ideas-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
        }
        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 7px 18px;
          border-radius: 999px;
          font-size: 0.86rem;
          font-family: var(--font-display);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--accent-purple);
          color: #fff;
          border-color: var(--accent-purple);
          box-shadow: 0 0 16px var(--accent-purple-glow);
        }

        /* Ideas Grid */
        .ideas-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 26px;
        }
        @media (max-width: 768px) {
          .ideas-grid {
            grid-template-columns: 1fr;
          }
        }
        .idea-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 400px;
          gap: 20px;
          background: var(--bg-card);
          border: 1px solid var(--glass-border);
          padding: 24px;
          border-radius: 16px;
          transition: transform 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .idea-card:hover {
          transform: translateY(-4px);
          border-color: rgba(6, 182, 212, 0.35);
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.35);
        }
        .idea-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          flex-wrap: wrap;
        }
        .idea-sector-tag {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.25);
          padding: 4px 10px;
          border-radius: 6px;
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .sector-icon {
          color: var(--accent-cyan);
        }
        .idea-status-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          border: 1px solid;
          padding: 3px 12px;
          border-radius: 999px;
          font-size: 0.78rem;
          font-family: var(--font-display);
          font-weight: 600;
          letter-spacing: 0.02em;
        }
        .status-indicator-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
        }

        .idea-content {
          display: flex;
          flex-direction: column;
          gap: 14px;
          flex-grow: 1;
        }
        .idea-title {
          font-size: 1.3rem;
          color: var(--text-primary);
          line-height: 1.35;
          font-family: var(--font-display);
          font-weight: 700;
        }
        .idea-tagline {
          font-size: 0.92rem;
          color: var(--accent-cyan);
          font-weight: 500;
          line-height: 1.45;
        }

        .idea-meta-block {
          background: rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 5px;
        }
        .problem-block {
          border-left: 3px solid rgba(6, 182, 212, 0.6);
        }
        .impact-block {
          background: linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(0, 0, 0, 0.3) 100%);
          border-left: 3px solid rgba(16, 185, 129, 0.7);
        }
        .collab-scope-block {
          background: rgba(251, 191, 36, 0.04);
          border-left: 3px solid rgba(251, 191, 36, 0.5);
        }

        .meta-block-title {
          display: flex;
          align-items: center;
          gap: 7px;
          font-size: 0.75rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--text-muted);
        }
        .meta-icon-cyan {
          color: var(--accent-cyan);
        }
        .meta-icon-emerald {
          color: #34d399;
        }
        .meta-icon-gold {
          color: #fbbf24;
        }
        .meta-block-body {
          font-size: 0.88rem;
          color: var(--text-secondary);
          line-height: 1.5;
          margin: 0;
        }
        .impact-text {
          color: #e2e8f0;
          font-weight: 500;
        }

        .focus-domains-wrapper {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-wrap: wrap;
        }
        .focus-label {
          font-size: 0.76rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
          text-transform: uppercase;
          letter-spacing: 0.04em;
        }
        .focus-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .focus-chip {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: var(--text-secondary);
          padding: 2px 8px;
          border-radius: 4px;
        }

        .idea-stealth-notice {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(168, 85, 247, 0.07);
          border: 1px dashed rgba(168, 85, 247, 0.35);
          color: #d8b4fe;
          border-radius: 8px;
          padding: 8px 12px;
          font-size: 0.78rem;
          font-family: var(--font-mono);
        }
        .lock-icon {
          flex-shrink: 0;
          color: #c084fc;
        }
        .idea-stealth-notice strong {
          color: #f3e8ff;
        }

        .idea-footer {
          display: flex;
          flex-direction: column;
          gap: 14px;
          margin-top: 6px;
        }
        .idea-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tag-pill {
          font-size: 0.74rem;
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .idea-discuss-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.12) 0%, rgba(139, 92, 246, 0.12) 100%);
          border: 1px solid rgba(6, 182, 212, 0.3);
          color: var(--text-primary);
          padding: 10px 16px;
          border-radius: 10px;
          font-size: 0.88rem;
          font-family: var(--font-display);
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .idea-discuss-btn:hover {
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.25) 0%, rgba(139, 92, 246, 0.25) 100%);
          border-color: var(--accent-cyan);
          color: #fff;
          box-shadow: 0 0 16px rgba(6, 182, 212, 0.35);
          transform: translateY(-2px);
        }
        .ideas-section::after {
          content: "";
          display: block;
          width: 100%;
          max-width: 680px;
          margin: 10px auto 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.35), transparent);
        }
      `}</style>
    </section>
  );
};
