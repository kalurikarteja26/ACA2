import React from 'react';
import { Shield, ShieldCheck, AlertCircle, CheckCircle2, RefreshCw, Lock, Sparkles, Activity, FileCheck, ArrowRight } from 'lucide-react';
import DashboardBackground from './dashboards/DashboardBackground';

export default function ComplianceHealthScreen() {
  const auditChecks = [
    { title: 'T4 / W-2 Income Verification vs Tax Registry', status: 'Passed', detail: 'Slips match CRA / IRS My Account records 100%.', score: '100%' },
    { title: 'Home Office Expense Ratio Threshold Check', status: 'Passed', detail: 'Claimed 12% of total dwelling area, well under the 20% CRA audit flag.', score: '98%' },
    { title: 'Foreign Asset Declaration Threshold (T1135 / FBAR)', status: 'Passed', detail: 'Offshore holdings under $100K CAD / USD limit.', score: '100%' },
    { title: 'Medical Receipts & Prescription Proof', status: 'Action Needed', detail: '2 prescription receipts require high-resolution re-scan.', score: '88%' },
    { title: 'RRSP / 401(k) Deduction Limit Verification', status: 'Passed', detail: 'Deduction within CRA / IRS maximum contribution cap.', score: '100%' },
  ];

  return (
    <DashboardBackground>
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck size={32} color="var(--success)" /> Compliance Health & Audit Shield
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Real-time audit scrutiny risk scanning & official tax authority EFILE validation.
            </p>
          </div>

          <button style={{ padding: '10px 20px', backgroundColor: 'var(--accent)', color: '#FFF', borderRadius: 'var(--radius-md)', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <RefreshCw size={16} /> Run Live Audit Scan
          </button>
        </div>

        {/* Overall Health Score Hero */}
        <div className="aca-card" style={{ marginBottom: '32px', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '32px', alignItems: 'center' }}>
          <div style={{ textAlign: 'center', padding: '24px', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-xl)', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Overall Compliance Score</div>
            <div style={{ fontSize: '64px', fontWeight: '900', color: 'var(--success)', margin: '8px 0' }}>98<span style={{ fontSize: '24px', color: 'var(--text-muted)' }}>/100</span></div>
            <div className="badge badge-success" style={{ padding: '6px 14px', fontSize: '13px' }}>Optimal Compliance • Ultra Low Audit Risk</div>
          </div>

          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '12px' }}>
              Your Tax Return is EFILE Ready & Audit Protected
            </h3>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '20px' }}>
              ACA Autonomous AI has scanned 24 potential CRA & IRS audit triggers. Your return demonstrates exceptional accuracy and qualifies for our $1,000,000 legal audit defense guarantee.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>INCOME PROOF</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)', marginTop: '2px' }}>100% Matched</div>
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>AUDIT PROBABILITY</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--success)', marginTop: '2px' }}>0.01% (Ultra-Low)</div>
              </div>
              <div style={{ padding: '12px 16px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>DEFENSE GUARANTEE</div>
                <div style={{ fontSize: '18px', fontWeight: '800', color: 'var(--accent)', marginTop: '2px' }}>$1,000,000</div>
              </div>
            </div>
          </div>
        </div>

        {/* Audit Risk Checks List */}
        <div className="aca-card">
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Activity size={20} color="var(--accent)" /> Detailed Scrutiny & Trigger Verification Log
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {auditChecks.map((item, idx) => (
              <div key={idx} style={{ padding: '16px 20px', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                  {item.status === 'Passed' ? (
                    <CheckCircle2 size={22} color="var(--success)" />
                  ) : (
                    <AlertCircle size={22} color="var(--warning)" />
                  )}
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--primary-brand)' }}>{item.title}</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{item.detail}</div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span className={`badge ${item.status === 'Passed' ? 'badge-success' : 'badge-warning'}`}>
                    {item.status} ({item.score})
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </DashboardBackground>
  );
}
