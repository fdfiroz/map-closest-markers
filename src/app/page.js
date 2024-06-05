'use client';
import ClosestMarkers from '@/components/ClosestMarkers';
import LocationInput from '@/components/LocationInput';
import MapComponent from '@/components/MapComponent';
import { useEffect, useState } from 'react';
import locations from "../../public/locations.json";
import haversineDistance from 'haversine-distance';
export default function Home() {
  const [userLocation, setUserLocation] = useState({ lat: 0, lng: 0 });
  const [markers, setMarkers] = useState([]);
  
  useEffect(() => {
    async function fetchData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
          
        }, (error) => {
          console.error('Error fetching location:', error);
          alert('Error fetching location:', error);
        });
      } else {
        console.warn('Geolocation is not supported by this browser.');
      }
    }
    fetchData();
  }, []);
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
    <div className="p-4">
       <LocationInput onLocationSubmit={handleLocationSubmit} userLocation={userLocation}/>
       <div className='flex flex-row-reverse justify-evenly items-center'>
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