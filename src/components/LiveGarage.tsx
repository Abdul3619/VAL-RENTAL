import { ArrowRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { cars, type Car } from '../data/cars';
import CarCard from './CarCard';

export default function LiveGarage({ onViewAll, onBook }: { onViewAll?: () => void; onBook: (car: Car) => void }) {
  const { t, lang } = useLanguage();
  const featuredCars = cars.slice(0, 4);

  return (
    <section id="fleet" className="py-24 bg-obsidian border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gold mb-4">{t('garage.title')}</h2>
          <p className="text-alabaster/80 text-lg">{t('garage.subtitle')}</p>
        </div>

        <div className="flex overflow-x-auto pb-12 -mx-4 px-4 snap-x snap-mandatory hide-scrollbar gap-6">
          {featuredCars.map((car) => (
            <div key={car.id} className="min-w-[300px] md:min-w-[400px] snap-center">
              <CarCard car={car} onBook={onBook} large />
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <button onClick={onViewAll} className="press inline-flex items-center gap-2 px-8 py-3 border border-gold text-gold hover:bg-gold hover:text-obsidian transition-colors rounded-sm font-bold">
            {t('fleet.view_all')}
            <ArrowRight className={`w-5 h-5 ${lang === 'ar' ? 'rotate-180' : ''}`} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
