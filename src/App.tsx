import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LanguageProvider, useLanguage } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveGarage from './components/LiveGarage';
import VIPService from './components/VIPService';
import Reviews from './components/Reviews';
import Requirements from './components/Requirements';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import FleetPage from './components/FleetPage';
import BookingModal from './components/BookingModal';
import { cars, type Car } from './data/cars';
import { useBookingDraft } from './lib/bookingDraft';

export type Page = 'home' | 'fleet';

export function pageFromPath(pathname: string): Page {
  return pathname.replace(/\/+$/, '') === '/fleet' ? 'fleet' : 'home';
}

// Offers to reopen a booking the visitor started earlier (saved on this device)
function ResumeBooking({ car, onContinue, onDiscard }: { car: Car; onContinue: () => void; onDiscard: () => void }) {
  const { t, lang } = useLanguage();
  return (
    <motion.div
      role="region"
      aria-label={t('resume.title')}
      initial={{ y: 40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 40, opacity: 0 }}
      className="fixed bottom-24 inset-x-4 md:inset-x-auto md:left-6 rtl:md:left-auto rtl:md:right-6 z-50 md:w-96 bg-[#111] border border-gold/40 rounded-lg p-4 shadow-2xl"
    >
      <p className="text-alabaster font-semibold">{t('resume.title')}</p>
      <p className="text-alabaster/75 text-sm mb-3">{lang === 'en' ? car.nameEn : car.nameAr}</p>
      <div className="flex gap-2">
        <button onClick={onContinue} className="press flex-1 py-2 bg-gold text-obsidian rounded-sm font-bold text-sm">{t('resume.continue')}</button>
        <button onClick={onDiscard} className="press flex-1 py-2 border border-gold/40 text-gold rounded-sm text-sm">{t('resume.discard')}</button>
      </div>
    </motion.div>
  );
}

function Shell({ initialPage }: { initialPage: Page }) {
  const [currentPage, setPage] = useState<Page>(initialPage);
  const [selectedCar, setSelectedCar] = useState<Car | null>(null);
  const [draft, setDraft] = useBookingDraft();
  const [dismissed, setDismissed] = useState(false);

  // Each page has its own URL (/ and /fleet) so refresh, sharing and the browser back button work
  const setCurrentPage = (page: Page) => {
    const path = page === 'fleet' ? '/fleet' : '/';
    if (window.location.pathname !== path) window.history.pushState({ page }, '', path);
    setPage(page);
  };

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  const draftCar = draft ? cars.find((c) => c.id === draft.carId) ?? null : null;
  const showResume = !!draftCar && !selectedCar && !dismissed;

  return (
    <div className="min-h-screen bg-obsidian text-alabaster font-sans selection:bg-gold selection:text-obsidian">
      <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
      <main>
        {currentPage === 'home' ? (
          <>
            <Hero onBookClick={() => { setCurrentPage('fleet'); window.scrollTo(0, 0); }} />
            <LiveGarage onViewAll={() => { setCurrentPage('fleet'); window.scrollTo(0, 0); }} onBook={setSelectedCar} />
            <VIPService />
            <Reviews />
            <Requirements />
          </>
        ) : (
          <FleetPage onBook={setSelectedCar} />
        )}
      </main>
      <Footer />
      <FloatingActions />
      <AnimatePresence>
        {showResume && draftCar && (
          <ResumeBooking car={draftCar} onContinue={() => setSelectedCar(draftCar)} onDiscard={() => { setDraft(null); setDismissed(true); }} />
        )}
      </AnimatePresence>
      <BookingModal car={selectedCar} draft={draft} onDraftChange={setDraft} onClose={() => setSelectedCar(null)} />
    </div>
  );
}

export default function App({ initialPage = 'home' }: { initialPage?: Page }) {
  return (
    <LanguageProvider>
      <Shell initialPage={initialPage} />
    </LanguageProvider>
  );
}
