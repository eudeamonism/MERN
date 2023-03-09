const HttpError = require('../models/http-error');

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
		title,
		description,
		location: coordinates,
		address,
		creator,
	};

    //place pulled data from request body into a database
    DUMMY_PLACES.push(createdPlace);

    //send response
    res.status(201).json({place: createdPlace})
};

exports.getPlaceById = getPlaceById;
exports.getPlaceByUserId = getPlaceByUserId;
exports.createPlace = createPlace;
