/**
 * DashboardBackground – renders a subtle, role-aware minimalist SVG art layer
 * that sits behind all dashboard content without interfering with interactions.
 * Art motifs are tax / finance / compliance themed.
 */
import React from 'react';
import { useUser } from '../../context/UserContext';

/* ─── Individual art layer components ─── */

/** Thin grid of diagonal "ledger" lines across the whole canvas */
function LedgerLines() {
  return (
    <svg
      aria-hidden="true"
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
      preserveAspectRatio="none"
    >
      <defs>
        <pattern id="ledger" width="60" height="60" patternUnits="userSpaceOnUse">
          <line x1="0" y1="60" x2="60" y2="0" stroke="var(--border)" strokeWidth="0.6" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#ledger)" opacity="0.35" />
    </svg>
  );
}

/** A gentle radial glow in the top-right corner */
function TopRightGlow({ color = 'rgba(46,111,168,0.09)' }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute', top: '-120px', right: '-120px',
        width: '520px', height: '520px',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'float 14s ease-in-out infinite',
      }}
    />
  );
}

/** Minimalist candlestick / bar-chart art — represents financial data */
function BarChartArt({ x = 0, y = 0, scale = 1, opacity = 0.06 }) {
  const bars = [
    { h: 80, col: 'var(--success)' },
    { h: 130, col: 'var(--accent)' },
    { h: 60,  col: 'var(--success)' },
    { h: 170, col: 'var(--primary-brand)' },
    { h: 110, col: 'var(--accent)' },
    { h: 200, col: 'var(--primary-brand)' },
    { h: 145, col: 'var(--success)' },
  ];
  const W = 220, H = 220;
  const bw = 20, gap = 10;
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x, top: y,
        width: W * scale, height: H * scale,
        opacity,
        pointerEvents: 'none',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        overflow: 'visible',
      }}
      viewBox={`0 0 ${W} ${H}`}
    >
      {bars.map((b, i) => (
        <rect
          key={i}
          x={i * (bw + gap)}
          y={H - b.h}
          width={bw}
          height={b.h}
          rx="4"
          fill={b.col}
        />
      ))}
      {/* trend line */}
      <polyline
        points={bars.map((b, i) => `${i * (bw + gap) + bw / 2},${H - b.h}`).join(' ')}
        fill="none"
        stroke="var(--primary-brand)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="5 4"
        opacity="0.5"
      />
    </svg>
  );
}

/** Minimalist shield / compliance badge art */
function ShieldArt({ x = 0, y = 0, size = 120, opacity = 0.05 }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', left: x, top: y,
        width: size, height: size,
        opacity, pointerEvents: 'none',
      }}
      viewBox="0 0 100 120"
    >
      <path
        d="M50 5 L90 20 L90 60 Q90 95 50 115 Q10 95 10 60 L10 20 Z"
        fill="none"
        stroke="var(--primary-brand)"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      {/* checkmark inside */}
      <polyline
        points="32,60 45,73 68,47"
        fill="none"
        stroke="var(--success)"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Floating "document" icons — receipt / tax form art */
function DocumentArt({ x = 0, y = 0, w = 70, opacity = 0.06 }) {
  const h = w * 1.3;
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', left: x, top: y,
        width: w, height: h,
        opacity, pointerEvents: 'none',
      }}
      viewBox="0 0 70 90"
    >
      <rect x="5" y="5" width="60" height="80" rx="6" fill="none" stroke="var(--primary-brand)" strokeWidth="2.5" />
      {/* fold corner */}
      <polyline points="45,5 45,20 60,20" fill="none" stroke="var(--primary-brand)" strokeWidth="2" />
      {/* lines representing text */}
      {[30, 40, 50, 60, 70].map((yy, i) => (
        <line key={i} x1="14" y1={yy} x2={i === 4 ? 44 : 56} y2={yy} stroke="var(--border)" strokeWidth="2" strokeLinecap="round" />
      ))}
    </svg>
  );
}

/** Coin / currency circle art */
function CoinArt({ x = 0, y = 0, r = 50, opacity = 0.05 }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute', left: x, top: y,
        width: r * 2, height: r * 2,
        opacity, pointerEvents: 'none',
      }}
      viewBox="0 0 100 100"
    >
      <circle cx="50" cy="50" r="46" fill="none" stroke="var(--warning)" strokeWidth="3" />
      <circle cx="50" cy="50" r="36" fill="none" stroke="var(--warning)" strokeWidth="1.5" strokeDasharray="4 4" />
      <text x="50" y="57" textAnchor="middle" fontSize="28" fontWeight="700" fill="var(--warning)" fontFamily="system-ui">$</text>
    </svg>
  );
}

