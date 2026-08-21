import React from 'react';

export const ParticleMesh: React.FC = () => {
  return (
    <div className="hero-ambient-bg" aria-hidden="true">
      <div className="ambient-glow glow-1" />
      <div className="ambient-glow glow-2" />

      <style>{`
        .hero-ambient-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .ambient-glow {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.22;
          pointer-events: none;
          transform: translateZ(0);
        }
        .glow-1 {
          top: -10%;
          right: 5%;
          width: 450px;
          height: 450px;
          background: radial-gradient(circle, var(--accent-purple), transparent 70%);
        }
        .glow-2 {
          bottom: 0%;
          left: -5%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, var(--accent-cyan), transparent 70%);
        }
        @media (max-width: 768px) {
          .ambient-glow {
            width: 280px;
            height: 280px;
            filter: blur(50px);
            opacity: 0.18;
          }
        }
      `}</style>
    </div>
  );
};
