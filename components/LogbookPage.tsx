import React, { useState, useEffect } from 'react';
import { GalleryItem } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { TrashIcon, PlusCircleIcon, LockIcon, UnlockIcon } from './Icons';

// Helper to get initial state from localStorage
const getInitialGalleryState = (): GalleryItem[] => {
  try {
    const item = window.localStorage.getItem('galleryItems');
    if (item) {
      return JSON.parse(item);
    }
  } catch (error) {
    console.warn(`Error reading localStorage key "galleryItems":`, error);
  }
  // Default gallery items if localStorage is empty or fails
  return [
    { 
      id: 1, 
      imageUrl: "https://images.unsplash.com/photo-1495521821757-a1efb6729352?q=80&w=1926&auto=format&fit=crop", 
      title: "Manos a la Tierra", 
      description: "La participación activa de toda la comunidad educativa fue clave. Jornadas de limpieza y preparación del terreno unieron a estudiantes, docentes y padres de familia, fomentando el trabajo colaborativo." 
    },
    { 
      id: 2, 
      imageUrl: "https://images.unsplash.com/photo-1627923227318-274256788566?q=80&w=1974&auto=format&fit=crop", 
      title: "Sembrando Sabiduría Ancestral", 
      description: "Seleccionamos y sembramos diversas especies nativas como muña, manzanilla y ruda, priorizando aquellas con valor medicinal y simbólico en la cosmovisión andina, rescatando y revalorizando nuestro legado." 
    },
    { 
      id: 3, 
      imageUrl: "https://images.unsplash.com/photo-1542332213-9b5a5a3fad35?q=80&w=2070&auto=format&fit=crop", 
      title: "Un Aula Viva", 
      description: "El biohuerto se integró como recurso pedagógico en áreas como Ciencia, Arte e Historia. Realizamos talleres sobre compostaje, biodiversidad y saberes ancestrales, enriqueciendo el aprendizaje." 
    },
    { 
      id: 4, 
      imageUrl: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?q=80&w=1964&auto=format&fit=crop", 
      title: "Cosecha Sostenible", 
      description: "Implementamos un sistema de compostaje artesanal con residuos orgánicos del quiosco escolar. Este abono natural ha permitido un crecimiento saludable de las plantas, enseñando sobre economía circular." 
    }
  ];
};

