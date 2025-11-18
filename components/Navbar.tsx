import React, { useState } from 'react';
import { Page } from '../types';
import { SproutIcon, MenuIcon, XIcon } from './Icons';

interface NavbarProps {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
}

const NavLink: React.FC<{
  page: Page;
  currentPage: Page;
  onClick: (page: Page) => void;
  children: React.ReactNode;
}> = ({ page, currentPage, onClick, children }) => {
  const isActive = currentPage === page;
  return (
    <button
      onClick={() => onClick(page)}
      className={`px-4 py-2 rounded-md text-sm font-medium transition-colors duration-300 ${
        isActive
          ? 'bg-brand-light-green text-brand-dark-green'
          : 'text-brand-sand hover:bg-brand-light-green/40'
      }`}
    >
      {children}
    </button>
  );
};

const Navbar: React.FC<NavbarProps> = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (page: Page) => {
    setCurrentPage(page);
    setIsOpen(false);
  };

  return (
    <nav className="bg-brand-green shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0 text-brand-sand flex items-center gap-2">
              <SproutIcon />
              <span className="font-bold text-lg font-display">Kansay Chakana</span>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <NavLink page="home" currentPage={currentPage} onClick={handleNavClick}>Inicio</NavLink>
              <NavLink page="logbook" currentPage={currentPage} onClick={handleNavClick}>Bitácora y Resultados</NavLink>
              <NavLink page="join" currentPage={currentPage} onClick={handleNavClick}>Unirse al Club</NavLink>
              <NavLink page="forum" currentPage={currentPage} onClick={handleNavClick}>Foro Comunitario</NavLink>
            </div>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="bg-brand-light-green inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-brand-green focus:outline-none"
            >
              {isOpen ? <XIcon /> : <MenuIcon />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <NavLink page="home" currentPage={currentPage} onClick={handleNavClick}>Inicio</NavLink>
            <NavLink page="logbook" currentPage={currentPage} onClick={handleNavClick}>Bitácora y Resultados</NavLink>
            <NavLink page="join" currentPage={currentPage} onClick={handleNavClick}>Unirse al Club</NavLink>
            <NavLink page="forum" currentPage={currentPage} onClick={handleNavClick}>Foro Comunitario</NavLink>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;