import { useLanguage } from '../context/LanguageContext';
import { translations } from '../data/translations';

export const useTranslation = () => {
  const { language } = useLanguage();
  const t = translations[language] || translations.ru;
  return { t, language };
};