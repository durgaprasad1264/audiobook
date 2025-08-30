
import React from 'react';
import AudioPlayer from './AudioPlayer';

interface ResultDisplayProps {
  originalText: string;
  rewrittenText: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({ originalText, rewrittenText }) => {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 space-y-6 animate-fade-in">
      <h2 className="text-2xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
        Your Audiobook is Ready!
      </h2>
      
      <AudioPlayer textToSpeak={rewrittenText} />

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-300">Original Text</h3>
          <div className="h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg overflow-y-auto">
            <p className="text-gray-400 whitespace-pre-wrap">{originalText}</p>
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-lg text-gray-300">AI-Adapted Narration</h3>
          <div className="h-64 p-4 bg-gray-900 border border-gray-700 rounded-lg overflow-y-auto">
            <p className="text-gray-200 whitespace-pre-wrap">{rewrittenText}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
