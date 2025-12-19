import { useTranslation } from 'react-i18next';
import { Button } from '../ui/button';
import { Languages } from 'lucide-react';

const LanguageSwitcher = () => {
  const { i18n, t } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'ar' : 'en';
    i18n.changeLanguage(newLang);
    localStorage.setItem('i18nextLng', newLang);
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleLanguage}
      className="relative"
      title={i18n.language === 'en' ? t('language.arabic') : t('language.english')}
    >
      <Languages className="h-5 w-5" />
      <span className="absolute -bottom-1 -right-1 text-[10px] font-semibold">
        {i18n.language === 'en' ? 'AR' : 'EN'}
      </span>
    </Button>
  );
};

export default LanguageSwitcher;

