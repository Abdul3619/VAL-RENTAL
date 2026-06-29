import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { cars, Car } from '../data/cars';
import { Settings, Shield, Maximize, MessageCircle } from 'lucide-react';
import BookingModal from './BookingModal';

export default function FleetPage() {
  const { t, lang } = useLanguage();
  const [filter, setFilter] = useState<'all' | 'suv' | 'sedan' | 'sports'>('all');
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);

  const filteredCars = filter === 'all' ? cars : cars.filter(c => c.category === filter);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">{t('fleet.title')}</h1>
          <p className="text-alabaster/70 text-lg">{t('fleet.subtitle')}</p>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {(['all', 'suv', 'sedan', 'sports'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full border transition-all ${
                filter === cat 
                  ? 'bg-gold border-gold text-obsidian font-bold' 
                  : 'border-gold/30 text-alabaster/80 hover:border-gold hover:text-gold'
              }`}
            >
              {t(`fleet.${cat}`)}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => (
            <div key={car.id} className="bg-[#111] border border-gold/20 rounded-lg overflow-hidden group hover:border-gold/50 transition-colors">
              <div className="relative h-56 overflow-hidden">
                <img 
                  src={car.image} 
                  alt={lang === 'en' ? car.nameEn : car.nameAr} 
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#111] to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 flex justify-between items-end">
                  <h3 className="text-xl font-bold text-alabaster">
                    {lang === 'en' ? car.nameEn : car.nameAr}
                  </h3>
                  <div className="text-right">
                    <span className="block text-gold font-bold text-lg">{car.price}</span>
                    <span className="text-alabaster/60 text-xs">{t('car.daily')}</span>
                  </div>
                </div>
              </div>
              
              <div className="p-5">
                <div className="flex justify-between mb-5 text-alabaster/80">
                  <div className="flex flex-col items-center gap-1">
                    <Settings className="w-4 h-4 text-gold" />
                    <span className="text-[10px]">{t('car.auto')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Shield className="w-4 h-4 text-gold" />
                    <span className="text-[10px]">{t('car.4x4')}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Maximize className="w-4 h-4 text-gold" />
                    <span className="text-[10px]">{t('car.leather')}</span>
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedCar(car)}
                  className="w-full py-2.5 flex items-center justify-center gap-2 bg-gold/10 text-gold border border-gold/30 rounded-sm hover:bg-gold hover:text-obsidian transition-colors font-medium text-sm">
                  <MessageCircle className="w-4 h-4" />
                  {t('car.book')}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <BookingModal isOpen={!!selectedCar} onClose={() => setSelectedCar(null)} car={selectedCar} />
    </div>
  );
}
