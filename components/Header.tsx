
import React from 'react';
import { BookOpenIcon } from './icons/BookOpenIcon';

const Header: React.FC = () => {
  return (
    <header className="text-center mb-8">
      <div className="flex items-center justify-center gap-4 mb-2">
        <BookOpenIcon className="w-12 h-12 text-indigo-400" />
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-500">
          EchoVerse
        </h1>
      </div>
      <p className="text-lg text-gray-400">Your Personal AI Audiobook Creation Studio</p>
    </header>
  );
};

export default Header;
