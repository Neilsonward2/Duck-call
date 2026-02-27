import React from 'react';
import { Play, Mic, Info } from 'lucide-react';

interface TabsProps {
  activeTab: 'learn' | 'train' | 'about';
  setActiveTab: (tab: 'learn' | 'train' | 'about') => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-duck-tan flex justify-around p-2 pb-6 z-20">
      <button
        onClick={() => setActiveTab('learn')}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          activeTab === 'learn' ? 'text-duck-green bg-duck-tan/30' : 'text-gray-500'
        }`}
      >
        <Play size={24} />
        <span className="text-xs font-medium">Learn</span>
      </button>
      <button
        onClick={() => setActiveTab('train')}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          activeTab === 'train' ? 'text-duck-green bg-duck-tan/30' : 'text-gray-500'
        }`}
      >
        <Mic size={24} />
        <span className="text-xs font-medium">Train</span>
      </button>
      <button
        onClick={() => setActiveTab('about')}
        className={`flex flex-col items-center gap-1 p-2 rounded-lg transition-colors ${
          activeTab === 'about' ? 'text-duck-green bg-duck-tan/30' : 'text-gray-500'
        }`}
      >
        <Info size={24} />
        <span className="text-xs font-medium">About</span>
      </button>
    </div>
  );
};

export default Tabs;
