import { useLanguage } from '../context/LanguageContext';
import { ChevronRight } from 'lucide-react';

export default function Hero({ onBookClick }: { onBookClick?: () => void }) {
  const { t, lang } = useLanguage();

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 z-0">
        <video 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?q=80&w=2070&auto=format&fit=crop"
          className="w-full h-full object-cover opacity-60"
        >
          {/* User's uploaded video should be placed in /public/video-hero.mp4 */}
          <source src="/video-hero.mp4" type="video/mp4" />
          {/* Fallback video while the upload is failing */}
          <source src="https://assets.mixkit.co/videos/preview/mixkit-white-sports-car-driving-in-a-desert-34988-large.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/80 via-obsidian/50 to-obsidian"></div>
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto mt-16">
        <h1 className="text-5xl md:text-7xl font-bold mb-6 text-alabaster tracking-tight">
          {lang === 'en' ? (
            <>Elite Mobility. <br className="md:hidden" /><span className="text-gold">Desert Elegance.</span></>
          ) : (
            <>فخامة التنقل. <br className="md:hidden" /><span className="text-gold">أناقة الصحراء.</span></>
          )}
        </h1>
        <p className="text-xl md:text-2xl text-alabaster/80 mb-10 max-w-3xl mx-auto font-light">
          {t('hero.subheadline')}
        </p>
        <button 
          onClick={onBookClick}
          className="group relative inline-flex items-center justify-center px-8 py-4 font-bold text-obsidian bg-gold rounded-sm overflow-hidden transition-all hover:scale-105">
          <span className="relative z-10 flex items-center gap-2">
            {t('hero.cta')}
            <ChevronRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''} group-hover:translate-x-1 transition-transform`} />
          </span>
        </button>
      </div>
    </div>
  );
}
