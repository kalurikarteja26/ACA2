import React, { useState } from 'react';
import { FileCheck, Send, CheckCircle2, Clock, ShieldCheck, Download, Sparkles, AlertCircle, FileText } from 'lucide-react';
import DashboardBackground from './dashboards/DashboardBackground';

export default function FilingReviewScreen() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <DashboardBackground>
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <FileCheck size={32} color="var(--accent)" /> Filing & Review Center
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Review tax summary line items & execute official EFILE submission to tax authorities.
            </p>
          </div>

          <span className="badge badge-success" style={{ padding: '8px 16px', fontSize: '13px' }}>
            Tax Year 2026 Ready
          </span>
        </div>

        {/* Pipeline Progress Steps */}
        <div className="aca-card" style={{ marginBottom: '32px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', textAlign: 'center' }}>
            {[
              { step: '1', title: 'Data Intake', status: 'Completed', icon: CheckCircle2, color: 'var(--success)' },
              { step: '2', title: 'AI Write-off Scan', status: 'Completed', icon: CheckCircle2, color: 'var(--success)' },
              { step: '3', title: 'CRA/IRS Audit Check', status: 'Completed', icon: CheckCircle2, color: 'var(--success)' },
              { step: '4', title: 'EFILE Transmission', status: submitted ? 'Transmitted' : 'Ready to File', icon: Send, color: submitted ? 'var(--success)' : 'var(--accent)' },
            ].map((st, i) => (
              <div key={i} style={{ padding: '16px', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
                  <st.icon size={20} color={st.color} />
                  <span style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)' }}>STEP {st.step}</span>
                </div>
                <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary-brand)' }}>{st.title}</div>
                <div style={{ fontSize: '12px', fontWeight: '700', color: st.color, marginTop: '2px' }}>{st.status}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tax Return Line Item Breakdown */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Main Calculation Summary */}
          <div className="aca-card">
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FileText size={20} color="var(--accent)" /> T1 / Form 1040 Income Tax Return Summary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {[
                { line: 'Line 10100 / Line 1z', label: 'Total Employment Wages & Salary', val: '$112,500' },
                { line: 'Line 12100 / Line 2b', label: 'Investment & Dividend Income', val: '$3,850' },
                { line: 'Line 23600 / Line 11', label: 'Net Taxable Income', val: '$116,350' },
                { line: 'Line 27500 / Line 12', label: 'Total Deductions Claimed (RRSP/401k/Home)', val: '- $18,400' },
                { line: 'Line 43700 / Line 25', label: 'Total Income Tax Withheld by Employer', val: '$24,800' },
                { line: 'Line 42000 / Line 24', label: 'Net Federal & Provincial Tax Payable', val: '$22,050' },
              ].map((row, i) => (
                <div key={i} style={{ padding: '12px 16px', backgroundColor: 'var(--secondary-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)' }}>{row.line}</span>
                    <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--primary-brand)' }}>{row.label}</div>
                  </div>
                  <div style={{ fontSize: '15px', fontWeight: '800', color: 'var(--primary-brand)' }}>{row.val}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Refund Hero & Transmission Trigger */}
          <div className="aca-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Calculated Net Refund</div>
              <div style={{ fontSize: '48px', fontWeight: '900', color: 'var(--success)', margin: '8px 0' }}>+$2,750</div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>
                Direct deposit scheduled to your linked bank account within 8 business days of transmission.
              </p>
            </div>

            <div>
              {submitted ? (
                <div style={{ padding: '16px', backgroundColor: 'var(--success-bg)', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)' }}>
                  <CheckCircle2 size={32} color="var(--success)" style={{ margin: '0 auto 8px' }} />
                  <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--success)' }}>EFILE Transmission Successful!</div>
                  <div style={{ fontSize: '12px', color: '#166534', marginTop: '4px' }}>Confirmation Code: ACA-2026-849102-CRA</div>
                </div>
              ) : (
                <button
                  onClick={() => setSubmitted(true)}
                  style={{
                    width: '100%',
                    padding: '16px 24px',
                    backgroundColor: 'var(--accent)',
                    color: '#FFF',
                    borderRadius: 'var(--radius-md)',
                    fontWeight: '800',
                    fontSize: '16px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '10px',
                    boxShadow: 'var(--shadow-md)'
                  }}
                >
                  <Send size={20} /> Transmit Return (EFILE)
                </button>
              )}
            </div>
          </div>

        </div>

      </div>
    </DashboardBackground>
  );
}
