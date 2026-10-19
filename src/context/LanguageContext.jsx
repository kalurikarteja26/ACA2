import React, { createContext, useContext, useState } from 'react';

export const COUNTRY_LANGUAGES = {
  Canada: [
    { code: 'en', name: 'English', native: 'English', flag: '🇨🇦' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇨🇦' },
  ],
  USA: [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸' },
    { code: 'es', name: 'Spanish', native: 'Español', flag: '🇺🇸' },
  ],
  India: [
    { code: 'en', name: 'English', native: 'English', flag: '🌐' },
    { code: 'hi', name: 'Hindi', native: 'हिंदी', flag: '🇮🇳' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు', flag: '🇮🇳' },
    { code: 'mr', name: 'Marathi', native: 'मराठी', flag: '🇮🇳' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்', flag: '🇮🇳' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ', flag: '🇮🇳' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી', flag: '🇮🇳' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা', flag: '🇮🇳' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ', flag: '🇮🇳' },
  ],
};

const TRANSLATIONS = {
  English: {
    welcome: 'Welcome back',
    startReturn: 'Start Tax Return',
    estimatedRefund: 'ESTIMATED TAX REFUND',
    auditRisk: 'AUDIT RISK SCORE',
    deadline: 'FILING DEADLINE',
    vault: 'NEURAL SLIP VAULT',
    navDashboard: 'Overview Dashboard',
    navVault: 'Document Vault & OCR',
    navFiling: 'Tax Filing Wizard',
    navProfile: 'My Taxpayer Profile',
    navAvatars: 'Avatars & Setup',
    navSubscription: 'Plan & Billing',
    navSettings: 'System Settings',
  },
  French: {
    welcome: 'Bienvenue',
    startReturn: 'Commencer la déclaration de revenus',
    estimatedRefund: 'REMBOURSEMENT D’IMPÔT ESTIMÉ',
    auditRisk: 'SCORE DE RISQUE D’AUDIT',
    deadline: 'DATE LIMITE DE DÉCLARATION',
    vault: 'COFFRE-FORT DE DOCUMENTS',
    navDashboard: 'Tableau de bord',
    navVault: 'Coffre de documents & OCR',
    navFiling: 'Assistant de déclaration',
    navProfile: 'Mon profil de contribuable',
    navAvatars: 'Avatars & Configuration',
    navSubscription: 'Abonnement & Facturation',
    navSettings: 'Paramètres système',
  },
  Spanish: {
    welcome: 'Bienvenido de nuevo',
    startReturn: 'Iniciar declaración de impuestos',
    estimatedRefund: 'REEMBOLSO DE IMPUESTOS ESTIMADO',
    auditRisk: 'ÍNDICE DE RIESGO DE AUDITORÍA',
    deadline: 'FECHA LÍMITE DE PRESENTACIÓN',
    vault: 'BÓVEDA DE DOCUMENTOS OCR',
    navDashboard: 'Panel principal',
    navVault: 'Bóveda de documentos',
    navFiling: 'Asistente de impuestos',
    navProfile: 'Mi perfil fiscal',
    navAvatars: 'Avatares y configuración',
    navSubscription: 'Plan y facturación',
    navSettings: 'Configuración del sistema',
  },
  Hindi: {
    welcome: 'पुनः स्वागत है',
    startReturn: 'आयकर रिटर्न दाखिल करना शुरू करें',
    estimatedRefund: 'अनुमानित कर रिफंड',
    auditRisk: 'ऑडिट जोखिम स्कोर',
    deadline: 'रिटर्न दाखिल करने की अंतिम तिथि',
    vault: 'दस्तावेज़ वॉल्ट और ओसीआर',
    navDashboard: 'डैशबोर्ड अवलोकन',
    navVault: 'दस्तावेज़ वॉल्ट',
    navFiling: 'कर दाखिल सहायक',
    navProfile: 'मेरा करदाता प्रोफ़ाइल',
    navAvatars: 'अवतार और सेटअप',
    navSubscription: 'योजना और बिलिंग',
    navSettings: 'सिस्टम सेटिंग्स',
  },
  Telugu: {
    welcome: 'తిరిగి స్వాగతం',
    startReturn: 'పన్ను రిటర్న్ దాఖలు ప్రారంభించండి',
    estimatedRefund: 'అంచనా వేసిన పన్ను రీఫండ్',
    auditRisk: 'ఆడిట్ ప్రమాద స్కోరు',
    deadline: 'రిటర్న్ దాఖలు గడువు',
    vault: 'డాక్యుమెంట్ వాల్ట్ & ఒసిఆర్',
    navDashboard: 'డ్యాష్‌బోర్డ్ అవలోకనం',
    navVault: 'డాక్యుమెంట్ వాల్ట్',
    navFiling: 'పన్ను దాఖలు విజార్డ్',
    navProfile: 'నా పన్ను చెల్లింపుదారు ప్రొఫైల్',
    navAvatars: 'అవతార్‌లు & సెటప్',
    navSubscription: 'ప్లాన్ & బిల్లింగ్',
    navSettings: 'సిస్టమ్ సెట్టింగ్‌లు',
  },
  Marathi: {
    welcome: 'पुन्हा स्वागत आहे',
    startReturn: 'कर परतावा दाखल करणे सुरू करा',
    estimatedRefund: 'अंदाजित कर परतावा',
    auditRisk: 'ऑडिट धोका स्कोर',
    deadline: 'कर भरण्याची अंतिम मुदत',
    vault: 'दस्तऐवज वॉल्ट',
    navDashboard: 'डॅशबोर्ड',
    navVault: 'दस्तऐवज वॉल्ट',
    navFiling: 'कर भरणा सहाय्यक',
    navProfile: 'माझे करदाते प्रोफाइल',
    navAvatars: 'अवतार आणि सेटअप',
    navSubscription: 'योजना आणि बिलिंग',
    navSettings: 'सिस्टम सेटिंग्ज',
  },
  Tamil: {
    welcome: 'மீண்டும் வருக',
    startReturn: 'வரி தாக்கல் தொடங்கவும்',
    estimatedRefund: 'மதிப்பிடப்பட்ட வரி ரீஃபண்ட்',
    auditRisk: 'தணிக்கை அபாய புள்ளி',
    deadline: 'தாக்கல் கடைசி தேதி',
    vault: 'ஆவண பெட்டகம்',
    navDashboard: 'டாஷ்போர்டு',
    navVault: 'ஆவண வோல்ட்',
    navFiling: 'வரி தாக்கல் வழிகாட்டி',
    navProfile: 'என் வரி செலுத்துவோர் சுயவிவரம்',
    navAvatars: 'அவதாரங்கள் & அமைப்பு',
    navSubscription: 'திட்டம் & பில்லிங்',
    navSettings: 'அமைப்பு அமைப்புகள்',
  },
  Kannada: {
    welcome: 'ಮತ್ತೆ ಸುಸ್ವಾಗತ',
    startReturn: 'ತೆರಿಗೆ ರಿಟರ್ನ್ ಸಲ್ಲಿಕೆ ಪ್ರಾರಂಭಿಸಿ',
    estimatedRefund: 'ಅಂದಾಜು ತೆರಿಗೆ ಮರುಪಾವತಿ',
    auditRisk: 'ಲೆಕ್ಕಪರಿಶೋಧನೆ ঝুঁকি ಅಂಕ',
    deadline: 'ಸಲ್ಲಿಕೆ ಕೊನೆಯ ದಿನಾಂಕ',
    vault: 'ದಾಖಲೆ ವಾಲ್ಟ್',
    navDashboard: 'ಡ್ಯಾಶ್‌ಬೋರ್ಡ್',
    navVault: 'ದಾಖಲೆ ವಾಲ್ಟ್',
    navFiling: 'ತೆರಿಗೆ ಸಲ್ಲಿಕೆ ಮಾರ್ಗದರ್ಶಿ',
    navProfile: 'ನನ್ನ ತೆರಿಗೆದಾರರ ಪ್ರೊಫೈಲ್',
    navAvatars: 'ಅವತಾರಗಳು & ಹೊಂದಿಕೆ',
    navSubscription: 'ಯೋಜನೆ & ಬಿಲ್ಲಿಂಗ್',
    navSettings: 'ವ್ಯವಸ್ಥೆಯ ಸಂಯೋಜನೆಗಳು',
  },
  Gujarati: {
    welcome: 'પાછા સ્વાગત છે',
    startReturn: 'ટેક્સ રિટર્ન ફાઇલ કરવાનું શરૂ કરો',
    estimatedRefund: 'અંદાજિત ટેક્સ રિફંડ',
    auditRisk: 'ઓડિટ જોખમ સ્કોર',
    deadline: 'ફાઇલિંગની છેલ્લી તારીખ',
    vault: 'દસ્તાવેજ વોલ્ટ',
    navDashboard: 'ડેશબોર્ડ',
    navVault: 'દસ્તાવેજ વોલ્ટ',
    navFiling: 'ટેક્સ ફાઇલિંગ મદદગાર',
    navProfile: 'મારું ટેક્સપેયર પ્રોફાઇલ',
    navAvatars: 'અવતાર અને સેટઅપ',
    navSubscription: 'પ્લાન અને બિલિંગ',
    navSettings: 'સિસ્ટમ સેટિંગ્સ',
  },
  Bengali: {
    welcome: 'স্বাগতম',
    startReturn: 'ট্যাক্স রিটার্ন জমা দেওয়া শুরু করুন',
    estimatedRefund: 'আনুমানিক ট্যাক্স রিফান্ড',
    auditRisk: 'অডিট ঝুঁকি স্কোর',
    deadline: 'জমা দেওয়ার শেষ তারিখ',
    vault: 'ডকুমেন্ট ভল্ট',
    navDashboard: 'ড্যাশবোর্ড',
    navVault: 'ডকুমেন্ট ভল্ট',
    navFiling: 'ট্যাক্স ফাইল সহকারী',
    navProfile: 'আমার ট্যাক্সপেয়ার প্রোফাইল',
    navAvatars: 'অবতার ও সেটআপ',
    navSubscription: 'প্ল্যান ও বিলিং',
    navSettings: 'সিস্টেম সেটিংস',
  },
  Punjabi: {
    welcome: 'ਜੀ ਆਇਆਂ ਨੂੰ',
    startReturn: 'ਟੈਕਸ ਰਿਟਰਨ ਫਾਈਲ ਕਰਨਾ ਸ਼ੁਰੂ ਕਰੋ',
    estimatedRefund: 'ਅਨੁਮਾਨਿਤ ਟੈਕਸ ਰਿਫੰਡ',
    auditRisk: 'ਆਡਿਟ ਜੋਖਮ ਸਕੋਰ',
    deadline: 'ਫਾਈਲ ਕਰਨ ਦੀ ਆਖਰੀ ਮਿਤੀ',
    vault: 'ਦਸਤਾਵੇਜ਼ ਵਾਲਟ',
    navDashboard: 'ਡੈਸ਼ਬੋਰਡ',
    navVault: 'ਦਸਤਾਵੇਜ਼ ਵਾਲਟ',
    navFiling: 'ਟੈਕਸ ਫਾਈਲਿੰਗ ਸਹਾਇਕ',
    navProfile: 'ਮੇਰਾ ਟੈਕਸਦਾਤਾ ਪ੍ਰੋਫਾਈਲ',
    navAvatars: 'ਅਵਤਾਰ ਅਤੇ ਸੈੱਟਅੱਪ',
    navSubscription: 'ਯੋਜਨਾ ਅਤੇ ਬਿਲਿੰਗ',
    navSettings: 'ਸਿਸਟਮ ਸੈਟਿੰਗਾਂ',
  },
};

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => localStorage.getItem('aca_lang') || 'English');

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('aca_lang', lang);
  };

  const t = (key) => {
    const langDict = TRANSLATIONS[language] || TRANSLATIONS.English;
    return langDict[key] || TRANSLATIONS.English[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
}
