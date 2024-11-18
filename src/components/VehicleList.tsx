import React, { useEffect, useRef, useState } from 'react';
import { FixedSizeList as List } from 'react-window';
import { useVehicleContext } from '../context/VehicleContext';
import { Vehicle } from '../types/vehicle';

interface VehicleListProps {
  vehicles: Vehicle[];
}

const VehicleList: React.FC<VehicleListProps> = ({ vehicles }) => {
  const { selectedVehicle, setSelectedVehicle } = useVehicleContext();
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVehicles, setFilteredVehicles] = useState(vehicles);
  const listRef = useRef<List>(null);

  // Filter vehicles based on the search query
  useEffect(() => {
    const lowercasedQuery = searchQuery.toLowerCase();
    setFilteredVehicles(
      vehicles.filter(
        (vehicle) =>
          vehicle.plate.toLowerCase().includes(lowercasedQuery) ||
          vehicle.address.toLowerCase().includes(lowercasedQuery),
      ),
    );
  }, [searchQuery, vehicles]);

  // Scroll to the selected vehicle when it changes
  useEffect(() => {
    if (selectedVehicle) {
      const selectedIndex = filteredVehicles.findIndex(
        (v) => v.vin === selectedVehicle.vin,
      );
      if (selectedIndex !== -1 && listRef.current) {
        listRef.current.scrollToItem(selectedIndex, 'smart'); // Scroll to center the selected item
      }
    }
  }, [selectedVehicle, filteredVehicles]);

  return (
    <div className="h-full flex flex-col">
      {/* Search Bar */}
      <div className="p-4 border-b border-gray-200">
        <input
          type="text"
          placeholder="Search by plate or address..."
          className="w-full p-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Virtualized List */}
      <List
        ref={listRef}
        height={window.innerHeight - 70} // Subtract height for the search bar
        width="100%"
        itemCount={filteredVehicles.length}
        itemSize={70} // Each row height
      >
        {({ index, style }) => {
          const vehicle = filteredVehicles[index];
          const isSelected = selectedVehicle?.vin === vehicle?.vin;

          return (
            <div
              key={vehicle.vin}
              style={style}
              className={`flex items-center justify-between px-4 py-2 border-b border-gray-200
                hover:bg-gray-100 cursor-pointer transition-all duration-300 ease-in-out 
                ${isSelected ? 'bg-blue-100 border-l-4 border-blue-500' : ''}`}
              onClick={() => setSelectedVehicle(vehicle)}
            >
              <span className="truncate w-1/2">{vehicle.plate}</span>
              <span className="truncate w-1/2 text-right">
                {vehicle.address}
              </span>
            </div>
          );
        }}
      </List>
    </div>
  );
};

export default VehicleList;
