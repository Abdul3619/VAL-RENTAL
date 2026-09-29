import { useLanguage } from '../context/LanguageContext';
import { cars, type Car } from '../data/cars';
import { useLocalStorage } from '../lib/useLocalStorage';
import CarCard from './CarCard';

type Filter = 'all' | 'suv' | 'sedan' | 'sports';

export default function FleetPage({ onBook }: { onBook: (car: Car) => void }) {
  const { t } = useLanguage();
  // The chosen filter is remembered between visits
  const [filter, setFilter] = useLocalStorage<Filter>('velocity:fleet-filter', 'all');
  const filteredCars = filter === 'all' ? cars : cars.filter((c) => c.category === filter);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 mt-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gold mb-4">{t('fleet.title')}</h1>
          <p className="text-alabaster/80 text-lg">{t('fleet.subtitle')}</p>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mb-12" role="group" aria-label={t('fleet.title')}>
          {(['all', 'suv', 'sedan', 'sports'] as const).map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              aria-pressed={filter === cat}
              className={`press px-6 py-2 rounded-full border transition-all ${
                filter === cat ? 'bg-gold border-gold text-obsidian font-bold' : 'border-gold/40 text-alabaster/90 hover:border-gold hover:text-gold'
              }`}
            >
              {t(`fleet.${cat}`)}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredCars.map((car) => <CarCard key={car.id} car={car} onBook={onBook} />)}
        </div>
      </div>
    </div>
  );
}
