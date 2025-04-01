import React from 'react';
import { Sun, Cloud, CloudRain, Wind, Droplets, CloudSnow, CloudLightning, Umbrella, CloudSun, Moon, CloudMoon, CloudMoonRain, MoonStar } from 'lucide-react';

interface WeatherCardProps {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  cloudCover: number;
  precipitationProb: number;
}

const WeatherIcon: React.FC<{ condition: string }> = ({ condition }) => {
  // Подобрена логика за избор на икони
  switch (condition.toLowerCase()) {
    // Дневни икони
    case 'day-clear':
      return <Sun className="h-12 w-12 text-yellow-500" />;
    case 'day-clouds':
      return <CloudSun className="h-12 w-12 text-gray-500" />;
    case 'day-rain':
      return <CloudRain className="h-12 w-12 text-blue-500" />;
    
    // Нощни икони
    case 'night-clear':
      return <Moon className="h-12 w-12 text-blue-200" />;
    case 'night-clouds':
      return <CloudMoon className="h-12 w-12 text-blue-200" />;
    case 'night-rain':
      return <CloudMoonRain className="h-12 w-12 text-blue-300" />;
    
    // Общи икони (независими от време на деня)
    case 'snow':
      return <CloudSnow className="h-12 w-12 text-blue-300" />;
    case 'thunderstorm':
      return <CloudLightning className="h-12 w-12 text-yellow-600" />;
    
    // Резервни икони според време на деня
    default:
      return condition.startsWith('night') ? 
        <Moon className="h-12 w-12 text-blue-200" /> : 
        <Sun className="h-12 w-12 text-yellow-500" />;
  }
};

const WeatherCard: React.FC<WeatherCardProps> = ({
  city,
  temperature,
  condition,
  humidity,
  windSpeed,
  cloudCover,
  precipitationProb
}) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-semibold text-gray-800">{city}</h2>
          <p className="text-gray-600 mt-1">
            {new Date().toLocaleDateString('bg-BG', { 
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold text-blue-600">{temperature}°C</div>
          <div className="flex items-center justify-end mt-2">
            <WeatherIcon condition={condition} />
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4 mb-4">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <Droplets className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Влажност</span>
          <span className="font-semibold">{humidity}%</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <Wind className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Вятър</span>
          <span className="font-semibold">{windSpeed} км/ч</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <Sun className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">UV Индекс</span>
          <span className="font-semibold">Умерен</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <CloudSun className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Облачност</span>
          <span className="font-semibold">{cloudCover}%</span>
        </div>
        
        <div className="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors">
          <Umbrella className="h-6 w-6 text-blue-500 mb-2" />
          <span className="text-sm text-gray-600">Вероятност за валежи</span>
          <span className="font-semibold">{precipitationProb}%</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;