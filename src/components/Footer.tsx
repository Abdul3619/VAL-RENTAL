import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-[#050505] py-8 border-t border-gold/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gold rounded-sm flex items-center justify-center text-obsidian font-bold text-lg">
            V
          </div>
          <span className="font-bold text-lg tracking-wider text-alabaster">
            VAL <span className="text-gold">RENTAL</span>
          </span>
        </div>
        <p className="text-alabaster/50 text-sm">
          &copy; {new Date().getFullYear()} Val Car Rental. {t('footer.rights')}
        </p>
      </div>
    </footer>
  );
}
