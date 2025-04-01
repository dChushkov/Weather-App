import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { City, BULGARIAN_CITIES } from '../types/weather';
import L from 'leaflet';

// Fix for default marker icons
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface WeatherMapProps {
  selectedCity: City;
  onCitySelect: (city: City) => void;
}

// Component to handle map center updates
const MapUpdater: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap();
  const initialized = useRef(false);

  useEffect(() => {
    if (!map || initialized.current) return;

    // Mark as initialized
    initialized.current = true;

    // Initial setup with a small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      map.setView(center, map.getZoom());
    }, 250);

    return () => clearTimeout(timer);
  }, [map, center]);

  useEffect(() => {
    if (!map || !initialized.current) return;

    const timer = setTimeout(() => {
      map.setView(center, 9, {
        animate: true,
        duration: 1
      });
    }, 250);

    return () => clearTimeout(timer);
  }, [center, map]);

  return null;
};

const WeatherMap: React.FC<WeatherMapProps> = ({ selectedCity, onCitySelect }) => {
  const BULGARIA_CENTER: [number, number] = [42.7339, 25.4858];
  const DEFAULT_ZOOM = 7;

  // Custom marker icons
  const selectedIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  const defaultIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 h-full">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Интерактивна карта</h2>
      <div className="h-[400px] rounded-lg overflow-hidden">
        <MapContainer
          center={BULGARIA_CENTER}
          zoom={DEFAULT_ZOOM}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
          scrollWheelZoom={true}
          zoomControl={true}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MapUpdater center={[selectedCity.lat, selectedCity.lon]} />
          {BULGARIAN_CITIES.map((city) => (
            <Marker
              key={city.name}
              position={[city.lat, city.lon]}
              icon={city.name === selectedCity.name ? selectedIcon : defaultIcon}
              eventHandlers={{
                click: () => onCitySelect(city)
              }}
            >
              <Popup>
                <div className="text-center p-2">
                  <h3 className="font-semibold text-lg mb-1">{city.name}</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    {city.lat.toFixed(4)}°N, {city.lon.toFixed(4)}°E
                  </p>
                  {city.name === selectedCity.name ? (
                    <span className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                      Текущо избран град
                    </span>
                  ) : (
                    <button
                      onClick={() => onCitySelect(city)}
                      className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded transition-colors"
                    >
                      Избери този град
                    </button>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>🔴 Червен маркер: избран град</p>
        <p>🔵 Син маркер: други градове</p>
        <p className="mt-2 text-gray-500 italic">Кликнете върху маркер, за да изберете град</p>
      </div>
    </div>
  );
};

export default WeatherMap;