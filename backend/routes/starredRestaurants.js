const express = require("express");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();
const ALL_RESTAURANTS = require("./restaurants").restaurants;

/**
 * A list of starred restaurants.
 * In a "real" application, this data would be maintained in a database.
 */
let STARRED_RESTAURANTS = [
  {
    id: "a7272cd9-26fb-44b5-8d53-9781f55175a1",
    restaurantId: "869c848c-7a58-4ed6-ab88-72ee2e8e677c",
    comment: "Best pho in NYC",
  },
  {
    id: "8df59b21-2152-4f9b-9200-95c19aa88226",
    restaurantId: "e8036613-4b72-46f6-ab5e-edd2fc7c4fe4",
    comment: "Their lunch special is the best!",
  },
];

/**
 * Feature 6: Getting the list of all starred restaurants.
 */
router.get("/", (req, res) => {
  /**
   * We need to join our starred data with the all restaurants data to get the names.
   * Normally this join would happen in the database.
   */
  const joinedStarredRestaurants = STARRED_RESTAURANTS.map(
    (starredRestaurant) => {
      const restaurant = ALL_RESTAURANTS.find(
        (restaurant) => restaurant.id === starredRestaurant.restaurantId
      );

      return {
        id: starredRestaurant.id,
        comment: starredRestaurant.comment,
        name: restaurant.name,
      };
    }
  );

  res.json(joinedStarredRestaurants);
});

/**
 * Feature 7: Getting a specific starred restaurant.
 */
router.get('/:id', (req, res, next)=>{
  const {id} = req.params;

  //Get the starred restaurant and check it exists
  const starred_restaurant = STARRED_RESTAURANTS.find(r => r.id == id);
  if(!starred_restaurant){
    res.status(404).send('unable to find starred restaurant');
  }

  //Get the restaurant from all restaurants with matching id and check it exists
  const restaurant = ALL_RESTAURANTS.find(r => starred_restaurant.restaurantId = r.id);
  if(!restaurant){
    res.status(404).send('unable to find restaurant');
  }

  //Create an object with the required details
  const toReturn = {
    name: restaurant.name,
    comment: starred_restaurant.comment,
    id: restaurant.id
  }

  //Send the object
  res.send(toReturn)
  
})
/**
 * Feature 8: Adding to your list of starred restaurants.
 */



/**
 * Feature 9: Deleting from your list of starred restaurants.
 */


/**
 * Feature 10: Updating your comment of a starred restaurant.
 */



module.exports = router;