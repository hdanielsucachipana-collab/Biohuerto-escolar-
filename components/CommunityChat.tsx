

import React, { useState } from 'react';
import { Message } from '../types';
import { SendIcon } from './Icons';

const CommunityChat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, user: 'Cienciano Entusiasta', text: '¡Qué gran iniciativa la del biohuerto! Felicitaciones.', timestamp: new Date().toLocaleTimeString() }
  ]);
  const [newMessage, setNewMessage] = useState('');
  const [userName, setUserName] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === '' || userName.trim() === '') {
      alert('Por favor, ingresa tu nombre y un mensaje.');
      return;
    }
    const message: Message = {
      id: Date.now(),
      user: userName,
      text: newMessage,
      timestamp: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, message]);
    setNewMessage('');
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-green mb-2 font-display">Chat Comunitario</h2>
      <p className="text-sm text-brand-dark-green mb-4">Un espacio para conversar, compartir ideas y conectarnos. ¡Sé respetuoso! <br/> <span className="font-bold">Nota: Los mensajes son temporales y se borrarán al recargar la página.</span></p>

      <div className="h-80 bg-gray-50 p-4 rounded-lg overflow-y-auto mb-4 border">
        {messages.map(msg => (
          <div key={msg.id} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="font-bold text-brand-light-green">{msg.user}</span>
              <span className="text-xs text-gray-500">{msg.timestamp}</span>
            </div>
            <p className="text-brand-dark-green bg-white p-2 rounded-md">{msg.text}</p>
          </div>
        ))}
      </div>
      
      <form onSubmit={handleSendMessage} className="space-y-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Tu nombre o apodo"
              className="p-2 border border-gray-300 rounded-md md:col-span-1"
            />
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="p-2 border border-gray-300 rounded-md md:col-span-2"
            />
        </div>
        <button type="submit" className="w-full bg-brand-green text-white px-4 py-2 rounded-md hover:bg-brand-light-green disabled:bg-gray-400 flex items-center justify-center gap-2">
            <SendIcon /> Enviar Mensaje
        </button>
      </form>
    </div>
  );
};

export default CommunityChat;