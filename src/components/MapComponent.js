'use client';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { myIcon, otherIcon } from '@/utils/icone-utils';
import getClosestLocations from '@/utils/getClosestLocations';

const tileLayer = {
  attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
  url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
}


const MapComponent = ({ userLocation, markers, onMarkerDragEnd }) => {
  const [position, setPosition] = useState({lat: 23.7507363, lng: 90.3877155});

  const handleDragEnd = (e) => {
    const latLng = e.target.getLatLng();
    setPosition(latLng);
    onMarkerDragEnd(latLng);
  };
  const handleMapClick = (e) => {
    setPosition(e.latlng);
    // You can perform additional actions here, such as updating state or displaying information
    console.log("Clicked Latitude:", e.latlng.lat);
    console.log("Clicked Longitude:", e.latlng.lng);
  };

  useEffect(() => {setPosition(userLocation)}, [userLocation]);

  const filter = getClosestLocations(userLocation, markers, 200);
  return (
    <MapContainer style={{ height: "400px", width: "400px"}} className='sticky' center={position} zoom={50} onClick={handleMapClick}>
      <TileLayer {...tileLayer} />
      <Marker position={position} icon={myIcon} draggable eventHandlers={{ dragend: handleDragEnd }}>
        <Popup>Current Location</Popup>
      </Marker>
      {filter.map((marker) => (
        <Marker key={marker.id} icon={otherIcon} position={[marker.latitude, marker.longitude]}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
      <Circle center={position} radius={100} /> {/* Circle with radius 100 meters */}
    </MapContainer>
  );
};

export default MapComponent;