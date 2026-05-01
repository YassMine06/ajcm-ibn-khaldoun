import React, { createContext, useContext, useState } from 'react';

// ─────────────────────────────────────────────
// LanguageContext
// Usage in any component:
//   const { lang, toggleLang, t } = useLanguage();
//   t('Texte FR', 'نص بالعربية')  → returns the right string
// ─────────────────────────────────────────────

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [lang, setLang] = useState('fr'); // 'fr' | 'ar'

  const toggleLang = () => setLang(prev => (prev === 'fr' ? 'ar' : 'fr'));

  // Helper: pick French or Arabic text
  const t = (fr, ar) => (lang === 'fr' ? fr : ar);

  return (
    <LanguageContext.Provider value={{ lang, toggleLang, t }}>
      <div dir={lang === 'ar' ? 'rtl' : 'ltr'} lang={lang}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used inside <LanguageProvider>');
  return ctx;
};

export default LanguageContext;
