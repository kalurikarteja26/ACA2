import React, { useState, useRef } from 'react';
import { Bot, ArrowRight, ArrowLeft, Sparkles, CheckCircle2, Headphones, ShieldCheck, Cpu, MapPin, Hash, Languages, Upload, Briefcase, Building2, UserCheck } from 'lucide-react';
import { useUser } from '../context/UserContext';
import AcaLogo from './AcaLogo';
import { sanitizeInput } from '../utils/security';

/* ── Country-Aware States & Provinces with Official Native Regional Languages ── */
export const PROVINCE_OPTIONS = {
  Canada: [
    { value: 'Alberta', label: 'Alberta — AB (English)' },
    { value: 'British Columbia', label: 'British Columbia — BC (English)' },
    { value: 'Manitoba', label: 'Manitoba — MB (English)' },
    { value: 'New Brunswick', label: 'New Brunswick — NB (English / Français)' },
    { value: 'Newfoundland and Labrador', label: 'Newfoundland and Labrador — NL (English)' },
    { value: 'Northwest Territories', label: 'Northwest Territories — NT (English / Inuinnaqtun)' },
    { value: 'Nova Scotia', label: 'Nova Scotia — NS (English / Gàidhlig)' },
    { value: 'Nunavut', label: 'Nunavut — NU (Inuktitut / English)' },
    { value: 'Ontario', label: 'Ontario — ON (English / Français)' },
    { value: 'Prince Edward Island', label: 'Prince Edward Island — PE (English)' },
    { value: 'Quebec', label: 'Quebec — QC (Français / French)' },
    { value: 'Saskatchewan', label: 'Saskatchewan — SK (English)' },
    { value: 'Yukon', label: 'Yukon — YT (English)' },
  ],
  USA: [
    { value: 'Alabama', label: 'Alabama — AL (English)' },
    { value: 'Alaska', label: 'Alaska — AK (English)' },
    { value: 'Arizona', label: 'Arizona — AZ (English / Español)' },
    { value: 'Arkansas', label: 'Arkansas — AR (English)' },
    { value: 'California', label: 'California — CA (English / Español)' },
    { value: 'Colorado', label: 'Colorado — CO (English)' },
    { value: 'Connecticut', label: 'Connecticut — CT (English)' },
    { value: 'Delaware', label: 'Delaware — DE (English)' },
    { value: 'District of Columbia', label: 'District of Columbia — DC (English)' },
    { value: 'Florida', label: 'Florida — FL (English / Español)' },
    { value: 'Georgia', label: 'Georgia — GA (English)' },
    { value: 'Hawaii', label: 'Hawaii — HI (English / ʻŌlelo Hawaiʻi)' },
    { value: 'Idaho', label: 'Idaho — ID (English)' },
    { value: 'Illinois', label: 'Illinois — IL (English / Español)' },
    { value: 'Indiana', label: 'Indiana — IN (English)' },
    { value: 'Iowa', label: 'Iowa — IA (English)' },
    { value: 'Kansas', label: 'Kansas — KS (English)' },
    { value: 'Kentucky', label: 'Kentucky — KY (English)' },
    { value: 'Louisiana', label: 'Louisiana — LA (English / Français)' },
    { value: 'Maine', label: 'Maine — ME (English)' },
    { value: 'Maryland', label: 'Maryland — MD (English)' },
    { value: 'Massachusetts', label: 'Massachusetts — MA (English)' },
    { value: 'Michigan', label: 'Michigan — MI (English)' },
    { value: 'Minnesota', label: 'Minnesota — MN (English)' },
    { value: 'Mississippi', label: 'Mississippi — MS (English)' },
    { value: 'Missouri', label: 'Missouri — MO (English)' },
    { value: 'Montana', label: 'Montana — MT (English)' },
    { value: 'Nebraska', label: 'Nebraska — NE (English)' },
    { value: 'Nevada', label: 'Nevada — NV (English / Español)' },
    { value: 'New Hampshire', label: 'New Hampshire — NH (English)' },
    { value: 'New Jersey', label: 'New Jersey — NJ (English / Español)' },
    { value: 'New Mexico', label: 'New Mexico — NM (English / Español)' },
    { value: 'New York', label: 'New York — NY (English / Español)' },
    { value: 'North Carolina', label: 'North Carolina — NC (English)' },
    { value: 'North Dakota', label: 'North Dakota — ND (English)' },
    { value: 'Ohio', label: 'Ohio — OH (English)' },
    { value: 'Oklahoma', label: 'Oklahoma — OK (English)' },
    { value: 'Oregon', label: 'Oregon — OR (English)' },
    { value: 'Pennsylvania', label: 'Pennsylvania — PA (English)' },
    { value: 'Rhode Island', label: 'Rhode Island — RI (English)' },
    { value: 'South Carolina', label: 'South Carolina — SC (English)' },
    { value: 'South Dakota', label: 'South Dakota — SD (English)' },
    { value: 'Tennessee', label: 'Tennessee — TN (English)' },
    { value: 'Texas', label: 'Texas — TX (English / Español)' },
    { value: 'Utah', label: 'Utah — UT (English)' },
    { value: 'Vermont', label: 'Vermont — VT (English)' },
    { value: 'Virginia', label: 'Virginia — VA (English)' },
    { value: 'Washington', label: 'Washington — WA (English)' },
    { value: 'West Virginia', label: 'West Virginia — WV (English)' },
    { value: 'Wisconsin', label: 'Wisconsin — WI (English)' },
    { value: 'Wyoming', label: 'Wyoming — WY (English)' },
  ],
  India: [
    { value: 'Andhra Pradesh', label: 'Andhra Pradesh — AP (తెలుగు - Telugu)' },
    { value: 'Arunachal Pradesh', label: 'Arunachal Pradesh — AR (English)' },
    { value: 'Assam', label: 'Assam — AS (অসমীয়া - Assamese)' },
    { value: 'Bihar', label: 'Bihar — BR (हिंदी - Hindi / Maithili)' },
    { value: 'Chhattisgarh', label: 'Chhattisgarh — CG (हिंदी - Hindi)' },
    { value: 'Goa', label: 'Goa — GA (कोंकणी - Konkani)' },
    { value: 'Gujarat', label: 'Gujarat — GJ (ગુજરાતી - Gujarati)' },
    { value: 'Haryana', label: 'Haryana — HR (हिंदी - Hindi)' },
    { value: 'Himachal Pradesh', label: 'Himachal Pradesh — HP (हिंदी - Hindi)' },
    { value: 'Jharkhand', label: 'Jharkhand — JH (हिंदी - Hindi)' },
    { value: 'Karnataka', label: 'Karnataka — KA (ಕನ್ನಡ - Kannada)' },
    { value: 'Kerala', label: 'Kerala — KL (മലയാളം - Malayalam)' },
    { value: 'Madhya Pradesh', label: 'Madhya Pradesh — MP (हिंदी - Hindi)' },
    { value: 'Maharashtra', label: 'Maharashtra — MH (मराठी - Marathi)' },
    { value: 'Manipur', label: 'Manipur — MN (মৈতৈলোন্ - Meitei)' },
    { value: 'Meghalaya', label: 'Meghalaya — ML (English / Khasi)' },
    { value: 'Mizoram', label: 'Mizoram — MZ (Mizo / English)' },
    { value: 'Nagaland', label: 'Nagaland — NL (English)' },
    { value: 'Odisha', label: 'Odisha — OD (ଓଡ଼ିଆ - Odia)' },
    { value: 'Punjab', label: 'Punjab — PB (ਪੰਜਾਬੀ - Punjabi)' },
    { value: 'Rajasthan', label: 'Rajasthan — RJ (हिंदी - Hindi)' },
    { value: 'Sikkim', label: 'Sikkim — SK (Nepali / English)' },
    { value: 'Tamil Nadu', label: 'Tamil Nadu — TN (தமிழ் - Tamil)' },
    { value: 'Telangana', label: 'Telangana — TG (తెలుగు - Telugu)' },
    { value: 'Tripura', label: 'Tripura — TR (বাংলা - Bengali)' },
    { value: 'Uttar Pradesh', label: 'Uttar Pradesh — UP (हिंदी - Hindi / Urdu)' },
    { value: 'Uttarakhand', label: 'Uttarakhand — UK (हिंदी - Hindi)' },
    { value: 'West Bengal', label: 'West Bengal — WB (বাংলা - Bengali)' },
    { value: 'Andaman & Nicobar Islands', label: 'Andaman & Nicobar Islands — AN (English / Hindi)' },
    { value: 'Chandigarh', label: 'Chandigarh — CH (ਪੰਜਾਬੀ / English)' },
    { value: 'Dadra & Nagar Haveli and Daman & Diu', label: 'Dadra & Nagar Haveli and Daman & Diu — DN (Gujarati / Hindi)' },
    { value: 'Delhi', label: 'Delhi — DL (हिंदी - Hindi / English)' },
    { value: 'Jammu & Kashmir', label: 'Jammu & Kashmir — JK (Dogri / Kashmiri / Hindi)' },
    { value: 'Ladakh', label: 'Ladakh — LA (Ladakhi / English)' },
    { value: 'Lakshadweep', label: 'Lakshadweep — LD (Malayalam / English)' },
    { value: 'Puducherry', label: 'Puducherry — PY (தமிழ் - Tamil / English)' },
  ],
};

