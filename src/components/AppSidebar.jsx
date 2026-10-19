import React from 'react';
import { 
  LayoutDashboard, FileText, Sparkles, User, Settings, CreditCard, ShieldCheck, 
  HelpCircle, Keyboard, LogOut, ChevronRight, ShieldAlert, Lock
} from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useLanguage } from '../context/LanguageContext';

export default function AppSidebar({ activeTab, setActiveTab, onOpenShortcutsGuide }) {
  const { user, logout } = useUser();
  const { t } = useLanguage();

  const isCA = user.userType === 'CA' || user.userType === 'Agency';
  const isAdmin = user.userType === 'Admin';

  const navSections = [
    {
      title: 'TAX WORKSPACE',
      items: [
        { id: 'dashboard', label: t('navDashboard'), icon: LayoutDashboard },
        { id: 'vault', label: t('navVault'), icon: FileText },
        { id: 'filing', label: t('navFiling'), icon: Sparkles },
      ]
    },
    {
      title: 'USER & SETTINGS',
      items: [
        { id: 'profile', label: t('navProfile'), icon: User },
        { id: 'personalization', label: t('navAvatars'), icon: Sparkles },
        { id: 'subscription', label: t('navSubscription'), icon: CreditCard },
        { id: 'settings', label: t('navSettings'), icon: Settings },
      ]
    },
    ...(isAdmin ? [{
      title: 'ADMINISTRATION & DEFENSE',
      items: [
        { id: 'admin', label: 'Admin & Security Console', icon: ShieldAlert },
      ]
    }] : [])
  ];

  const handleSignOut = () => {
    logout();
    window.location.hash = '';
    localStorage.removeItem('aca_active_tab');
  };

  return (
    <aside style={{
      width: '260px', borderRight: '1px solid var(--border)', backgroundColor: 'var(--cards)',
      display: 'flex', flexDirection: 'column', height: 'calc(100vh - 72px)', position: 'sticky', top: '72px'
    }}>
      <div style={{ flex: 1, padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '28px', overflowY: 'auto' }}>
        
        {/* User Role Badge Card */}
        <div style={{ padding: '14px 16px', backgroundColor: 'var(--secondary-bg)', borderRadius: '12px', border: '1px solid var(--border)' }}>
          <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>ACTIVE ROLE</div>
          <div style={{ fontSize: '14px', fontWeight: '900', color: 'var(--primary-brand)', marginTop: '2px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span>{user.userType === 'Admin' ? '🛡️ Administrator' : user.userType === 'CA' ? '💼 Chartered Accountant' : user.userType === 'Agency' ? '🏢 Enterprise' : '👤 Taxpayer'}</span>
          </div>
          <div style={{ fontSize: '11px', color: 'var(--accent)', fontWeight: '800', marginTop: '4px', fontFamily: 'var(--font-mono)' }}>
            {user.accountCode}
          </div>
        </div>

        {navSections.map((sec, idx) => (
          <div key={idx}>
            <div style={{ fontSize: '11px', fontWeight: '800', color: 'var(--text-muted)', letterSpacing: '0.05em', marginBottom: '12px', paddingLeft: '12px' }}>
              {sec.title}
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {sec.items.map(item => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    style={{
                      display: 'flex', alignItems: 'center', gap: '12px', width: '100%',
                      padding: '12px 14px', borderRadius: 'var(--radius-md)', border: 'none',
                      backgroundColor: isActive ? 'var(--secondary-bg)' : 'transparent',
                      color: isActive ? 'var(--primary-brand)' : 'var(--text-secondary)',
                      fontWeight: isActive ? '800' : '600', fontSize: '14px', cursor: 'pointer',
                      borderLeft: isActive ? '4px solid var(--accent)' : '4px solid transparent',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <Icon size={18} color={isActive ? 'var(--accent)' : 'var(--text-muted)'} />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* Keyboard Shortcuts Trigger Button */}
        <button
          onClick={onOpenShortcutsGuide}
          style={{
            display: 'flex', alignItems: 'center', gap: '10px', width: '100%',
            padding: '10px 14px', borderRadius: 'var(--radius-md)', border: '1px dashed var(--border)',
            backgroundColor: 'transparent', color: 'var(--text-secondary)', fontSize: '12px', fontWeight: '700', cursor: 'pointer'
          }}
        >
          <Keyboard size={16} color="var(--accent)" />
          <span>Keyboard Shortcuts Guide</span>
        </button>
      </div>

      {/* Footer Sign Out / Login Options Button */}
      <div style={{ padding: '16px', borderTop: '1px solid var(--border)', backgroundColor: 'var(--secondary-bg)' }}>
        <button
          onClick={handleSignOut}
          className="btn-secondary"
          style={{
            width: '100%', padding: '10px 14px', fontSize: '13px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            cursor: 'pointer', fontWeight: '800', color: 'var(--danger)', borderColor: 'var(--border)'
          }}
        >
          <LogOut size={16} /> Sign Out (Login Page)
        </button>
      </div>
    </aside>
  );
}
