// src/components/VehicleDetails.tsx
import React from 'react';
import { useVehicleContext } from '../context/VehicleContext';

const VehicleDetails: React.FC = () => {
  const { selectedVehicle } = useVehicleContext();

  if (!selectedVehicle) {
    return (
      <div className="flex items-center justify-center h-full bg-gray-50">
        <p className="text-gray-500 text-xl">Select a vehicle to view details</p>
      </div>
    );
  }

  return (
    <div className="border-l-4 border-blue-500 p-4 md:p-8 bg-white h-full flex flex-col justify-between overflow-y-auto">
      <h2 className="text-xl md:text-2xl font-bold text-blue-600 mb-4">Vehicle Details</h2>
      <div className="text-base md:text-lg space-y-4 flex-grow">
        <p><span className="font-semibold">Plate:</span> {selectedVehicle.plate}</p>
        <p><span className="font-semibold">Address:</span> {selectedVehicle.address}</p>
        <p><span className="font-semibold">Fuel Level:</span> {selectedVehicle.fuelLevel}%</p>
        <p>
          <span className="font-semibold">Coordinates:</span>{' '}
          {selectedVehicle.geoCoordinate.latitude}, {selectedVehicle.geoCoordinate.longitude}
        </p>
      </div>
      <div className="text-sm md:text-base text-gray-400 mt-4">
        <p>Location ID: {selectedVehicle.locationId}</p>
        <p>VIN: {selectedVehicle.vin}</p>
      </div>
    </div>
  );
};

export default VehicleDetails;
