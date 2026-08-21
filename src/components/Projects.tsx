import React, { useState } from 'react';
import { portfolioData, type Project } from '../data/portfolioData';
import { Github, ExternalLink, Code2, FolderGit2, Sparkles, CheckCircle2 } from 'lucide-react';

export const Projects: React.FC = () => {
  const { projects } = portfolioData;
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Full-Stack', 'Mobile', 'Systems & APIs'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p: Project) => p.category === selectedCategory);

  return (
    <section id="projects" className="projects-section">
      <div className="section-header">
        <span className="section-tag">
          <FolderGit2 size={13} />
          <span>Featured Works</span>
        </span>
        <h2 className="gradient-text-cyan">Engineered Projects</h2>
        <p>A curated showcase of scalable web applications, mobile tools, and algorithmic systems I've designed and developed.</p>

        {/* Category Filters */}
        <div className="project-filters">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <div className="projects-grid">
        {filteredProjects.map((project, index) => (
          <div
            key={index}
            className={`glass-card project-card ${project.featured ? 'featured' : ''}`}
          >
            {/* Top Bar: Icon + Category Badge + External Links */}
            <div className="project-top-bar">
              <div className="project-icon-group">
                <div className="project-icon-wrapper">
                  <Code2 size={20} className="project-icon" />
                </div>
                <span className="project-category-badge">{project.category}</span>
              </div>

              <div className="project-links">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="icon-link github-link"
                  title="Source Code on GitHub"
                >
                  <Github size={18} />
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="icon-link demo-link"
                    title="Live Demonstration"
                  >
                    <ExternalLink size={18} />
                  </a>
                )}
              </div>
            </div>

            {/* Content Area */}
            <div className="project-body">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-description">{project.description}</p>

              {/* Highlights bullets */}
              {project.highlights && project.highlights.length > 0 && (
                <ul className="project-highlights">
                  {project.highlights.map((highlight, idx) => (
                    <li key={idx}>
                      <CheckCircle2 size={13} className="highlight-icon" />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Tags footer */}
            <div className="project-footer">
              <div className="project-tags">
                {project.tags.map((tag) => (
                  <span key={tag} className="tag-pill">{tag}</span>
                ))}
              </div>
            </div>

            {project.featured && (
              <div className="featured-banner">
                <Sparkles size={11} />
                <span>Featured</span>
              </div>
            )}
          </div>
        ))}
      </div>

      <style>{`
        .projects-section {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .project-filters {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 10px;
          margin-top: 15px;
        }
        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 7px 18px;
          border-radius: 999px;
          font-size: 0.88rem;
          font-family: var(--font-display);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-smooth);
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--accent-cyan);
          color: #050508;
          border-color: var(--accent-cyan);
          font-weight: 600;
          box-shadow: 0 0 16px var(--accent-cyan-glow);
        }

        .projects-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
          gap: 30px;
        }
        @media (max-width: 768px) {
          .projects-grid {
            grid-template-columns: 1fr;
          }
        }
        .project-card {
          position: relative;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          height: 100%;
          min-height: 320px;
          gap: 20px;
          overflow: hidden;
          background: rgba(12, 12, 22, 0.7);
        }
        .project-card.featured {
          border-color: rgba(139, 92, 246, 0.25);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.35), 0 0 15px rgba(139, 92, 246, 0.08);
        }
        .project-card.featured:hover {
          border-color: rgba(139, 92, 246, 0.5);
          box-shadow: 0 12px 35px rgba(0, 0, 0, 0.45), 0 0 25px rgba(139, 92, 246, 0.2);
        }
        .project-top-bar {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .project-icon-group {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .project-icon-wrapper {
          padding: 10px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          border-radius: 12px;
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .project-card.featured .project-icon-wrapper {
          color: var(--accent-purple);
          border-color: rgba(139, 92, 246, 0.3);
        }
        .project-category-badge {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          color: var(--text-muted);
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          padding: 3px 10px;
          border-radius: 6px;
        }
        .project-links {
          display: flex;
          gap: 10px;
        }
        .icon-link {
          color: var(--text-secondary);
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 8px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          transition: var(--transition-fast);
        }
        .icon-link:hover {
          color: #fff;
          background: rgba(255, 255, 255, 0.08);
          border-color: var(--accent-cyan);
          transform: translateY(-2px);
        }
        .project-body {
          display: flex;
          flex-direction: column;
          gap: 12px;
          flex-grow: 1;
        }
        .project-title {
          font-size: 1.4rem;
          font-family: var(--font-display);
          color: var(--text-primary);
          line-height: 1.3;
        }
        .project-description {
          color: var(--text-secondary);
          font-size: 0.95rem;
          line-height: 1.6;
        }
        .project-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
          background: rgba(0, 0, 0, 0.2);
          padding: 12px;
          border-radius: 8px;
          border: 1px solid rgba(255, 255, 255, 0.03);
        }
        .project-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.85rem;
          color: var(--text-secondary);
        }
        .highlight-icon {
          color: var(--accent-cyan);
          flex-shrink: 0;
          margin-top: 2px;
        }
        .project-footer {
          margin-top: 5px;
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .tag-pill {
          font-size: 0.78rem;
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--accent-cyan);
          padding: 4px 10px;
          border-radius: 6px;
          font-weight: 500;
        }
        .featured-banner {
          position: absolute;
          top: 0;
          right: 0;
          background: linear-gradient(135deg, var(--accent-purple), var(--accent-pink));
          color: white;
          font-size: 0.72rem;
          font-weight: 700;
          font-family: var(--font-display);
          padding: 4px 14px;
          border-bottom-left-radius: 12px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          display: flex;
          align-items: center;
          gap: 4px;
        }
      `}</style>
    </section>
  );
};
