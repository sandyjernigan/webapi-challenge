const express = require('express');
const router = express.Router();

// Database
const DB = require('../data/helpers/projectModel.js');

//#region - CREATE 
  // `insert()`: calling insert passing it a resource object will add it to the database and return the newly created resource.

// Creates resource using the information sent inside the request body.
router.post('/', validateInput, async (req, res, next) => {
  try {
    const insertResults = await DB.insert(req.body);

    // check that the resource was added
    if (insertResults) {
      res.status(201).json(insertResults); // return HTTP status code 201 (Created)
    } else {
      next({ code: 404, message: "There was an error while saving the information." });
    }

  } catch (error) {
    console.log(error);
    next({ code: 500, message: "There was an error while adding to the database." });
  }
});
//#endregion

//#region - READ
  // `get()`: calling get returns an array of all the resources contained in the database. If you pass an `id` to this method it will return the resource with that id if one is found.

// Read All - Returns an array of all projects
router.get('/', async (req, res, next) => {
  try {
    const results = await DB.get();
    res.status(200).json(results);
  } catch (error) {
    console.log(error);
    next({ code: 500, message: "The information could not be retrieved." });
  }
});

// Read by ID - Returns the project object with the specified id.
router.get('/:id', validateById, (req, res, next) => {
  res.status(200).json(req.results);
});

// Read by Project ID and return a list of all the actions for the project
  // `getProjectActions()` that takes a _project id_ as it's only argument and returns a list of all the _actions_ for the _project_
router.get('/:id/actions', validateById, async (req, res, next) => {
  try {
    if(req.results) { 
      const results = await DB.getProjectActions(req.params.id);
      if (!results) { // Error 404
        next({ code: 404, message: "No actions found." }); 
      } else { // (else) return actions
        res.status(200).json(results);
      }
    }
  } catch (error) {  // console and Error 500
    console.log(error);
    next({ code: 500, message: "The information could not be retrieved." });
  }
});

//#endregion

//#region - UPDATE 
  // `update()`: accepts two arguments, the first is the `id` of the resource to update, and the second is an object with the `changes` to apply. It returns the updated resource. If a resource with the provided `id` is not found, the method returns `null`.

// 	Updates the specified id using data from the request body. Returns the modified document, NOT the original.
router.put('/:id', validateById, async (req, res, next) => {
  try {
    const updateResults = await DB.update(req.params.id, req.body);
    if (updateResults) {
      res.status(200).json(updateResults); // return HTTP status code 200 (OK) and the newly updated resource.
    } else {
      next({ code: 404, message: "The project could not be found." });
    }
  } catch (error) {
    // If there's an error when updating the post:
    console.log(error);
    next({ code: 500, message: "The project information could not be modified." });
  }
});
//#endregion

//#region - DELETE 
  // `remove()`: the remove method accepts an `id` as it's first parameter and, upon successfully deleting the resource from the database, returns the number of records deleted.

// Deletes Project by ID
router.delete('/:id', validateById, async (req, res, next) => {
  try {
    const results = await DB.get(req.params.id);
    const deleteResults = await DB.remove(req.params.id);
    if (deleteResults === 1) {
      res.status(200).json({ results, message: 'Delete post was successful.' });
    } else if (deleteResults > 1) {
      next({ code: 404, message: `More than one project was removed. ${deleteResults} were removed.` });
    } else {
      next({ code: 404, message: "The project with the specified ID could not be removed. Check the ID." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    next({ code: 500, message: "The project could not be removed." });
  }
});
//#endregion


//#region - Custom Middleware

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

function validateInput(req, res, next) {
  const { body } = req

  // Projects have a name (string), description (string), and completed (boolean - not required)

  if (body && Object.keys(body).length > 0) {
    if (body.name && body.description) {
      req.body = body;
      next();
    } else if (!body.name) {
      next({ code: 400, message: "Request is missing required name field." });
    } else if (!body.description) {
      next({ code: 400, message: "Request is missing required description field." });
    } else {
      next({ code: 400, message: "Request is missing data." });
    }
  } else {
      next({ code: 400, message: "Request is missing data." });
  }
};

//#endregion

module.exports = router;