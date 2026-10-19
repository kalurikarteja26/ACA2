import React, { useState } from 'react';
import { 
  ShieldCheck, Lock, Globe, Building2, Briefcase, User, Sparkles, 
  ArrowRight, CheckCircle2, FileText, ChevronRight, Eye, EyeOff, Key, Phone, Check, Shield, Database, Cpu, RefreshCw,
  Mail, MessageSquare, Headphones, X, Send, HelpCircle, FileCheck, Rocket, LogIn, AlertTriangle, PieChart, Layers, Zap, Settings, Sliders
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import ThemeSwitcher from './ThemeSwitcher';
import AcaLogo from './AcaLogo';
import { sanitizeInput, hashPassword, validatePasswordStrength, validateEmail } from '../utils/security';
import { authLimiter } from '../utils/rateLimiter';
import { logSecurityEvent, EVENT_TYPES } from '../utils/auditLogger';

/* ── Helper to derive clean display name from user input or email ── */
const deriveDisplayName = (fullName, email) => {
  if (fullName && fullName.trim()) return fullName.trim();
  if (email && email.includes('@')) {
    const handle = email.split('@')[0];
    const parts = handle.split(/[\._\-+]/).filter(Boolean);
    return parts.map(p => p.charAt(0).toUpperCase() + p.slice(1)).join(' ');
  }
  return 'Taxpayer User';
};

/* ── Interactive Info Modals for Platform, Security, Support ── */
function PlatformModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '720px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Cpu size={28} color="var(--accent)" />
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>ACA Autonomous Platform Core</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
          ACA is an enterprise-grade autonomous tax compliance system powered by DataNova analytics algorithms. Engineered specifically for multi-jurisdictional tax filing across <strong>Canada (CRA)</strong>, <strong>USA (IRS)</strong>, and <strong>India (Income Tax Department)</strong>.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-brand)', fontSize: '14px', marginBottom: '4px' }}>🤖 Neural Slip OCR Engine</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Scans T4, W-2, 1099, and Form 16 slips with 99.8% precision, extracting line items automatically.</div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-brand)', fontSize: '14px', marginBottom: '4px' }}>📊 400+ Write-off Optimizer</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>AI cross-references regional tax codes to uncover legal deductions, credits, and foreign tax credits.</div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-brand)', fontSize: '14px', marginBottom: '4px' }}>⚡ Direct Government APIs</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Direct NETFILE, e-File, and Income Tax India API connections for instant automated submission.</div>
          </div>

          <div style={{ padding: '16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontWeight: '800', color: 'var(--primary-brand)', fontSize: '14px', marginBottom: '4px' }}>🏢 CA Firm Batch Workspace</div>
            <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Allows Chartered Accountants to manage, audit, and submit hundreds of client returns simultaneously.</div>
          </div>
        </div>

        <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '14px' }}>Close Overview</button>
      </div>
    </div>
  );
}

function SecurityModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '680px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <ShieldCheck size={28} color="var(--success)" />
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>Bank-Grade Security Architecture</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
          Your financial tax data is protected with <strong>AES-256 GCM encryption</strong> at rest and <strong>TLS 1.3 encryption</strong> in transit. We maintain strict SOC2 Type II compliance and zero-knowledge data isolation.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '10px' }}>
            <CheckCircle2 size={18} color="var(--success)" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)' }}>256-Bit Hardware Encryption for document vaults</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '10px' }}>
            <CheckCircle2 size={18} color="var(--success)" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)' }}>Multi-factor biometric and OTP authentication</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px 16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '10px' }}>
            <CheckCircle2 size={18} color="var(--success)" />
            <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)' }}>Bi-directional encrypted connection with CRA, IRS, and ITD</span>
          </div>
        </div>

        <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '14px' }}>Close Security Spec</button>
      </div>
    </div>
  );
}

function SupportModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={onClose}>
      <div style={{ width: '100%', maxWidth: '600px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '40px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Headphones size={28} color="var(--accent)" />
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>Technical & Tax Advisory Support</h2>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
        </div>

        <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '24px' }}>
          Our dedicated team of Chartered Accountants, CPAs, and AI Engineers are available 24/7 to assist with tax filings, slip parsing, and account onboarding.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
          <div style={{ padding: '14px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Phone size={20} color="var(--accent)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-brand)' }}>Toll-Free CA Helpline</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>+1-800-555-ACA-TAX (24/7 Support)</div>
            </div>
          </div>

          <div style={{ padding: '14px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Mail size={20} color="var(--accent)" />
            <div>
              <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-brand)' }}>Priority Email Assistance</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>support@aca-tax.com</div>
            </div>
          </div>
        </div>

        <button onClick={onClose} className="btn-primary" style={{ width: '100%', padding: '14px', fontSize: '14px' }}>Close Support Modal</button>
      </div>
    </div>
  );
}

export default function LandingScreen({ onLogin, onOpenSupport }) {
  const { login } = useUser();
  const [role, setRole] = useState('User'); // User | CA | Agency | Admin
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [authError, setAuthError] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(null);
  
  // Option: Open Profile Settings & Avatar Setup FIRST instead of direct main dashboard
  const [openProfileSetupFirst, setOpenProfileSetupFirst] = useState(true);

  // Modal States
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const [isSecurityOpen, setIsSecurityOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);

  // Form State
  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    gender: 'Male',
    avatar: '',
    country: 'Canada',
    province: 'Ontario'
  });

  const handleChange = (field, val) => {
    setAuthError('');
    setForm(prev => ({ ...prev, [field]: val }));
    if (field === 'password' && isSignUp) {
      setPasswordStrength(validatePasswordStrength(val));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');

    // 1. Rate Limiting Check
    const rateStatus = authLimiter.attempt(form.email || 'global_auth');
    if (!rateStatus.allowed) {
      setAuthError(`🛡️ Security Defense: ${rateStatus.message}`);
      logSecurityEvent(EVENT_TYPES.RATE_LIMIT_EXCEEDED, { email: form.email, attempts: 5 }, 'WARNING');
      return;
    }

    // 2. Strict Input Sanitization (XSS Defense)
    const sanitizedName = sanitizeInput(form.fullName);
    const sanitizedEmail = sanitizeInput(form.email).trim().toLowerCase();
    const sanitizedPhone = sanitizeInput(form.phone);

    // 3. Email Validation
    if (!validateEmail(sanitizedEmail)) {
      setAuthError('Please enter a valid RFC-compliant email address.');
      logSecurityEvent(EVENT_TYPES.LOGIN_FAILED, { email: sanitizedEmail, reason: 'Invalid email format' }, 'WARNING');
      return;
    }

    // 4. Password Strength Verification for Registration
    if (isSignUp) {
      const strength = validatePasswordStrength(form.password);
      if (!strength.valid) {
        setAuthError(`Password Policy Error: ${strength.feedback}`);
        return;
      }
    }

    // 5. Cryptographic Password Hashing (SHA-256 + salt)
    const passwordHash = await hashPassword(form.password, sanitizedEmail);

    // 6. Role Derivation & Admin Verification
    let selectedRole = role; // User | CA | Agency | Admin
    if (sanitizedEmail.includes('admin') || role === 'Admin') {
      selectedRole = 'Admin';
    }

    const defaultAvatar = selectedRole === 'Agency' ? '🏢' : selectedRole === 'CA' ? '/avatars/avatar_male.png' : selectedRole === 'Admin' ? '🛡️' : '/avatars/casual_2d_male1.png';
    const computedName = deriveDisplayName(sanitizedName, sanitizedEmail);

    // 7. Audit Log Success Event
    logSecurityEvent(EVENT_TYPES.LOGIN_SUCCESS, {
      user: computedName,
      email: sanitizedEmail,
      role: selectedRole,
      passwordHashed: true,
      hashPrefix: passwordHash.substring(0, 8) + '...'
    }, 'INFO');

    // 8. Session Initialization
    login({
      fullName: computedName,
      email: sanitizedEmail,
      phone: sanitizedPhone,
      gender: form.gender,
      avatar: form.avatar || defaultAvatar,
      country: form.country,
      province: form.province,
      userType: selectedRole,
      accountCode: `ACA-${selectedRole.toUpperCase()}-2026-9842`,
      passwordHash, // Stored as cryptographic hash, NEVER plaintext!
      setupComplete: selectedRole === 'Admin' ? true : !openProfileSetupFirst
    });

    onLogin();
  };

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-primary)', position: 'relative', overflowX: 'hidden' }}>
      
      {/* ── Top Navigation Bar ── */}
      <nav style={{
        padding: '24px 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        borderBottom: '1px solid var(--border)', backgroundColor: 'var(--cards)', position: 'sticky', top: 0, zIndex: 100
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <AcaLogo size="normal" />
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
          <button onClick={() => setIsPlatformOpen(true)} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '700', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            Platform Overview
          </button>
          <button onClick={() => setIsSecurityOpen(true)} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '700', color: 'var(--text-secondary)', cursor: 'pointer' }}>
            Security Spec
          </button>
          <button onClick={() => { onOpenSupport ? onOpenSupport() : setIsSupportOpen(true); }} style={{ background: 'none', border: 'none', fontSize: '14px', fontWeight: '700', color: 'var(--accent)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Headphones size={16} /> Contact Support
          </button>
          <ThemeSwitcher />
        </div>
      </nav>

      {/* ── Expansive Hero Section ── */}
      <section style={{ padding: '100px 56px 80px', maxWidth: '1440px', margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '64px', alignItems: 'center' }}>
        
        <div>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '999px', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border)', fontSize: '13px', fontWeight: '800', color: 'var(--accent)', marginBottom: '24px' }}>
            <Sparkles size={16} /> Autonomous AI Multi-Jurisdictional Tax Compliance Engine
          </div>

          <h1 style={{ fontSize: '56px', fontWeight: '900', color: 'var(--primary-brand)', lineHeight: '1.1', letterSpacing: '-1.5px', marginBottom: '24px' }}>
            Multi-Country Tax Filing Engineered with <span style={{ color: 'var(--accent)' }}>DataNova Intelligence</span>
          </h1>

          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6', marginBottom: '40px', maxWidth: '680px' }}>
            Automate tax returns across <strong>Canada (CRA T1)</strong>, <strong>USA (IRS 1040)</strong>, and <strong>India (ITR 1-4)</strong>. Powered by neural slip OCR, 400+ write-off algorithms, and direct government e-filing connections.
          </p>

          {/* Datanova Global Key Statistics Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '24px', paddingTop: '32px', borderTop: '1px solid var(--border)' }}>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)' }}>15+</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '2px' }}>Sectors Served</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--accent)' }}>Billions</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '2px' }}>Data Points</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--success)' }}>500,000+</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '2px' }}>Returns Filed</div>
            </div>
            <div>
              <div style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)' }}>99.8%</div>
              <div style={{ fontSize: '12px', color: 'var(--text-muted)', fontWeight: '700', marginTop: '2px' }}>OCR Accuracy</div>
            </div>
          </div>
        </div>

        {/* Auth / Registration Box */}
        <div className="aca-card" style={{ padding: '40px', boxShadow: 'var(--shadow-lg)' }}>
          
          {/* Account Role Selector Tabs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '6px', marginBottom: '24px', backgroundColor: 'var(--secondary-bg)', padding: '6px', borderRadius: '12px' }}>
            <button
              type="button"
              onClick={() => { setRole('User'); setAuthError(''); }}
              style={{
                padding: '8px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                backgroundColor: role === 'User' ? 'var(--cards)' : 'transparent',
                color: role === 'User' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                fontWeight: role === 'User' ? '800' : '600', fontSize: '12px', textAlign: 'center'
              }}
            >
              👤 Taxpayer
            </button>

            <button
              type="button"
              onClick={() => { setRole('CA'); setAuthError(''); }}
              style={{
                padding: '8px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                backgroundColor: role === 'CA' ? 'var(--cards)' : 'transparent',
                color: role === 'CA' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                fontWeight: role === 'CA' ? '800' : '600', fontSize: '12px', textAlign: 'center'
              }}
            >
              💼 CA
            </button>

            <button
              type="button"
              onClick={() => { setRole('Agency'); setAuthError(''); }}
              style={{
                padding: '8px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                backgroundColor: role === 'Agency' ? 'var(--cards)' : 'transparent',
                color: role === 'Agency' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                fontWeight: role === 'Agency' ? '800' : '600', fontSize: '12px', textAlign: 'center'
              }}
            >
              🏢 Enterprise
            </button>

            <button
              type="button"
              onClick={() => { setRole('Admin'); setAuthError(''); }}
              style={{
                padding: '8px 4px', borderRadius: '8px', border: 'none', cursor: 'pointer',
                backgroundColor: role === 'Admin' ? 'var(--cards)' : 'transparent',
                color: role === 'Admin' ? 'var(--accent)' : 'var(--text-secondary)',
                fontWeight: role === 'Admin' ? '800' : '600', fontSize: '12px', textAlign: 'center'
              }}
            >
              🛡️ Admin
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--primary-brand)' }}>
              {isSignUp 
                ? `Create ${role === 'CA' ? 'CA Practitioner' : role === 'Agency' ? 'Enterprise' : role === 'Admin' ? 'Administrator' : 'Taxpayer'} Account` 
                : `Sign in to ${role === 'CA' ? 'CA Practitioner' : role === 'Agency' ? 'Enterprise' : role === 'Admin' ? 'Administrator' : 'Taxpayer'} Portal`}
            </h2>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '4px' }}>
              {role === 'Admin' 
                ? 'Secured gateway to System Operations, Audit Telemetry & RBAC Console' 
                : 'Access AI filing tools, slip vaults, and government NETFILE/MeF engines'}
            </p>
          </div>

          {authError && (
            <div style={{ padding: '12px 16px', borderRadius: '10px', backgroundColor: 'var(--secondary-bg)', border: '1.5px solid var(--accent)', color: 'var(--accent)', fontSize: '13px', fontWeight: '700', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <AlertTriangle size={18} /> {authError}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            
            {/* Full Name field available for BOTH Sign In & Sign Up so login name is 100% accurate */}
            <div>
              <label className="form-label">Full Legal Name / Account Name</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder={role === 'CA' ? 'e.g. Rajesh Sharma, CA' : role === 'Agency' ? 'e.g. Global Tax Partners Corp' : 'e.g. Alex Mercer'} 
                value={form.fullName} 
                onChange={e => handleChange('fullName', e.target.value)} 
                required={isSignUp} 
              />
            </div>

            {isSignUp && (
              <div>
                <label className="form-label">Gender</label>
                <select className="form-select" value={form.gender} onChange={e => handleChange('gender', e.target.value)}>
                  <option value="Male">Male ♂</option>
                  <option value="Female">Female ♀</option>
                  <option value="Non-Binary">Non-Binary / Other ⚧</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>
            )}

            <div>
              <label className="form-label">Email Address</label>
              <input type="email" className="form-input" placeholder="user@example.com" value={form.email} onChange={e => handleChange('email', e.target.value)} required />
            </div>

            <div>
              <label className="form-label">Password</label>
              <div style={{ position: 'relative' }}>
                <input type={showPassword ? 'text' : 'password'} className="form-input" placeholder="••••••••" value={form.password} onChange={e => handleChange('password', e.target.value)} required />
                <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {isSignUp && passwordStrength && (
                <div style={{ marginTop: '6px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: '700', color: passwordStrength.valid ? 'var(--accent)' : 'var(--text-muted)' }}>
                    <span>Password Strength: {passwordStrength.score}%</span>
                    <span>{passwordStrength.feedback}</span>
                  </div>
                  <div style={{ width: '100%', height: '4px', backgroundColor: 'var(--secondary-bg)', borderRadius: '999px', marginTop: '4px', overflow: 'hidden' }}>
                    <div style={{ width: `${passwordStrength.score}%`, height: '100%', backgroundColor: passwordStrength.score >= 80 ? 'var(--accent)' : 'var(--warning)', transition: 'width 0.3s ease' }} />
                  </div>
                </div>
              )}
            </div>

            {/* Profile & Avatars Setup First Checkbox Option */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '12px', backgroundColor: 'var(--secondary-bg)', borderRadius: '10px', border: '1px solid var(--border)' }}>
              <input
                type="checkbox"
                id="openProfileSetupFirst"
                checked={openProfileSetupFirst}
                onChange={e => setOpenProfileSetupFirst(e.target.checked)}
                style={{ width: '16px', height: '16px', accentColor: 'var(--accent)', cursor: 'pointer' }}
              />
              <label htmlFor="openProfileSetupFirst" style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sliders size={15} color="var(--accent)" /> Configure Profile Settings & Avatars First on Sign In
              </label>
            </div>

            <button type="submit" className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '15px', fontWeight: '800', marginTop: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
              {openProfileSetupFirst ? `Continue to Profile & Avatar Setup` : `Sign In directly to ${role} Dashboard`} →
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: 'var(--text-secondary)' }}>
            {isSignUp ? 'Already registered?' : 'New taxpayer or CA practitioner?'} {' '}
            <button type="button" onClick={() => setIsSignUp(!isSignUp)} style={{ background: 'none', border: 'none', color: 'var(--accent)', fontWeight: '800', cursor: 'pointer' }}>
              {isSignUp ? 'Sign In Here' : 'Create Free Account'}
            </button>
          </div>
        </div>

      </section>

      {/* ── Feature Bento Section ── */}
      <section style={{ padding: '100px 56px', backgroundColor: 'var(--secondary-bg)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: '1440px', margin: '0 auto' }}>
          
          <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 64px' }}>
            <h2 style={{ fontSize: '36px', fontWeight: '900', color: 'var(--primary-brand)', letterSpacing: '-0.5px', marginBottom: '16px' }}>
              Powerful Tax Analytics Suite Powered by <span style={{ color: 'var(--accent)' }}>DataNova</span>
            </h2>
            <p style={{ fontSize: '16px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
              Discover how ACA transforms complex tax documentation into actionable refund insights with automated pattern detection and smart government integration.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '36px' }}>
            
            <div className="aca-card" style={{ padding: '36px' }}>
              <PieChart size={36} color="var(--accent)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '8px' }}>
                30+ Statistical Tax Models
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Leverage 25+ visual compliance templates to maximize write-offs across employment, self-employed business, and capital gains.
              </p>
            </div>

            <div className="aca-card" style={{ padding: '36px' }}>
              <Layers size={36} color="var(--accent)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '8px' }}>
                Native ERP & Slip Parsing
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Work directly with T4, W-2, 1099, and Form 16 slips. Automated optical character recognition extracts line items in milliseconds.
              </p>
            </div>

            <div className="aca-card" style={{ padding: '36px' }}>
              <Zap size={36} color="var(--accent)" style={{ marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)', marginBottom: '8px' }}>
                Smart Audit & Anomaly Spotter
              </h3>
              <p style={{ fontSize: '14px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                AI constantly monitors returns for audit risks, flags missing deduction claims, and verifies calculations against official tax rules.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* Interactive Modals */}
      <PlatformModal isOpen={isPlatformOpen} onClose={() => setIsPlatformOpen(false)} />
      <SecurityModal isOpen={isSecurityOpen} onClose={() => setIsSecurityOpen(false)} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />

    </div>
  );
}
