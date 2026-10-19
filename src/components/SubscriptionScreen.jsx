import React, { useState } from 'react';
import { CreditCard, CheckCircle2, ShieldCheck, Zap, Download, Sparkles, ArrowRight, Shield, RefreshCw, Star, Building2, Check, Clock } from 'lucide-react';
import { useUser } from '../context/UserContext';

export default function SubscriptionScreen() {
  const { user, updateUser } = useUser();
  const country = user.country || 'Canada';

  const [selectedPlan, setSelectedPlan] = useState(user.plan || 'Professional');
  const [billingCycle, setBillingCycle] = useState('monthly'); // monthly | annual
  const [paymentSuccess, setPaymentSuccess] = useState('');

  // Country-aware currency symbol
  const currencySymbol = country === 'India' ? '₹' : '$';
  const proPrice = country === 'India' ? (billingCycle === 'annual' ? '₹1,999' : '₹2,499') : (billingCycle === 'annual' ? '$24' : '$29');
  const entPrice = country === 'India' ? (billingCycle === 'annual' ? '₹7,999' : '₹9,999') : (billingCycle === 'annual' ? '$79' : '$99');

  const plans = [
    {
      name: 'Starter',
      subtitle: 'For Individual Taxpayers',
      price: `${currencySymbol}0`,
      period: 'forever free',
      features: [
        'Single personal return filing',
        'Basic OCR slip document scanning',
        'CRA / IRS / ITR standard filing',
        'Standard email support',
      ],
      badge: 'Individual',
      popular: false,
    },
    {
      name: 'Professional',
      subtitle: 'For CPAs & Active Taxpayers',
      price: proPrice,
      period: billingCycle === 'annual' ? '/month (billed annually)' : '/month',
      features: [
        'Unlimited AI slip OCR document scans',
        '400+ Write-off deduction optimizer',
        'Direct CRA NETFILE / IRS e-File API submission',
        '$1,000,000 Individual Audit Shield protection',
        'Prioritized 24/7 CA Helpline support',
        'Multi-account Single Sign-On (SSO)',
      ],
      badge: 'Most Popular',
      popular: true,
    },
    {
      name: 'Enterprise',
      subtitle: 'For CA Firms & Corporate Entities',
      price: entPrice,
      period: billingCycle === 'annual' ? '/month (billed annually)' : '/month',
      features: [
        'Everything in Professional Plan',
        'Batch client file management workspace',
        'Multi-entity cross-border tax consolidation',
        'Dedicated Senior CA Account Manager',
        'Custom REST API access & webhooks',
        '99.99% Uptime SLA & SOC2 Type II compliance',
      ],
      badge: 'CA Practice',
      popular: false,
    },
  ];

  const handleSwitchPlan = (planName) => {
    setSelectedPlan(planName);
    updateUser({ plan: planName });
    setPaymentSuccess(`Successfully upgraded to ${planName} Plan!`);
    setTimeout(() => setPaymentSuccess(''), 3500);
  };

  const invoices = [
    { id: 'INV-2026-0891', date: 'Aug 01, 2026', amount: `${currencySymbol}29.00`, status: 'Paid', plan: 'Professional Monthly' },
    { id: 'INV-2026-0742', date: 'Jul 01, 2026', amount: `${currencySymbol}29.00`, status: 'Paid', plan: 'Professional Monthly' },
    { id: 'INV-2026-0610', date: 'Jun 01, 2026', amount: `${currencySymbol}29.00`, status: 'Paid', plan: 'Professional Monthly' },
  ];

  return (
    <div className="animate-fade-in" style={{ padding: '36px', maxWidth: '1180px', margin: '0 auto' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)', letterSpacing: '-0.5px' }}>
            Subscription & Billing Management
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage your ACA tax compliance tier, billing cycle, and tax-deductible receipts
          </p>
        </div>

        {paymentSuccess && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: '10px', fontWeight: '800', fontSize: '13px', border: '1px solid var(--success)' }}>
            <CheckCircle2 size={18} /> {paymentSuccess}
          </div>
        )}
      </div>

      {/* Active Subscription Status Card */}
      <div className="aca-card" style={{ padding: '32px', marginBottom: '40px', background: 'linear-gradient(135deg, var(--cards) 0%, var(--secondary-bg) 100%)', border: '1px solid var(--border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: 'var(--accent)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-md)' }}>
              <Zap size={32} />
            </div>

            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>{user.plan || 'Professional'} Tier Active</h2>
                <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)' }}>
                  ● Auto-Renewing
                </span>
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
                Account Serial ID: <strong style={{ fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{user.accountCode || 'ACA-CLT-2026-8942'}</strong> • Renews on Sept 01, 2026
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <button className="btn-secondary" onClick={() => alert('Payment method update portal loaded.')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <CreditCard size={16} /> Manage Payment Method
            </button>
            <button className="btn-primary" onClick={() => alert('Downloading tax deduction invoice PDF...')} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Download size={16} /> Download Tax Receipt
            </button>
          </div>
        </div>

        {/* Feature Check List */}
        <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border)', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: '16px', fontSize: '13px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--primary-brand)' }}>
            <CheckCircle2 size={16} color="var(--success)" /> Unlimited Neural OCR Slips
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--primary-brand)' }}>
            <CheckCircle2 size={16} color="var(--success)" /> 400+ Write-off Optimizer
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--primary-brand)' }}>
            <CheckCircle2 size={16} color="var(--success)" /> Direct CRA / IRS / ITR API
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', color: 'var(--primary-brand)' }}>
            <CheckCircle2 size={16} color="var(--success)" /> $1M Audit Shield Protection
          </div>
        </div>
      </div>

      {/* Billing Cycle Switcher Toggle */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', backgroundColor: 'var(--secondary-bg)', padding: '6px', borderRadius: '14px', border: '1px solid var(--border)' }}>
          <button
            onClick={() => setBillingCycle('monthly')}
            style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              backgroundColor: billingCycle === 'monthly' ? 'var(--cards)' : 'transparent',
              color: billingCycle === 'monthly' ? 'var(--primary-brand)' : 'var(--text-secondary)',
              fontWeight: '800', fontSize: '13px', boxShadow: billingCycle === 'monthly' ? 'var(--shadow-sm)' : 'none'
            }}
          >
            Monthly Billing
          </button>
          
          <button
            onClick={() => setBillingCycle('annual')}
            style={{
              padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer',
              backgroundColor: billingCycle === 'annual' ? 'var(--cards)' : 'transparent',
              color: billingCycle === 'annual' ? 'var(--primary-brand)' : 'var(--text-secondary)',
              fontWeight: '800', fontSize: '13px', boxShadow: billingCycle === 'annual' ? 'var(--shadow-sm)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}
          >
            <span>Annual Billing</span>
            <span style={{ fontSize: '10px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', border: '1px solid var(--success)' }}>SAVE 20%</span>
          </button>
        </div>
      </div>

      {/* Tier Plans Matrix */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.05fr 1fr', gap: '24px', marginBottom: '48px', alignItems: 'stretch' }}>
        {plans.map(plan => {
          const isCurrent = (user.plan || 'Professional') === plan.name;
          return (
            <div
              key={plan.name}
              className="aca-card"
              style={{
                padding: '36px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                border: plan.popular ? '2px solid var(--accent)' : '1px solid var(--border)',
                boxShadow: plan.popular ? 'var(--shadow-lg)' : 'var(--shadow-md)',
                transform: plan.popular ? 'scale(1.02)' : 'none',
                position: 'relative'
              }}
            >
              {plan.popular && (
                <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', backgroundColor: 'var(--accent)', color: '#FFF', padding: '4px 14px', borderRadius: '999px', fontSize: '11px', fontWeight: '900', textTransform: 'uppercase', letterSpacing: '0.05em', boxShadow: 'var(--shadow-sm)' }}>
                  ★ MOST POPULAR CPA TIER
                </div>
              )}

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <h3 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>{plan.name}</h3>
                  <span style={{ fontSize: '11px', fontWeight: '800', padding: '3px 8px', borderRadius: '6px', backgroundColor: 'var(--secondary-bg)', color: 'var(--text-muted)' }}>{plan.badge}</span>
                </div>
                
                <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '24px' }}>{plan.subtitle}</p>

                <div style={{ marginBottom: '28px' }}>
                  <span style={{ fontSize: '38px', fontWeight: '900', color: 'var(--primary-brand)', fontFamily: 'var(--font-mono)' }}>{plan.price}</span>
                  <span style={{ fontSize: '13px', color: 'var(--text-muted)', fontWeight: '600', marginLeft: '4px' }}>{plan.period}</span>
                </div>

                <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', marginBottom: '14px', letterSpacing: '0.05em' }}>
                  INCLUDED FEATURES:
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
                  {plan.features.map((feat, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '13px', color: 'var(--text-secondary)' }}>
                      <CheckCircle2 size={16} color="var(--success)" style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                disabled={isCurrent}
                onClick={() => handleSwitchPlan(plan.name)}
                className={isCurrent ? 'btn-secondary' : 'btn-primary'}
                style={{
                  width: '100%', padding: '14px', fontSize: '14px', justifyContent: 'center',
                  opacity: isCurrent ? 0.7 : 1, cursor: isCurrent ? 'default' : 'pointer'
                }}
              >
                {isCurrent ? 'Current Active Plan ✓' : `Upgrade to ${plan.name}`}
              </button>
            </div>
          );
        })}
      </div>

      {/* Billing & Tax Deductions Receipt History Table */}
      <div className="aca-card" style={{ padding: '36px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
          <div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)' }}>Tax Deduction Billing Invoices</h3>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Download official receipts for your tax software write-off claim</p>
          </div>
          <button className="btn-secondary" onClick={() => alert('Exporting all tax receipts ZIP...')} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
            <Download size={15} /> Export All Receipts
          </button>
        </div>

        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '1.5px solid var(--border)', textAlign: 'left', color: 'var(--text-muted)' }}>
              <th style={{ padding: '12px 16px', fontWeight: '800' }}>INVOICE ID</th>
              <th style={{ padding: '12px 16px', fontWeight: '800' }}>BILLING DATE</th>
              <th style={{ padding: '12px 16px', fontWeight: '800' }}>PLAN DETAILS</th>
              <th style={{ padding: '12px 16px', fontWeight: '800' }}>AMOUNT</th>
              <th style={{ padding: '12px 16px', fontWeight: '800' }}>STATUS</th>
              <th style={{ padding: '12px 16px', fontWeight: '800', textAlign: 'right' }}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map(inv => (
              <tr key={inv.id} style={{ borderBottom: '1px solid var(--border)' }}>
                <td style={{ padding: '16px', fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{inv.id}</td>
                <td style={{ padding: '16px', color: 'var(--text-secondary)' }}>{inv.date}</td>
                <td style={{ padding: '16px', fontWeight: '700', color: 'var(--primary-brand)' }}>{inv.plan}</td>
                <td style={{ padding: '16px', fontWeight: '800', color: 'var(--primary-brand)', fontFamily: 'var(--font-mono)' }}>{inv.amount}</td>
                <td style={{ padding: '16px' }}>
                  <span style={{ padding: '3px 10px', borderRadius: '999px', fontSize: '11px', fontWeight: '800', backgroundColor: 'var(--success-bg)', color: 'var(--success)' }}>
                    {inv.status}
                  </span>
                </td>
                <td style={{ padding: '16px', textAlign: 'right' }}>
                  <button onClick={() => alert(`Downloading PDF invoice for ${inv.id}`)} className="btn-secondary" style={{ padding: '6px 12px', fontSize: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Download size={13} /> PDF Receipt
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
