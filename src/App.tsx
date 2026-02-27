import { useState } from 'react';
import Header from './components/Header';
import Tabs from './components/Tabs';
import VideoSection from './components/VideoSection';
import RecorderSection from './components/RecorderSection';
import AboutSection from './components/AboutSection';
import { motion, AnimatePresence } from 'framer-motion';

function App() {
  const [activeTab, setActiveTab] = useState<'learn' | 'train' | 'about'>('learn');

  const renderContent = () => {
    switch (activeTab) {
      case 'learn':
        return <VideoSection />;
      case 'train':
        return <RecorderSection />;
      case 'about':
        return <AboutSection />;
      default:
        return <VideoSection />;
    }
  };

  return (
    <div className="min-h-screen bg-duck-tan pb-20">
      <Header />

      <main className="container mx-auto px-4 py-6 max-w-md">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            transition={{ duration: 0.2 }}
          >
            {renderContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
