import React, { useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolioData';
import { Flame, ExternalLink, TrendingUp, BrainCircuit } from 'lucide-react';

export const LeetCodeStats: React.FC = () => {
  const { leetcodeStats, leetcodeUrl } = portfolioData;

  // Live state with local fallback values (177 Solved)
  const [liveData, setLiveData] = useState<any>(null);

  useEffect(() => {
    // Attempt fetching live stats from reliable endpoints
    fetch('https://leetcode-api-faisalshohag.vercel.app/NAVADEEP_MAGANTI')
      .then(res => {
        if (!res.ok) throw new Error('API status not ok');
        return res.json();
      })
      .then(data => {
        if (data && typeof data.totalSolved === 'number' && data.totalSolved > 0) {
          setLiveData(data);
        }
      })
      .catch(() => {
        // Fallback silently to verified portfolioData (177 solved)
      });
  }, []);

  // Use live data if loaded, otherwise fall back to local portfolioData (177 Solved)
  const activeSolved = liveData ? liveData.totalSolved : leetcodeStats.solved;
  const activeTotalQuestions = liveData ? liveData.totalQuestions : leetcodeStats.totalQuestions;
  const activeEasySolved = liveData ? liveData.easySolved : leetcodeStats.easySolved;
  const activeEasyTotal = liveData ? liveData.totalEasy : leetcodeStats.easyTotal;
  const activeMediumSolved = liveData ? liveData.mediumSolved : leetcodeStats.mediumSolved;
  const activeMediumTotal = liveData ? liveData.totalMedium : leetcodeStats.mediumTotal;
  const activeHardSolved = liveData ? liveData.hardSolved : leetcodeStats.hardSolved;
  const activeHardTotal = liveData ? liveData.totalHard : leetcodeStats.hardTotal;
  const activeRanking = liveData ? liveData.ranking : leetcodeStats.ranking;
  const activeAcceptanceRate = liveData && liveData.totalSubmissions && liveData.totalSubmissions[0]
    ? parseFloat(((liveData.totalSubmissions[0].count / liveData.totalSubmissions[0].submissions) * 100).toFixed(1)) 
    : leetcodeStats.acceptanceRate;

  const totalPercentage = Math.min(100, (activeSolved / (activeTotalQuestions || 4029)) * 100);
  const easyPercentage = Math.min(100, (activeEasySolved / (activeEasyTotal || 960)) * 100);
  const mediumPercentage = Math.min(100, (activeMediumSolved / (activeMediumTotal || 2103)) * 100);
  const hardPercentage = Math.min(100, (activeHardSolved / (activeHardTotal || 966)) * 100);

  // SVG Radial Circle math
  const radius = 56;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (totalPercentage / 100) * circumference;

  const algorithmicFocusTopics = [
    "Arrays & Hashing",
    "Two Pointers & Sliding Window",
    "Trees & Binary Search",
    "Dynamic Programming",
    "Graphs & BFS/DFS",
    "Greedy & Bit Manipulation"
  ];

  return (
    <section id="leetcode" className="leetcode-section">
      <div className="section-header">
        <span className="section-tag">
          <BrainCircuit size={13} />
          <span>Algorithms & Problem Solving</span>
        </span>
        <h2 className="gradient-text">Coding Activity & Metrics</h2>
        <p>Verified performance metrics and algorithmic problem solving stats from my LeetCode profile.</p>
      </div>

      <div className="leetcode-grid">
        {/* Left Side - Radial Graph & Core Metrics */}
        <div className="glass-card leetcode-card main-stats">
          <div className="profile-badge-header">
            <span className="profile-tag">
              <span className="live-dot"></span>
              Verified Profile
            </span>
            <span className="username-tag">@{leetcodeStats.username}</span>
          </div>

          <div className="radial-progress-wrapper">
            <svg width="150" height="150" className="radial-svg">
              <circle
                cx="75"
                cy="75"
                r={radius}
                className="radial-bg"
                strokeWidth="10"
              />
              <circle
                cx="75"
                cy="75"
                r={radius}
                className="radial-indicator"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
              />
            </svg>
            <div className="radial-text">
              <span className="solved-count">{activeSolved}</span>
              <span className="solved-label">Solved</span>
            </div>
          </div>

          <div className="stats-meta">
            <div className="meta-item">
              <div className="meta-icon-box cyan">
                <Flame size={18} />
              </div>
              <div className="meta-text-box">
                <span className="meta-val">{activeAcceptanceRate}%</span>
                <span className="meta-lbl">Acceptance Rate</span>
              </div>
            </div>

            <div className="meta-item">
              <div className="meta-icon-box purple">
                <TrendingUp size={18} />
              </div>
              <div className="meta-text-box">
                <span className="meta-val">#{activeRanking.toLocaleString()}</span>
                <span className="meta-lbl">Global Ranking</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Difficulty Breakdown & Topics */}
        <div className="glass-card leetcode-card breakdown-card">
          <div className="breakdown-header">
            <h3>Difficulty Breakdown</h3>
            <span className="total-ratio">{activeSolved} / {activeTotalQuestions} Problems</span>
          </div>
          
          <div className="difficulty-list">
            {/* Easy */}
            <div className="diff-item">
              <div className="diff-info">
                <div className="diff-label-group">
                  <span className="diff-dot easy-dot"></span>
                  <span className="diff-label easy">Easy</span>
                </div>
                <span className="diff-numbers">
                  <strong>{activeEasySolved}</strong> / {activeEasyTotal}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill easy-fill" 
                  style={{ width: `${Math.max(8, easyPercentage * 3.5)}%` }}
                />
              </div>
            </div>

            {/* Medium */}
            <div className="diff-item">
              <div className="diff-info">
                <div className="diff-label-group">
                  <span className="diff-dot medium-dot"></span>
                  <span className="diff-label medium">Medium</span>
                </div>
                <span className="diff-numbers">
                  <strong>{activeMediumSolved}</strong> / {activeMediumTotal}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill medium-fill" 
                  style={{ width: `${Math.max(8, mediumPercentage * 3.5)}%` }}
                />
              </div>
            </div>

            {/* Hard */}
            <div className="diff-item">
              <div className="diff-info">
                <div className="diff-label-group">
                  <span className="diff-dot hard-dot"></span>
                  <span className="diff-label hard">Hard</span>
                </div>
                <span className="diff-numbers">
                  <strong>{activeHardSolved}</strong> / {activeHardTotal}
                </span>
              </div>
              <div className="progress-bar-bg">
                <div 
                  className="progress-bar-fill hard-fill" 
                  style={{ width: `${Math.max(8, hardPercentage * 3.5)}%` }}
                />
              </div>
            </div>
          </div>

          {/* Focus Areas */}
          <div className="topics-container">
            <span className="topics-title">Core Algorithmic Competencies:</span>
            <div className="topics-grid">
              {algorithmicFocusTopics.map((topic, i) => (
                <span key={i} className="topic-pill">{topic}</span>
              ))}
            </div>
          </div>

          <a 
            href={leetcodeUrl} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="leetcode-link btn-secondary"
          >
            <span>View Complete LeetCode Profile</span>
            <ExternalLink size={16} />
          </a>
        </div>
      </div>

      <style>{`
        .leetcode-section {
          display: flex;
          flex-direction: column;
          gap: 40px;
        }
        .leetcode-grid {
          display: grid;
          grid-template-columns: 1fr 1.4fr;
          gap: 30px;
        }
        @media (max-width: 900px) {
          .leetcode-grid {
            grid-template-columns: 1fr;
          }
        }
        .leetcode-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 30px;
          gap: 22px;
        }
        .main-stats {
          align-items: center;
          text-align: center;
        }
        .profile-badge-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          border-bottom: 1px solid var(--glass-border);
          padding-bottom: 12px;
        }
        .profile-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: var(--font-mono);
          font-size: 0.78rem;
          color: var(--accent-cyan);
        }
        .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 6px #10b981;
        }
        .username-tag {
          font-family: var(--font-mono);
          font-size: 0.8rem;
          color: var(--text-muted);
        }
        .radial-progress-wrapper {
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 8px 0;
        }
        .radial-svg {
          transform: rotate(-90deg);
        }
        .radial-bg {
          fill: none;
          stroke: rgba(255, 255, 255, 0.05);
        }
        .radial-indicator {
          fill: none;
          stroke: var(--accent-purple);
          filter: drop-shadow(0 0 6px var(--accent-purple));
          transition: stroke-dashoffset 0.8s ease;
        }
        .radial-text {
          position: absolute;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .solved-count {
          font-family: var(--font-display);
          font-size: 2.6rem;
          font-weight: 800;
          color: var(--text-primary);
          line-height: 1;
        }
        .solved-label {
          font-size: 0.8rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 4px;
        }
        .stats-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
          width: 100%;
          border-top: 1px solid var(--glass-border);
          padding-top: 18px;
        }
        .meta-item {
          display: flex;
          align-items: center;
          gap: 10px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          padding: 8px 12px;
          border-radius: 10px;
        }
        .meta-icon-box {
          padding: 7px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .meta-icon-box.cyan {
          background: rgba(6, 182, 212, 0.1);
          color: var(--accent-cyan);
        }
        .meta-icon-box.purple {
          background: rgba(139, 92, 246, 0.1);
          color: var(--accent-purple);
        }
        .meta-text-box {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .meta-val {
          font-family: var(--font-display);
          font-weight: 700;
          font-size: 1rem;
          color: var(--text-primary);
        }
        .meta-lbl {
          font-size: 0.72rem;
          color: var(--text-muted);
        }

        /* Breakdown Card */
        .breakdown-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .breakdown-header h3 {
          font-size: 1.3rem;
          color: var(--text-primary);
        }
        .total-ratio {
          font-family: var(--font-mono);
          font-size: 0.82rem;
          color: var(--accent-cyan);
        }
        .difficulty-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
        .diff-item {
          display: flex;
          flex-direction: column;
          gap: 7px;
        }
        .diff-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.9rem;
        }
        .diff-label-group {
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .diff-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
        }
        .easy-dot { background: #10b981; }
        .medium-dot { background: #f59e0b; }
        .hard-dot { background: #ef4444; }

        .diff-label {
          font-weight: 600;
          text-transform: uppercase;
          font-size: 0.8rem;
          letter-spacing: 0.05em;
        }
        .diff-label.easy { color: #10b981; }
        .diff-label.medium { color: #f59e0b; }
        .diff-label.hard { color: #ef4444; }

        .diff-numbers {
          color: var(--text-secondary);
          font-family: var(--font-mono);
          font-size: 0.82rem;
        }
        .diff-numbers strong {
          color: var(--text-primary);
        }
        .progress-bar-bg {
          height: 8px;
          background: rgba(255, 255, 255, 0.04);
          border-radius: 999px;
          overflow: hidden;
        }
        .progress-bar-fill {
          height: 100%;
          border-radius: 999px;
          transition: width 0.8s ease-out;
        }
        .easy-fill {
          background: linear-gradient(90deg, #10b981, #34d399);
        }
        .medium-fill {
          background: linear-gradient(90deg, #f59e0b, #fbbf24);
        }
        .hard-fill {
          background: linear-gradient(90deg, #ef4444, #f87171);
        }

        .topics-container {
          display: flex;
          flex-direction: column;
          gap: 8px;
          border-top: 1px solid var(--glass-border);
          padding-top: 14px;
        }
        .topics-title {
          font-family: var(--font-display);
          font-size: 0.82rem;
          color: var(--text-muted);
          font-weight: 500;
        }
        .topics-grid {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .topic-pill {
          font-family: var(--font-mono);
          font-size: 0.76rem;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid var(--glass-border);
          color: var(--text-secondary);
          padding: 3px 8px;
          border-radius: 4px;
        }
        .leetcode-link {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 100%;
          padding: 12px;
        }
      `}</style>
    </section>
  );
};
