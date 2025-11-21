
import React from 'react';
import { Page } from '../types';
import { SproutIcon, SeedlingIcon, PlantIcon } from './Icons';

interface HomePageProps {
  setCurrentPage: (page: Page) => void;
}

const InfoCard: React.FC<{
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  onClick: () => void;
  imageUrl: string;
}> = ({ icon, title, description, buttonText, onClick, imageUrl }) => (
  <div className="bg-white/60 backdrop-blur-sm rounded-lg shadow-lg flex flex-col transform hover:scale-105 transition-transform duration-300 overflow-hidden border border-brand-light-green/50">
    <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
    <div className="p-6 text-center flex flex-col items-center flex-grow">
      <div className="text-brand-green mb-4">{icon}</div>
      <h3 className="text-xl font-bold font-display text-brand-green mb-2">{title}</h3>
      <p className="text-brand-dark-green flex-grow">{description}</p>
      <button onClick={onClick} className="mt-4 bg-brand-green text-white font-bold py-2 px-4 rounded-full hover:bg-brand-light-green transition-colors duration-300">
        {buttonText}
      </button>
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ setCurrentPage }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <header 
        className="relative text-center bg-cover bg-center rounded-lg shadow-2xl py-24 md:py-32 mb-12 overflow-hidden" 
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1624953901718-f39385310931?q=80&w=2070&auto=format&fit=crop')" }}
      >
        <div className="absolute inset-0 bg-brand-dark-green/60"></div>
        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight font-display">
            KAWSAY CHAKANA
          </h1>
          <p className="text-xl md:text-2xl mt-4 text-brand-sand italic">
            Biohuerto Escolar: Un puente entre la vida y la sabiduría ancestral.
          </p>
        </div>
      </header>

      <section className="text-center mb-12">
        <h2 className="text-3xl font-bold text-brand-green mb-4 font-display">Bienvenidos a Nuestro Espacio Verde</h2>
        <p className="max-w-3xl mx-auto text-lg text-brand-dark-green">
          Kawsay Chakana (Puente Viviente en quechua) es más que un biohuerto. Es un aula viva donde aprendemos de la Pachamama, reconectamos con nuestras raíces y cultivamos un futuro más sostenible para nuestra comunidad del Glorioso Colegio Nacional de Ciencias.
        </p>
      </section>

      <section className="grid md:grid-cols-3 gap-8">
        <InfoCard 
          icon={<SproutIcon />} 
          title="Bitácora y Resultados" 
          description="Explora el progreso de nuestro biohuerto, descubre las especies que cultivamos y celebra nuestros logros." 
          buttonText="Ver Bitácora"
          onClick={() => setCurrentPage('logbook')}
          imageUrl="https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=2070&auto=format&fit=crop"
        />
        <InfoCard 
          icon={<SeedlingIcon />} 
          title="Únete al Club" 
          description="¿Apasionado por el medio ambiente? Postula para ser un Guardián Ambiental y sé parte del cambio." 
          buttonText="Postular Ahora"
          onClick={() => setCurrentPage('join')}
          imageUrl="https://images.unsplash.com/photo-1529390003868-6c640a174baa?q=80&w=2070&auto=format&fit=crop"
        />
        <InfoCard 
          icon={<PlantIcon />} 
          title="Foro Comunitario" 
          description="Participa en conversaciones, comparte ideas y deja tus sugerencias para mejorar nuestro proyecto." 
          buttonText="Ir al Foro"
          onClick={() => setCurrentPage('forum')}
          imageUrl="https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop"
        />
      </section>
    </div>
  );
};

export default HomePage;