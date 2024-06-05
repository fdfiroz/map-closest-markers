import haversine from 'haversine-distance';

const getClosestLocations = (userLocation, locations, radius = 300) => {
  const withinRange = locations.reduce((accumulator, location) => {
    const distance = haversine(userLocation, { lat: location.latitude, lng: location.longitude });
    if (distance <= radius) {
      accumulator.push({ ...location, distance });
    }
    return accumulator;
  }, []);

  withinRange.sort((a, b) => a.distance - b.distance);
  // console.log(withinRange);
  return withinRange.slice(0, 5);
};

export default getClosestLocations;
