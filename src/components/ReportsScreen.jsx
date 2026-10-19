import React, { useState } from 'react';
import { BarChart3, PieChart, TrendingUp, Download, Calendar, Filter, Sparkles, FileText, ArrowUpRight } from 'lucide-react';
import DashboardBackground from './dashboards/DashboardBackground';

export default function ReportsScreen() {
  const [selectedYear, setSelectedYear] = useState('2026');

  return (
    <DashboardBackground>
      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Header */}
        <div style={{ marginBottom: '32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <BarChart3 size={32} color="var(--accent)" /> Executive Reports & Analytics
            </h1>
            <p style={{ fontSize: '15px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              Detailed tax liability breakdowns, deduction accrual, and multi-year trajectory reports.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '12px' }}>
            <select
              value={selectedYear}
              onChange={e => setSelectedYear(e.target.value)}
              style={{ padding: '10px 16px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border)', backgroundColor: 'var(--cards)', color: 'var(--text-primary)', fontWeight: '700' }}
            >
              <option value="2026">Tax Year 2026</option>
              <option value="2025">Tax Year 2025</option>
              <option value="2024">Tax Year 2024</option>
            </select>

            <button style={{ padding: '10px 20px', backgroundColor: 'var(--accent)', color: '#FFF', borderRadius: 'var(--radius-md)', fontWeight: '700', fontSize: '14px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <Download size={16} /> Export PDF Report
            </button>
          </div>
        </div>

        {/* Top Summary Metrics */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginBottom: '32px' }}>
          {[
            { label: 'Gross Annual Income', val: '$112,500', sub: '+8.4% vs 2025', color: 'var(--primary-brand)' },
            { label: 'Total Deductions Claimed', val: '$18,400', sub: 'Maximized by AI', color: 'var(--accent)' },
            { label: 'Effective Tax Rate', val: '19.4%', sub: 'Reduced from 24.2%', color: 'var(--success)' },
            { label: 'Estimated Refund', val: '$2,750', sub: 'Scheduled Direct Deposit', color: 'var(--success)' },
          ].map((m, i) => (
            <div key={i} className="aca-card">
              <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{m.label}</div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: m.color, margin: '6px 0' }}>{m.val}</div>
              <div style={{ fontSize: '12px', fontWeight: '700', color: 'var(--success)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <ArrowUpRight size={14} /> {m.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Report Visualizations Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginBottom: '32px' }}>
          
          {/* Bar Chart Representation */}
          <div className="aca-card">
            <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <TrendingUp size={20} color="var(--accent)" /> Monthly Tax Liability vs AI Deduction Accrual
            </h3>

            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '16px', height: '220px', paddingTop: '20px', borderBottom: '1px solid var(--border)', paddingBottom: '12px' }}>
              {[
                { month: 'Jan', tax: 60, ded: 40 },
                { month: 'Feb', tax: 65, ded: 45 },
                { month: 'Mar', tax: 70, ded: 55 },
                { month: 'Apr', tax: 80, ded: 65 },
                { month: 'May', tax: 75, ded: 60 },
                { month: 'Jun', tax: 85, ded: 75 },
                { month: 'Jul', tax: 90, ded: 80 },
                { month: 'Aug', tax: 95, ded: 88 },
              ].map((b, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end', gap: '6px' }}>
                  <div style={{ width: '100%', display: 'flex', gap: '4px', alignItems: 'flex-end', height: '100%' }}>
                    <div style={{ width: '50%', height: `${b.tax}%`, backgroundColor: 'var(--primary-brand)', borderRadius: '4px 4px 0 0' }} title={`Tax: $${b.tax * 20}`} />
                    <div style={{ width: '50%', height: `${b.ded}%`, backgroundColor: 'var(--accent)', borderRadius: '4px 4px 0 0' }} title={`Deduction: $${b.ded * 20}`} />
                  </div>
                  <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary)' }}>{b.month}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '24px', marginTop: '16px', justifyContent: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '700' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--primary-brand)', borderRadius: '3px' }} /> Gross Tax Liability
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)', fontWeight: '700' }}>
                <div style={{ width: '12px', height: '12px', backgroundColor: 'var(--accent)', borderRadius: '3px' }} /> AI Deductions Accrued
              </div>
            </div>
          </div>

          {/* Deductions Pie Breakdown */}
          <div className="aca-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <PieChart size={20} color="var(--accent)" /> Deduction Category Share
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { name: 'RRSP / 401(k) Match', pct: '42%', val: '$7,728' },
                  { name: 'Home Office & Utilities', pct: '28%', val: '$5,152' },
                  { name: 'Medical & Healthcare', pct: '18%', val: '$3,312' },
                  { name: 'Professional & Tech Dues', pct: '12%', val: '$2,208' },
                ].map((c, i) => (
                  <div key={i}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)', marginBottom: '4px' }}>
                      <span>{c.name}</span>
                      <span>{c.val} ({c.pct})</span>
                    </div>
                    <div style={{ width: '100%', height: '8px', backgroundColor: 'var(--secondary-bg)', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{ width: c.pct, height: '100%', backgroundColor: 'var(--accent)', borderRadius: '4px' }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>

      </div>
    </DashboardBackground>
  );
}
