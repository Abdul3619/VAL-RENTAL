import { motion } from 'motion/react';
import { Maximize, MessageCircle, Settings, Shield } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import type { Car } from '../data/cars';
import CarGallery from './CarGallery';

export default function CarCard({ car, onBook, large = false }: { car: Car; onBook: (car: Car) => void; large?: boolean }) {
  const { t, lang } = useLanguage();
  const name = lang === 'en' ? car.nameEn : car.nameAr;
  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className="bg-[#111] border border-gold/20 rounded-lg overflow-hidden hover:border-gold/50 transition-colors h-full flex flex-col"
    >
      <div className="relative">
        <CarGallery images={car.images} name={name} className={large ? 'h-64' : 'h-56'} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#111] to-transparent" />
        <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex justify-between items-end gap-3">
          <h3 className={`${large ? 'text-2xl' : 'text-xl'} font-bold text-alabaster`}>{name}</h3>
          <p className="text-end shrink-0">
            <span className="block text-gold font-bold text-lg">{car.price}</span>
            <span className="text-alabaster/70 text-xs">{t('car.daily')}</span>
          </p>
        </div>
      </div>
      <div className="p-5 mt-auto">
        <ul className="flex justify-between mb-5 text-alabaster/80">
          <li className="flex flex-col items-center gap-1"><Settings className="w-4 h-4 text-gold" aria-hidden="true" /><span className="text-xs">{t('car.auto')}</span></li>
          <li className="flex flex-col items-center gap-1"><Shield className="w-4 h-4 text-gold" aria-hidden="true" /><span className="text-xs">{t(`car.seg.${car.category}`)}</span></li>
          <li className="flex flex-col items-center gap-1"><Maximize className="w-4 h-4 text-gold" aria-hidden="true" /><span className="text-xs">{t('car.leather')}</span></li>
        </ul>
        <button
          onClick={() => onBook(car)}
          className="press w-full py-2.5 flex items-center justify-center gap-2 bg-gold/10 text-gold border border-gold/40 rounded-sm hover:bg-gold hover:text-obsidian transition-colors font-medium text-sm"
        >
          <MessageCircle className="w-4 h-4" aria-hidden="true" />
          {t('car.book')} <span className="sr-only">{name}</span>
        </button>
      </div>
    </motion.article>
  );
}
