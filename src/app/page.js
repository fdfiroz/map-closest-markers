'use client';
import ClosestMarkers from '@/components/ClosestMarkers';
import LocationInput from '@/components/LocationInput';
import MapComponent from '@/components/MapComponent';
import { useState } from 'react';
import locations from "../../public/locations.json";
import haversineDistance from 'haversine-distance';
export default function Home() {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);
  

  const handleLocationSubmit = (location) => {
    setUserLocation(location);
    updateClosestMarkers(location);
  };

  const handleMarkerDragEnd = (latLng) => {
    setUserLocation(latLng);
    updateClosestMarkers(latLng);
  };

  const updateClosestMarkers = (location) => {
    const distances = locations.map((loc) => ({
      ...loc,
      distance: haversineDistance(location, { lat: loc.latitude, lng: loc.longitude })
    }));
    distances.sort((a, b) => a.distance - b.distance);
    setMarkers(distances.slice(0, 5));
  };
  return (
    <div className="">
       <LocationInput onLocationSubmit={handleLocationSubmit} />
       <div className='flex flex-row-reverse'>
        <MapComponent
          userLocation={userLocation}
          markers={markers}
          onMarkerDragEnd={handleMarkerDragEnd}
        />
        <ClosestMarkers userLocation={userLocation} locations={locations} />
      </div>
    </div>
    
  );
}
