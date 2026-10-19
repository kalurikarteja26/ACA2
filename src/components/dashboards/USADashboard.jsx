import React from 'react';
import { FileText, ShieldCheck, DollarSign, ArrowUpRight, Clock, AlertCircle, Sparkles, CheckCircle2, FileCheck } from 'lucide-react';
import { useUser } from '../../context/UserContext';
import { useLanguage } from '../../context/LanguageContext';

export default function USADashboard({ onNavigate }) {
  const { user } = useUser();
  const { t } = useLanguage();

  return (
    <div className="animate-fade-in" style={{ padding: '48px 56px', maxWidth: '1480px', margin: '0 auto' }}>
      
      {/* Expansive Hero Header Container */}
      <div style={{
        padding: '40px 48px', borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--hero-bg)',
        color: 'var(--hero-text)', marginBottom: '56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        boxShadow: 'var(--shadow-lg)'
      }}>
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 12px', borderRadius: '999px', backgroundColor: 'rgba(255,255,255,0.15)', fontSize: '12px', fontWeight: '800', marginBottom: '14px', color: '#93C5FD' }}>
            🇺🇸 IRS MeF 2026 Engine Connected
          </div>
          <h1 style={{ fontSize: '34px', fontWeight: '900', letterSpacing: '-0.5px', marginBottom: '8px', color: 'var(--hero-text)' }}>
            {t('welcome')}, {user.fullName || 'Taxpayer'}!
          </h1>
          <p style={{ fontSize: '15px', color: 'var(--hero-subtext)' }}>
            Tax Year 2025 • Form 1040 U.S. Individual Income Tax Return
          </p>
        </div>

        <button onClick={() => onNavigate('filing')} className="btn-primary" style={{ padding: '14px 28px', fontSize: '15px', fontWeight: '800', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} /> {t('startReturn')}
        </button>
      </div>

      {/* Sleek Compact Metric Cards Grid with Impressive Spacing */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '36px', marginBottom: '56px' }}>
        
        <div className="aca-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('estimatedRefund')}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <DollarSign size={18} color="var(--success)" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--success)', fontFamily: 'var(--font-mono)' }}>$3,820.00</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Based on W-2 wage statement & 401(k)</div>
        </div>

        <div className="aca-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('auditRisk')}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--success-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <ShieldCheck size={18} color="var(--success)" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)' }}>Minimal (2.1%)</div>
          <div style={{ fontSize: '12px', color: 'var(--success)', marginTop: '6px', fontWeight: '700' }}>✓ Standard Deduction Optimized</div>
        </div>

        <div className="aca-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('deadline')}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--warning-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={18} color="var(--warning)" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--warning)' }}>April 15</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>Extension Form 4868: Oct 15</div>
        </div>

        <div className="aca-card" style={{ padding: '24px 28px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{t('vault')}</span>
            <div style={{ width: '32px', height: '32px', borderRadius: '8px', backgroundColor: 'var(--secondary-bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileCheck size={18} color="var(--accent)" />
            </div>
          </div>
          <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>2 Documents</div>
          <div style={{ fontSize: '12px', color: 'var(--text-muted)', marginTop: '6px' }}>W-2 Employer Statement Verified</div>
        </div>

      </div>

    </div>
  );
}
