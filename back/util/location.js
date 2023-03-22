require('dotenv').config();

const axios = require('axios');

geoKey = process.env.API_KEY;

const HttpError = require('../models/http-error');

async function getCoordinatesFromAddress(address) {
	const response = await axios.get(
		`https://us1.locationiq.com/v1/search?key=${geoKey}&q=${encodeURIComponent(
			address
		)}&format=json`
	);
	const data = response.data[0];
	

	if (!data || data.status === 'ZERO_RESULTS') {
		const error = new HttpError(
			'Could not found location for specified address.',
			422
		);
		throw error;
	}

	const coorLat = data.lat;
	const coorLong = data.lon;
	const coordinates = {
		lat: coorLat,
		lng: coorLong,
	};

	return coordinates;
}

module.exports = getCoordinatesFromAddress;
