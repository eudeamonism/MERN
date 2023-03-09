const express = require('express');

const placesControllers = require('../controllers/places-controller');

const router = express.Router();

//This has to be first. Examine the second link.
//if we had a route instead like /user, such would need to be before this or it would never be reached.
router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlaceByUserId);

router.post('/', placesControllers.createPlace)

router.patch('/:pid', placesControllers.updatePlace)
router.delete('/:pid', placesControllers.deletePlace)

module.exports = router;
