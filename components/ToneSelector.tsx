
import React from 'react';
import { TONES } from '../constants';
import { Tone } from '../types';

interface ToneSelectorProps {
  selectedTone: Tone;
  onToneChange: (tone: Tone) => void;
}

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneChange }) => {
  return (
    <div className="w-full space-y-3">
       <label className="block text-lg font-medium text-gray-300">Choose a Tone</label>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
        {TONES.map((tone) => (
          <button
            key={tone.id}
            onClick={() => onToneChange(tone)}
            className={`p-4 rounded-lg text-center cursor-pointer transition-all duration-300 transform border-2 ${
              selectedTone.id === tone.id
                ? 'bg-indigo-600 border-indigo-500 text-white scale-105 shadow-lg'
                : 'bg-gray-700 border-gray-600 hover:bg-gray-600 hover:border-gray-500'
            }`}
          >
            <div className="text-3xl mb-1">{tone.emoji}</div>
            <div className="font-semibold">{tone.name}</div>
            <div className="text-xs text-gray-400 hidden sm:block">{tone.description}</div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ToneSelector;
