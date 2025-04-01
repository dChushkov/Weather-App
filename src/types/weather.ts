export interface WeatherData {
  city: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  uvIndex: number;
  cloudCover: number;
  precipitationProb: number;
  forecast: DailyForecast[];
}

export interface DailyForecast {
  date: string;
  maxTemp: number;
  minTemp: number;
  condition: string;
  cloudCover: number;
  precipitationProb: number;
}

export interface City {
  name: string;
  lat: number;
  lon: number;
}

export type ForecastPeriod = 'daily' | 'weekly' | 'biweekly';

export const BULGARIAN_CITIES: City[] = [
  { name: 'София', lat: 42.6977, lon: 23.3219 },
  { name: 'Пловдив', lat: 42.1354, lon: 24.7453 },
  { name: 'Варна', lat: 43.2141, lon: 27.9147 },
  { name: 'Бургас', lat: 42.5048, lon: 27.4626 },
  { name: 'Русе', lat: 43.8564, lon: 25.9705 },
  { name: 'Стара Загора', lat: 42.4283, lon: 25.6344 },
  { name: 'Плевен', lat: 43.4170, lon: 24.6180 },
  { name: 'Добрич', lat: 43.5714, lon: 27.8283 },
  { name: 'Сливен', lat: 42.6824, lon: 26.3255 },
  { name: 'Шумен', lat: 43.2712, lon: 26.9361 },
  { name: 'Велико Търново', lat: 43.0757, lon: 25.6172 },
  { name: 'Перник', lat: 42.6077, lon: 23.0336 },
  { name: 'Хасково', lat: 41.9344, lon: 25.5554 },
  { name: 'Благоевград', lat: 42.0116, lon: 23.0905 },
  { name: 'Пазарджик', lat: 42.1887, lon: 24.3319 },
  { name: 'Кюстендил', lat: 42.2847, lon: 22.6911 },
  { name: 'Монтана', lat: 43.4085, lon: 23.2257 },
  { name: 'Търговище', lat: 43.2468, lon: 26.5725 },
  { name: 'Разград', lat: 43.5333, lon: 26.5167 },
  { name: 'Габрово', lat: 42.8747, lon: 25.3342 },
  { name: 'Видин', lat: 43.9859, lon: 22.8777 },
  { name: 'Враца', lat: 43.2102, lon: 23.5629 },
  { name: 'Ямбол', lat: 42.4841, lon: 26.5106 },
  { name: 'Силистра', lat: 44.1167, lon: 27.2667 },
  { name: 'Ловеч', lat: 43.1367, lon: 24.7167 },
  { name: 'Смолян', lat: 41.5850, lon: 24.7011 },
  { name: 'Кърджали', lat: 41.6500, lon: 25.3667 },
  { name: 'Банско', lat: 41.8383, lon: 23.4856 },
  { name: 'Несебър', lat: 42.6598, lon: 27.7242 },
  { name: 'Созопол', lat: 42.4178, lon: 27.6953 },
  { name: 'Велинград', lat: 42.0173, lon: 23.9912 },
  { name: 'Сандански', lat: 41.5667, lon: 23.2833 },
  { name: 'Поморие', lat: 42.5648, lon: 27.6210 },
  { name: 'Царево', lat: 42.1714, lon: 27.8503 },
  { name: 'Балчик', lat: 43.4167, lon: 28.1667 },
  { name: 'Каварна', lat: 43.4333, lon: 28.3333 },
  { name: 'Свищов', lat: 43.6167, lon: 25.3500 },
  { name: 'Асеновград', lat: 42.0167, lon: 24.8667 },
  { name: 'Дупница', lat: 42.2667, lon: 23.1167 },
  { name: 'Петрич', lat: 41.3967, lon: 23.2019 }
];