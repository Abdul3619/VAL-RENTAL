import { useLanguage } from '../context/LanguageContext';
import { MapPin, Plane, Clock } from 'lucide-react';

export default function VIPService() {
  const { t, lang } = useLanguage();

  return (
    <section id="services" className="py-24 bg-gradient-to-b from-obsidian to-[#111]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className={`order-2 ${lang === 'en' ? 'md:order-1' : 'md:order-2'}`}>
            <h2 className="text-4xl font-bold text-gold mb-6">{t('vip.title')}</h2>
            <p className="text-xl text-alabaster/80 mb-8 leading-relaxed">
              {t('vip.desc')}
            </p>
            
            <div className="space-y-6 mb-10">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Plane className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-alabaster mb-1">
                    {lang === 'en' ? 'Airport Meet & Greet' : 'استقبال في المطار'}
                  </h4>
                  <p className="text-alabaster/60">
                    {lang === 'en' ? 'Direct handover at Wadi ad-Dawasir Domestic Airport.' : 'تسليم مباشر في مطار وادي الدواسر المحلي.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-alabaster mb-1">
                    {lang === 'en' ? 'Residence Delivery' : 'توصيل لمكان الإقامة'}
                  </h4>
                  <p className="text-alabaster/60">
                    {lang === 'en' ? 'Your vehicle waiting for you at your hotel or home.' : 'سيارتك بانتظارك في فندقك أو منزلك.'}
                  </p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-alabaster mb-1">
                    {lang === 'en' ? '24/7 Availability' : 'متاح على مدار الساعة'}
                  </h4>
                  <p className="text-alabaster/60">
                    {lang === 'en' ? 'We operate on your schedule, day or night.' : 'نعمل وفق جدولك الزمني، ليلاً أو نهاراً.'}
                  </p>
                </div>
              </div>
            </div>
            
            <button className="px-8 py-3 border-2 border-gold text-gold hover:bg-gold hover:text-obsidian font-bold transition-colors rounded-sm">
              {t('vip.cta')}
            </button>
          </div>
          
          <div className={`order-1 ${lang === 'en' ? 'md:order-2' : 'md:order-1'} relative`}>
            <div className="aspect-square rounded-full bg-gold/5 absolute -inset-4 blur-3xl"></div>
            <img 
              src="https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?q=80&w=2070&auto=format&fit=crop" 
              alt="VIP Service" 
              className="relative z-10 rounded-lg border border-gold/20 shadow-2xl shadow-gold/10 object-cover h-[600px] w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
