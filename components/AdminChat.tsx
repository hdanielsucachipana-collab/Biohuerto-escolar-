
import React, { useState, useEffect } from 'react';
import { Message } from '../types';
import { ADMIN_PASSWORD } from '../constants';
import { LockIcon, UnlockIcon, SendIcon } from './Icons';

const AdminChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Simulate fetching initial messages
    setMessages([
      { id: 1, user: 'Admin', text: '¡Bienvenidos al foro de anuncios! Aquí publicaremos las novedades del club.', timestamp: new Date().toLocaleTimeString() }
    ]);
  }, []);

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsLoggedIn(true);
      setError('');
      setPassword('');
    } else {
      setError('Contraseña incorrecta.');
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || !isLoggedIn) return;
    const message: Message = {
      id: Date.now(),
      user: 'Admin',
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-green mb-4 font-display">Anuncios del Club</h2>
      <p className="text-sm text-brand-dark-green mb-4">Este es un canal de solo lectura para la comunidad. Solo los administradores pueden publicar aquí.</p>

      {!isLoggedIn ? (
        <div className="flex items-center gap-2 p-4 bg-brand-sand rounded-lg">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Ingresa la contraseña de admin"
            className="flex-grow p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand-light-green"
          />
          <button onClick={handleLogin} className="bg-brand-green text-white px-4 py-2 rounded-md hover:bg-brand-light-green flex items-center gap-2"><LockIcon /> Desbloquear</button>
          {error && <p className="text-red-500 text-xs">{error}</p>}
        </div>
      ) : (
         <div className="text-brand-dark-green p-2 bg-brand-light-green/40 rounded-md flex items-center gap-2 mb-4"><UnlockIcon /> ¡Modo de administrador activado!</div>
      )}

      <div className="h-80 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4 border">
        {messages.map(msg => (
          <div key={msg.id} className="mb-4 p-3 rounded-lg bg-brand-sand">
            <div className="flex justify-between items-center">
              <span className="font-bold text-brand-green">{msg.user}</span>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
            <p className="text-brand-dark-green">{msg.text}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="flex items-center gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder={isLoggedIn ? "Escribe un anuncio..." : "Debes desbloquear para escribir"}
          disabled={!isLoggedIn}
          className="flex-grow p-2 border border-gray-300 rounded-md disabled:bg-gray-200"
        />
        <button type="submit" disabled={!isLoggedIn} className="bg-brand-green text-white px-4 py-2 rounded-md hover:bg-brand-light-green disabled:bg-gray-400 flex items-center gap-2">
            <SendIcon /> Enviar
        </button>
      </form>
    </div>
  );
};

export default AdminChat;