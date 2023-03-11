const mongoose = require('mongoose');

//WE access mongoose method Schema.
const Schema = mongoose.Schema;

//We create our own mongoose Schema
const placeSchema = new Schema({
	title: {
		type: String,
		min: [1, 'You need at least a letter if not more'],
		required: true,
	},
	description: {
		type: String,
		required: true,
		min: [3, 'A description should describe more than 3 characters'],
	},
	image: { type: String, required: true, max: 1000 },
	location: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	creator: { type: String, required: true },
});

//Export is different and return constructor function
module.exports = mongoose.model('Place', placeSchema);
