import React, { useState } from 'react';
import { portfolioData } from '../data/portfolioData';
import { 
  Code2, 
  Smartphone, 
  Network, 
  Database, 
  Cpu, 
  GraduationCap, 
  Briefcase, 
  Trophy, 
  Users, 
  Calendar, 
  MapPin, 
  Sparkles,
  CheckCircle2
} from 'lucide-react';

const skillConfigs: Record<string, { icons?: string[]; lucideIcon?: React.ReactNode; color: string; glow: string }> = {
  "C++": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg"], 
    color: "#00599C", 
    glow: "rgba(0, 89, 156, 0.3)" 
  },
  "Java": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg"], 
    color: "#F89820", 
    glow: "rgba(248, 152, 32, 0.3)" 
  },
  "Python": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg"], 
    color: "#3776AB", 
    glow: "rgba(55, 118, 171, 0.3)" 
  },
  "JavaScript": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"], 
    color: "#F7DF1E", 
    glow: "rgba(247, 223, 30, 0.25)" 
  },
  "HTML5/CSS3": { 
    icons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"
    ], 
    color: "#E34F26", 
    glow: "rgba(227, 79, 38, 0.3)" 
  },
  "React.js": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"], 
    color: "#61DAFB", 
    glow: "rgba(97, 218, 251, 0.3)" 
  },
  "Flutter": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/flutter/flutter-original.svg"], 
    color: "#02569B", 
    glow: "rgba(2, 86, 155, 0.3)" 
  },
  "DOM Manipulation": { 
    lucideIcon: <Code2 size={22} />, 
    color: "#8b5cf6", 
    glow: "rgba(139, 92, 246, 0.3)" 
  },
  "Responsive UI": { 
    lucideIcon: <Smartphone size={22} />, 
    color: "#ec4899", 
    glow: "rgba(236, 72, 153, 0.3)" 
  },
  "Django": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/django/django-plain.svg"], 
    color: "#092E20", 
    glow: "rgba(9, 46, 32, 0.35)" 
  },
  "REST APIs": { 
    lucideIcon: <Network size={22} />, 
    color: "#06b6d4", 
    glow: "rgba(6, 182, 212, 0.3)" 
  },
  "DBMS": { 
    lucideIcon: <Database size={22} />, 
    color: "#336791", 
    glow: "rgba(51, 103, 145, 0.3)" 
  },
  "Operating Systems": { 
    lucideIcon: <Cpu size={22} />, 
    color: "#10b981", 
    glow: "rgba(16, 185, 129, 0.3)" 
  },
  "Git & GitHub": { 
    icons: [
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
      "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg"
    ], 
    color: "#F05032", 
    glow: "rgba(240, 80, 50, 0.3)" 
  },
  "Postman": { 
    icons: ["https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg"], 
    color: "#FF6C37", 
    glow: "rgba(255, 108, 55, 0.3)" 
  },
  "LeetCode": { 
    icons: ["https://cdn.simpleicons.org/leetcode/FFA116"], 
    color: "#FFA116", 
    glow: "rgba(255, 161, 22, 0.3)" 
  }
};

const renderSkillIcon = (skillName: string) => {
  const config = skillConfigs[skillName];
  if (!config) return <Code2 size={22} style={{ color: 'var(--accent-purple)' }} />;

  if (config.icons) {
    return (
      <div className="skill-icons-group">
        {config.icons.map((url, idx) => (
          <img
            key={idx}
            src={url}
            alt={`${skillName} icon`}
            className="skill-brand-icon"
            loading="lazy"
          />
        ))}
      </div>
    );
  }

  if (config.lucideIcon) {
    return (
      <div className="skill-lucide-icon" style={{ color: config.color }}>
        {config.lucideIcon}
      </div>
    );
  }

  return <Code2 size={22} style={{ color: 'var(--accent-purple)' }} />;
};

