

import React, { useState } from 'react';
import { Suggestion } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { EyeIcon, EyeOffIcon, SendIcon } from './Icons';

const SuggestionsBox: React.FC = () => {
  const [suggestions, setSuggestions] = useState<Suggestion[]>([
    { id: 1, text: 'Deberíamos plantar hierbas aromáticas como muña y hierbabuena.' },
  ]);
  const [newSuggestion, setNewSuggestion] = useState('');
  const [showAdminView, setShowAdminView] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmitSuggestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSuggestion.trim() === '') return;
    const suggestion: Suggestion = {
      id: Date.now(),
      text: newSuggestion,
    };
    setSuggestions(prev => [...prev, suggestion]);
    setNewSuggestion('');
    alert('¡Gracias por tu sugerencia!');
  };

  const handleShowAdmin = () => {
    if (password === ADMIN_PASSWORD) {
      setShowAdminView(true);
      setError('');
    } else {
      setError('Contraseña incorrecta.');
      setShowAdminView(false);
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-green mb-4 font-display">Buzón de Sugerencias</h2>
      
      {!showAdminView ? (
        <>
          <p className="text-sm text-brand-dark-green mb-4">¿Tienes una idea para mejorar nuestro biohuerto? ¡Déjala aquí de forma anónima!</p>
          <form onSubmit={handleSubmitSuggestion} className="space-y-4 mb-8">
            <textarea
              value={newSuggestion}
              onChange={(e) => setNewSuggestion(e.target.value)}
              rows={4}
              placeholder="Escribe tu sugerencia o idea aquí..."
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-light-green"
            />
            <button type="submit" className="w-full bg-brand-green text-white px-4 py-2 rounded-md hover:bg-brand-light-green flex items-center justify-center gap-2">
              <SendIcon /> Enviar Sugerencia
            </button>
          </form>
          <div className="border-t pt-4">
            <h3 className="text-lg font-semibold text-brand-dark-green font-display">Acceso para Administradores</h3>
            <div className="flex items-center gap-2 mt-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Contraseña"
                className="flex-grow p-2 border border-gray-300 rounded-md"
              />
              <button onClick={handleShowAdmin} className="bg-brand-dark-green text-white px-4 py-2 rounded-md hover:bg-opacity-80 flex items-center gap-2">
                <EyeIcon /> Ver Sugerencias
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-brand-green font-display">Sugerencias Recibidas</h3>
            <button onClick={() => { setShowAdminView(false); setPassword(''); }} className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 flex items-center gap-2">
              <EyeOffIcon /> Ocultar
            </button>
          </div>
          <div className="h-96 bg-gray-50 p-4 rounded-lg overflow-y-auto border space-y-3">
            {suggestions.length > 0 ? (
              suggestions.map(s => (
                <div key={s.id} className="p-3 bg-white rounded-md shadow-sm border-l-4 border-brand-light-green">
                  <p className="text-brand-dark-green">{s.text}</p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">Aún no hay sugerencias.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SuggestionsBox;