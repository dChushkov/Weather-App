import axios from 'axios';
import { WeatherData, City } from '../types/weather';

const BASE_URL = 'https://api.open-meteo.com/v1';

export async function getWeatherData(city: City): Promise<WeatherData> {
  try {
    const { data } = await axios.get(`${BASE_URL}/forecast`, {
      params: {
        latitude: city.lat,
        longitude: city.lon,
        current: [
          'temperature_2m',
          'relative_humidity_2m',
          'wind_speed_10m',
          'weather_code',
          'cloud_cover',
          'precipitation_probability',
          'is_day'
        ],
        daily: [
          'weather_code',
          'temperature_2m_max',
          'temperature_2m_min',
          'precipitation_probability_max',
          'cloud_cover_mean'
        ],
        timezone: 'auto',
        forecast_days: 14
      }
    });

    const getCondition = (code: number, isDay: number = 1): string => {
      // Ensure isDay is either 1 or 0
      const isDayTime = isDay === 1;
      const timePrefix = isDayTime ? 'day' : 'night';

      // Handle all possible weather codes
      if (code === 0) return `${timePrefix}-clear`; // Clear sky
      if (code === 1 || code === 2 || code === 3) return `${timePrefix}-clouds`; // Partly cloudy
      if (code >= 45 && code <= 48) return `${timePrefix}-clouds`; // Foggy
      if ((code >= 51 && code <= 55) || (code >= 61 && code <= 65)) return `${timePrefix}-rain`; // Rain
      if (code >= 71 && code <= 77) return 'snow'; // Snow
      if (code >= 95) return 'thunderstorm'; // Thunderstorm

      // Default fallback
      return `${timePrefix}-clear`;
    };

    return {
      city: city.name,
      temperature: Math.round(data.current.temperature_2m),
      condition: getCondition(data.current.weather_code, data.current.is_day),
      humidity: Math.round(data.current.relative_humidity_2m),
      windSpeed: Math.round(data.current.wind_speed_10m * 3.6),
      uvIndex: 0,
      cloudCover: data.current.cloud_cover,
      precipitationProb: data.current.precipitation_probability,
      forecast: data.daily.time.map((date: string, index: number) => ({
        date,
        maxTemp: Math.round(data.daily.temperature_2m_max[index]),
        minTemp: Math.round(data.daily.temperature_2m_min[index]),
        condition: getCondition(data.daily.weather_code[index], 1), // За прогнозата използваме дневни икони
        cloudCover: data.daily.cloud_cover_mean[index],
        precipitationProb: data.daily.precipitation_probability_max[index]
      }))
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    throw error;
  }
}