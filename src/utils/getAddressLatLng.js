function getAddressLatLng(address) {
    const url = new URL('https://nominatim.openstreetmap.org/search');
    url.searchParams.append('q', address);
    url.searchParams.append('format', 'json');
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          const { lat, lon } = data[0];
          return { latitude: lat, longitude: lng };
        } else {
          return null; // Handle empty results
        }
      })
      .catch(error => {
        console.error('Error fetching geolocation:', error);
        return null;
      });
  }

export default getAddressLatLng;