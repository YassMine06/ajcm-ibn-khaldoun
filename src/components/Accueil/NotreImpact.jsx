import React, { useEffect, useRef, useState } from 'react';
import './NotreImpact.css';

/* SVG outline icons — white stroke on dark bg */
const PeopleIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="7" r="3"/><path d="M3 21v-2a6 6 0 0 1 9-5.196"/>
    <circle cx="17" cy="11" r="3"/><path d="M21 21v-2a4 4 0 0 0-6-3.46"/>
  </svg>
);

const FolderIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
  </svg>
);

const LeafIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="8" r="4"/><path d="M6 20v-2a6 6 0 0 1 12 0v2"/>
    <path d="M12 12v4"/>
  </svg>
);

const HandIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 8h1a4 4 0 0 1 0 8h-1"/><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"/>
    <line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/>
  </svg>
);

const stats = [
  { Icon: PeopleIcon, value: 120, suffix: '+', label: 'Membres actifs' },
  { Icon: FolderIcon, value: 25,  suffix: '+', label: 'Projets réalisés' },
  { Icon: LeafIcon,   value: 500, suffix: '+', label: 'Bénéficiaires' },
  { Icon: HandIcon,   value: 10,  suffix: '+', label: 'Partenaires' },
];

const Counter = ({ target, suffix }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let start = 0;
          const step = Math.ceil(target / (1600 / 16));
          const timer = setInterval(() => {
            start += step;
            if (start >= target) { setCount(target); clearInterval(timer); }
            else setCount(start);
          }, 16);
        }
      },
      { threshold: 0.4 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref} className="stat-number">{count}{suffix}</span>;
};

const NotreImpact = () => (
  <section className="impact-section" id="impact">
    <div className="actions-header">
      <h2 className="section-title-centered">NOTRE IMPACT</h2>
      <div className="title-divider"></div>
    </div>
    <div className="impact-bar">
      {stats.map((s, i) => (
        <div className="impact-stat" key={s.label}>
          <div className="impact-icon-wrap">
            <s.Icon />
          </div>
          <div className="impact-text">
            <Counter target={s.value} suffix={s.suffix} />
            <span className="stat-label">{s.label}</span>
          </div>
          {i < stats.length - 1 && <div className="stat-divider" />}
        </div>
      ))}
    </div>
  </section>
);

export default NotreImpact;
