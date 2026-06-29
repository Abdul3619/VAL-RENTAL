import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { Settings, Shield, Maximize, MessageCircle, ArrowRight } from 'lucide-react';
import BookingModal from './BookingModal';
import { cars, Car } from '../data/cars';

export default function LiveGarage({ onViewAll }: { onViewAll?: () => void }) {
  const { t, lang } = useLanguage();
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const featuredCars = cars.slice(0, 4);

  return (
    <section id="fleet" className="py-24 bg-obsidian border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gold mb-4">{t('garage.title')}</h2>
          <p className="text-alabaster/70 text-lg">{t('garage.subtitle')}</p>
        </div>

        <div className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar gap-6">
          {featuredCars.map((car) => (
            <div key={car.id} className="min-w-[320px] md:min-w-[400px] snap-center bg-obsidian border border-gold/20 rounded-lg overflow-hidden group hover:border-gold/50 transition-colors">
              <div className="relative h-64 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={lang === 'en' ? car.nameEn : car.nameAr} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-obsidian to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-2xl font-bold text-alabaster">
                    {lang === 'en' ? car.nameEn : car.nameAr}
                  </h3>
                  <div className="text-right">
                    <span className="block text-gold font-bold text-xl">{car.price}</span>
                    <span className="text-alabaster/60 text-sm">{t('car.daily')}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex justify-between mb-6 text-alabaster/80">
                  <div className="flex flex-col items-center gap-2">
                    <Settings className="w-5 h-5 text-gold" />
                    <span className="text-xs">{t('car.auto')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Shield className="w-5 h-5 text-gold" />
                    <span className="text-xs">{t('car.4x4')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Maximize className="w-5 h-5 text-gold" />
                    <span className="text-xs">{t('car.leather')}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedCar(car)}
                  className="w-full py-3 flex items-center justify-center gap-2 bg-gold/10 text-gold border border-gold/30 rounded-sm hover:bg-gold hover:text-obsidian transition-colors font-medium">
                  <MessageCircle className="w-5 h-5" />
                  {t('car.book')}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button 
            onClick={onViewAll}
            className="inline-flex items-center gap-2 px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors rounded-sm font-bold"
          >
            {t('fleet.view_all')}
            <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>
      <BookingModal isOpen={!!selectedCar} onClose={() => setSelectedCar(null)} car={selectedCar} />
    </section>
  );
}