export const About: React.FC = () => {
  const { bio, education, skills, experiences, achievements, leadership } = portfolioData;
  const [activeCategory, setActiveCategory] = useState<'All' | 'Languages' | 'Frontend' | 'Backend' | 'Tools & Others'>('All');

  const categories = ['All', 'Languages', 'Frontend', 'Backend', 'Tools & Others'] as const;

  const filteredSkills = activeCategory === 'All' 
    ? skills 
    : skills.filter(skill => skill.category === activeCategory);

  return (
    <section id="about" className="about-section">
      <div className="section-header">
        <span className="section-tag">
          <Sparkles size={13} />
          <span>Background & Skills</span>
        </span>
        <h2 className="gradient-text">About Me & Expertise</h2>
        <p>A comprehensive view into my academic background, technical proficiencies, and engineering journey.</p>
      </div>

      {/* Main Grid: Bio + Skills on left, Experience + Education on right */}
      <div className="about-grid">
        {/* Left Column: Bio & Skills */}
        <div className="about-column">
          {/* Biography Card */}
          <div className="glass-card bio-card">
            <div className="card-title-group">
              <Sparkles size={20} className="text-purple" />
              <h3>About Me</h3>
            </div>
            <p className="bio-text">{bio}</p>
          </div>

          {/* Technical Skills Card */}
          <div className="glass-card skills-card">
            <div className="skills-header">
              <div className="card-title-group">
                <Code2 size={20} className="text-cyan" />
                <h3>Technical Arsenal</h3>
              </div>
              <div className="skills-filters">
                {categories.map(cat => (
                  <button
                    key={cat}
                    className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat)}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="skills-grid">
              {filteredSkills.map(skill => {
                const config = skillConfigs[skill.name] || { color: 'var(--accent-purple)', glow: 'rgba(139, 92, 246, 0.2)' };
                return (
                  <div 
                    key={skill.name} 
                    className="skill-card"
                    style={{ 
                      '--brand-color': config.color,
                      '--brand-glow': config.glow 
                    } as React.CSSProperties}
                  >
                    <div className="skill-icon-wrapper">
                      {renderSkillIcon(skill.name)}
                    </div>
                    <span className="skill-name">{skill.name}</span>
                    <div className="skill-bar-container">
                      <div className="skill-bar-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Column: Education & Experience */}
        <div className="about-column">
          {/* Education Card */}
          <div className="glass-card education-card">
            <div className="card-title-group">
              <GraduationCap size={22} className="text-purple" />
              <h3>Academic Background</h3>
            </div>

            <div className="education-list">
              {education.map((edu, idx) => (
                <div key={idx} className="education-item">
                  <div className="edu-header">
                    <div className="edu-institution-group">
                      <h4 className="edu-institution">{edu.institution}</h4>
                      <p className="edu-degree">{edu.degree} &bull; {edu.field}</p>
                    </div>
                    <span className="edu-score-pill">
                      <strong>{edu.score}</strong> {edu.scoreLabel}
                    </span>
                  </div>

                  <div className="edu-meta">
                    <span className="edu-meta-item"><Calendar size={14} /> {edu.period}</span>
                    <span className="edu-meta-item"><MapPin size={14} /> {edu.location}</span>
                  </div>

                  <ul className="edu-highlights">
                    {edu.highlights.map((h, i) => (
                      <li key={i}>
                        <CheckCircle2 size={14} className="highlight-bullet" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Timeline Card */}
          <div className="glass-card timeline-card">
            <div className="card-title-group">
              <Briefcase size={20} className="text-cyan" />
              <h3>Experience & Roles</h3>
            </div>
            
            <div className="timeline">
              {experiences.map((exp, index) => (
                <div key={index} className="timeline-item">
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <div className="timeline-header">
                      <span className="timeline-period">{exp.period}</span>
                      {exp.location && <span className="timeline-location">{exp.location}</span>}
                    </div>
                    <h4 className="timeline-title">{exp.role}</h4>
                    <h5 className="timeline-company">{exp.company}</h5>
                    
                    <ul className="timeline-desc">
                      {exp.description.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>

                    {exp.skills && (
                      <div className="timeline-tags">
                        {exp.skills.map((s, i) => (
                          <span key={i} className="timeline-tag">{s}</span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Achievements & Leadership Grid */}
      <div className="extra-grid">
        <div className="glass-card extra-card">
          <div className="card-title-group">
            <Trophy size={20} className="text-gold" />
            <h3>Honors & Achievements</h3>
          </div>
          <div className="extra-list">
            {achievements.map((ach, index) => (
              <div key={index} className="extra-item achievement">
                <div className="extra-item-header">
                  <h4 className="extra-title">{ach.title}</h4>
                  {ach.year && <span className="extra-year">{ach.year}</span>}
                </div>
                <p className="extra-desc">{ach.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-card extra-card">
          <div className="card-title-group">
            <Users size={20} className="text-cyan" />
            <h3>Leadership & Community</h3>
          </div>
          <div className="extra-list">
            {leadership.map((lead, index) => (
              <div key={index} className="extra-item leadership">
                <div className="extra-item-header">
                  <h4 className="extra-title">{lead.role}</h4>
                  {lead.organization && <span className="extra-org">{lead.organization}</span>}
                </div>
                <p className="extra-desc">{lead.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        .about-section {
          display: flex;
          flex-direction: column;
          gap: 50px;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1.1fr 1fr;
          gap: 30px;
        }
        @media (max-width: 1080px) {
          .about-grid {
            grid-template-columns: 1fr;
          }
        }
        .about-column {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }
        .card-title-group {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 20px;
        }
        .card-title-group h3 {
          font-size: 1.4rem;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .text-purple { color: var(--accent-purple); }
        .text-cyan { color: var(--accent-cyan); }
        .text-gold { color: #fbbf24; }

        .bio-text {
          color: var(--text-secondary);
          font-size: 1.05rem;
          line-height: 1.7;
        }

        /* Skills */
        .skills-header {
          display: flex;
          flex-direction: column;
          gap: 15px;
          margin-bottom: 20px;
        }
        .skills-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .filter-btn {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 5px 14px;
          border-radius: 999px;
          font-size: 0.84rem;
          font-family: var(--font-display);
          font-weight: 500;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .filter-btn:hover, .filter-btn.active {
          background: var(--accent-purple);
          color: #fff;
          border-color: var(--accent-purple);
          box-shadow: 0 0 12px var(--accent-purple-glow);
        }
        .skills-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(130px, 1fr));
          gap: 14px;
        }
        @media (max-width: 640px) {
          .skills-grid {
            grid-template-columns: repeat(auto-fill, minmax(105px, 1fr));
            gap: 10px;
          }
        }
        .skill-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 16px 10px;
          border-radius: 12px;
          background: rgba(10, 10, 20, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.04);
          transition: var(--transition-smooth);
        }
        .skill-card:hover {
          transform: translateY(-5px);
          border-color: rgba(255, 255, 255, 0.15);
          background: rgba(22, 22, 40, 0.7);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4), 0 0 20px var(--brand-glow);
        }
        .skill-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          height: 36px;
          width: 100%;
        }
        .skill-brand-icon {
          width: 28px;
          height: 28px;
          object-fit: contain;
        }
        .skill-icons-group {
          display: flex;
          gap: 6px;
          align-items: center;
        }
        .skill-card .skill-name {
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .skill-card:hover .skill-name {
          color: var(--text-primary);
        }
        .skill-bar-container {
          width: 100%;
          height: 4px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 999px;
          overflow: hidden;
        }
        .skill-bar-fill {
          height: 100%;
          background: var(--brand-color);
          border-radius: 999px;
          box-shadow: 0 0 8px var(--brand-glow);
        }

        /* Education */
        .education-list {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .education-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
          padding-bottom: 20px;
          border-bottom: 1px solid var(--glass-border);
        }
        .education-item:last-child {
          padding-bottom: 0;
          border-bottom: none;
        }
        .edu-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 12px;
        }
        .edu-institution {
          font-size: 1.15rem;
          color: var(--text-primary);
          font-family: var(--font-display);
        }
        .edu-degree {
          font-size: 0.92rem;
          color: var(--accent-cyan);
          font-weight: 500;
        }
        .edu-score-pill {
          background: rgba(139, 92, 246, 0.1);
          border: 1px solid rgba(139, 92, 246, 0.3);
          color: var(--text-primary);
          padding: 4px 12px;
          border-radius: 999px;
          font-size: 0.84rem;
          font-family: var(--font-mono);
          white-space: nowrap;
        }
        .edu-score-pill strong {
          color: var(--accent-purple);
        }
        .edu-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.84rem;
          color: var(--text-muted);
          font-family: var(--font-display);
        }
        .edu-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 5px;
        }
        .edu-highlights {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-top: 4px;
        }
        .edu-highlights li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          font-size: 0.88rem;
          color: var(--text-secondary);
        }
        .highlight-bullet {
          color: var(--accent-cyan);
          flex-shrink: 0;
          margin-top: 3px;
        }

        /* Timeline */
        .timeline {
          position: relative;
          padding-left: 22px;
          border-left: 2px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 32px;
        }
        .timeline-item {
          position: relative;
        }
        .timeline-dot {
          position: absolute;
          left: -29px;
          top: 4px;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: var(--accent-purple);
          border: 2px solid var(--bg-primary);
          box-shadow: 0 0 10px var(--accent-purple-glow);
          transition: var(--transition-fast);
        }
        .timeline-item:hover .timeline-dot {
          background: var(--accent-cyan);
          box-shadow: 0 0 15px var(--accent-cyan-glow);
          transform: scale(1.2);
        }
        .timeline-content {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .timeline-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.82rem;
          font-family: var(--font-mono);
          color: var(--accent-cyan);
        }
        .timeline-title {
          font-size: 1.18rem;
          color: var(--text-primary);
        }
        .timeline-company {
          font-size: 0.95rem;
          color: var(--text-secondary);
          font-weight: 500;
        }
        .timeline-desc {
          list-style-type: none;
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }
        .timeline-desc li {
          color: var(--text-secondary);
          font-size: 0.9rem;
          position: relative;
          padding-left: 14px;
        }
        .timeline-desc li::before {
          content: "▹";
          color: var(--accent-purple);
          position: absolute;
          left: 0;
          font-size: 0.9rem;
        }
        .timeline-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-top: 10px;
        }
        .timeline-tag {
          font-size: 0.76rem;
          font-family: var(--font-mono);
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          color: var(--text-muted);
          padding: 3px 8px;
          border-radius: 4px;
        }

        /* Achievements & Leadership */
        .extra-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
        }
        @media (max-width: 768px) {
          .extra-grid {
            grid-template-columns: 1fr;
          }
        }
        .extra-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }
        .extra-item {
          padding-left: 16px;
          transition: var(--transition-smooth);
        }
        .extra-item.achievement {
          border-left: 2px solid #fbbf24;
        }
        .extra-item.leadership {
          border-left: 2px solid var(--accent-cyan);
        }
        .extra-item:hover {
          transform: translateX(5px);
        }
        .extra-item-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }
        .extra-title {
          font-size: 1.05rem;
          color: var(--text-primary);
        }
        .extra-year, .extra-org {
          font-size: 0.78rem;
          font-family: var(--font-mono);
          color: var(--text-muted);
        }
        .extra-desc {
          color: var(--text-secondary);
          font-size: 0.92rem;
          line-height: 1.55;
        }
      `}</style>
    </section>
  );
};
