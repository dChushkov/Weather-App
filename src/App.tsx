import React, { useState, useEffect } from 'react';
import { Cloud } from 'lucide-react';
import WeatherCard from './components/WeatherCard';
import SearchBar from './components/SearchBar';
import WeatherMap from './components/WeatherMap';
import ForecastChart from './components/ForecastChart';
import { WeatherData, City, BULGARIAN_CITIES } from './types/weather';
import { getWeatherData } from './services/weatherService';

function App() {
  const [selectedCity, setSelectedCity] = useState<City>(BULGARIAN_CITIES[0]);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWeatherData() {
      try {
        setLoading(true);
        setError(null);
        const data = await getWeatherData(selectedCity);
        setWeatherData(data);
      } catch (err) {
        setError('Грешка при зареждане на данните за времето');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchWeatherData();
  }, [selectedCity]);

  const handleCitySelect = (city: City) => {
    setSelectedCity(city);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Cloud className="h-8 w-8 text-blue-500" />
            <h1 className="text-2xl font-bold text-gray-800">Времето в България</h1>
          </div>
          <SearchBar onCitySelect={handleCitySelect} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Зареждане на данните...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8 text-red-600">{error}</div>
        ) : weatherData && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-8">
              <WeatherCard
                city={weatherData.city}
                temperature={weatherData.temperature}
                condition={weatherData.condition}
                humidity={weatherData.humidity}
                windSpeed={weatherData.windSpeed}
                cloudCover={weatherData.cloudCover}
                precipitationProb={weatherData.precipitationProb}
              />
              <ForecastChart forecast={weatherData.forecast} />
            </div>
            <div>
              <WeatherMap selectedCity={selectedCity} onCitySelect={handleCitySelect} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;