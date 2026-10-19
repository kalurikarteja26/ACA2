import React, { useState, useRef, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Globe, Shield, CreditCard, Save, CheckCircle2, Key, Headphones, Hash, Upload, Image, Sparkles, Briefcase, Building2, UserCheck } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { PROVINCE_OPTIONS } from './PersonalizationScreen';
import { sanitizeInput } from '../utils/security';

export default function ProfileScreen() {
  const { user, updateUser } = useUser();
  const fileInputRef = useRef(null);

  const [activeAvatarTab, setActiveAvatarTab] = useState(
    user.userType === 'Agency' ? 'enterprise' : user.userType === 'CA' ? 'ca' : 'individual'
  );

  const [form, setForm] = useState({
    fullName: user.fullName || '',
    email: user.email || '',
    phone: user.phone || '',
    gender: user.gender || 'Male',
    avatar: user.avatar || '/avatars/casual_2d_male1.png',
    country: user.country || 'Canada',
    province: user.province || 'Ontario',
    cityArea: user.cityArea || '',
    postalPinCode: user.postalPinCode || '',
    permanentAddress: user.permanentAddress || '',
    citizenships: user.citizenships || [user.country || 'Canada'],
    userType: user.userType || 'User',
    accountCode: user.accountCode || 'ACA-CLT-2026-8942',
    plan: user.plan || 'Professional'
  });

  const [saved, setSaved] = useState(false);

  // Sync state if user in context changes
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      fullName: user.fullName || prev.fullName,
      email: user.email || prev.email,
      gender: user.gender || prev.gender,
      avatar: user.avatar || prev.avatar,
      country: user.country || prev.country,
      userType: user.userType || prev.userType
    }));
  }, [user]);

  /* ── 1. Individual Taxpayers Professions Suite (10 Variants) ── */
  const individualAvatars = [
    { id: 'ind-1', label: '2D Blue Tee', src: '/avatars/casual_2d_male1.png', type: 'image' },
    { id: 'ind-2', label: '2D Sweater', src: '/avatars/casual_2d_female1.png', type: 'image' },
    { id: 'ind-3', label: '2D Hoodie', src: '/avatars/casual_2d_male2.png', type: 'image' },
    { id: 'ind-4', label: 'Tech Engineer', src: '/avatars/anime_cyber.png', type: 'image' },
    { id: 'ind-5', label: 'Anime Hero', src: '/avatars/anime_boy.png', type: 'image' },
    { id: 'ind-6', label: 'Anime Star', src: '/avatars/anime_girl.png', type: 'image' },
    { id: 'ind-7', label: 'Cartoon Cat CPA', src: '/avatars/cartoon_cat.png', type: 'image' },
    { id: 'ind-8', label: 'Doctor / Healthcare', emoji: '👨‍⚕️', type: 'emoji' },
    { id: 'ind-9', label: 'Teacher / Educator', emoji: '👨‍🏫', type: 'emoji' },
    { id: 'ind-10', label: 'Freelance Artist', emoji: '🎨', type: 'emoji' },
  ];

  /* ── 2. CA & Tax Advisors Professions Suite (10 Variants) ── */
  const caAvatars = [
    { id: 'ca-1', label: 'Male CA Executive', src: '/avatars/avatar_male.png', type: 'image' },
    { id: 'ca-2', label: 'Female CA Advisor', src: '/avatars/avatar_female.png', type: 'image' },
    { id: 'ca-3', label: 'Senior CA Partner', src: '/avatars/avatar_ca_senior.png', type: 'image' },
    { id: 'ca-4', label: 'Financial Analyst', src: '/avatars/avatar_tech.png', type: 'image' },
    { id: 'ca-5', label: 'Forensic Accountant', emoji: '🔍', type: 'emoji' },
    { id: 'ca-6', label: 'Tax Attorney / Legal', emoji: '⚖️', type: 'emoji' },
    { id: 'ca-7', label: 'Audit Specialist', emoji: '📈', type: 'emoji' },
    { id: 'ca-8', label: 'GST / VAT Specialist', emoji: '💼', type: 'emoji' },
    { id: 'ca-9', label: 'Corporate CFO', emoji: '👔', type: 'emoji' },
    { id: 'ca-10', label: 'Compliance Shield', emoji: '🛡️', type: 'emoji' },
  ];

  /* ── 3. Enterprise & Corporate Entities Suite (10 Variants) ── */
  const enterpriseAvatars = [
    { id: 'ent-1', label: 'Global Corporate HQ', emoji: '🏢', type: 'emoji' },
    { id: 'ent-2', label: 'Multi-National Holding', emoji: '🏛️', type: 'emoji' },
    { id: 'ent-3', label: 'Enterprise Cloud Node', emoji: '🌐', type: 'emoji' },
    { id: 'ent-4', label: 'Manufacturing Entity', emoji: '🏭', type: 'emoji' },
    { id: 'ent-5', label: 'Retail & Commerce', emoji: '🏬', type: 'emoji' },
    { id: 'ent-6', label: 'FinTech Corporate', emoji: '⚡', type: 'emoji' },
    { id: 'ent-7', label: 'Fortune 500 Seal', emoji: '💎', type: 'emoji' },
    { id: 'ent-8', label: 'SOC2 Security Vault', emoji: '🔒', type: 'emoji' },
    { id: 'ent-9', label: 'Enterprise Fleet', emoji: '🚢', type: 'emoji' },
    { id: 'ent-10', label: 'Cross-Border Entity', emoji: '✈️', type: 'emoji' },
  ];

  const handleChange = (field, val) => {
    if (field === 'country') {
      const defaultProvinces = { Canada: 'Ontario', USA: 'California', India: 'Maharashtra' };
      setForm(prev => ({
        ...prev,
        country: val,
        province: defaultProvinces[val] || 'Ontario',
        citizenships: [val]
      }));
    } else {
      setForm(prev => ({ ...prev, [field]: val }));
    }
  };

  const handleCustomFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setForm(prev => ({ ...prev, avatar: base64Data }));
        updateUser({ avatar: base64Data }); // Immediately sync to UserContext!
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset file input
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanForm = {
      ...form,
      fullName: sanitizeInput(form.fullName),
      email: sanitizeInput(form.email).trim().toLowerCase(),
      phone: sanitizeInput(form.phone),
      cityArea: sanitizeInput(form.cityArea),
      postalPinCode: sanitizeInput(form.postalPinCode),
      permanentAddress: sanitizeInput(form.permanentAddress),
    };
    updateUser(cleanForm);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const currentProvinceOptions = PROVINCE_OPTIONS[form.country] || PROVINCE_OPTIONS.Canada;
  const stateLabel = form.country === 'Canada' ? 'Province / Territory' : form.country === 'USA' ? 'State' : 'State / Union Territory';
  const codeLabel = form.country === 'Canada' ? 'Postal Code' : form.country === 'USA' ? 'ZIP Code' : 'PIN Code';

  const activeAvatarList = 
    activeAvatarTab === 'enterprise' ? enterpriseAvatars :
    activeAvatarTab === 'ca' ? caAvatars : individualAvatars;

  const isImageAvatar = (av) => {
    if (!av) return false;
    return av.startsWith('/') || av.startsWith('data:') || av.startsWith('http') || av.startsWith('blob:');
  };

  return (
    <div className="animate-fade-in" style={{ padding: '36px', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Page Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '32px' }}>
        <div>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--primary-brand)', letterSpacing: '-0.5px' }}>
            Taxpayer Profile & Serial Registration
          </h1>
          <p style={{ fontSize: '14px', color: 'var(--text-secondary)', marginTop: '4px' }}>
            Manage your personal identity, gender, profession avatars, jurisdiction, and PIN / ZIP codes
          </p>
        </div>

        {saved && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 18px', backgroundColor: 'var(--success-bg)', color: 'var(--success)', borderRadius: '10px', fontWeight: '800', fontSize: '13px' }}>
            <CheckCircle2 size={18} /> Profile Updated Successfully
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '340px 1fr', gap: '28px' }}>
        
        {/* Left Sidebar Card */}
        <div className="aca-card" style={{ padding: '28px', textAlign: 'center', height: 'fit-content' }}>
          
          <div style={{ position: 'relative', width: '96px', height: '96px', margin: '0 auto 16px' }}>
            {isImageAvatar(form.avatar) ? (
              <img src={form.avatar} alt="Profile Avatar" style={{ width: '96px', height: '96px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent)', boxShadow: 'var(--shadow-md)' }} />
            ) : form.avatar ? (
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'var(--primary-brand)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '46px', border: '3px solid var(--accent)', boxShadow: 'var(--shadow-md)' }}>
                {form.avatar}
              </div>
            ) : (
              <div style={{ width: '96px', height: '96px', borderRadius: '50%', backgroundColor: 'var(--primary-brand)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '34px', fontWeight: '800', border: '3px solid var(--accent)', boxShadow: 'var(--shadow-md)' }}>
                {user.fullName ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase() : 'US'}
              </div>
            )}

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              style={{
                position: 'absolute', bottom: '0', right: '0', width: '32px', height: '32px', borderRadius: '50%',
                backgroundColor: 'var(--accent)', color: '#FFF', border: '2px solid var(--cards)', display: 'flex',
                alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: 'var(--shadow-sm)'
              }}
              title="Upload Custom File Avatar"
            >
              <Upload size={14} />
            </button>
          </div>

          <h2 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--primary-brand)' }}>{form.fullName || 'User'}</h2>
          <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: '2px' }}>{form.email}</div>
          <div style={{ fontSize: '12px', fontWeight: '800', color: 'var(--accent)', marginTop: '4px' }}>Gender: {form.gender}</div>

          <div style={{ margin: '20px 0', padding: '12px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>TAX IDENTIFIER / SERIAL CODE</div>
            <div style={{ fontSize: '14px', fontWeight: '900', color: 'var(--accent)', fontFamily: 'var(--font-mono)', marginTop: '4px' }}>
              {form.accountCode}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', textAlign: 'left' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Role:</span>
              <span style={{ fontWeight: '800', color: 'var(--primary-brand)' }}>{form.userType}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>Active Jurisdiction:</span>
              <span style={{ fontWeight: '800', color: 'var(--primary-brand)' }}>{form.country}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid var(--border)' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>{stateLabel}:</span>
              <span style={{ fontWeight: '800', color: 'var(--primary-brand)' }}>{form.province}</span>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0' }}>
              <span style={{ color: 'var(--text-muted)', fontWeight: '600' }}>{codeLabel}:</span>
              <span style={{ fontWeight: '800', color: 'var(--accent)', fontFamily: 'var(--font-mono)' }}>{form.postalPinCode || 'Not Set'}</span>
            </div>
          </div>
        </div>

        {/* Main Form Settings Card */}
        <div className="aca-card" style={{ padding: '36px' }}>
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Categorized Professions & Enterprise Avatars Suite */}
            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', paddingBottom: '8px' }}>
              1. PROFESSION & ENTERPRISE AVATARS SUITE (10 VARIANTS PER CATEGORY)
            </div>

            <div>
              {/* Category Tab Switcher */}
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', backgroundColor: 'var(--secondary-bg)', padding: '6px', borderRadius: '12px' }}>
                <button
                  type="button"
                  onClick={() => setActiveAvatarTab('individual')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeAvatarTab === 'individual' ? 'var(--cards)' : 'transparent',
                    color: activeAvatarTab === 'individual' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                    fontWeight: activeAvatarTab === 'individual' ? '800' : '600', fontSize: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <UserCheck size={14} color="var(--accent)" /> Taxpayers / 2D Casual (10)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveAvatarTab('ca')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeAvatarTab === 'ca' ? 'var(--cards)' : 'transparent',
                    color: activeAvatarTab === 'ca' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                    fontWeight: activeAvatarTab === 'ca' ? '800' : '600', fontSize: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <Briefcase size={14} color="var(--accent)" /> CA's & Advisors (10)
                </button>

                <button
                  type="button"
                  onClick={() => setActiveAvatarTab('enterprise')}
                  style={{
                    flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                    backgroundColor: activeAvatarTab === 'enterprise' ? 'var(--cards)' : 'transparent',
                    color: activeAvatarTab === 'enterprise' ? 'var(--primary-brand)' : 'var(--text-secondary)',
                    fontWeight: activeAvatarTab === 'enterprise' ? '800' : '600', fontSize: '12px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                  }}
                >
                  <Building2 size={14} color="var(--accent)" /> Enterprises & HQ (10)
                </button>
              </div>

              {/* Active Category Avatars Grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '16px' }}>
                {activeAvatarList.map(av => {
                  const isSelected = av.type === 'image' ? form.avatar === av.src : form.avatar === av.emoji;
                  return (
                    <div
                      key={av.id}
                      onClick={() => {
                        const newAvatar = av.type === 'image' ? av.src : av.emoji;
                        handleChange('avatar', newAvatar);
                        updateUser({ avatar: newAvatar }); // Immediately sync to UserContext!
                      }}
                      style={{
                        padding: '10px', borderRadius: '14px', border: isSelected ? '2.5px solid var(--accent)' : '1px solid var(--border)',
                        backgroundColor: isSelected ? 'var(--secondary-bg)' : 'transparent', cursor: 'pointer',
                        textAlign: 'center', transition: 'all 0.2s ease', boxShadow: isSelected ? 'var(--shadow-md)' : 'none'
                      }}
                    >
                      {av.type === 'image' ? (
                        <img src={av.src} alt={av.label} style={{ width: '56px', height: '56px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 4px', display: 'block', border: '1.5px solid var(--border)' }} />
                      ) : (
                        <div style={{ width: '56px', height: '56px', borderRadius: '50%', backgroundColor: 'var(--cards)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px', margin: '0 auto 4px', border: '1.5px solid var(--border)' }}>
                          {av.emoji}
                        </div>
                      )}
                      <div style={{ fontSize: '10px', fontWeight: isSelected ? '900' : '700', color: isSelected ? 'var(--accent)' : 'var(--primary-brand)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{av.label}</div>
                    </div>
                  );
                })}
              </div>

              {/* Custom Photo Upload */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px dashed var(--border)' }}>
                <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>Need a personal photo file?</span>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="btn-secondary"
                  style={{ padding: '8px 16px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
                >
                  <Upload size={14} /> Upload Custom Photo File
                </button>
                <input type="file" ref={fileInputRef} accept="image/*" onChange={handleCustomFileUpload} style={{ display: 'none' }} />
              </div>
            </div>

            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: '10px' }}>
              2. PERSONAL IDENTITY & GENDER DETAILS
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Full Legal Name</label>
                <input type="text" className="form-input" value={form.fullName} onChange={e => handleChange('fullName', e.target.value)} required />
              </div>

              <div>
                <label className="form-label">Gender</label>
                <select className="form-select" value={form.gender} onChange={e => handleChange('gender', e.target.value)}>
                  <option value="Male">Male ♂</option>
                  <option value="Female">Female ♀</option>
                  <option value="Non-Binary">Non-Binary / Other ⚧</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              <div>
                <label className="form-label">Email Address</label>
                <input type="email" className="form-input" value={form.email} onChange={e => handleChange('email', e.target.value)} required />
              </div>
            </div>

            <div>
              <label className="form-label">Phone Number</label>
              <input type="tel" className="form-input" value={form.phone} onChange={e => handleChange('phone', e.target.value)} />
            </div>

            <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--accent)', textTransform: 'uppercase', letterSpacing: '0.05em', borderBottom: '1px solid var(--border)', paddingBottom: '8px', marginTop: '10px' }}>
              3. TAX JURISDICTION & AREA LOCATION
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
              <div>
                <label className="form-label">Primary Country</label>
                <select className="form-select" value={form.country} onChange={e => handleChange('country', e.target.value)}>
                  <option value="Canada">Canada 🇨🇦</option>
                  <option value="USA">USA 🇺🇸</option>
                  <option value="India">India 🇮🇳</option>
                </select>
              </div>

              <div>
                <label className="form-label">{stateLabel}</label>
                <select className="form-select" value={form.province} onChange={e => handleChange('province', e.target.value)}>
                  {currentProvinceOptions.map(p => (
                    <option key={p.value} value={p.value}>{p.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* City Area & PIN / ZIP Code */}
            <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
              <div>
                <label className="form-label">City / Residential Area / Locality</label>
                <input type="text" className="form-input" placeholder="e.g. Jubilee Hills / Beverly Hills / Yorkville" value={form.cityArea} onChange={e => handleChange('cityArea', e.target.value)} />
              </div>

              <div>
                <label className="form-label">{codeLabel}</label>
                <input type="text" className="form-input" placeholder="e.g. 500081 / 90210 / M5V 2T6" value={form.postalPinCode} onChange={e => handleChange('postalPinCode', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="form-label">Permanent Building / Apartment Address</label>
              <input type="text" className="form-input" placeholder="e.g. 123 Main St, Apt 4B" value={form.permanentAddress} onChange={e => handleChange('permanentAddress', e.target.value)} />
            </div>

            <button type="submit" className="btn-primary" style={{ padding: '16px', fontSize: '15px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', cursor: 'pointer', marginTop: '10px' }}>
              <Save size={18} /> Save Profile & Selected Avatar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
