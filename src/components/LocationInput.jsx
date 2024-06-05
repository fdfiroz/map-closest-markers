'use client';
import getAddressLatLng from '@/utils/getAddressLatLng';
import getLatLngToAddress from '@/utils/getLatLngToAddress';
import { useEffect, useState } from 'react';

const LocationInput = ({userLocation, onLocationSubmit }) => {
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const address = await getLatLngToAddress(userLocation.lat, userLocation.lng);
        if (isMounted) {
          // console.log(address);
          setAddress(address);
        }
      } catch (error) {
        // console.error('Error fetching address:', error);
      }
    };
    fetchData();
    return () => {
      isMounted = false;
    };
  }, [userLocation.lat, userLocation.lng]);
  const handleSubmit = (e) => {
    e.preventDefault();
    getAddressLatLng(address).then((location) => {
      if (location) {
        // console.log(location);
        setLatitude(location.latitude);
        setLongitude(location.longitude);
      } else {
        // console.error('Error fetching location:', address);
      }
    });
    onLocationSubmit({ lat: parseFloat(latitude), lng: parseFloat(longitude) });
  };
  const handelChange=(e)=>{
    setAddress(e.target.value)
  }
  useEffect(() => {
    async function fetchData() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const { latitude, longitude } = position.coords;
          setLongitude(longitude);
          setLatitude(latitude);
          onLocationSubmit({ lat: latitude, lng: longitude });
          getLatLngToAddress(latitude, longitude).then((address) => {
            setAddress(address);
          });
        }, (error) => {
          // console.error('Error fetching location:', error);
          alert('Error fetching location:', error);
        });
      } else {
        // console.warn('Geolocation is not supported by this browser.');
      }
    }
    fetchData();
  }, []);
  return (
    <form className='flex justify-stretch items-center gap-3' onSubmit={handleSubmit}>
      <input
      className='text-black border p-2 rounded-3xl'
        type="text"
        placeholder="Address"
        value={address}
        onChange={(e) => {handelChange(e)}}
        required
      />
      
      <button className='p-2 rounded-3xl border focus:border hover:border' type="submit">Submit</button>
    </form>
  );
};

export default LocationInput;