const LogbookPage: React.FC = () => {
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>(getInitialGalleryState);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [password, setPassword] = useState('');
  const [adminError, setAdminError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({ title: '', description: '', imageUrl: '' });

  useEffect(() => {
    try {
      window.localStorage.setItem('galleryItems', JSON.stringify(galleryItems));
    } catch (error) {
      console.error('Error saving gallery to localStorage:', error);
    }
  }, [galleryItems]);

  const handleAdminLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setAdminError('');
      setPassword('');
    } else {
      setAdminError('Contraseña incorrecta.');
    }
  };
  
  const handleAdminLogout = () => {
    setIsLoggedIn(false);
    setShowAddForm(false);
  };

  const handleDeleteItem = (idToDelete: number) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este logro?')) {
      const updatedItems = galleryItems.filter(item => item.id !== idToDelete);
      setGalleryItems(updatedItems);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewItem(prev => ({ ...prev, [name]: value }));
  };
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem(prev => ({ ...prev, imageUrl: reader.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (newItem.title.trim() && newItem.description.trim() && newItem.imageUrl) {
      const newGalleryItem: GalleryItem = {
        id: Date.now(),
        ...newItem
      };
      setGalleryItems(prev => [newGalleryItem, ...prev]);
      setNewItem({ title: '', description: '', imageUrl: '' });
      setShowAddForm(false);
    } else {
      alert('Por favor, completa todos los campos y selecciona una imagen.');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-brand-green mb-4 font-display">Bitácora de Nuestro Biohuerto</h1>
      <p className="text-center text-lg text-brand-dark-green max-w-3xl mx-auto mb-12">
        Un recorrido por el viaje de "Kawsay Chakana", desde la concepción de una idea hasta la cosecha de sus frutos, fortaleciendo nuestra conexión con la tierra y la sabiduría ancestral.
      </p>

      <div className="bg-white p-8 rounded-lg shadow-lg mb-12 border border-brand-light-green/50">
        <h2 className="text-3xl font-bold text-brand-green mb-4 font-display">Nuestro Propósito</h2>
        <p className="text-brand-dark-green">
          Este proyecto nace como respuesta a la necesidad de fortalecer la educación ambiental y rescatar los saberes ancestrales en nuestra comunidad. Ante la limitada presencia de espacios verdes educativos, nos propusimos crear un biohuerto escolar con plantas medicinales y ornamentales nativas de la región Cusco. El objetivo es claro: convertir un espacio del colegio en un aula viva para promover el aprendizaje vivencial, la conservación de la biodiversidad local y el uso sostenible de especies que forman parte de nuestro valioso patrimonio cultural andino.
        </p>
      </div>

      <div className="mb-12">
        <h2 className="text-3xl font-bold text-center text-brand-green mb-8 font-display">Fases del Proyecto</h2>
        <div className="grid md:grid-cols-3 gap-8 text-center">
          <div className="bg-white p-6 rounded-lg border-t-4 border-brand-light-green shadow-md">
            <h3 className="text-xl font-bold text-brand-green mb-2 font-display">1. Diseño y Planificación</h3>
            <p className="text-sm text-brand-dark-green">Identificamos el espacio ideal, seleccionamos especies nativas como muña, manzanilla y kantuta, y diseñamos el plano del biohuerto, integrando clases de ciencia y arte.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border-t-4 border-brand-light-green shadow-md">
            <h3 className="text-xl font-bold text-brand-green mb-2 font-display">2. Implementación</h3>
            <p className="text-sm text-brand-dark-green">Con la participación de estudiantes y docentes, preparamos el terreno, construimos bancales con materiales reciclados y realizamos la siembra inicial, explicando los usos medicinales y culturales.</p>
          </div>
          <div className="bg-white p-6 rounded-lg border-t-4 border-brand-light-green shadow-md">
            <h3 className="text-xl font-bold text-brand-green mb-2 font-display">3. Consolidación y Sostenibilidad</h3>
            <p className="text-sm text-brand-dark-green">Creamos brigadas de cuidado, implementamos un punto de compostaje, registramos el crecimiento de las plantas y elaboramos productos como infusiones para ferias escolares.</p>
          </div>
        </div>
      </div>
      
      <div className="mb-12">
         <h2 className="text-3xl font-bold text-center text-brand-green mb-8 font-display">Galería de Logros</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {galleryItems.map(item => (
            <div key={item.id} className="bg-white rounded-lg shadow-md border border-brand-light-green/50 flex flex-col overflow-hidden">
              <img src={item.imageUrl} alt={item.title} className="w-full h-64 object-cover" />
              <div className="p-6 flex-grow">
                <h3 className="text-2xl font-bold text-brand-green font-display mb-2">{item.title}</h3>
                <p className="text-brand-dark-green mt-2">{item.description}</p>
              </div>

              {isLoggedIn && (
                <div className="bg-brand-sand border-t border-brand-light-green/50 p-3 flex justify-end">
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="flex items-center gap-2 bg-red-600 text-white text-sm font-bold py-2 px-3 rounded-md hover:bg-red-700 transition-colors"
                    aria-label={`Eliminar logro: ${item.title}`}
                  >
                    <TrashIcon />
                    Eliminar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-brand-light-green">
        <h2 className="text-2xl font-bold text-brand-green text-center font-display">Panel de Administración de la Galería</h2>
        {!isLoggedIn ? (
          <div className="max-w-md mx-auto mt-4">
            <p className="text-center text-brand-dark-green mb-4">Ingresa la contraseña para editar la galería de logros.</p>
            <div className="flex items-center gap-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAdminLogin()}
                placeholder="Contraseña de admin"
                className="flex-grow p-2 border border-gray-300 rounded-md"
              />
              <button onClick={handleAdminLogin} className="bg-brand-green text-white px-4 py-2 rounded-md hover:bg-brand-light-green flex items-center gap-2">
                <LockIcon /> Entrar
              </button>
            </div>
            {adminError && <p className="text-red-500 text-xs mt-2 text-center">{adminError}</p>}
          </div>
        ) : (
          <div className="mt-4">
            <div className="text-center mb-6">
              <p className="text-brand-dark-green bg-brand-light-green/30 p-2 rounded-md inline-flex items-center gap-2"><UnlockIcon/> Sesión iniciada. Ahora puedes añadir o eliminar logros.</p>
              <button onClick={handleAdminLogout} className="ml-4 text-sm text-gray-500 hover:underline">Cerrar sesión</button>
            </div>

            {showAddForm ? (
              <form onSubmit={handleAddItem} className="space-y-4 max-w-lg mx-auto bg-white p-6 rounded-lg border">
                <h3 className="text-xl font-bold text-brand-dark-green font-display">Añadir Nuevo Logro</h3>
                <div>
                  <label className="block text-sm font-medium text-brand-dark-green">Título</label>
                  <input type="text" name="title" value={newItem.title} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark-green">Descripción</label>
                  <textarea name="description" value={newItem.description} onChange={handleInputChange} required rows={3} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"></textarea>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brand-dark-green">Imagen</label>
                  <input type="file" name="image" accept="image/*" onChange={handleImageChange} required className="mt-1 block w-full text-sm text-brand-dark-green file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-brand-sand file:text-brand-green hover:file:bg-brand-light-green/50 cursor-pointer"/>
                </div>
                {newItem.imageUrl && (
                  <div className="mt-2">
                    <p className="text-sm font-medium text-brand-dark-green">Vista previa:</p>
                    <img src={newItem.imageUrl} alt="Vista previa del logro" className="mt-1 rounded-md border p-1 max-h-32 w-auto" />
                  </div>
                )}
                <div className="flex gap-4">
                  <button type="submit" className="flex-1 bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-brand-light-green">Añadir Logro</button>
                  <button type="button" onClick={() => setShowAddForm(false)} className="flex-1 bg-gray-200 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-300">Cancelar</button>
                </div>
              </form>
            ) : (
              <div className="text-center">
                <button onClick={() => setShowAddForm(true)} className="bg-brand-green text-white font-bold py-2 px-4 rounded-md hover:bg-brand-light-green flex items-center gap-2 mx-auto">
                  <PlusCircleIcon /> Agregar Foto y Texto
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default LogbookPage;