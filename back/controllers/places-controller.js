const HttpError = require('../models/http-error');
const { v4: uuidv4 } = require('uuid');

const DUMMY_PLACES = [
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

const getPlaceByUserId = (req, res, next) => {
	const userId = req.params.uid;

	const place = DUMMY_PLACES.find((p) => {
		return p.creator === userId;
	});

	if (!place) {
		const error = new HttpError(
			'Could not find a place for provided user id.',
			404
		);
		return next(error);
	}

	res.json({ place });
};

const createPlace = (req, res, next) => {
	//Object Destructuring to pull out keys from the request body
	const { title, description, coordinates, address, creator } = req.body;

	//create a variable to hold pulled data from request body
	const createdPlace = {
		id: uuidv4(),
		title,
		description,
		location: coordinates,
		address,
		creator,
	};

	//place pulled data from request body into a database
	DUMMY_PLACES.push(createdPlace);

	//send response
	res.status(201).json({ place: createdPlace });
};

const updatePlace = (req, res, next) => {
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

const deletePlace = (req, res, next) => {};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
exports.deletePlace = deletePlace;
exports.updatePlace = updatePlace;