const Sel = ({ label, field, options, value, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <select className="form-select" value={value || ''} onChange={e => onChange(field, e.target.value)}>
      {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
  </div>
);

const Txt = ({ label, field, placeholder, value, onChange }) => (
  <div className="form-group">
    <label className="form-label">{label}</label>
    <input type="text" className="form-input" placeholder={placeholder} value={value || ''} onChange={e => onChange(field, e.target.value)} />
  </div>
);

function ProvinceStateSelector({ country, value, onChange }) {
  const options = PROVINCE_OPTIONS[country] || PROVINCE_OPTIONS.Canada;
  const label = country === 'Canada' ? 'Province / Territory (Native Language)' : country === 'USA' ? 'State (Native Language)' : 'State / Union Territory (Native Language)';
  return <Sel label={label} field="province" value={value} onChange={onChange} options={options} />;
}

export default function PersonalizationScreen({ onComplete, onBack, onOpenSupport }) {
  const { user, updateUser } = useUser();
  const fileInputRef = useRef(null);

  const [activeAvatarTab, setActiveAvatarTab] = useState(
    user.userType === 'Agency' ? 'enterprise' : user.userType === 'CA' ? 'ca' : 'individual'
  );

  const [formData, setFormData] = useState(() => {
    const initialCountry = user.country || 'Canada';
    const defaultProvinces = { Canada: 'Ontario', USA: 'California', India: 'Maharashtra' };
    const defaultAvatar = user.userType === 'Agency' ? '🏢' : user.userType === 'CA' ? '/avatars/avatar_male.png' : '/avatars/casual_2d_male1.png';
    return {
      gender: user.gender || 'Male',
      avatar: user.avatar || defaultAvatar,
      country: initialCountry,
      province: user.province || defaultProvinces[initialCountry] || 'Ontario',
      cityArea: user.cityArea || '',
      postalPinCode: user.postalPinCode || '',
      permanentAddress: user.permanentAddress || '',
      occupation: user.occupation || 'Employee',
      income: user.income || '$50,000 - $100,000',
      maritalStatus: user.maritalStatus || 'Single',
      dependents: user.dependents || '0',
    };
  });

  /* ── 1. Individual Taxpayers Professions Suite (10 Variants) ── */
  const individualAvatars = [
    { id: 'ind-1', label: '2D Blue Tee', src: '/avatars/casual_2d_male1.png', type: 'image' },
    { id: 'ind-2', label: '2D Sweater', src: '/avatars/casual_2d_female1.png', type: 'image' },
    { id: 'ind-3', label: '2D Hoodie', src: '/avatars/casual_2d_male2.png', type: 'image' },
    { id: 'ind-4', label: 'Tech Engineer', src: '/avatars/anime_cyber.png', type: 'image' },
    { id: 'ind-5', label: 'Anime Hero', src: '/avatars/anime_boy.png', type: 'image' },
    { id: 'ind-6', label: 'Anime Star', src: '/avatars/anime_girl.png', type: 'image' },
    { id: 'ind-7', label: 'Cartoon Cat CPA', src: '/avatars/cartoon_cat.png', type: 'image' },
    { id: 'ind-8', label: 'Doctor / Medical', emoji: '👨‍⚕️', type: 'emoji' },
    { id: 'ind-9', label: 'Teacher / Educator', emoji: '👨‍🏫', type: 'emoji' },
    { id: 'ind-10', label: 'Freelancer', emoji: '🎨', type: 'emoji' },
  ];

  /* ── 2. CA & Tax Advisors Professions Suite (10 Variants) ── */
  const caAvatars = [
    { id: 'ca-1', label: 'Male CA Executive', src: '/avatars/avatar_male.png', type: 'image' },
    { id: 'ca-2', label: 'Female CA Advisor', src: '/avatars/avatar_female.png', type: 'image' },
    { id: 'ca-3', label: 'Senior CA Partner', src: '/avatars/avatar_ca_senior.png', type: 'image' },
    { id: 'ca-4', label: 'Financial Analyst', src: '/avatars/avatar_tech.png', type: 'image' },
    { id: 'ca-5', label: 'Forensic Accountant', emoji: '🔍', type: 'emoji' },
    { id: 'ca-6', label: 'Tax Attorney', emoji: '⚖️', type: 'emoji' },
    { id: 'ca-7', label: 'Audit Specialist', emoji: '📈', type: 'emoji' },
    { id: 'ca-8', label: 'GST Specialist', emoji: '💼', type: 'emoji' },
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

  const handleChange = (field, value) => {
    if (field === 'country') {
      const defaultProvinces = { Canada: 'Ontario', USA: 'California', India: 'Maharashtra' };
      setFormData(prev => ({ ...prev, country: value, province: defaultProvinces[value] || 'Ontario' }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };

  const handleCustomFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Data = reader.result;
        setFormData(prev => ({ ...prev, avatar: base64Data }));
        updateUser({ avatar: base64Data }); // Immediately sync to UserContext!
      };
      reader.readAsDataURL(file);
      e.target.value = ''; // Reset file input
    }
  };

  const handleFinish = () => {
    const cleanData = {
      ...formData,
      cityArea: sanitizeInput(formData.cityArea),
      postalPinCode: sanitizeInput(formData.postalPinCode),
      permanentAddress: sanitizeInput(formData.permanentAddress),
      setupComplete: true
    };
    updateUser(cleanData);
    onComplete();
  };

  const handleBackAction = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
  };

  const codeLabel = formData.country === 'Canada' ? 'Postal Code (e.g. M5V 2T6)' : formData.country === 'USA' ? 'ZIP Code (e.g. 90210)' : 'PIN Code (e.g. 500081)';
  const codePlaceholder = formData.country === 'Canada' ? 'e.g. M5V 2T6' : formData.country === 'USA' ? 'e.g. 90210' : 'e.g. 500081';
  const areaPlaceholder = formData.country === 'Canada' ? 'e.g. Downtown / Yorkville, Toronto' : formData.country === 'USA' ? 'e.g. Beverly Hills / Manhattan' : 'e.g. Jubilee Hills / Bandra West';

  const activeAvatarList = 
    activeAvatarTab === 'enterprise' ? enterpriseAvatars :
    activeAvatarTab === 'ca' ? caAvatars : individualAvatars;

  return (
    <div className="animate-fade-in" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '36px', position: 'relative', overflow: 'hidden' }}>
      
      {/* Background Vector Artwork Image Accents */}
      <img src="/images/bg_ca_workspace.png" alt="Background Art" style={{ position: 'absolute', top: '-60px', right: '-80px', width: '480px', height: '480px', opacity: 0.12, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(2px)' }} />
      <img src="/images/bg_security_vault.png" alt="Background Vault Art" style={{ position: 'absolute', bottom: '-80px', left: '-80px', width: '520px', height: '520px', opacity: 0.10, borderRadius: '50%', pointerEvents: 'none', filter: 'blur(2px)' }} />

      {/* Top-Left Corner Logo */}
      <div style={{ position: 'absolute', top: '32px', left: '36px', zIndex: 10 }}>
        <AcaLogo size="small" />
      </div>

      {/* Top-Right Corner Contact Support */}
      <div style={{ position: 'absolute', top: '32px', right: '36px', zIndex: 10 }}>
        <button
          type="button"
          onClick={() => { onOpenSupport ? onOpenSupport() : alert('Opening Technical Support Helpline (+1-800-555-ACA)...'); }}
          className="btn-secondary"
          style={{
            padding: '10px 18px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px',
            cursor: 'pointer', boxShadow: 'var(--shadow-sm)', fontWeight: '700', color: 'var(--accent)', borderColor: 'var(--accent)'
          }}
        >
          <Headphones size={16} /> Contact Technical Support
        </button>
      </div>

      {/* Card Box */}
      <div className="aca-card" style={{ width: '100%', maxWidth: '820px', padding: '40px', boxShadow: 'var(--shadow-lg)', zIndex: 5, position: 'relative' }}>
        
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'flex-start' }}>
          <button
            type="button"
            onClick={handleBackAction}
            className="btn-secondary"
            style={{
              padding: '8px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px',
              cursor: 'pointer', boxShadow: 'var(--shadow-sm)', fontWeight: '700'
            }}
          >
            <ArrowLeft size={16} /> Back
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: '56px', height: '56px', borderRadius: '16px', backgroundColor: 'var(--primary-brand)', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px' }}>
            👤
          </div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--primary-brand)' }}>Tax Profile Setup</h2>
            <p style={{ fontSize: '14px', color: 'var(--text-secondary)' }}>Choose profession avatar, gender, regional tax jurisdiction & address</p>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* Avatar Choice Selection */}
          <div style={{ padding: '18px', backgroundColor: 'var(--secondary-bg)', borderRadius: '14px', border: '1px solid var(--border)' }}>
            <label className="form-label" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <Sparkles size={16} color="var(--accent)" /> Select Profession Avatar (10 Variants Per Category):
            </label>
            
            {/* Category Tab Switcher */}
            <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', backgroundColor: 'var(--cards)', padding: '6px', borderRadius: '12px' }}>
              <button
                type="button"
                onClick={() => setActiveAvatarTab('individual')}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeAvatarTab === 'individual' ? 'var(--btn-primary-bg)' : 'transparent',
                  color: activeAvatarTab === 'individual' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  fontWeight: activeAvatarTab === 'individual' ? '800' : '600', fontSize: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                }}
              >
                <UserCheck size={14} /> Taxpayers / 2D Casual (10)
              </button>

              <button
                type="button"
                onClick={() => setActiveAvatarTab('ca')}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeAvatarTab === 'ca' ? 'var(--btn-primary-bg)' : 'transparent',
                  color: activeAvatarTab === 'ca' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  fontWeight: activeAvatarTab === 'ca' ? '800' : '600', fontSize: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                }}
              >
                <Briefcase size={14} /> CA's & Advisors (10)
              </button>

              <button
                type="button"
                onClick={() => setActiveAvatarTab('enterprise')}
                style={{
                  flex: 1, padding: '10px', borderRadius: '10px', border: 'none', cursor: 'pointer',
                  backgroundColor: activeAvatarTab === 'enterprise' ? 'var(--btn-primary-bg)' : 'transparent',
                  color: activeAvatarTab === 'enterprise' ? 'var(--btn-primary-text)' : 'var(--text-secondary)',
                  fontWeight: activeAvatarTab === 'enterprise' ? '800' : '600', fontSize: '12px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px'
                }}
              >
                <Building2 size={14} /> Enterprises & HQ (10)
              </button>
            </div>

            {/* Active Category Avatars Grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', marginBottom: '14px' }}>
              {activeAvatarList.map(av => {
                const isSelected = av.type === 'image' ? formData.avatar === av.src : formData.avatar === av.emoji;
                return (
                  <div
                    key={av.id}
                    onClick={() => {
                      const newAvatar = av.type === 'image' ? av.src : av.emoji;
                      handleChange('avatar', newAvatar);
                      updateUser({ avatar: newAvatar }); // Immediately sync to UserContext!
                    }}
                    style={{
                      padding: '8px', borderRadius: '12px', border: isSelected ? '2.5px solid var(--accent)' : '1px solid var(--border)',
                      backgroundColor: isSelected ? 'var(--cards)' : 'transparent', cursor: 'pointer',
                      textAlign: 'center', transition: 'all 0.2s ease'
                    }}
                  >
                    {av.type === 'image' ? (
                      <img src={av.src} alt={av.label} style={{ width: '50px', height: '50px', borderRadius: '50%', objectFit: 'cover', margin: '0 auto 4px', display: 'block', border: '1.5px solid var(--border)' }} />
                    ) : (
                      <div style={{ width: '50px', height: '50px', borderRadius: '50%', backgroundColor: 'var(--cards)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', margin: '0 auto 4px', border: '1.5px solid var(--border)' }}>
                        {av.emoji}
                      </div>
                    )}
                    <div style={{ fontSize: '10px', fontWeight: isSelected ? '900' : '700', color: isSelected ? 'var(--accent)' : 'var(--primary-brand)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{av.label}</div>
                  </div>
                );
              })}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary"
                style={{ padding: '6px 12px', fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <Upload size={14} /> Upload Custom Photo File
              </button>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleCustomFileUpload} style={{ display: 'none' }} />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
            <Sel label="Gender" field="gender" value={formData.gender} onChange={handleChange} options={[
              { value: 'Male', label: 'Male ♂' },
              { value: 'Female', label: 'Female ♀' },
              { value: 'Non-Binary', label: 'Non-Binary / Other ⚧' },
              { value: 'Prefer not to say', label: 'Prefer not to say' },
            ]} />

            <Sel label="Country" field="country" value={formData.country} onChange={handleChange} options={[
              { value: 'Canada', label: 'Canada 🇨🇦 (EN / FR)' },
              { value: 'USA', label: 'USA 🇺🇸 (EN / ES)' },
              { value: 'India', label: 'India 🇮🇳 (Regional)' },
            ]} />

            <ProvinceStateSelector country={formData.country} value={formData.province} onChange={handleChange} />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '16px' }}>
            <Txt label="City / Residential Area / Locality" field="cityArea" placeholder={areaPlaceholder} value={formData.cityArea} onChange={handleChange} />
            <Txt label={codeLabel} field="postalPinCode" placeholder={codePlaceholder} value={formData.postalPinCode} onChange={handleChange} />
          </div>

          <Txt label="Street Address / Building / Apartment" field="permanentAddress" placeholder="e.g. 123 Main St, Apt 4B" value={formData.permanentAddress} onChange={handleChange} />

          <button onClick={handleFinish} className="btn-primary" style={{ width: '100%', padding: '16px', fontSize: '15px', marginTop: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
            Finish Setup & Go to Dashboard <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
