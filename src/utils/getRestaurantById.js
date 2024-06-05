// utils/getRestaurantById.js
const getRestaurantById = (id, restaurantDetails) => {
    return restaurantDetails.find(restaurant => restaurant.id === id);
  };
  
  export default getRestaurantById;
  