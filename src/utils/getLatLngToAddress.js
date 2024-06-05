async function getLatLngToAddress(lat, lng) {
  const apiKey = process.env.NEXT_PUBLIC_GEOAPI; // Replace with your OpenCage API key
  const url = new URL('https://api.opencagedata.com/geocode/v1/json');
  url.searchParams.append('q', `${lat},${lng}`); // Combine lat and lng for query
  url.searchParams.append('key', apiKey);

  try {
    const response = await fetch(url);
    const data = await response.json();
      console.log(data);
    if (data.results && data.results.length > 0) {
      return data.results[0].formatted; // Address string
    } else {
      return null; // Handle empty results
    }
  } catch (error) {
    console.error('Error fetching address:', error);
    return null;
  }
}

export default getLatLngToAddress;
