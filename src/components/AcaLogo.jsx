import React from 'react';

export default function AcaLogo({ size = 'medium', showText = true, layout = 'horizontal' }) {
  // Sizes: small (34px icon), medium (42px icon), large (56px icon)
  const iconDimensions = size === 'small' ? 34 : size === 'large' ? 56 : 42;
  const acaFontSize = size === 'small' ? '20px' : size === 'large' ? '32px' : '24px';
  const subtitleFontSize = size === 'small' ? '10px' : size === 'large' ? '13px' : '11px';

  return (
    <div style={{
      display: 'inline-flex',
      alignItems: 'center',
      gap: size === 'small' ? '10px' : '14px',
      flexDirection: layout === 'vertical' ? 'column' : 'row',
      textAlign: layout === 'vertical' ? 'center' : 'left'
    }}>
      {/* ── Official ACA Shield SVG Icon ── */}
      <svg
        width={iconDimensions}
        height={iconDimensions * 1.12}
        viewBox="0 0 100 112"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        {/* Shield Outer Path */}
        <path
          d="M50 4L12 18V50C12 73.5 28.5 94.8 50 108C71.5 94.8 88 73.5 88 50V18L50 4Z"
          stroke="var(--text-primary)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        {/* Stylized Letter 'A' */}
        <path
          d="M50 24L28 78H39L44.5 63H55.5L61 78H72L50 24ZM48 53L50 43L52 53H48Z"
          fill="var(--text-primary)"
        />
        {/* Teal Node Network Overlay */}
        <path
          d="M30 42L50 56L70 42"
          stroke="var(--accent)"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* Left Node Dot */}
        <circle cx="30" cy="42" r="5" fill="var(--accent)" />
        {/* Right Node Dot */}
        <circle cx="70" cy="42" r="5" fill="var(--accent)" />
        {/* Center Node Badge with Checkmark */}
        <circle cx="50" cy="56" r="9" fill="var(--accent)" />
        <path
          d="M46 56L48.5 58.5L54 53"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* ── Logo Text Stack ── */}
      {showText && (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{
            fontSize: acaFontSize,
            fontWeight: '900',
            fontFamily: 'var(--font-heading)',
            color: 'var(--text-primary)',
            letterSpacing: '-0.8px',
            lineHeight: '1'
          }}>
            ACA
          </div>
          <div style={{
            fontSize: subtitleFontSize,
            fontWeight: '700',
            fontFamily: 'var(--font-sans)',
            color: 'var(--text-secondary)',
            lineHeight: '1.25',
            marginTop: '3px'
          }}>
            <div>Autonomous</div>
            <div>Compliance Assistant</div>
          </div>
        </div>
      )}
    </div>
  );
}
