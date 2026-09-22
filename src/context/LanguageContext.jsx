import { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'ru';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.lang = language;
  }, [language]);

  const languages = {
    ru: {
      code: 'ru',
      name: 'Русский',
      flagUrl: 'https://flagcdn.com/w40/ru.png'
    },
    en: {
      code: 'en',
      name: 'English',
      flagUrl: 'https://flagcdn.com/w40/gb.png'
    },
    de: {
      code: 'de',
      name: 'Deutsch',
      flagUrl: 'https://flagcdn.com/w40/de.png'
    }
  };

  const changeLanguage = (langCode) => {
    if (languages[langCode]) {
      setLanguage(langCode);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, languages, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};