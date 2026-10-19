import React, { useState } from 'react';
import { Monitor, Moon, Sun, Shield, Bell, Smartphone, Key, Mail, Database, X } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

function ToggleSwitch({ checked, onChange }) {
  return (
    <div 
      onClick={() => onChange(!checked)}
      style={{
        width: '44px', height: '24px', borderRadius: '12px',
        backgroundColor: checked ? 'var(--accent)' : 'var(--border)',
        position: 'relative', cursor: 'pointer', transition: 'background-color 0.2s'
      }}
    >
      <div style={{
        width: '20px', height: '20px', borderRadius: '50%', backgroundColor: '#FFF',
        position: 'absolute', top: '2px', left: checked ? '22px' : '2px',
        transition: 'left 0.2s', boxShadow: '0 1px 3px rgba(0,0,0,0.2)'
      }} />
    </div>
  );
}

export default function SettingsScreen() {
  const { theme, setTheme, compact, setCompact } = useTheme();
  
  const [emailNotifs, setEmailNotifs] = useState(true);
  const [pushNotifs, setPushNotifs] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [autoSaveDrafts, setAutoSaveDrafts] = useState(true);
  
  const [show2faModal, setShow2faModal] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const [passwordForm, setPasswordForm] = useState({ current: '', newPass: '', confirmPass: '' });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    showToast(`🎨 Theme updated to ${newTheme.toUpperCase()} mode!`);
  };

  const handleCompactToggle = (val) => {
    setCompact(val);
    showToast(val ? '📐 Compact Mode enabled.' : '📐 Standard Spacing Mode restored.');
  };

  const confirm2FA = () => {
    setTwoFactor(true);
    setShow2faModal(false);
    showToast('🔒 Two-Factor Authentication (2FA) activated!');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '36px', maxWidth: '840px', margin: '0 auto' }}>
      
      {toastMessage && (
        <div style={{
          position: 'fixed', top: '24px', right: '24px', zIndex: 99999,
          backgroundColor: 'var(--primary-brand)', color: '#FFF',
          padding: '14px 24px', borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--shadow-lg)', fontWeight: '700', fontSize: '14px'
        }}>
          {toastMessage}
        </div>
      )}

      <h1 style={{ fontSize: '28px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '6px' }}>Settings</h1>
      <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '32px' }}>Manage display preferences, security requirements, and notifications.</p>

      {/* Display Adjustments */}
      <div className="aca-card" style={{ marginBottom: '28px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <Monitor size={18} color="var(--accent)" />
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-brand)' }}>Display & Interface</h2>
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', display: 'block', marginBottom: '12px' }}>Theme Preference</label>
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { id: 'light', label: 'Light', icon: Sun },
              { id: 'dark', label: 'Dark', icon: Moon },
              { id: 'system', label: 'System', icon: Monitor },
            ].map(t => (
              <div
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                style={{
                  flex: 1, padding: '14px', borderRadius: '10px', cursor: 'pointer',
                  border: `2px solid ${theme === t.id ? 'var(--accent)' : 'var(--border)'}`,
                  backgroundColor: theme === t.id ? 'var(--secondary-bg)' : 'var(--cards)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
                  color: theme === t.id ? 'var(--primary-brand)' : 'var(--text-secondary)',
                  fontWeight: theme === t.id ? '800' : '500'
                }}
              >
                <t.icon size={16} color={theme === t.id ? 'var(--accent)' : 'var(--text-muted)'} />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
           <div>
             <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Compact Mode</div>
             <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Reduce spacing and fit more content on screen.</div>
           </div>
           <ToggleSwitch checked={compact} onChange={handleCompactToggle} />
        </div>
      </div>

      {/* Security & Authentication */}
      <div className="aca-card" style={{ marginBottom: '28px' }}>
         <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '20px', paddingBottom: '12px', borderBottom: '1px solid var(--border)' }}>
          <Shield size={18} color="var(--accent)" />
          <h2 style={{ fontSize: '16px', fontWeight: '700', color: 'var(--primary-brand)' }}>Security & Authentication</h2>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
           <div style={{ display: 'flex', gap: '12px' }}>
             <div style={{ padding: '10px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px' }}>
               <Key size={20} color="var(--accent)" />
             </div>
             <div>
               <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary)' }}>Two-Factor Authentication (2FA)</div>
               <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>Require SMS / Authenticator app code during sign-in.</div>
             </div>
           </div>
           <ToggleSwitch checked={twoFactor} onChange={(v) => v ? setShow2faModal(true) : setTwoFactor(false)} />
        </div>
      </div>

      {/* 2FA Modal */}
      {show2faModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setShow2faModal(false)}>
          <div style={{ width: '100%', maxWidth: '480px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '32px', textAlign: 'center' }} onClick={e => e.stopPropagation()}>
            <Shield size={36} color="var(--accent)" style={{ marginBottom: '12px' }} />
            <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '8px' }}>Enable 2FA Verification</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Scan with Google Authenticator or Microsoft Authenticator.</p>
            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setShow2faModal(false)} className="btn-secondary" style={{ flex: 1, padding: '12px' }}>Cancel</button>
              <button onClick={confirm2FA} className="btn-primary" style={{ flex: 1, padding: '12px' }}>Verify & Activate</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
