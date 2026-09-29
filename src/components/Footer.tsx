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
            VELOCITY <span className="text-gold">RENTALS</span>
          </span>
        </div>
        <p className="text-alabaster/70 text-sm">
          &copy; {new Date().getFullYear()} Velocity Rentals. {t('footer.rights')} {t('footer.sampleReviews')}
        </p>
        <p className="text-alabaster/70 text-sm">
          {t('footer.builtBy')} ·{' '}
          <a href="mailto:abdulwahababdullahi3619@gmail.com" className="text-gold underline underline-offset-2">
            {t('footer.contactDev')}
          </a>
        </p>
      </div>
    </footer>
  );
}
