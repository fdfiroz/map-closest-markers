function getLatLngToAddress(lat, lng) {
    const url = new URL('https://nominatim.openstreetmap.org/reverse');
    url.searchParams.append('lat', lat);
    url.searchParams.append('lon', lng);
    url.searchParams.append('format', 'json');
  
    return fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data)   
        if (data && data.display_name) {
          return data.display_name; // Address string
        } else {
          return null; // Handle empty results
        }
      })
      .catch(error => {
        console.error('Error fetching address:', error);
        return null;
      });
  }

export default getLatLngToAddress;
  