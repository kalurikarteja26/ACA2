import React, { createContext, useContext, useState } from 'react';

const DEFAULT_USER = {
  isLoggedIn: false,
  setupComplete: false,
  accountCode: 'ACA-CLT-2026-8942',
  userType: 'User', // 'User' | 'CA' | 'Agency' | 'Admin'
  fullName: 'Alex Mercer',
  email:    'alex.mercer@example.com',
  phone:    '+1 (555) 234-5678',
  gender:   'Male',
  avatar:   '/avatars/casual_2d_male1.png',
  country:  'Canada',
  province: 'Ontario',
  citizenships: ['Canada'],
  residenceStatus: 'Resident',
  permanentAddress: '123 University Ave, Toronto, ON M5G 2C8',
  cityArea: 'Downtown Toronto',
  postalPinCode: 'M5V 2T6',
  income:   '$85,000 - $120,000',
  occupation: 'Software Engineer',
  employmentType: 'Full-time Employee',
  filingStatus: 'Single',
  hasForeignAssets: false,
  sideIncome:  false,
  business:    false,
  maritalStatus: 'Single',
  dependents:  '0',
  guidedTourComplete: false,
};

const generateCode = (uType) => {
  const prefix = uType === 'Admin' ? 'ACA-ADM' : uType === 'CA' ? 'ACA-CPA' : uType === 'Agency' ? 'ACA-ENT' : 'ACA-CLT';
  const year = new Date().getFullYear();
  const randomNum = Math.floor(1000 + Math.random() * 9000);
  return `${prefix}-${year}-${randomNum}`;
};

const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('aca_active_user');
      if (saved) return JSON.parse(saved);
    } catch {}
    return DEFAULT_USER;
  });

  const updateUser = (patch) => setUser(prev => {
    const updatedType = patch.userType || prev.userType;
    const existingCode = patch.accountCode || prev.accountCode || generateCode(updatedType);
    const updated = { ...prev, ...patch, accountCode: existingCode };
    try {
      localStorage.setItem('aca_active_user', JSON.stringify(updated));
    } catch {}
    return updated;
  });

  const login = (userData) => {
    setUser(prev => {
      const session = {
        ...prev,
        ...userData,
        isLoggedIn: true,
        setupComplete: userData.setupComplete !== undefined ? userData.setupComplete : false,
      };
      try {
        localStorage.setItem('aca_active_user', JSON.stringify(session));
      } catch {}
      return session;
    });
  };

  const logout = () => {
    try {
      localStorage.removeItem('aca_active_user');
      localStorage.removeItem('aca_active_tab');
    } catch {}
    setUser({
      ...DEFAULT_USER,
      isLoggedIn: false,
      setupComplete: false,
    });
  };

  const initials = user.fullName
    ? user.fullName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'US';

  return (
    <UserContext.Provider value={{ user, updateUser, login, logout, initials }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error('useUser must be used inside <UserProvider>');
  return ctx;
}
