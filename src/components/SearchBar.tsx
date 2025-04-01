import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { BULGARIAN_CITIES, City } from '../types/weather';

interface SearchBarProps {
  onCitySelect: (city: City) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onCitySelect }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);

  const filteredCities = BULGARIAN_CITIES.filter(city =>
    city.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const city = BULGARIAN_CITIES.find(c => c.name.toLowerCase() === searchTerm.toLowerCase());
    if (city) {
      onCitySelect(city);
      setSearchTerm('');
      setShowSuggestions(false);
    }
  };

  const handleCityClick = (city: City) => {
    onCitySelect(city);
    setSearchTerm('');
    setShowSuggestions(false);
  };

  return (
    <div className="relative">
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Търсете град..."
          className="w-64 pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </form>

      {showSuggestions && searchTerm && (
        <div className="absolute w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-auto z-50">
          {filteredCities.map((city) => (
            <button
              key={city.name}
              onClick={() => handleCityClick(city)}
              className="w-full text-left px-4 py-2 hover:bg-blue-50 focus:bg-blue-50 focus:outline-none"
            >
              {city.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;