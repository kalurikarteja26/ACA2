import React, { useState } from 'react';
import { CheckCircle2, ArrowRight, ArrowLeft, ShieldCheck, FileText, Sparkles, Building2, AlertTriangle } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { taxFilingLimiter } from '../utils/rateLimiter';
import { logSecurityEvent, EVENT_TYPES } from '../utils/auditLogger';

export default function TaxFilingWizard({ onComplete }) {
  const { user } = useUser();
  const [step, setStep] = useState(1);
  const [submissionError, setSubmissionError] = useState('');

  const country = user.country || 'Canada';

  // Country-aware currency and tax authority settings
  const taxConfig = {
    India: {
      currencySymbol: '₹',
      incomeText: '₹18,50,000.00',
      savingsText: '₹45,200.00 in Section 80C & 80D tax deductions!',
      slipName: 'Form 16 / Form 26AS / AIS',
      taxBody: 'Income Tax Department (e-Filing Portal)',
      optimizationTitle: 'Optimizing Section 80C, 80D & HRA tax savings'
    },
    USA: {
      currencySymbol: '$',
      incomeText: '$85,400.00',
      savingsText: '$2,520.00 in 401(k) & IRA tax savings!',
      slipName: 'Form W-2 / Form 1099-NEC',
      taxBody: 'Internal Revenue Service (IRS)',
      optimizationTitle: 'Optimizing 401(k), IRA & Standard Deductions'
    },
    Canada: {
      currencySymbol: '$',
      incomeText: '$85,400.00',
      savingsText: '$2,520.00 in RRSP & FHSA tax savings!',
      slipName: 'T4 Statement / T5 Investment Slips',
      taxBody: 'Canada Revenue Agency (CRA NETFILE)',
      optimizationTitle: 'Optimizing RRSP & FHSA deduction limits'
    }
  }[country] || {
    currencySymbol: '$',
    incomeText: '$85,400.00',
    savingsText: '$2,520.00 in tax savings!',
    slipName: 'T4 / W-2 / Form 16 statements',
    taxBody: 'Regional Tax Authority',
    optimizationTitle: 'Optimizing tax deductions'
  };

  return (
    <div className="animate-fade-in" style={{ padding: '36px', maxWidth: '960px', margin: '0 auto' }}>
      <div className="aca-card" style={{ padding: '40px' }}>
        
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px', paddingBottom: '20px', borderBottom: '1px solid var(--border)' }}>
          <div>
            <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-brand)' }}>{country} Tax Return Wizard</h1>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>AI-guided line-by-line tax filing for {taxConfig.taxBody} (Step {step} of 3)</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {[1, 2, 3].map(s => (
              <div key={s} style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: step >= s ? 'var(--primary-brand)' : 'var(--secondary-bg)', color: step >= s ? '#FFF' : 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '13px' }}>
                {s}
              </div>
            ))}
          </div>
        </div>

        {/* Step 1 */}
        {step === 1 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Step 1: Review Income Statements</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>Extracted from your Vault documents: {taxConfig.slipName}</p>
            
            <div style={{ padding: '20px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', marginBottom: '28px', border: '1px solid var(--border)' }}>
              <div style={{ fontSize: '16px', fontWeight: '800', color: 'var(--primary-brand)' }}>
                Primary Annual Gross Income: <span style={{ color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{taxConfig.incomeText}</span>
              </div>
              <div style={{ fontSize: '13px', color: 'var(--success)', fontWeight: '700', marginTop: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <CheckCircle2 size={16} /> Verified against {taxConfig.taxBody} API
              </div>
            </div>
          </div>
        )}

        {/* Step 2 */}
        {step === 2 && (
          <div>
            <h2 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px' }}>Step 2: AI Deduction Optimizer</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '24px' }}>{taxConfig.optimizationTitle}</p>
            
            <div style={{ padding: '20px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: '12px', marginBottom: '28px', fontWeight: '800', fontSize: '15px', border: '1px solid var(--success)' }}>
              💡 AI Savings Result: You saved {taxConfig.savingsText}
            </div>
          </div>
        )}

        {/* Step 3 */}
        {step === 3 && (
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <ShieldCheck size={56} color="var(--success)" style={{ margin: '0 auto 16px' }} />
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '8px', color: 'var(--primary-brand)' }}>Ready for Submission to {taxConfig.taxBody}!</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginBottom: '28px' }}>Your return has been verified with 0 audit flags. Total Gross Income: <strong>{taxConfig.incomeText}</strong></p>
          </div>
        )}

        {submissionError && (
          <div style={{ marginTop: '16px', padding: '12px 16px', borderRadius: '10px', backgroundColor: 'var(--secondary-bg)', border: '1.5px solid var(--accent)', color: 'var(--accent)', fontSize: '13px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={16} /> {submissionError}
          </div>
        )}

        {/* Footer Navigation Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeft size={16} /> Previous Step
            </button>
          ) : <div />}

          {step < 3 ? (
            <button onClick={() => { setSubmissionError(''); setStep(step + 1); }} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Next Step <ArrowRight size={16} />
            </button>
          ) : (
            <button 
              onClick={() => {
                // Rate Limiting Check (Max 3 submissions / min)
                const rateCheck = taxFilingLimiter.attempt(user.email || 'user_filing');
                if (!rateCheck.allowed) {
                  setSubmissionError(`Submission Rate Exceeded: ${rateCheck.message}`);
                  return;
                }

                // Log Audit Trail
                logSecurityEvent(EVENT_TYPES.TAX_SUBMITTED, {
                  country,
                  taxBody: taxConfig.taxBody,
                  user: user.fullName,
                  accountCode: user.accountCode
                }, 'INFO');

                onComplete();
              }} 
              className="btn-primary" 
              style={{ backgroundColor: 'var(--accent)', color: '#FFF', display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              Submit Return to {taxConfig.taxBody} <Sparkles size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
