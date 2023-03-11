const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const getCoordinatesFromAddress = require('../util/location');
//We're importing our Place schema, which was capitalized because it is a constructor function
const Place = require('../models/place');

let DUMMY_PLACES = [
	{
		title: 'Empire State Building',
		description: 'One of the most famous sky scrapers in the world!',
		location: {
			lat: 40.7484474,
			lng: -73.9871516,
		},
		address: '20 W 34th St, New York, NY 10001',
		creator: 'u1',
	},
];

const getPlaceById = async (req, res, next) => {
	const placeId = req.params.pid; // { pid: 'p1' }

	let place;
	try {
		//Mongoose Method for finding something bt their id where such id is provided above
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong since we could not find a place',
			500
		);
		return next(error);
	}

	if (!place) {
		const error = new HttpError('Could not find a place for provided id.', 404);
		return next(error);
	}

	res.json({ place: place.toObject({ getters: true }) }); // => { place } => { place: place }
};

//find() returns a Mongoose Query object that will not excecute the query unless you chain an .exec() method at the end of the query
const getPlacesByUserId = async (req, res, next) => {
	const userId = req.params.uid;

	let places;
	try {
		places = await Place.find({ creator: userId }).exec();
	} catch (err) {
		const error = new HttpError(`Couldn't find a user with that id`, 500);
		return next(error);
	}

	if (!places || places.length === 0) {
		const error = new HttpError(
			'Could not find any places for provided user id.',
			404
		);
		return next(error);
	}
	//find() returns many documents therefore we have to map them in addition to converting Mongoose object to a JS object with getters set to true
	res.json({
		places: places.map((place) => place.toObject({ getters: true })),
	});
};
//We're going to use our Mongoose Schema Place Here
const createPlace = async (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return next(
			new HttpError('Invalid inputs passed, please check your data.', 422)
		);
	}

	const { title, description, address, creator } = req.body;

	let coordinates;
	try {
		coordinates = await getCoordinatesFromAddress(address);
	} catch (error) {
		return next(error);
	}

	//We are injecting Mongoose Place schema here
	const createdPlace = new Place({
		title,
		description,
		address,
		location: coordinates,
		image:
			'https://cdn.britannica.com/03/152203-050-28CCC600/Close-up-Leaning-Tower-of-Pisa-Italy.jpg',
		creator,
	});

	//Load into Database where .save is Mongoose method (asynchronous task)
	try {
		await createdPlace.save();
	} catch (err) {
		const error = new HttpError(
			'Creating a place failed; please try again.',
			500
		);
		return next(error);
	}

	res.status(201).json({ place: createdPlace });
};

const updatePlace = async (req, res, next) => {
	const errors = validationResult(req);
	// if (!errors.isEmpty()) {
	// 	const error = new HttpError(
	// 		`Since invalid inputs were passed, please check your data.`,
	// 		422
	//     );
	//     return next(error);
	// }

	//Destructure to only get title and description
	const { title, description } = req.body;

	//Access the parameters in the url
	const placeId = req.params.pid;

	//Mongoose retrieves ID here
	let place;
	try {
		place = await Place.findById(placeId);
	} catch (err) {
		const error = new HttpError(
			'Something went wrong since we could not update place',
			500
		);
		return next(error);
	}

	if (!place) {
		const error = new HttpError(
			`Could not find a place for the provided id`,
			404
		);
		return next(error);
	}

	//We set Mongoose variable to destructured variables from req.body here
	place.title = title;
	place.description = description;

	try {
		await place.save();
	} catch (err) {
		if (err.name === 'ValidationError') {
			const error = new HttpError(
				`Validation failed: ${err.errors.description.message}`,
				422
			);
			return next(error);
		}
		const error = new HttpError(`Couldn't update data to database`, 500);
		return next(error);
	}

	res.status(200).json({ place: place.toObject({ getters: true }) });
};

const deletePlace = async (req, res, next) => {
	//retrieve id in url
	const placeId = req.params.pid;
	try {
		await Place.findByIdAndDelete(placeId);
		res.status(200).json({ message: 'Deleted place.' });
	} catch (err) {
		const error = new HttpError('Could not delete place', 500);
		return next(error);
	}
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
