
import React, { useState, useCallback, useEffect } from 'react';
import { rewriteText } from './services/geminiService';
import { Tone } from './types';
import Header from './components/Header';
import TextInput from './components/TextInput';
import ToneSelector from './components/ToneSelector';
import ResultDisplay from './components/ResultDisplay';
import Loader from './components/Loader';
import { TONES } from './constants';

const App: React.FC = () => {
  const [originalText, setOriginalText] = useState<string>('');
  const [rewrittenText, setRewrittenText] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<Tone>(TONES[0]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    if (!originalText.trim()) {
      setError('Please enter some text to generate the audiobook.');
      return;
    }
    setError(null);
    setIsLoading(true);
    setRewrittenText('');

    try {
      const result = await rewriteText(originalText, selectedTone);
      setRewrittenText(result);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [originalText, selectedTone]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <Header />
      <main className="w-full max-w-6xl mx-auto space-y-8">
        <div className="bg-gray-800 border border-gray-700 rounded-2xl shadow-lg p-6 space-y-6">
          <TextInput text={originalText} onTextChange={setOriginalText} />
          <ToneSelector selectedTone={selectedTone} onToneChange={setSelectedTone} />
          <button
            onClick={handleGenerate}
            disabled={isLoading || !originalText}
            className="w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-900 disabled:text-gray-400 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
          >
            {isLoading ? <Loader /> : '✨ Generate Narration'}
          </button>
        </div>

        {error && (
          <div className="bg-red-900/50 border border-red-700 text-red-300 px-4 py-3 rounded-lg relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {isLoading && !rewrittenText && (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 flex flex-col items-center justify-center h-96">
            <Loader />
            <p className="text-lg text-gray-400 mt-4 animate-pulse">Generating your audiobook... this may take a moment.</p>
          </div>
        )}

        {rewrittenText && (
          <ResultDisplay
            originalText={originalText}
            rewrittenText={rewrittenText}
          />
        )}
      </main>
      <footer className="text-center text-gray-500 mt-8 text-sm">
        <p>Powered by Gemini and React. Crafted for an amazing audio experience.</p>
      </footer>
    </div>
  );
};

export default App;
