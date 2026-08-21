import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioData, type ProjectIdea } from '../data/portfolioData';
import { Lightbulb, Users, ArrowRight, Sparkles, MessageSquareShare } from 'lucide-react';

export const IdeasLab: React.FC = () => {
  const { ideas, email } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(ideas.map((idea) => idea.category)))];

  const filteredIdeas = activeCategory === 'All'
    ? ideas
    : ideas.filter((idea: ProjectIdea) => idea.category === activeCategory);

  const getStatusColor = (status: ProjectIdea['status']) => {
    switch (status) {
      case 'Open to Collaborators':
        return { bg: 'rgba(16, 185, 129, 0.12)', border: 'rgba(16, 185, 129, 0.35)', text: '#10b981' };
      case 'Prototyping':
        return { bg: 'rgba(6, 182, 212, 0.12)', border: 'rgba(6, 182, 212, 0.35)', text: '#06b6d4' };
      case 'Researching':
        return { bg: 'rgba(245, 158, 11, 0.12)', border: 'rgba(245, 158, 11, 0.35)', text: '#f59e0b' };
      case 'Exploring':
      default:
        return { bg: 'rgba(139, 92, 246, 0.12)', border: 'rgba(139, 92, 246, 0.35)', text: '#8b5cf6' };
    }
  };

  return (
    <section id="ideas" className="ideas-section">
      <div className="section-header">
        <span className="section-tag">
          <Lightbulb size={13} />
          <span>Ideas Open For Collaboration</span>
        </span>
        <h2 className="gradient-text">Ideas I Want To Build</h2>
        <p>I have a few product and engineering ideas in mind. Each one has a short direction, and interested builders can connect with me to discuss, refine, or collaborate.</p>
      </div>

      {/* Prominent Open Collaboration Banner */}
      <div className="glass-card collab-banner">
        <div className="collab-icon-box">
          <Users size={24} className="collab-icon" />
        </div>
        <div className="collab-text">
          <h3>Open for collaborations</h3>
          <p>
            If any idea below feels interesting, I would love to hear your perspective. You can share suggestions, help shape the scope, or team up with me to turn it into a real project.
          </p>
        </div>
        <Link to="/contact" className="btn-primary collab-btn">
          <span>Connect With Me</span>
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
          const mailtoLink = `mailto:${email}?subject=${encodeURIComponent(`Collaboration on: ${idea.title}`)}&body=${encodeURIComponent(`Hi Navadeep,\n\nI saw your idea "${idea.title}" on your portfolio and would like to share some insights / discuss collaborating on it.\n\n`)}`;

          return (
            <div key={idea.id} className="glass-card idea-card">
              {/* Header: Category + Status */}
              <div className="idea-header">
                <span className="idea-category">{idea.category}</span>
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

              {/* Title & Tagline */}
              <div className="idea-content">
                <h3 className="idea-title">{idea.title}</h3>
                <p className="idea-tagline">{idea.tagline}</p>
                <p className="idea-description">{idea.description}</p>

                {idea.proposedArchitecture && (
                  <div className="idea-stack">
                    {idea.proposedArchitecture}
                  </div>
                )}

                {idea.lookingFor && (
                  <div className="idea-meta-block looking-for">
                    <div className="meta-block-title">
                      <Sparkles size={14} className="meta-icon-gold" />
                      <span>Collaboration Direction</span>
                    </div>
                    <p className="meta-block-body">{idea.lookingFor}</p>
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
                  title="Send an email to discuss this idea"
                >
                  <MessageSquareShare size={15} />
                  <span>Discuss Collaboration</span>
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

        /* Collab Banner */
        .collab-banner {
          display: flex;
          align-items: center;
          gap: 22px;
          padding: 24px 30px;
          border-color: rgba(6, 182, 212, 0.3);
          background: linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(139, 92, 246, 0.08) 100%);
        }
        .collab-icon-box {
          padding: 14px;
          border-radius: 14px;
          background: rgba(6, 182, 212, 0.12);
          border: 1px solid rgba(6, 182, 212, 0.25);
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }
        .collab-text {
          flex-grow: 1;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .collab-text h3 {
          font-size: 1.25rem;
          color: var(--text-primary);
        }
        .collab-text p {
          color: var(--text-secondary);
          font-size: 0.94rem;
          line-height: 1.5;
        }
        .collab-btn {
          flex-shrink: 0;
          white-space: nowrap;
        }
        @media (max-width: 900px) {
          .collab-banner {
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
          padding: 6px 16px;
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
          box-shadow: 0 0 14px var(--accent-purple-glow);
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
          min-height: 340px;
          gap: 20px;
          background: var(--bg-card);
        }
        .idea-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
        }
        .idea-category {
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 3px 10px;
          border-radius: 6px;
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
          gap: 10px;
          flex-grow: 1;
        }
        .idea-title {
          font-size: 1.3rem;
          color: var(--text-primary);
          line-height: 1.3;
        }
        .idea-tagline {
          font-size: 0.92rem;
          color: var(--accent-cyan);
          font-weight: 500;
        }
        .idea-description {
          font-size: 0.92rem;
          color: var(--text-secondary);
          line-height: 1.6;
        }
        .idea-stack {
          display: inline-flex;
          width: fit-content;
          max-width: 100%;
          color: var(--accent-cyan);
          background: rgba(6, 182, 212, 0.08);
          border: 1px solid rgba(6, 182, 212, 0.18);
          border-radius: 6px;
          padding: 5px 10px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          line-height: 1.4;
        }

        .idea-meta-block {
          background: rgba(0, 0, 0, 0.25);
          border: 1px solid rgba(255, 255, 255, 0.04);
          border-radius: 8px;
          padding: 10px 12px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .meta-block-title {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.78rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--text-muted);
        }
        .meta-icon {
          color: var(--accent-purple);
        }
        .meta-icon-gold {
          color: #fbbf24;
        }
        .meta-block-body {
          font-size: 0.86rem;
          color: var(--text-secondary);
          line-height: 1.45;
        }

        .idea-footer {
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-top: 6px;
        }
        .idea-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .tag-pill {
          font-size: 0.76rem;
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
          background: rgba(139, 92, 246, 0.08);
          border: 1px solid rgba(139, 92, 246, 0.25);
          color: var(--text-primary);
          padding: 9px 14px;
          border-radius: 8px;
          font-size: 0.86rem;
          font-family: var(--font-display);
          font-weight: 500;
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .idea-discuss-btn:hover {
          background: rgba(139, 92, 246, 0.2);
          border-color: var(--accent-purple);
          color: #fff;
          box-shadow: 0 0 14px var(--accent-purple-glow);
        }
        .ideas-section::after {
          content: "";
          display: block;
          width: 100%;
          max-width: 680px;
          margin: 6px auto 0;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(6, 182, 212, 0.35), transparent);
        }
      `}</style>
    </section>
  );
};