/** Large Abstract Watermark ACA Logo Art in the Background */
function AbstractLogoArt({ x = '50%', y = '25%', size = 520, opacity = 0.045, rotation = -10 }) {
  return (
    <svg
      aria-hidden="true"
      style={{
        position: 'absolute',
        left: x,
        top: y,
        transform: `translate(-50%, -10%) rotate(${rotation}deg)`,
        width: size,
        height: size,
        opacity,
        pointerEvents: 'none',
        overflow: 'visible',
      }}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Outer Shield watermark with dashed border */}
      <path 
        d="M60 10 L10 25 L10 65 C10 85 30 105 60 115 C90 105 110 85 110 65 L110 25 L60 10 Z" 
        stroke="var(--primary-brand)" 
        strokeWidth="2.5" 
        strokeDasharray="6 4"
        strokeLinejoin="round" 
      />
      
      {/* Inner offset Shield */}
      <path 
        d="M60 20 L20 32 L20 65 C20 80 35 95 60 105 C85 95 100 80 100 65 L100 32 L60 20 Z" 
        stroke="var(--accent)" 
        strokeWidth="1.5" 
        strokeDasharray="4 4"
        opacity="0.7"
      />

      {/* The Letter 'A' */}
      <path 
        d="M60 25 L30 95 M60 25 L90 95" 
        stroke="var(--primary-brand)" 
        strokeWidth="3.5" 
        strokeLinecap="square" 
        strokeLinejoin="miter" 
      />
      
      {/* Crossbar of 'A' */}
      <path 
        d="M40 75 L80 75" 
        stroke="var(--primary-brand)" 
        strokeWidth="3" 
        strokeLinecap="square" 
      />
      
      {/* Tech Nodes / Branches */}
      <path 
        d="M60 65 L35 45 M60 65 L60 40 M60 65 L85 45" 
        stroke="var(--accent)" 
        strokeWidth="2" 
        strokeLinecap="round" 
      />
      
      {/* Node Circles */}
      <circle cx="35" cy="45" r="4" fill="var(--accent)" />
      <circle cx="60" cy="40" r="4" fill="var(--accent)" />
      <circle cx="85" cy="45" r="4" fill="var(--accent)" />
      
      {/* Center Circle with Checkmark */}
      <circle cx="60" cy="65" r="8" fill="var(--accent)" />
      <path 
        d="M55 65 L58 68 L65 61" 
        stroke="#FFFFFF" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
      />
    </svg>
  );
}

/* ─── Main wrapper ─── */
export default function DashboardBackground({ children, jurisdiction = 'ca' }) {
  // Pick accent glow colour by jurisdiction
  const glowColor =
    jurisdiction === 'ca' ? 'rgba(180,83,9,0.08)'
    : jurisdiction === 'us' ? 'rgba(220,38,38,0.07)'
    : 'rgba(249,115,22,0.09)';

  return (
    <div style={{ position: 'relative', minHeight: '100%', overflow: 'hidden' }}>

      {/* ── Background art layer (non-interactive, fully decorative) ── */}
      <div aria-hidden="true" style={{ position: 'absolute', inset: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>

        {/* Subtle diagonal ledger lines */}
        <LedgerLines />

        {/* Large Central Abstract Logo Watermark */}
        <AbstractLogoArt x="50%" y="22%" size={580} opacity={0.05} rotation={-12} />
        
        {/* Floating Secondary Abstract Logo Watermark in Bottom-Left */}
        <AbstractLogoArt x="15%" y="75%" size={340} opacity={0.035} rotation={15} />

        {/* Radial glow top-right */}
        <TopRightGlow color={glowColor} />

        {/* Bottom-left gentle glow */}
        <div style={{
          position: 'absolute', bottom: '-80px', left: '-80px',
          width: '380px', height: '380px',
          background: 'radial-gradient(circle, rgba(22,163,74,0.07) 0%, transparent 70%)',
          borderRadius: '50%',
          animation: 'float 18s ease-in-out infinite reverse',
        }} />

        {/* Large bar-chart art — bottom right */}
        <div style={{ position: 'absolute', bottom: '60px', right: '40px' }}>
          <BarChartArt x={0} y={0} opacity={0.055} scale={1.1} />
        </div>

        {/* Shield art — mid-left */}
        <ShieldArt x={-20} y="40%" size={160} opacity={0.04} />

        {/* Document arts scattered */}
        <DocumentArt x="78%" y="12%" w={80} opacity={0.05} />
        <DocumentArt x="12%" y="65%" w={55} opacity={0.04} />

        {/* Coin art */}
        <CoinArt x="88%" y="55%" r={55} opacity={0.05} />
        <CoinArt x="4%"  y="8%"  r={38} opacity={0.04} />

      </div>

      {/* ── Actual dashboard content on top ── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {children}
      </div>
    </div>
  );
}
