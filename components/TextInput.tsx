
import React, { useCallback, useRef } from 'react';
import { UploadIcon } from './icons/UploadIcon';

interface TextInputProps {
  text: string;
  onTextChange: (text: string) => void;
}

const TextInput: React.FC<TextInputProps> = ({ text, onTextChange }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => {
        const fileText = e.target?.result as string;
        onTextChange(fileText);
      };
      reader.readAsText(file);
    } else if (file) {
      alert('Please upload a valid .txt file.');
    }
  }, [onTextChange]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <label htmlFor="text-input" className="block text-lg font-medium text-gray-300">
          Your Text
        </label>
        <button
          onClick={handleUploadClick}
          className="flex items-center gap-2 text-sm bg-gray-700 hover:bg-gray-600 text-gray-300 font-semibold py-2 px-4 rounded-lg transition-colors duration-300"
        >
          <UploadIcon className="w-4 h-4" />
          Upload .txt file
        </button>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept=".txt"
          className="hidden"
        />
      </div>
      <textarea
        id="text-input"
        value={text}
        onChange={(e) => onTextChange(e.target.value)}
        placeholder="Paste your story, article, or any text here..."
        className="w-full h-48 p-4 bg-gray-900 border-2 border-gray-700 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-300 resize-y"
      />
    </div>
  );
};

export default TextInput;
