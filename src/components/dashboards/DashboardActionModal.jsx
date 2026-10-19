import React from 'react';
import { X, CheckCircle2 } from 'lucide-react';

export default function DashboardActionModal({ title, description, icon: Icon, onClose, onConfirm }) {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15,23,42,0.8)', backdropFilter: 'blur(4px)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="animate-fade-in" style={{ backgroundColor: 'var(--cards)', padding: '32px', borderRadius: '16px', maxWidth: '500px', width: '90%', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', backgroundColor: 'rgba(46,111,168,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Icon size={24} color="var(--primary-brand)" />
            </div>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)' }}>{title}</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={24} /></button>
        </div>
        
        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px', lineHeight: '1.5' }}>{description}</p>
        
        <div style={{ padding: '24px', backgroundColor: 'var(--secondary-bg)', borderRadius: '8px', marginBottom: '24px', border: '1px dashed var(--border)' }}>
           <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center' }}>[Interactive Form Layer]</p>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
          <button onClick={onClose} className="btn-secondary" style={{ padding: '10px 20px' }}>Cancel</button>
          <button onClick={onConfirm || onClose} className="btn-primary" style={{ padding: '10px 20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
             <CheckCircle2 size={16} /> Continue
          </button>
        </div>
      </div>
    </div>
  );
}
