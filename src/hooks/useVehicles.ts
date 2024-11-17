// src/hooks/useVehicles.ts
import { useQuery, UseQueryResult } from '@tanstack/react-query';
import { Vehicle } from '../types/vehicle';

const fetchVehicles = async (): Promise<Vehicle[]> => {
  const response = await fetch('/vehicles.json'); // Fetch from public directory
  if (!response.ok) {
    throw new Error('Failed to fetch vehicle data');
  }
  return response.json();
};

export const useVehicles = (): UseQueryResult<Vehicle[], Error> => {
  return useQuery<Vehicle[], Error>({
    queryKey: ['vehicles'], // Unique key for caching
    queryFn: fetchVehicles, // Function to fetch the data
    staleTime: 1000 * 60 * 5, // Data is fresh for 5 minutes
    retry: 3, // Retry failed requests up to 3 times
  });
};
