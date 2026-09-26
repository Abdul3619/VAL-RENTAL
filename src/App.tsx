/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveGarage from './components/LiveGarage';
import VIPService from './components/VIPService';
import Reviews from './components/Reviews';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import FleetPage from './components/FleetPage';

export type Page = 'home' | 'fleet';

export function pageFromPath(pathname: string): Page {
  return pathname.replace(/\/+$/, '') === '/fleet' ? 'fleet' : 'home';
}

export default function App({ initialPage = 'home' }: { initialPage?: Page }) {
  const [currentPage, setPage] = useState<Page>(initialPage);

  // Each page has its own URL (/ and /fleet) so refresh, sharing and the browser back button work
  const setCurrentPage = (page: Page) => {
    const path = page === 'fleet' ? '/fleet' : '/';
    if (window.location.pathname !== path) {
      window.history.pushState({ page }, '', path);
    }
    setPage(page);
  };

  useEffect(() => {
    const onPopState = () => setPage(pageFromPath(window.location.pathname));
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-obsidian text-alabaster font-sans selection:bg-gold selection:text-obsidian">
        <Navbar onNavigate={setCurrentPage} currentPage={currentPage} />
        <main>
          {currentPage === 'home' ? (
            <>
              <Hero onBookClick={() => { setCurrentPage('fleet'); window.scrollTo(0,0); }} />
              <LiveGarage onViewAll={() => { setCurrentPage('fleet'); window.scrollTo(0,0); }} />
              <VIPService />
              <Reviews />
            </>
          ) : (
            <FleetPage />
          )}
        </main>
        <Footer />
        <FloatingActions />
      </div>
    </LanguageProvider>
  );
}
