
import React, { useState, useEffect, useCallback } from 'react';
import { PlayIcon } from './icons/PlayIcon';
import { PauseIcon } from './icons/PauseIcon';
import { StopIcon } from './icons/StopIcon';
import { DownloadIcon } from './icons/DownloadIcon';

interface AudioPlayerProps {
  textToSpeak: string;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ textToSpeak }) => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);

  const populateVoiceList = useCallback(() => {
    const availableVoices = window.speechSynthesis.getVoices();
    if (availableVoices.length > 0) {
      setVoices(availableVoices);
      const defaultVoice = availableVoices.find(v => v.lang.startsWith('en')) || availableVoices[0];
      setSelectedVoice(defaultVoice);
    }
  }, []);

  useEffect(() => {
    populateVoiceList();
    if (window.speechSynthesis.onvoiceschanged !== undefined) {
      window.speechSynthesis.onvoiceschanged = populateVoiceList;
    }

    return () => {
        window.speechSynthesis.cancel();
    }
  }, [populateVoiceList]);

  const handlePlay = () => {
    if (isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    } else {
      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      if (selectedVoice) {
        utterance.voice = selectedVoice;
      }
      utterance.onend = () => {
        setIsSpeaking(false);
        setIsPaused(false);
      };
      utterance.onerror = (event) => {
        console.error('SpeechSynthesisUtterance.onerror', event);
        setIsSpeaking(false);
        setIsPaused(false);
      };
      window.speechSynthesis.speak(utterance);
    }
    setIsSpeaking(true);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsSpeaking(false);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  return (
    <div className="bg-gray-900 p-4 rounded-lg border border-gray-700 space-y-4">
      <div className="flex items-center justify-center gap-4">
        {!isSpeaking && !isPaused ? (
          <button onClick={handlePlay} className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors">
            <PlayIcon className="w-6 h-6" />
          </button>
        ) : isPaused ? (
            <button onClick={handlePlay} className="p-3 bg-indigo-600 rounded-full text-white hover:bg-indigo-500 transition-colors">
                <PlayIcon className="w-6 h-6" />
            </button>
        ) : (
          <button onClick={handlePause} className="p-3 bg-yellow-500 rounded-full text-white hover:bg-yellow-400 transition-colors">
            <PauseIcon className="w-6 h-6" />
          </button>
        )}
        <button onClick={handleStop} disabled={!isSpeaking && !isPaused} className="p-3 bg-red-600 rounded-full text-white hover:bg-red-500 disabled:bg-gray-700 disabled:cursor-not-allowed transition-colors">
          <StopIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <select
          value={selectedVoice?.name}
          onChange={(e) => setSelectedVoice(voices.find(v => v.name === e.target.value) || null)}
          className="w-full sm:w-2/3 bg-gray-800 border border-gray-600 text-white rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
        >
          {voices.map((voice) => (
            <option key={voice.name} value={voice.name}>
              {voice.name} ({voice.lang})
            </option>
          ))}
        </select>
        <div className="relative w-full sm:w-1/3 group">
          <button 
            disabled 
            className="w-full flex items-center justify-center gap-2 bg-gray-700 text-gray-400 font-semibold py-2 px-4 rounded-lg cursor-not-allowed"
          >
            <DownloadIcon className="w-5 h-5" />
            Download MP3
          </button>
          <div className="absolute bottom-full mb-2 w-full px-2 hidden group-hover:block">
            <div className="bg-gray-700 text-white text-xs rounded py-1 px-2 text-center shadow-lg">
                MP3 download requires a server-side TTS service and is not available in this demo.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
