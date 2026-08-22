import React, { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { portfolioData } from '../data/portfolioData';
import { FileText, Menu, X, Sparkles, Send } from 'lucide-react';

interface HeaderProps {
  onOpenResume: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenResume }) => {
  const { name } = portfolioData;
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let prevScrolled = false;
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== prevScrolled) {
        prevScrolled = isScrolled;
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (location.pathname !== '/') {
      setActiveSection(location.pathname.slice(1));
      return;
    }

    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -40% 0px',
      threshold: 0.1
    };

    let currentSection = 'hero';
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.target.id && entry.target.id !== currentSection) {
          currentSection = entry.target.id;
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const sections = ['hero', 'about', 'projects', 'ideas', 'leetcode', 'contact'];
    
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const getInitials = (fullName: string) => {
    return fullName
      .split(' ')
      .map(n => n[0])
      .join('');
  };

  const navItems = [
    { label: 'About & Skills', href: '/about', id: 'about' },
    { label: 'Projects', href: '/projects', id: 'projects' },
    { label: 'Ideas', href: '/ideas', id: 'ideas' },
    { label: 'LeetCode Stats', href: '/leetcode', id: 'leetcode' },
    { label: 'Contact', href: '/contact', id: 'contact' },
  ];

  return (
    <header className={`header-container ${scrolled ? 'scrolled' : ''}`}>
      <div className="header-inner">
        {/* Brand Logo */}
        <Link to="/" className="logo">
          <span className="logo-sparkle"><Sparkles size={16} /></span>
          <span className="logo-text">{getInitials(name)}</span>
          <span className="logo-dot">.</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="nav-links">
          {navItems.map((item) => (
            <NavLink 
              key={item.id}
              to={item.href} 
              className={({ isActive }) => `nav-link ${isActive || (location.pathname === '/' && activeSection === item.id) ? 'active' : ''}`}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Header Right Actions */}
        <div className="header-actions">
          <button
            type="button"
            onClick={onOpenResume}
            className="btn-resume"
            title="View Interactive Resume"
          >
            <FileText size={15} />
            <span>Resume</span>
          </button>

          <Link to="/contact" className="btn-quick-contact">
            <Send size={14} />
            <span>Hire Me</span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button 
            type="button"
            className="mobile-menu-toggle"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <button
          type="button"
          className="mobile-drawer-close"
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close navigation menu"
          title="Close menu"
        >
          <X size={24} />
        </button>

        <div className="mobile-drawer-content">
          <nav className="mobile-nav-links">
            <Link 
              to="/" 
              className={`mobile-nav-link ${location.pathname === '/' && activeSection === 'hero' ? 'active' : ''}`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            {navItems.map((item) => (
              <NavLink 
                key={item.id}
                to={item.href} 
                className={({ isActive }) => `mobile-nav-link ${isActive || (location.pathname === '/' && activeSection === item.id) ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="mobile-drawer-actions">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResume();
              }}
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
            >
              <FileText size={18} />
              <span>View & Print Resume</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .header-container {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 100;
          padding: 22px 8%;
          transition: var(--transition-smooth);
        }
        .header-container.scrolled {
          padding: 14px 8%;
          background: rgba(5, 5, 8, 0.82);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border-bottom: 1px solid var(--glass-border);
          box-shadow: 0 4px 30px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 768px) {
          .header-container {
            padding: 18px 5%;
          }
          .header-container.scrolled {
            padding: 12px 5%;
          }
        }
        .header-inner {
          max-width: 1360px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .logo {
          font-family: var(--font-display);
          font-weight: 800;
          font-size: 1.65rem;
          color: var(--text-primary);
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 6px;
          letter-spacing: -0.03em;
        }
        .logo-sparkle {
          color: var(--accent-cyan);
          display: flex;
          align-items: center;
          animation: pulse 2.5s infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.6; transform: scale(0.95); }
          50% { opacity: 1; transform: scale(1.15); }
        }
        .logo-text {
          background: linear-gradient(135deg, #fff 20%, var(--accent-purple) 70%, var(--accent-cyan));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .logo-dot {
          color: var(--accent-cyan);
          text-shadow: 0 0 10px var(--accent-cyan);
        }
        .nav-links {
          display: flex;
          align-items: center;
          gap: 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--glass-border);
          padding: 8px 24px;
          border-radius: 999px;
          backdrop-filter: blur(10px);
        }
        @media (max-width: 900px) {
          .nav-links {
            display: none;
          }
        }
        .nav-link {
          color: var(--text-secondary);
          text-decoration: none;
          font-family: var(--font-display);
          font-weight: 500;
          font-size: 0.92rem;
          position: relative;
          padding: 4px 2px;
          transition: var(--transition-fast);
        }
        .nav-link:hover, .nav-link.active {
          color: #fff;
        }
        .nav-link.active {
          font-weight: 600;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, var(--accent-purple), var(--accent-cyan));
          transition: var(--transition-smooth);
          transform: translateX(-50%);
          border-radius: 2px;
        }
        .nav-link:hover::after, .nav-link.active::after {
          width: 100%;
        }
        .header-actions {
          display: flex;
          align-items: center;
          gap: 12px;
        }
        .btn-resume {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(139, 92, 246, 0.1);
          color: var(--accent-purple);
          border: 1px solid rgba(139, 92, 246, 0.3);
          border-radius: 999px;
          padding: 8px 18px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.88rem;
          transition: var(--transition-smooth);
          cursor: pointer;
        }
        .btn-resume:hover {
          background: var(--accent-purple);
          color: #fff;
          border-color: var(--accent-purple);
          box-shadow: 0 0 20px var(--accent-purple-glow);
          transform: translateY(-1px);
        }
        .btn-quick-contact {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, var(--accent-cyan), #0284c7);
          color: #fff;
          border: none;
          border-radius: 999px;
          padding: 8px 18px;
          font-family: var(--font-display);
          font-weight: 600;
          font-size: 0.88rem;
          text-decoration: none;
          transition: var(--transition-smooth);
          box-shadow: 0 2px 10px rgba(6, 182, 212, 0.3);
        }
        .btn-quick-contact:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 18px rgba(6, 182, 212, 0.5);
        }
        @media (max-width: 640px) {
          .btn-quick-contact {
            display: none;
          }
        }
        .mobile-menu-toggle {
          display: none;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid var(--glass-border);
          color: var(--text-primary);
          padding: 8px;
          border-radius: 10px;
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .mobile-menu-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: var(--accent-cyan);
        }
        @media (max-width: 900px) {
          .mobile-menu-toggle {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        }

        /* Mobile Drawer Styles */
        .mobile-drawer {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(5, 5, 8, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          z-index: 99;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 40px 20px;
          opacity: 0;
          pointer-events: none;
          transform: translateY(-20px);
          transition: all 0.35s ease;
        }
        .mobile-drawer.open {
          opacity: 1;
          pointer-events: auto;
          transform: translateY(0);
        }
        .mobile-drawer-close {
          position: absolute;
          top: 18px;
          right: 5%;
          width: 42px;
          height: 42px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.06);
          border: 1px solid var(--glass-border);
          border-radius: 10px;
          color: var(--text-primary);
          cursor: pointer;
          transition: var(--transition-fast);
        }
        .mobile-drawer-close:hover {
          background: rgba(255, 255, 255, 0.12);
          border-color: var(--accent-cyan);
          color: var(--accent-cyan);
        }
        .mobile-drawer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 35px;
          width: 100%;
          max-width: 320px;
        }
        .mobile-nav-links {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 22px;
          width: 100%;
        }
        .mobile-nav-link {
          font-family: var(--font-display);
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--text-secondary);
          text-decoration: none;
          transition: var(--transition-fast);
        }
        .mobile-nav-link:hover, .mobile-nav-link.active {
          color: var(--accent-cyan);
          transform: scale(1.05);
        }
        .mobile-drawer-actions {
          width: 100%;
        }
      `}</style>
    </header>
  );
};
