import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Volume2, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import DuckCard from './DuckCard';
import speciesData from '../data/species.json';

interface SpeciesImage {
  url: string;
  credit: string;
  caption: string;
}

interface Species {
  id: string;
  name: string;
  category: string;
  description: string;
  identification: string;
  male_vs_female: string;
  flight_pattern: string;
  habitat: string;
  behavior: string;
  seasonal_patterns: string;
  markers: string;
  images: SpeciesImage[];
  audioUrl: string;
}

const categories = ['Dabbling Ducks', 'Diving Ducks', 'Sea Ducks'];

const SpeciesSection: React.FC = () => {
  const [selectedSpecies, setSelectedSpecies] = useState<Species | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleSelectSpecies = (species: Species) => {
    setCurrentImageIndex(0);
    setSelectedSpecies(species);
  };

  const playCall = (audioUrl: string) => {
    const audio = new Audio(audioUrl);
    audio.play().catch(e => console.error("Error playing audio:", e));
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSpecies) {
      setCurrentImageIndex((prev) => (prev + 1) % selectedSpecies.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedSpecies) {
      setCurrentImageIndex((prev) => (prev - 1 + selectedSpecies.images.length) % selectedSpecies.images.length);
    }
  };

  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="bg-white p-4 rounded-xl shadow-sm border border-duck-tan">
        <h2 className="text-xl font-bold mb-1 text-duck-green">Identify Waterfowl</h2>
        <p className="text-sm text-gray-600">
          Tap a species to view detailed identification markers, habitat, and behavior.
        </p>
      </div>

      {categories.map((category) => (
        <div key={category} className="space-y-3">
          <h3 className="text-lg font-bold text-duck-brown px-1 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-duck-orange"></span>
            {category}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {(speciesData as unknown as Species[])
              .filter((s) => s.category === category)
              .map((species) => (
                <DuckCard
                  key={species.id}
                  name={species.name}
                  imageUrl={species.images[0].url}
                  onClick={() => handleSelectSpecies(species)}
                />
              ))}
          </div>
        </div>
      ))}

      <AnimatePresence>
        {selectedSpecies && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
            onClick={() => setSelectedSpecies(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-lg rounded-t-2xl sm:rounded-2xl overflow-hidden max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative aspect-video w-full overflow-hidden bg-gray-100">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={currentImageIndex}
                    src={selectedSpecies.images[currentImageIndex].url}
                    alt={`${selectedSpecies.name} - ${selectedSpecies.images[currentImageIndex].caption}`}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full object-cover"
                  />
                </AnimatePresence>

                <button
                  onClick={() => setSelectedSpecies(null)}
                  className="absolute top-3 right-3 bg-black/40 text-white p-2 rounded-full backdrop-blur-sm active:scale-90 transition-transform z-10"
                >
                  <X size={20} />
                </button>

                {selectedSpecies.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1.5 rounded-full backdrop-blur-sm active:scale-90 transition-transform"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/30 text-white p-1.5 rounded-full backdrop-blur-sm active:scale-90 transition-transform"
                    >
                      <ChevronRight size={24} />
                    </button>
                  </>
                )}

                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent p-4">
                  <div className="flex justify-between items-end">
                    <div>
                      <h3 className="text-white text-2xl font-bold">{selectedSpecies.name}</h3>
                      <p className="text-white/90 text-sm font-medium">
                        {selectedSpecies.images[currentImageIndex].caption}
                      </p>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      {selectedSpecies.images.length > 1 && (
                        <div className="flex gap-1 mb-1">
                          {selectedSpecies.images.map((_, idx) => (
                            <div
                              key={idx}
                              className={`h-1 rounded-full transition-all ${idx === currentImageIndex ? 'w-4 bg-duck-orange' : 'w-1 bg-white/50'}`}
                            />
                          ))}
                        </div>
                      )}
                      <div className="flex items-center gap-1 text-[10px] text-white/70 bg-black/20 px-1.5 py-0.5 rounded backdrop-blur-[2px]">
                        <Camera size={10} />
                        <span className="truncate max-w-[120px]">
                          {selectedSpecies.images[currentImageIndex].credit}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 overflow-y-auto space-y-6">
                <button
                  onClick={() => playCall(selectedSpecies.audioUrl)}
                  className="w-full bg-duck-green text-white py-3 rounded-xl font-bold flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-md"
                >
                  <Volume2 size={20} />
                  Play Species Call
                </button>

                <section>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-duck-brown mb-2 border-b border-duck-tan pb-1">Description</h4>
                  <p className="text-sm text-gray-700 leading-relaxed">{selectedSpecies.description}</p>
                </section>

                <div className="grid grid-cols-1 gap-6">
                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-duck-brown mb-2 border-b border-duck-tan pb-1">Identification Tips</h4>
                    <p className="text-sm text-gray-700">{selectedSpecies.identification}</p>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-duck-brown mb-2 border-b border-duck-tan pb-1">Field Markers</h4>
                    <p className="text-sm text-gray-700">{selectedSpecies.markers}</p>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-duck-brown mb-2 border-b border-duck-tan pb-1">Male vs Female</h4>
                    <p className="text-sm text-gray-700">{selectedSpecies.male_vs_female}</p>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-duck-brown mb-2 border-b border-duck-tan pb-1">Habitat & Behavior</h4>
                    <p className="text-sm text-gray-700 mb-2"><strong>Habitat:</strong> {selectedSpecies.habitat}</p>
                    <p className="text-sm text-gray-700"><strong>Behavior:</strong> {selectedSpecies.behavior}</p>
                  </section>

                  <section>
                    <h4 className="text-xs font-bold uppercase tracking-wider text-duck-brown mb-2 border-b border-duck-tan pb-1">Flight & Seasonal</h4>
                    <p className="text-sm text-gray-700 mb-2"><strong>Flight:</strong> {selectedSpecies.flight_pattern}</p>
                    <p className="text-sm text-gray-700"><strong>Migration:</strong> {selectedSpecies.seasonal_patterns}</p>
                  </section>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SpeciesSection;
