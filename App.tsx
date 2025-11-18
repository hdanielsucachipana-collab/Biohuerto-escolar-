import React, { useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import LogbookPage from './components/LogbookPage';
import JoinClubPage from './components/JoinClubPage';
import ForumPage from './components/ForumPage';
import { Page } from './types';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage setCurrentPage={setCurrentPage} />;
      case 'logbook':
        return <LogbookPage />;
      case 'join':
        return <JoinClubPage />;
      case 'forum':
        return <ForumPage />;
      default:
        return <HomePage setCurrentPage={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-brand-sand text-brand-dark-green font-sans">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <main className="pt-20">
        {renderPage()}
      </main>
      <footer className="bg-brand-green text-brand-sand text-center p-6 mt-12">
        <div className="max-w-7xl mx-auto flex flex-col items-center space-y-2 text-sm">
          <p>&copy; 2024 Glorioso Colegio Nacional de Ciencias - Club de Guardianes Ambientales</p>
          <div className="flex flex-col md:flex-row md:space-x-4 md:items-center">
            <span>Dirección: Plaza San Francisco S/N, Cusco</span>
            <span className="hidden md:inline">|</span>
            <span>Teléfono: 084-239026</span>
            <span className="hidden md:inline">|</span>
            <span>
              Email: <a href="mailto:ciencias@gloriosociencias.edu.pe" className="hover:underline">ciencias@gloriosociencias.edu.pe</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;