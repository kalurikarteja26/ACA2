import React from 'react';
import { ShieldAlert, ArrowLeft, Lock, FileText, HelpCircle } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function AccessDeniedScreen({ tab = 'admin', reason, onReturnHome }) {
  const { user } = useUser();

  return (
    <div className="animate-fade-in" style={{ padding: '80px 24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', minHeight: 'calc(100vh - 120px)' }}>
      
      <div style={{
        width: '84px', height: '84px', borderRadius: '24px',
        backgroundColor: 'var(--secondary-bg)', border: '2px solid var(--accent)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        marginBottom: '28px', boxShadow: '0 8px 30px var(--accent-glow)'
      }}>
        <ShieldAlert size={44} color="var(--accent)" />
      </div>

      <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '4px 14px', borderRadius: '999px', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border)', fontSize: '12px', fontWeight: '800', color: 'var(--accent)', marginBottom: '16px' }}>
        <Lock size={13} /> HTTP 403 • FORBIDDEN ACCESS VIOLATION
      </div>

      <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--primary-brand)', letterSpacing: '-0.5px', marginBottom: '12px' }}>
        Access Restricted by Policy Guard
      </h1>

      <p style={{ fontSize: '15px', color: 'var(--text-secondary)', maxWidth: '580px', lineHeight: '1.6', marginBottom: '28px' }}>
        {reason || `Your active account (${user.email || 'Current User'}) with role '${user.userType || 'User'}' does not hold the necessary security clearance or permission level to access the ${tab.toUpperCase()} module.`}
      </p>

      <div style={{ padding: '16px 24px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)', maxWidth: '520px', width: '100%', marginBottom: '32px', textAlign: 'left', fontSize: '13px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: '700' }}>Active Role:</span>
          <span style={{ color: 'var(--primary-brand)', fontWeight: '800' }}>{user.userType}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: '700' }}>Required Clearance:</span>
          <span style={{ color: 'var(--accent)', fontWeight: '800' }}>{tab === 'admin' ? 'System Administrator' : 'CA Practitioner'}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-muted)', fontWeight: '700' }}>Audit Telemetry:</span>
          <span style={{ color: 'var(--text-muted)' }}>Security Violation Logged ✓</span>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '14px' }}>
        <button
          onClick={onReturnHome}
          className="btn-primary"
          style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px' }}
        >
          <ArrowLeft size={16} /> Return to Authorized Dashboard
        </button>
      </div>

    </div>
  );
}
