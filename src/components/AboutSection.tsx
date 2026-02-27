import React from 'react';
import { Shield, Target, BookOpen } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 pb-24">
      <div className="bg-white p-6 rounded-2xl shadow-md border border-duck-tan">
        <h2 className="text-2xl font-bold mb-4">About DuckCall Master</h2>
        <p className="text-gray-700 mb-4">
          DuckCall Master is designed to help hunters of all skill levels improve their duck calling techniques through expert-led tutorials and interactive training.
        </p>

        <div className="space-y-4 mt-6">
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-duck-green/10 rounded-xl flex items-center justify-center text-duck-green shrink-0">
              <BookOpen size={24} />
            </div>
            <div>
              <h3 className="font-bold">Expert Tutorials</h3>
              <p className="text-sm text-gray-600">Curated videos from world-class callers covering everything from basics to advanced strategies.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-duck-green/10 rounded-xl flex items-center justify-center text-duck-green shrink-0">
              <Target size={24} />
            </div>
            <div>
              <h3 className="font-bold">Voice Analysis</h3>
              <p className="text-sm text-gray-600">Record your calls and receive instant feedback based on timing, rhythm, and tone.</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="w-12 h-12 bg-duck-green/10 rounded-xl flex items-center justify-center text-duck-green shrink-0">
              <Shield size={24} />
            </div>
            <div>
              <h3 className="font-bold">Privacy First</h3>
              <p className="text-sm text-gray-600">Your recordings are processed locally on your device and are never uploaded to any server.</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-duck-brown text-white p-6 rounded-2xl shadow-md">
        <h3 className="font-bold mb-2">Duck Hunter's Code</h3>
        <ul className="text-sm space-y-2 opacity-90">
          <li>• Respect the wildlife and their habitat.</li>
          <li>• Practice safety at all times.</li>
          <li>• Know your regulations and bag limits.</li>
          <li>• Always leave the blind cleaner than you found it.</li>
        </ul>
      </div>
    </div>
  );
};

export default AboutSection;
