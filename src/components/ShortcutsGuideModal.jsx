import React from 'react';
import { X, Keyboard, Search, Sparkles, FileText, User } from 'lucide-react';

export default function ShortcutsGuideModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const shortcuts = [
    { key: 'Ctrl + K / Cmd + K', action: 'Quick Search tax forms & slips' },
    { key: '?', action: 'Open / Close Keyboard Shortcuts Guide' },
    { key: 'Esc', action: 'Close active modal / dropdown' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '520px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '36px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Keyboard size={24} color="var(--accent)" />
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)' }}>Keyboard Shortcuts</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '28px' }}>
          {shortcuts.map((sc, idx) => (
            <div key={idx} style={{ padding: '14px', borderRadius: '12px', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)' }}>{sc.action}</span>
              <kbd style={{ padding: '4px 10px', borderRadius: '6px', backgroundColor: 'var(--cards)', border: '1px solid var(--border)', fontFamily: 'var(--font-mono)', fontSize: '12px', fontWeight: '800', color: 'var(--accent)' }}>
                {sc.key}
              </kbd>
            </div>
          ))}
        </div>

        <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>Close Guide</button>
      </div>
    </div>
  );
}
