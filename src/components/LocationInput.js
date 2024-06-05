'use client';
import getAddressLatLng from '@/utils/getAddressLatLng';
import getLatLngToAddress from '@/utils/getLatLngToAddress';
import { useEffect, useState } from 'react';

const LocationInput = ({ onLocationSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState(''); // Add this line

  const handleSubmit = (e) => {
    e.preventDefault();
    getAddressLatLng(address).then((location) => {
      if (location) {
        console.log(location);
      } else {
        console.error('Error fetching location:', address);
      }
    });
    onLocationSubmit({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  };
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setLongitude(longitude);
        setLatitude(latitude);
        getLatLngToAddress(latitude, longitude).then((address) => {
          setAddress(address);
        });
      }, (error) => {
        console.error('Error fetching location:', error);
      });
    } else {
      console.warn('Geolocation is not supported by this browser.');
    }
  }, []);
  return (
    <form onSubmit={handleSubmit}>
      <input
      className='text-black'
        type="text"
        placeholder="Latitude"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        required
      />
      
      <button type="submit">Submit</button>
    </form>
  );
};

export default LocationInput;