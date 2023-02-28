import { searchSongs } from '@/pages/api/spotify';
import { useState } from 'react';

export default function SearchBar() {
  const [searchInput, setSearchInput] = useState('');

  const handleInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleSearchClick = () => {
    if (searchInput.trim() !== '') {
      searchSongs(searchInput);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <div className="relative w-full max-w-sm">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <svg className="w-4 h-4 text-gray-400" viewBox="0 0 16 16" fill="currentColor">
            <path d="M6.5 11a4.5 4.5 0 1 1 3.54-1.69l4.2 4.2a.75.75 0 1 1-1.06 1.06l-4.2-4.2A4.47 4.47 0 0 1 6.5 11zm0-7a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5z"/>
          </svg>
        </div>
        <input
          className="block w-full pl-9 pr-4 py-2 rounded-md text-gray-900 placeholder-gray-500 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-600 focus:border-transparent"
          type="text"
          placeholder="Search for a song or artist"
          value={searchInput}
          onChange={handleInputChange}
        />
        {searchInput.trim() !== '' && (
          <button className="absolute inset-y-0 right-0 px-4 py-2 bg-cyan-600 text-white font-medium rounded-md" onClick={handleSearchClick}>
            Search
          </button>
        )}
      </div>
    </div>
  );
}
