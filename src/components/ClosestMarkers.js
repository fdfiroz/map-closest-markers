'use client';
import haversine from 'haversine-distance';
import { useState, useEffect } from 'react';

const ClosestMarkers = ({ userLocation, locations }) => {
  const [closestMarkers, setClosestMarkers] = useState([]);

  useEffect(() => {
    const distances = locations.map((location) => ({
      ...location,
      distance: haversine(userLocation, { lat: location.latitude, lng: location.longitude })
    }));
    
    const withinRange = distances.filter(location => location.distance <= 1000);
    withinRange.sort((a, b) => a.distance - b.distance);
    setClosestMarkers(withinRange.slice(0, 5));
  }, [userLocation, locations]);

  return (
    <ul>
      {
        closestMarkers.length > 0 ? closestMarkers.map((marker) => (
          <li key={marker.id}>{marker.name} - {marker.distance.toFixed(2)} meters</li>
        )) : <li>No markers found</li>
      }
    </ul>
  );
};

export default ClosestMarkers;