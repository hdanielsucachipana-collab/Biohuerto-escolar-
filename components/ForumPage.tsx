

import React, { useState } from 'react';
import AdminChat from './AdminChat';
import CommunityChat from './CommunityChat';
import SuggestionsBox from './SuggestionsBox';
import { ShieldIcon, MessageCircleIcon, InboxIcon } from './Icons';

type ForumTab = 'admin' | 'community' | 'suggestions';

const ForumPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ForumTab>('community');

  const renderContent = () => {
    switch (activeTab) {
      case 'admin':
        return <AdminChat />;
      case 'community':
        return <CommunityChat />;
      case 'suggestions':
        return <SuggestionsBox />;
      default:
        return <CommunityChat />;
    }
  };

  const TabButton: React.FC<{
    tabName: ForumTab;
    icon: React.ReactNode;
    label: string;
  }> = ({ tabName, icon, label }) => (
    <button
      onClick={() => setActiveTab(tabName)}
      className={`flex-1 flex items-center justify-center gap-2 p-4 text-sm font-bold border-b-4 transition-colors duration-300 ${
        activeTab === tabName
          ? 'border-brand-green text-brand-green'
          : 'border-transparent text-brand-dark-green/70 hover:text-brand-green hover:border-gray-300'
      }`}
    >
      {icon}
      <span className="hidden sm:inline">{label}</span>
    </button>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center text-brand-green mb-8 font-display">Foro Comunitario</h1>
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg">
        <div className="flex border-b">
          <TabButton tabName="community" icon={<MessageCircleIcon />} label="Chat Comunitario" />
          <TabButton tabName="admin" icon={<ShieldIcon />} label="Anuncios del Club" />
          <TabButton tabName="suggestions" icon={<InboxIcon />} label="Buzón de Sugerencias" />
        </div>
        <div className="p-4 md:p-6 min-h-[60vh]">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default ForumPage;