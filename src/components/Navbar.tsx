import { useLanguage } from '../context/LanguageContext';
import { Globe } from 'lucide-react';

export default function Navbar({ onNavigate, currentPage }: { onNavigate?: (page: 'home' | 'fleet') => void, currentPage?: string }) {
  const { lang, toggleLang, t } = useLanguage();

  const handleNavClick = (page: 'home' | 'fleet', anchor?: string) => {
    onNavigate?.(page);
    if (anchor) {
      setTimeout(() => {
        document.getElementById(anchor)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed w-full z-50 bg-obsidian/80 backdrop-blur-md border-b border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center gap-2">
            <div className="w-10 h-10 bg-gold rounded-sm flex items-center justify-center text-obsidian font-bold text-xl">
              V
            </div>
            <span className="font-bold text-xl tracking-wider text-alabaster">
              VAL <span className="text-gold">RENTAL</span>
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8 rtl:space-x-reverse">
            <button onClick={() => handleNavClick('home')} className="text-alabaster hover:text-gold transition-colors">{t('nav.home')}</button>
            <button onClick={() => handleNavClick('fleet')} className="text-alabaster hover:text-gold transition-colors">{t('nav.fleet')}</button>
            <button onClick={() => handleNavClick('home', 'services')} className="text-alabaster hover:text-gold transition-colors">{t('nav.services')}</button>
            <button onClick={() => handleNavClick('home', 'reviews')} className="text-alabaster hover:text-gold transition-colors">{t('nav.reviews')}</button>
          </div>

          <button 
            onClick={toggleLang}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-gold/50 text-gold hover:bg-gold hover:text-obsidian transition-all"
          >
            <Globe className="w-4 h-4" />
            <span className="font-medium">{lang === 'en' ? 'العربية' : 'English'}</span>
          </button>
        </div>
      </div>
    </nav>
  );
}
