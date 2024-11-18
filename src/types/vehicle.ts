interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface Vehicle {
  vin: string; // Vehicle Identification Number
  plate: string; // License plate
  geoCoordinate: GeoCoordinate; // Geographical coordinates
  fuelLevel: number; // Fuel percentage
  address: string; // Location address of the vehicle
  locationAlias: string; // Alias for the location
  locationId: number; // ID of the location
  parkingId: string; // ID for parking
  buildSeries: string; // Vehicle series
  fuelType: string; // Type of fuel (e.g., DIESEL, ELECTRIC)
  primaryColor: string; // Primary color code of the vehicle
  charging: boolean; // Whether the vehicle is charging
  freeForRental: boolean; // Whether the vehicle is free for rental
  hardwareVersion: string; // Hardware version
  globalVersion: number; // Global version of the vehicle data
}
