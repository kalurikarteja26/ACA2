import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { UserProvider, useUser } from './context/UserContext';
import { LanguageProvider } from './context/LanguageContext';

// Screens & Layout
import AppHeader from './components/AppHeader';
import AppSidebar from './components/AppSidebar';
import LandingScreen from './components/LandingScreen';
import PersonalizationScreen from './components/PersonalizationScreen';
import ProfileScreen from './components/ProfileScreen';
import DocumentVaultScreen from './components/DocumentVaultScreen';
import TaxFilingWizard from './components/TaxFilingWizard';
import SubscriptionScreen from './components/SubscriptionScreen';
import SplashScreen from './components/SplashScreen';
import AdminConsoleScreen from './components/AdminConsoleScreen';
import AccessDeniedScreen from './components/AccessDeniedScreen';

// Dashboards
import CanadaDashboard from './components/dashboards/CanadaDashboard';
import USADashboard from './components/dashboards/USADashboard';
import IndiaDashboard from './components/dashboards/IndiaDashboard';

// Modals, Floating Tools & Security Guards
import ShortcutsGuideModal from './components/ShortcutsGuideModal';
import TaxAiFloatingAssistant from './components/TaxAiFloatingAssistant';
import { authorizeRoute } from './utils/rbac';
import { logSecurityEvent, EVENT_TYPES } from './utils/auditLogger';
import { ENV } from './config/env';

function RootContent() {
  const { user, login, logout } = useUser();
  const [activeTab, setActiveTab] = useState(() => localStorage.getItem('aca_active_tab') || 'dashboard');
  const [showShortcuts, setShowShortcuts] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  // Auto-hide Splash screen after 1.8 seconds entry animation
  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 1800);
    return () => clearTimeout(timer);
  }, []);

  // Save active tab state
  useEffect(() => {
    localStorage.setItem('aca_active_tab', activeTab);
  }, [activeTab]);

  // ── Session Inactivity Timeout Guard ──
  useEffect(() => {
    if (!user.isLoggedIn) return;

    const timeoutDuration = (ENV.SESSION_TIMEOUT_MINUTES || 30) * 60 * 1000;
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        logSecurityEvent('SESSION_TIMEOUT_AUTO_LOGOUT', { user: user.email, timeoutMinutes: ENV.SESSION_TIMEOUT_MINUTES }, 'WARNING');
        logout();
        alert('🛡️ Security Session Expired: You have been logged out due to inactivity.');
      }, timeoutDuration);
    };

    const events = ['mousedown', 'mousemove', 'keypress', 'scroll', 'touchstart'];
    events.forEach(evt => window.addEventListener(evt, resetTimer, { passive: true }));
    resetTimer();

    return () => {
      clearTimeout(timer);
      events.forEach(evt => window.removeEventListener(evt, resetTimer));
    };
  }, [user.isLoggedIn, user.email, logout]);

  // Global keyboard shortcuts (Ctrl+K or Cmd+K for Search, ? for Shortcuts Guide)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        const searchInput = document.querySelector('input[placeholder*="Search"]');
        if (searchInput) searchInput.focus();
      }
      if (e.key === '?' && !['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        e.preventDefault();
        setShowShortcuts(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleOpenSupport = () => {
    alert('☎️ Opening ACA Priority Technical Support Line (+1-800-555-ACA-TAX).\nA support agent is being assigned to your active session.');
  };

  const renderDashboard = () => {
    switch (user.country) {
      case 'USA':
        return <USADashboard onNavigate={setActiveTab} />;
      case 'India':
        return <IndiaDashboard onNavigate={setActiveTab} />;
      case 'Canada':
      default:
        return <CanadaDashboard onNavigate={setActiveTab} />;
    }
  };

  const renderMainContent = () => {
    // ── RBAC Security Authorization Guard ──
    const authStatus = authorizeRoute(user.userType, activeTab, user.email);
    if (!authStatus.authorized) {
      return (
        <AccessDeniedScreen
          tab={activeTab}
          reason={authStatus.reason}
          onReturnHome={() => setActiveTab('dashboard')}
        />
      );
    }

    switch (activeTab) {
      case 'admin':
        return <AdminConsoleScreen onNavigate={setActiveTab} />;
      case 'dashboard':
        return renderDashboard();
      case 'vault':
        return <DocumentVaultScreen />;
      case 'filing':
        return <TaxFilingWizard onComplete={() => setActiveTab('dashboard')} />;
      case 'profile':
        return <ProfileScreen />;
      case 'personalization':
        return <PersonalizationScreen onComplete={() => setActiveTab('dashboard')} onBack={() => setActiveTab('dashboard')} onOpenSupport={handleOpenSupport} />;
      case 'subscription':
        return <SubscriptionScreen />;
      case 'settings':
        return <ProfileScreen />;
      default:
        return renderDashboard();
    }
  };

  // 1. Render Centered Logo Entry Splash Screen
  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  // 2. Render Landing Screen if unauthenticated
  if (!user.isLoggedIn) {
    return (
      <LandingScreen
        onLogin={() => {
          if (user.userType === 'Admin') {
            setActiveTab('admin');
          } else if (!user.setupComplete) {
            setActiveTab('personalization');
          } else {
            setActiveTab('dashboard');
          }
        }}
        onOpenSupport={handleOpenSupport}
      />
    );
  }

  // 3. Render Setup Screen if setup incomplete
  if (!user.setupComplete && activeTab === 'personalization') {
    return (
      <PersonalizationScreen
        onComplete={() => setActiveTab('dashboard')}
        onBack={() => {
          logout();
          setActiveTab('dashboard');
        }}
        onOpenSupport={handleOpenSupport}
      />
    );
  }

  // 4. Main Application Workspace
  return (
    <>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--background)', color: 'var(--text-primary)', display: 'flex', flexDirection: 'column' }}>
        <AppHeader
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          onSignOut={logout}
          onOpenSupport={handleOpenSupport}
        />

        <div style={{ display: 'flex', flex: 1 }}>
          <AppSidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenShortcutsGuide={() => setShowShortcuts(true)}
          />

          <main style={{ flex: 1, backgroundColor: 'var(--background)', overflowY: 'auto', minHeight: 'calc(100vh - 72px)' }}>
            {renderMainContent()}
          </main>
        </div>

        {/* Global Floating AI Tax Assistant Widget */}
        <TaxAiFloatingAssistant onOpenFiling={() => setActiveTab('filing')} />
      </div>

      {/* Keyboard Shortcuts Modal */}
      {showShortcuts && (
        <ShortcutsGuideModal
          isOpen={showShortcuts}
          onClose={() => setShowShortcuts(false)}
        />
      )}
    </>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <LanguageProvider>
          <RootContent />
        </LanguageProvider>
      </UserProvider>
    </ThemeProvider>
  );
}
