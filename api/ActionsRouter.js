const express = require('express');
const router = express.Router();

// Database
const DB = require('../data/helpers/actionModel.js');

//#region - CREATE 
  // `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.

//#endregion

//#region - READ
  // `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.

// Read All - Returns an array of all actions
router.get('/', async (req, res, next) => {
  try {
    const results = await DB.get();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    next({ code: 500, message: "The information could not be retrieved." });
  }
});

// Read by ID - Returns the action for the specified id.
router.get('/:id', validateById, (req, res, next) => {
  res.status(200).json(req.results);
});

//#endregion

//#region - UPDATE 
  // `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.
//#endregion

//#region - DELETE 
  // `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.
//#endregion

async function validateById(req, res, next) {
  const { id } = req.params
  try {
    const results = await DB.get(id);

    // If object for the specified id is not found:
    if (!results || Object.keys(results).length === 0) {
      next({ code: 400, message: `Invalid Results for ID: ${id}`});
    } else {
      req.results = results;
      next();
    }
  } catch (error) {
    // If there's an error in retrieving results from the database:
    console.log(error);
    next({ code: 500, message: "The information could not be retrieved." });
  }
};

module.exports = router;