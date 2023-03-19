const express = require('express');
const { check } = require('express-validator');

const placesControllers = require('../controllers/places-controller');
const fileUpload = require('../middleware/file-upload')
const checkAuth = require('../middleware/check-auth')

const router = express.Router();

//This has to be first. Examine the second link.
//if we had a route instead like /user, such would need to be before this or it would never be reached.
router.get('/:pid', placesControllers.getPlaceById);

router.get('/user/:uid', placesControllers.getPlacesByUserId);

//Token Middlware that checks for a token
router.use(checkAuth)

//We can register multiple middlewares after the filter. Which are executed in order.
router.post(
    '/',
    fileUpload.single('image'),
    [
        check('title').not().isEmpty().withMessage('Cannot be empty!'),
        check('description').isLength({ min: 5, max: 20 }).withMessage('A minimum of 5 characters but no more than 20 is allowed.'),
		check('address').not().isEmpty(),
	],
	placesControllers.createPlace
);

router.patch(
	'/:pid',
	[
		check('title').not().isEmpty(),
		check('description').isLength({ min: 5}),
	],
	placesControllers.updatePlace
);
router.delete('/:pid', placesControllers.deletePlace);

module.exports = router;
