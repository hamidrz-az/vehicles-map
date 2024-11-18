import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useVehicleContext } from '../context/VehicleContext';
import { Vehicle } from '../types/vehicle';

// Fix missing default icon for markers
L.Icon.Default.mergeOptions({
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

interface MapWrapperProps {
  vehicles: Vehicle[];
}

const Markers: React.FC<{ vehicles: Vehicle[] }> = ({ vehicles }) => {
  const { selectedVehicle, setSelectedVehicle } = useVehicleContext();
  const map = useMap();

  useEffect(() => {
    if (selectedVehicle) {
      const { latitude, longitude } = selectedVehicle.geoCoordinate;
      map.flyTo([latitude, longitude], 16, { duration: 1.5 });
    }
  }, [selectedVehicle, map]);

  return (
    <>
      {vehicles.map((vehicle) => (
        <Marker
          key={vehicle.vin}
          position={[
            vehicle.geoCoordinate.latitude,
            vehicle.geoCoordinate.longitude,
          ]}
          eventHandlers={{
            click: () => setSelectedVehicle(vehicle), // Triggers scroll and selection
          }}
        />
      ))}
    </>
  );
};

const MapWrapper: React.FC<MapWrapperProps> = ({ vehicles }) => (
  <MapContainer
    center={[53.55, 10.0]}
    zoom={14}
    style={{ height: '100%', width: '100%' }}
  >
    <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
    <Markers vehicles={vehicles} />
  </MapContainer>
);

export default MapWrapper;
