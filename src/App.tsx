import { useState, useEffect, useRef } from 'react';
import { Route, Routes } from 'react-router-dom';
import { portfolioData } from './data/portfolioData';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { IdeasLab } from './components/IdeasLab';
import { LeetCodeStats } from './components/LeetCodeStats';
import { Contact } from './components/Contact';
import { ResumeModal } from './components/ResumeModal';
import { ArrowUp, Github, Linkedin, Award, Sparkles } from 'lucide-react';

const HomePage = ({ onOpenResume }: { onOpenResume: () => void }) => (
  <>
    <Hero onOpenResume={onOpenResume} />
    <About />
    <Projects />
    <IdeasLab />
    <LeetCodeStats />
    <Contact />
  </>
);

function App() {
  const [isResumeOpen, setIsResumeOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const backToTopVisibleRef = useRef(false);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const totalScroll = document.documentElement.scrollHeight - window.innerHeight;

          // Direct DOM update for 0ms React overhead
          if (progressBarRef.current && totalScroll > 0) {
            const currentProgress = (scrollY / totalScroll) * 100;
            progressBarRef.current.style.width = `${currentProgress}%`;
          }

          // Only trigger state update when crossing threshold
          const shouldShow = scrollY > 400;
          if (shouldShow !== backToTopVisibleRef.current) {
            backToTopVisibleRef.current = shouldShow;
            setShowBackToTop(shouldShow);
          }

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="main-wrapper">
      {/* Top Scroll Progress Bar (Direct DOM update - 0 React re-renders) */}
      <div 
        ref={progressBarRef}
        className="scroll-progress-bar" 
      />

      {/* GPU-cached background layers */}
      <div className="bg-fixed-layer" />
      <div className="bg-grid-overlay" />

      {/* Top Fixed Navigation Header */}
      <Header onOpenResume={() => setIsResumeOpen(true)} />

      {/* Main Content Sections */}
      <main>
        <Routes>
          <Route path="/" element={<HomePage onOpenResume={() => setIsResumeOpen(true)} />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/ideas" element={<IdeasLab />} />
          <Route path="/leetcode" element={<LeetCodeStats />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>

      {/* Interactive Resume View Overlay */}
      <ResumeModal isOpen={isResumeOpen} onClose={() => setIsResumeOpen(false)} />

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button 
          onClick={scrollToTop} 
          className="back-to-top-btn"
          aria-label="Back to Top"
          title="Scroll back to top"
        >
          <ArrowUp size={20} />
        </button>
      )}

      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">
              <Sparkles size={16} className="text-cyan" />
              <span>{portfolioData.name}</span>
            </span>
            <p className="footer-tagline">Systems Engineer & Software Developer &bull; NIT Andhra Pradesh</p>
          </div>

          <div className="footer-links">
            <a href={portfolioData.githubUrl} target="_blank" rel="noreferrer" title="GitHub">
              <Github size={18} />
            </a>
            <a href={portfolioData.linkedinUrl} target="_blank" rel="noreferrer" title="LinkedIn">
              <Linkedin size={18} />
            </a>
            <a href={portfolioData.leetcodeUrl} target="_blank" rel="noreferrer" title="LeetCode">
              <Award size={18} />
            </a>
          </div>
        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} {portfolioData.name}. All rights reserved.</p>
          <p className="footer-tech">Crafted with React, TypeScript & Vanilla CSS</p>
        </div>

        <style>{`
          .footer {
            border-top: 1px solid var(--glass-border);
            position: relative;
            z-index: 10;
            background: rgba(6, 6, 10, 0.98);
            padding: 45px 8% 28px;
          }
          .footer-content {
            max-width: 1360px;
            margin: 0 auto;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 20px;
            padding-bottom: 25px;
            border-bottom: 1px solid rgba(255, 255, 255, 0.04);
          }
          .footer-brand {
            display: flex;
            flex-direction: column;
            gap: 5px;
          }
          .footer-logo {
            display: flex;
            align-items: center;
            gap: 8px;
            font-family: var(--font-display);
            font-weight: 700;
            font-size: 1.2rem;
            color: var(--text-primary);
          }
          .text-cyan {
            color: var(--accent-cyan);
          }
          .footer-tagline {
            font-size: 0.88rem;
            color: var(--text-muted);
          }
          .footer-links {
            display: flex;
            gap: 12px;
          }
          .footer-links a {
            color: var(--text-secondary);
            background: rgba(255, 255, 255, 0.03);
            border: 1px solid var(--glass-border);
            padding: 9px;
            border-radius: 9px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            transition: var(--transition-fast);
          }
          .footer-links a:hover {
            color: var(--accent-cyan);
            border-color: var(--accent-cyan);
            transform: translateY(-2px);
          }
          .footer-bottom {
            max-width: 1360px;
            margin: 20px auto 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex-wrap: wrap;
            gap: 12px;
            font-size: 0.82rem;
            color: var(--text-muted);
            font-family: var(--font-display);
          }
          .footer-tech {
            font-family: var(--font-mono);
            font-size: 0.76rem;
          }
          @media (max-width: 768px) {
            .footer {
              padding: 35px 5% 22px;
            }
            .footer-content, .footer-bottom {
              flex-direction: column;
              text-align: center;
              justify-content: center;
            }
          }
        `}</style>
      </footer>
    </div>
  );
}

export default App;
