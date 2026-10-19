import React, { useState, useEffect } from 'react';
import AcaLogo from './AcaLogo';
import { Sparkles, ShieldCheck, Cpu } from 'lucide-react';

export default function SplashScreen({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Initializing DataNova Autonomous Tax Engine...');
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => {
      setProgress(40);
      setStatusText('Verifying CRA NETFILE, IRS MeF & ITD e-Filing 2.0 Gateways...');
    }, 400);

    const t2 = setTimeout(() => {
      setProgress(80);
      setStatusText('Loading 256-Bit Encrypted Document Vaults & AI Slip Parsers...');
    }, 900);

    const t3 = setTimeout(() => {
      setProgress(100);
      setStatusText('Platform Ready!');
      setFading(true);
    }, 1500);

    const t4 = setTimeout(() => {
      if (onFinish) onFinish();
    }, 1850);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
    };
  }, [onFinish]);

  return (
    <div
      onClick={() => { setFading(true); setTimeout(onFinish, 350); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 999999,
        backgroundColor: '#050B14',
        color: '#FFFFFF',
        display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        padding: '36px',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.35s ease-out',
        cursor: 'pointer',
        userSelect: 'none'
      }}
    >
      {/* Glow Radial Backdrop */}
      <div style={{
        position: 'absolute', width: '600px', height: '600px', borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.35) 0%, rgba(56,189,248,0.18) 45%, transparent 75%)',
        pointerEvents: 'none', filter: 'blur(50px)'
      }} />

      {/* Centered Logo & Title Group */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20px' }}>
        
        {/* Pulsing Logo Container */}
        <div style={{
          padding: '24px 32px', borderRadius: '28px', backgroundColor: 'rgba(11, 21, 40, 0.90)',
          border: '1.5px solid rgba(56, 189, 248, 0.3)', boxShadow: '0 20px 50px rgba(0, 0, 0, 0.6), 0 0 30px rgba(37, 99, 235, 0.25)',
          backdropFilter: 'blur(16px)', transform: 'scale(1.25)', marginBottom: '16px'
        }}>
          <AcaLogo size="large" />
        </div>

        {/* Project Name Centered */}
        <h1 style={{ fontSize: '38px', fontWeight: '900', letterSpacing: '-0.5px', color: '#FFFFFF', textShadow: '0 4px 20px rgba(0,0,0,0.6)' }}>
          ACA Autonomous Tax Platform
        </h1>

        <p style={{ fontSize: '15px', color: '#CBD5E1', maxWidth: '520px', lineHeight: '1.5' }}>
          Multi-Jurisdictional Tax Filing Engine powered by <span style={{ color: '#38BDF8', fontWeight: '800' }}>DataNova</span> Intelligence
        </p>

        {/* Region Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
          <span style={{ padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(147, 197, 253, 0.3)', fontSize: '12px', fontWeight: '700', color: '#BFDBFE' }}>
            🇨🇦 CRA NETFILE 2026
          </span>
          <span style={{ padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(147, 197, 253, 0.3)', fontSize: '12px', fontWeight: '700', color: '#93C5FD' }}>
            🇺🇸 IRS MeF 1040
          </span>
          <span style={{ padding: '6px 14px', borderRadius: '999px', backgroundColor: 'rgba(37, 99, 235, 0.15)', border: '1px solid rgba(147, 197, 253, 0.3)', fontSize: '12px', fontWeight: '700', color: '#60A5FA' }}>
            🇮🇳 ITD e-Filing 2.0
          </span>
        </div>

        {/* Progress Bar & Status Text */}
        <div style={{ width: '320px', marginTop: '28px' }}>
          <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(255,255,255,0.12)', borderRadius: '999px', overflow: 'hidden', marginBottom: '10px' }}>
            <div style={{
              width: `${progress}%`, height: '100%',
              background: 'linear-gradient(90deg, #1D4ED8 0%, #3B82F6 50%, #93C5FD 100%)',
              borderRadius: '999px', transition: 'width 0.4s ease'
            }} />
          </div>
          <div style={{ fontSize: '12px', color: '#93C5FD', fontWeight: '600', letterSpacing: '0.02em' }}>
            {statusText}
          </div>
        </div>

        <div style={{ fontSize: '11px', color: '#475569', marginTop: '16px' }}>
          Click anywhere to enter immediately
        </div>
      </div>
    </div>
  );
}
