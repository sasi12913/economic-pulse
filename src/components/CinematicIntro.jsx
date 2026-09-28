import React, { useEffect, useState, useRef, useCallback } from 'react';

// India outline - simplified but recognisable SVG path
const INDIA_PATH = "M 195,18 L 215,22 L 238,30 L 258,42 L 275,58 L 288,72 L 298,88 L 305,104 L 308,120 L 302,136 L 290,148 L 278,158 L 268,170 L 260,184 L 255,198 L 262,212 L 272,224 L 278,238 L 274,252 L 264,264 L 252,274 L 245,288 L 240,304 L 232,318 L 220,330 L 208,340 L 198,348 L 192,340 L 184,328 L 178,316 L 168,302 L 158,290 L 148,278 L 138,266 L 126,256 L 114,248 L 102,240 L 92,230 L 85,218 L 80,204 L 78,190 L 76,176 L 74,162 L 72,148 L 74,134 L 80,120 L 88,108 L 98,96 L 108,84 L 118,72 L 128,60 L 140,50 L 152,40 L 164,32 L 178,24 Z";

// Simplified state regions on the intro map (decorative)
const GLOW_NODES = [
  { x: 245, y: 240, label: 'GDP', size: 4, color: '#FF9933', delay: 1.8 },
  { x: 180, y: 160, label: 'Prices', size: 3, color: '#138808', delay: 2.0 },
  { x: 220, y: 180, label: 'Employment', size: 3.5, color: '#FF9933', delay: 2.2 },
  { x: 200, y: 280, label: 'Trade', size: 3, color: '#138808', delay: 2.4 },
  { x: 160, y: 200, label: 'Credit', size: 3, color: '#ffffff', delay: 2.6 },
  { x: 250, y: 150, label: 'CapEx', size: 3, color: '#FF9933', delay: 2.8 },
  { x: 140, y: 240, label: 'Wages', size: 3, color: '#138808', delay: 3.0 },
  { x: 200, y: 130, label: 'Fiscal', size: 2.5, color: '#ffffff', delay: 3.2 },
];

