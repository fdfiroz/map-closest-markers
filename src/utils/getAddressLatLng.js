async function getAddressLatLng(address) {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPI; // Replace with your OpenCage API key
  const url = new URL('https://api.opencagedata.com/geocode/v1/json');
  url.searchParams.append('q', address);
  url.searchParams.append('key', apiKey);

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const { lat, lng } = data.results[0].geometry;
      return { latitude: lat, longitude: lng };
    } else {
      return {}; // Handle empty results
    }
  } catch (error) {
    console.error('Error fetching geolocation:', error);
    return null;
  }

  
}
export default getAddressLatLng;
