import React, { useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { DailyForecast, ForecastPeriod } from '../types/weather';
import { format, parseISO } from 'date-fns';
import { bg } from 'date-fns/locale';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

interface ForecastChartProps {
  forecast: DailyForecast[];
}

const ForecastChart: React.FC<ForecastChartProps> = ({ forecast }) => {
  const [period, setPeriod] = useState<ForecastPeriod>('daily');
  const [dataType, setDataType] = useState<'temp' | 'precip' | 'cloud'>('temp');

  const periods = {
    daily: { days: 1, title: 'Дневна прогноза' },
    weekly: { days: 7, title: 'Седмична прогноза' },
    biweekly: { days: 14, title: 'Двуседмична прогноза' }
  };

  const visibleForecast = forecast.slice(0, periods[period].days);

  const getDatasets = () => {
    switch (dataType) {
      case 'temp':
        return [
          {
            label: 'Максимална',
            data: visibleForecast.map(day => day.maxTemp),
            borderColor: 'rgb(239, 68, 68)',
            backgroundColor: 'rgba(239, 68, 68, 0.5)',
            tension: 0.3,
          },
          {
            label: 'Минимална',
            data: visibleForecast.map(day => day.minTemp),
            borderColor: 'rgb(59, 130, 246)',
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            tension: 0.3,
          }
        ];
      case 'precip':
        return [{
          label: 'Вероятност за валежи',
          data: visibleForecast.map(day => day.precipitationProb),
          borderColor: 'rgb(96, 165, 250)',
          backgroundColor: 'rgba(96, 165, 250, 0.5)',
          tension: 0.3,
        }];
      case 'cloud':
        return [{
          label: 'Облачност',
          data: visibleForecast.map(day => day.cloudCover),
          borderColor: 'rgb(156, 163, 175)',
          backgroundColor: 'rgba(156, 163, 175, 0.5)',
          tension: 0.3,
        }];
      default:
        return [];
    }
  };

  const data = {
    labels: visibleForecast.map(day => 
      format(parseISO(day.date), period === 'daily' ? 'HH:mm' : 'EEE, d MMM', { locale: bg })
    ),
    datasets: getDatasets(),
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: periods[period].title,
        font: {
          size: 16,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (value: number) => 
            dataType === 'temp' ? `${value}°C` : `${value}%`,
        },
      },
    },
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex flex-col gap-4 mb-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-800">Прогноза за времето</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setPeriod('daily')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === 'daily'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              Днес
            </button>
            <button
              onClick={() => setPeriod('weekly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === 'weekly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              7 дни
            </button>
            <button
              onClick={() => setPeriod('biweekly')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                period === 'biweekly'
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              14 дни
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setDataType('temp')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              dataType === 'temp'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Температура
          </button>
          <button
            onClick={() => setDataType('precip')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              dataType === 'precip'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Валежи
          </button>
          <button
            onClick={() => setDataType('cloud')}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              dataType === 'cloud'
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Облачност
          </button>
        </div>
      </div>
      <Line options={options} data={data} />
    </div>
  );
};

export default ForecastChart;