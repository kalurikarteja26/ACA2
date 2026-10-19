import React, { useState, useRef, useEffect } from 'react';
import { Search, Globe, ChevronDown, User, Settings, CreditCard, LogOut, Check, ArrowLeft, Headphones, X, FileText, Sparkles, ArrowRight, Zap, Languages } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLanguage, COUNTRY_LANGUAGES } from '../context/LanguageContext';
import ThemeSwitcher from './ThemeSwitcher';
import AcaLogo from './AcaLogo';
import { sanitizeInput } from '../utils/security';

export default function AppHeader({ activeTab, setActiveTab, onSignOut, onOpenSupport }) {
  const { user, updateUser, initials } = useUser();
  const { language, changeLanguage } = useLanguage();

  const [showProfile, setShowProfile] = useState(false);
  const [showJurisdiction, setShowJurisdiction] = useState(false);
  const [showLanguageModal, setShowLanguageModal] = useState(false);

  // Search Bar State
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  // DOM Refs for Click-Outside Detection
  const searchRef = useRef(null);
  const profileRef = useRef(null);
  const jurisdictionRef = useRef(null);

  const activeCountry = user.country || 'Canada';

  const countries = [
    { name: 'Canada', flag: '🇨🇦', code: 'CA', taxBody: 'CRA' },
    { name: 'USA', flag: '🇺🇸', code: 'US', taxBody: 'IRS' },
    { name: 'India', flag: '🇮🇳', code: 'IN', taxBody: 'Income Tax Dept' },
  ];

  // Country-specific native language suite
  const currentNativeLanguages = COUNTRY_LANGUAGES[activeCountry] || COUNTRY_LANGUAGES.Canada;

  const handleCountryChange = (cName) => {
    const defaultProvinces = { Canada: 'Ontario', USA: 'California', India: 'Maharashtra' };
    const defaultLang = cName === 'Canada' ? 'English' : cName === 'USA' ? 'English' : 'Hindi';
    
    updateUser({
      country: cName,
      province: defaultProvinces[cName] || 'Ontario',
      citizenships: [cName],
    });
    
    changeLanguage(defaultLang);
    setShowJurisdiction(false);
  };

  const handleLanguageChange = (langName) => {
    changeLanguage(langName);
    setShowLanguageModal(false);
  };

  // Tax Search Suggestions Database
  const searchSuggestionsDB = [
    { title: 'T4 Slip Employment Income', category: 'Canada CRA', action: () => setActiveTab('vault') },
    { title: 'RRSP Contribution & Deduction Claim', category: 'Canada CRA', action: () => setActiveTab('filing') },
    { title: 'W-2 Wage and Tax Statement', category: 'USA IRS', action: () => setActiveTab('vault') },
    { title: '401(k) Retirement Tax Write-off', category: 'USA IRS', action: () => setActiveTab('filing') },
    { title: 'Form 16 Part A & B Upload', category: 'India ITD', action: () => setActiveTab('vault') },
    { title: 'Section 80C Tax Savings Deductions', category: 'India ITD', action: () => setActiveTab('filing') },
    { title: 'GST / VAT Business Income Expense', category: 'Global Business', action: () => setActiveTab('filing') },
    { title: 'My Taxpayer Serial Code & Identity', category: 'Profile', action: () => setActiveTab('profile') },
  ];

  const filteredSuggestions = searchQuery.trim() === '' 
    ? searchSuggestionsDB 
    : searchSuggestionsDB.filter(s => s.title.toLowerCase().includes(searchQuery.toLowerCase()) || s.category.toLowerCase().includes(searchQuery.toLowerCase()));

  // ── Global Click Outside Event Listener ──
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setShowProfile(false);
      }
      if (jurisdictionRef.current && !jurisdictionRef.current.contains(e.target)) {
        setShowJurisdiction(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedCountry = countries.find(c => c.name === activeCountry) || countries[0];

  return (
    <header style={{
      height: '72px', borderBottom: '1px solid var(--border)', backgroundColor: 'var(--cards)',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 28px',
      position: 'sticky', top: 0, zIndex: 1000
    }}>
      
      {/* ── Left Side: Logo & Country Jurisdiction ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <AcaLogo size="normal" />

        {/* Jurisdiction Picker Badge */}
        <div ref={jurisdictionRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowJurisdiction(!showJurisdiction)}
            style={{
              display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 14px',
              borderRadius: '999px', backgroundColor: 'var(--secondary-bg)', border: '1px solid var(--border)',
              cursor: 'pointer', fontSize: '13px', fontWeight: '800', color: 'var(--primary-brand)'
            }}
          >
            <span>{selectedCountry.flag}</span>
            <span>{selectedCountry.name} ({selectedCountry.taxBody})</span>
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showJurisdiction && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', left: 0, width: '220px',
              backgroundColor: 'var(--cards)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)', zIndex: 100, overflow: 'hidden'
            }}>
              {countries.map(c => (
                <div
                  key={c.name}
                  onClick={() => handleCountryChange(c.name)}
                  style={{
                    padding: '12px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    cursor: 'pointer', backgroundColor: c.name === activeCountry ? 'var(--secondary-bg)' : 'transparent'
                  }}
                >
                  <span style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)' }}>{c.flag} {c.name}</span>
                  {c.name === activeCountry && <Check size={16} color="var(--accent)" />}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Middle: Search Box with Clear Cross & Live Suggestions ── */}
      <div ref={searchRef} style={{ position: 'relative', width: '380px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px', padding: '8px 14px',
          backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)'
        }}>
          <Search size={16} color="var(--text-muted)" />
          <input
            type="text"
            placeholder="Search tax forms, T4, W2, deductions..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(sanitizeInput(e.target.value)); setShowSuggestions(true); }}
            onFocus={() => setShowSuggestions(true)}
            style={{
              border: 'none', background: 'transparent', outline: 'none', width: '100%',
              fontSize: '13px', color: 'var(--text-primary)', fontWeight: '600'
            }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)', display: 'flex', alignItems: 'center' }}
            >
              <X size={14} />
            </button>
          )}
        </div>

        {/* Search Suggestions Dropdown */}
        {showSuggestions && (
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
            backgroundColor: 'var(--cards)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
            boxShadow: 'var(--shadow-lg)', zIndex: 100, padding: '12px', maxHeight: '320px', overflowY: 'auto'
          }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', uppercase: 'true', marginBottom: '8px', paddingLeft: '8px' }}>
              SUGGESTED TAX TOPICS & GUIDES
            </div>
            {filteredSuggestions.map((item, idx) => (
              <div
                key={idx}
                onClick={() => { item.action(); setShowSuggestions(false); }}
                style={{
                  padding: '10px 12px', borderRadius: '8px', cursor: 'pointer', display: 'flex',
                  alignItems: 'center', justifyContent: 'space-between', transition: 'background 0.2s'
                }}
                className="hover-bg-secondary"
              >
                <div>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)' }}>{item.title}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{item.category}</div>
                </div>
                <ArrowRight size={14} color="var(--accent)" />
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Right Side: Language, Support, Theme & Profile Avatar ── */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        
        {/* Country-Specific Native Language Selector Button */}
        <button
          onClick={() => setShowLanguageModal(true)}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
            borderRadius: '8px', border: '1px solid var(--border)', backgroundColor: 'var(--secondary-bg)',
            cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)'
          }}
          title={`Select Native Language for ${activeCountry}`}
        >
          <Languages size={16} color="var(--accent)" />
          <span>{language}</span>
        </button>

        {/* Contact Support Helpline */}
        <button
          onClick={onOpenSupport}
          style={{
            display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px',
            borderRadius: '8px', border: '1px solid var(--accent)', backgroundColor: 'transparent',
            cursor: 'pointer', fontSize: '13px', fontWeight: '800', color: 'var(--accent)'
          }}
        >
          <Headphones size={15} /> Support
        </button>

        <ThemeSwitcher />

        {/* User Profile Dropdown Button */}
        <div ref={profileRef} style={{ position: 'relative' }}>
          <button
            onClick={() => setShowProfile(!showProfile)}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px', background: 'none',
              border: 'none', cursor: 'pointer', padding: '4px'
            }}
          >
            {user.avatar ? (
              user.avatar.startsWith('/') || user.avatar.startsWith('data:') || user.avatar.startsWith('http') || user.avatar.startsWith('blob:') ? (
                <img src={user.avatar} alt="Avatar" style={{ width: '38px', height: '38px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent)' }} />
              ) : (
                <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--primary-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', border: '2px solid var(--accent)' }}>
                  {user.avatar}
                </div>
              )
            ) : (
              <div style={{ width: '38px', height: '38px', borderRadius: '50%', backgroundColor: 'var(--primary-brand)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px', border: '2px solid var(--accent)' }}>
                {initials}
              </div>
            )}
            <ChevronDown size={14} color="var(--text-muted)" />
          </button>

          {showProfile && (
            <div style={{
              position: 'absolute', top: 'calc(100% + 8px)', right: 0, width: '260px',
              backgroundColor: 'var(--cards)', border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
              boxShadow: 'var(--shadow-lg)', zIndex: 100, padding: '16px'
            }}>
              <div style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border)', marginBottom: '12px' }}>
                <div style={{ fontWeight: '800', fontSize: '14px', color: 'var(--primary-brand)' }}>{user.fullName || 'Alex Mercer'}</div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>{user.email || 'alex@example.com'}</div>
                <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--accent)', marginTop: '4px' }}>
                  Role: {user.userType || 'Taxpayer'} • {user.gender}
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <button
                  onClick={() => { setActiveTab('profile'); setShowProfile(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)', width: '100%', borderRadius: '6px' }}
                >
                  <User size={16} /> My Tax Profile
                </button>

                {user.userType === 'Admin' && (
                  <button
                    onClick={() => { setActiveTab('admin'); setShowProfile(false); }}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'var(--secondary-bg)', border: '1px solid var(--accent)', cursor: 'pointer', fontSize: '13px', fontWeight: '800', color: 'var(--accent)', width: '100%', borderRadius: '6px' }}
                  >
                    <ShieldCheck size={16} /> Admin & Security Console
                  </button>
                )}

                <button
                  onClick={() => { setActiveTab('personalization'); setShowProfile(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: 'var(--primary-brand)', width: '100%', borderRadius: '6px' }}
                >
                  <Sparkles size={16} color="var(--accent)" /> Change Avatars & Setup
                </button>

                <button
                  onClick={() => { onSignOut(); setShowProfile(false); }}
                  style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', fontWeight: '700', color: 'var(--danger)', width: '100%', borderRadius: '6px', borderTop: '1px solid var(--border)', paddingTop: '10px' }}
                >
                  <LogOut size={16} /> Sign Out (Login Options Page)
                </button>
              </div>
            </div>
          )}
        </div>

      </div>

      {/* Country-Specific Native Language Selector Modal */}
      {showLanguageModal && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 99999, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px' }} onClick={() => setShowLanguageModal(false)}>
          <div style={{ width: '100%', maxWidth: '520px', backgroundColor: 'var(--cards)', borderRadius: 'var(--radius-xl)', padding: '36px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-lg)' }} onClick={e => e.stopPropagation()}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Languages size={24} color="var(--accent)" />
                <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)' }}>Native Languages for {activeCountry}</h2>
              </div>
              <button onClick={() => setShowLanguageModal(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-muted)' }}><X size={20} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '24px' }}>
              {currentNativeLanguages.map(lang => (
                <div
                  key={lang.name}
                  onClick={() => handleLanguageChange(lang.name)}
                  style={{
                    padding: '12px 16px', borderRadius: '10px', border: language === lang.name ? '2px solid var(--accent)' : '1px solid var(--border)',
                    backgroundColor: language === lang.name ? 'var(--secondary-bg)' : 'transparent', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '13px', fontWeight: '800', color: 'var(--primary-brand)' }}>{lang.native}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>{lang.name} {lang.flag}</div>
                  </div>
                  {language === lang.name && <Check size={16} color="var(--accent)" />}
                </div>
              ))}
            </div>

            <button onClick={() => setShowLanguageModal(false)} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px' }}>Apply Language Preference</button>
          </div>
        </div>
      )}

    </header>
  );
}
