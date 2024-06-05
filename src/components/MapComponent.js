'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import { myIcon, otherIcon } from '@/utils/icone-utils';




const MapComponent = ({ userLocation, markers, onMarkerDragEnd }) => {
  const [position, setPosition] = useState({lat: 23.7507363, lng: 90.3877155});

  const handleDragEnd = (e) => {
    const latLng = e.target.getLatLng();
    setPosition(latLng);
    onMarkerDragEnd(latLng);
  };
  useEffect(() => {setPosition(userLocation)}, [userLocation]);
  const tileLayer = {
    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  }

  return (
    <MapContainer style={{ height: "400px", width: "400px"}} center={position} zoom={50} >
      <TileLayer {...tileLayer} />
      <Marker position={position} icon={myIcon} draggable eventHandlers={{ dragend: handleDragEnd }}>
        <Popup>Current Location</Popup>
      </Marker>
      {markers.map((marker) => (
        <Marker key={marker.id} icon={otherIcon} position={[marker.latitude, marker.longitude]}>
          <Popup>{marker.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapComponent;