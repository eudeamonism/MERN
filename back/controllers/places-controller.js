const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');

const getCoordinatesFromAddress = require('../util/location');

let DUMMY_PLACES = [
	{
		id: 'p1',
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

const getPlaceById = (req, res, next) => {
	const placeId = req.params.pid; // { pid: 'p1' }

	const place = DUMMY_PLACES.find((p) => {
		return p.id === placeId;
	});

	if (!place) {
		throw new HttpError('Could not find a place for provided id.', 404);
	}

	res.json({ place }); // => { place } => { place: place }
};

const getPlacesByUserId = (req, res, next) => {
	const userId = req.params.uid;

	//filter finds more than one which matches criteria where as find only returns the first one
	const places = DUMMY_PLACES.filter((p) => {
		return p.creator === userId;
	});

	if (!places || places.length === 0) {
		const error = new HttpError(
			'Could not find any places for provided user id.',
			404
		);
		return next(error);
	}

	res.json({ places });
};

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

	// const title = req.body.title;
	const createdPlace = {
		id: uuidv4(),
		title,
		description,
		location: coordinates,
		address,
		creator,
	};

	DUMMY_PLACES.push(createdPlace); //unshift(createdPlace)

	res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		console.log(errors);
		throw new HttpError(
			`Since invalid inputs were passed, please check your data.`,
			422
		);
	}

	//Destructure to only get title and description
	const { title, description } = req.body;

	//Access the parameters in the url
	const placeId = req.params.pid;

	//make sure req.body's id is that of DB id
	const updatedPlace = { ...DUMMY_PLACES.find((p) => p.id === placeId) };
	//retrieve the location of data in an array
	const placeIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

	if (title) {
		//set db tile to equal that of the title inputed in body
		updatedPlace.title = title;
	}
	if (description) {
		updatedPlace.description = description;
	}

	//located data in array by index now replace that with updatedPlace which has an updated title and description.
	DUMMY_PLACES[placeIndex] = updatedPlace;

	//reveal updated data in the key of place
	res.status(200).json({ place: updatedPlace });
};

const deletePlace = (req, res, next) => {
	//retrieve id in url
	const placeId = req.params.pid;

	//Validation
	if (!DUMMY_PLACES.find((p) => p.id === placeId)) {
		throw new HttpError(`Couldn't find a place for that id.`, 404);
	}

	//create new DB where everything other than req.id is there
	DUMMY_PLACES = DUMMY_PLACES.filter((p) => p.id !== placeId);

	res.status(200).json({ message: 'Deleted place.' });
};

exports.getPlaceById = getPlaceById;
exports.getPlacesByUserId = getPlacesByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