function useAnimationTimer(durationMs, startAt = 0) {
  const [elapsed, setElapsed] = useState(startAt);
  const startTimeRef = useRef(null);
  const rafRef = useRef(null);

  useEffect(() => {
    const start = Date.now();
    startTimeRef.current = start;

    const tick = () => {
      const now = Date.now();
      const t = Math.min(now - start, durationMs);
      setElapsed(t);
      if (t < durationMs) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [durationMs]);

  return elapsed / durationMs; // 0 to 1
}

function Particle({ x, y, size, color, opacity }) {
  return (
    <circle
      cx={x}
      cy={y}
      r={size}
      fill={color}
      opacity={opacity}
      style={{ filter: `blur(${size * 0.3}px)` }}
    />
  );
}

export default function CinematicIntro({ onComplete }) {
  const [stage, setStage] = useState(0); // 0: dark, 1: particles, 2: map drawing, 3: glow, 4: text, 5: exit
  const [pathProgress, setPathProgress] = useState(0);
  const [textPhase, setTextPhase] = useState(0);
  const [exitStarted, setExitStarted] = useState(false);
  const [particles] = useState(() =>
    Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: 60 + Math.random() * 280,
      y: 20 + Math.random() * 360,
      size: 0.5 + Math.random() * 1.5,
      color: ['#FF9933', '#138808', '#ffffff', '#6464c8'][Math.floor(Math.random() * 4)],
      opacity: 0.1 + Math.random() * 0.4,
      driftX: (Math.random() - 0.5) * 0.3,
      driftY: (Math.random() - 0.5) * 0.3,
    }))
  );

  const stageTimings = [200, 600, 1800, 2600, 3400, 4200];

  useEffect(() => {
    const timers = stageTimings.map((time, i) =>
      setTimeout(() => setStage(i + 1), time)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (stage < 2) return;
    let start = null;
    let raf;
    const duration = 1200;
    const animate = (ts) => {
      if (!start) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      setPathProgress(p);
      if (p < 1) raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [stage]);

  useEffect(() => {
    if (stage < 4) return;
    const t1 = setTimeout(() => setTextPhase(1), 200);
    const t2 = setTimeout(() => setTextPhase(2), 900);
    const t3 = setTimeout(() => setTextPhase(3), 1800);
    return () => [t1, t2, t3].forEach(clearTimeout);
  }, [stage]);

  useEffect(() => {
    if (stage >= 5) {
      setExitStarted(true);
      const t = setTimeout(() => onComplete(), 600);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  // SVG path length approximation — we'll use stroke-dasharray trick
  const pathTotalLength = 900; // approximate
  const strokeDash = pathTotalLength * pathProgress;

  const mapOpacity = stage >= 2 ? Math.min((stage - 1) * 0.5, 1) : 0;
  const glowOpacity = stage >= 3 ? 1 : 0;
  const nodesOpacity = stage >= 4 ? 1 : 0;
  const overlayOpacity = exitStarted ? 0 : 1;

  return (
    <div
      className="intro-overlay"
      style={{
        opacity: overlayOpacity,
        transition: exitStarted ? 'opacity 0.6s cubic-bezier(0.4,0,0.2,1)' : 'none',
      }}
      aria-label="Economic Pulse introduction animation"
      role="presentation"
    >
      {/* Skip button */}
      <button
        onClick={() => { setStage(5); }}
        className="absolute top-5 right-6 text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors z-50 border border-slate-700 px-3 py-1.5 rounded-full"
        aria-label="Skip introduction"
      >
        Skip Intro ↓
      </button>

      {/* Background particle field */}
      <div className="absolute inset-0 overflow-hidden">
        <svg width="100%" height="100%" className="absolute inset-0 opacity-30">
          {stage >= 1 && particles.map((p) => (
            <Particle key={p.id} {...p} />
          ))}
        </svg>

        {/* Very subtle grid */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(100,100,200,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(100,100,200,0.04) 1px, transparent 1px)
            `,
            backgroundSize: '48px 48px',
            opacity: stage >= 1 ? 0.6 : 0,
            transition: 'opacity 1s ease',
          }}
        />
      </div>

      {/* Central India Map */}
      <div className="relative flex flex-col items-center justify-center w-full h-full">
        <div
          style={{
            opacity: mapOpacity,
            transition: 'opacity 0.8s ease',
          }}
          className="relative"
        >
          <svg
            viewBox="60 10 250 350"
            width="280"
            height="380"
            className="india-map-glow"
            style={{ overflow: 'visible' }}
          >
            {/* Ambient glow behind India */}
            {stage >= 3 && (
              <>
                <ellipse
                  cx="195"
                  cy="185"
                  rx="110"
                  ry="140"
                  fill="none"
                  stroke="rgba(255,153,51,0.08)"
                  strokeWidth="40"
                  style={{ filter: 'blur(20px)' }}
                />
                <ellipse
                  cx="195"
                  cy="185"
                  rx="80"
                  ry="110"
                  fill="none"
                  stroke="rgba(19,136,8,0.06)"
                  strokeWidth="30"
                  style={{ filter: 'blur(15px)' }}
                />
              </>
            )}

            {/* India map outline — animated drawing */}
            <path
              d={INDIA_PATH}
              fill={stage >= 3 ? 'rgba(255,153,51,0.04)' : 'rgba(255,255,255,0.02)'}
              stroke="none"
              style={{ transition: 'fill 1s ease' }}
            />
            <path
              d={INDIA_PATH}
              fill="none"
              stroke={stage >= 3 ? '#FF9933' : '#5a5a9a'}
              strokeWidth={stage >= 3 ? "1.5" : "1"}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray={`${strokeDash} ${pathTotalLength}`}
              style={{
                transition: 'stroke 0.8s ease',
                filter: stage >= 3 ? 'drop-shadow(0 0 4px rgba(255,153,51,0.6))' : 'none',
              }}
            />

            {/* Subtle saffron→green tricolour flow overlay */}
            {stage >= 3 && (
              <path
                d={INDIA_PATH}
                fill="none"
                stroke="url(#tricolourGrad)"
                strokeWidth="0.5"
                strokeDasharray={`${pathTotalLength}`}
                opacity={glowOpacity}
                style={{ transition: 'opacity 0.8s ease' }}
              />
            )}

            {/* Ashoka Chakra — very subtle */}
            {stage >= 3 && (
              <g
                transform="translate(195, 185)"
                style={{
                  opacity: glowOpacity * 0.15,
                  transition: 'opacity 1s ease',
                }}
              >
                <circle cx="0" cy="0" r="22" fill="none" stroke="#000080" strokeWidth="1" />
                {Array.from({ length: 24 }, (_, i) => {
                  const angle = (i / 24) * Math.PI * 2;
                  return (
                    <line
                      key={i}
                      x1={Math.cos(angle) * 4}
                      y1={Math.sin(angle) * 4}
                      x2={Math.cos(angle) * 20}
                      y2={Math.sin(angle) * 20}
                      stroke="#000080"
                      strokeWidth="0.6"
                    />
                  );
                })}
              </g>
            )}

            {/* Economic data nodes */}
            {GLOW_NODES.map((node) => (
              <g
                key={node.label}
                style={{
                  opacity: nodesOpacity,
                  transition: `opacity 0.6s ease ${node.delay - 2.6}s`,
                }}
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size * 2.5}
                  fill={node.color}
                  opacity="0.1"
                />
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={node.size}
                  fill={node.color}
                  opacity="0.9"
                  style={{ filter: `drop-shadow(0 0 3px ${node.color})` }}
                />
              </g>
            ))}

            <defs>
              <linearGradient id="tricolourGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#FF9933" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#ffffff" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#138808" stopOpacity="0.8" />
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Text reveal */}
        <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center pb-16 space-y-4">
          {/* ECONOMIC PULSE title */}
          <div
            style={{
              opacity: textPhase >= 1 ? 1 : 0,
              transform: textPhase >= 1 ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.7s ease, transform 0.7s ease',
            }}
          >
            <div className="flex items-center space-x-3">
              {/* EP Logo mark */}
              <svg width="32" height="32" viewBox="0 0 32 32">
                <rect width="32" height="32" rx="8" fill="none" />
                <polyline
                  points="2,20 8,20 10,12 14,24 18,8 22,20 26,20 30,20"
                  fill="none"
                  stroke="#FF9933"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <h1
                className="text-3xl font-bold tracking-widest uppercase"
                style={{
                  fontFamily: "'Newsreader', Georgia, serif",
                  color: '#F8F7F4',
                  letterSpacing: '0.2em',
                }}
              >
                ECONOMIC PULSE
              </h1>
            </div>
          </div>

          {/* Tricolour divider */}
          {textPhase >= 1 && (
            <div
              style={{
                width: '320px',
                height: '2px',
                background: 'linear-gradient(90deg, #FF9933 33%, rgba(255,255,255,0.6) 33%, rgba(255,255,255,0.6) 67%, #138808 67%)',
                opacity: textPhase >= 1 ? 0.7 : 0,
                transition: 'opacity 0.5s ease 0.3s',
              }}
            />
          )}

          {/* Tagline */}
          <div
            style={{
              opacity: textPhase >= 2 ? 1 : 0,
              transform: textPhase >= 2 ? 'translateY(0)' : 'translateY(12px)',
              transition: 'opacity 0.6s ease, transform 0.6s ease',
            }}
            className="text-center space-y-1.5"
          >
            <p className="text-slate-400 text-sm font-light tracking-wide">
              Understand the Economy.
            </p>
            <p className="text-slate-400 text-sm font-light tracking-wide">
              Question the Claims. Explore the Trade-offs.
            </p>
          </div>

          {/* Loading indicator */}
          {textPhase >= 3 && (
            <div
              style={{
                opacity: textPhase >= 3 ? 1 : 0,
                transition: 'opacity 0.5s ease',
              }}
              className="flex items-center space-x-2 mt-4"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '0ms' }} />
              <div className="w-1.5 h-1.5 rounded-full" style={{ background: '#138808', animationDelay: '150ms' }} />
              <div className="w-1.5 h-1.5 rounded-full bg-saffron animate-bounce" style={{ animationDelay: '300ms' }} />
              <span className="text-slate-500 text-xs font-mono ml-2">Synchronising Economic Indicators…</span>
            </div>
          )}
        </div>

        {/* India label */}
        {stage >= 2 && (
          <div
            className="absolute top-6 left-0 right-0 text-center"
            style={{
              opacity: mapOpacity * 0.4,
              transition: 'opacity 1s ease',
            }}
          >
            <span className="text-[10px] font-mono tracking-[0.4em] uppercase text-slate-600">
              INDIA — ECONOMY — DATA — INTELLIGENCE
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
