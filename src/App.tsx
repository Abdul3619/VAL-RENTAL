/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LiveGarage from './components/LiveGarage';
import VIPService from './components/VIPService';
import Reviews from './components/Reviews';
import FloatingActions from './components/FloatingActions';
import Footer from './components/Footer';
import FleetPage from './components/FleetPage';

export default function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'fleet'>('home');

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
