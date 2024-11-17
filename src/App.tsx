// src/App.tsx
import React from 'react';
import VehicleList from './components/VehicleList';
import MapWrapper from './components/Map';
import VehicleDetails from './components/VehicleDetails';
import { useVehicles } from './hooks/useVehicles';

const App: React.FC = () => {
  const { data: vehicles, isLoading, error } = useVehicles();

  if (isLoading) {
    return <p className="text-center text-gray-600">Loading vehicles...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error.message}</p>;
  }

  if (!vehicles) {
    return <p className="text-center text-gray-500">No vehicles available.</p>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar with Vehicle List */}
      <aside className="w-1/4 bg-white border-r overflow-hidden">
        <VehicleList vehicles={vehicles} />
      </aside>

      {/* Main Map and Details Area */}
      <main className="w-3/4 flex flex-col">
        <div className="flex-1">
          <MapWrapper vehicles={vehicles} />
        </div>
        <div className="h-1/3 bg-white border-t">
          <VehicleDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
