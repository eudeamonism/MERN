const mongoose = require('mongoose');

//WE access mongoose method Schema.
const Schema = mongoose.Schema;

//We create our own mongoose Schema
const placeSchema = new Schema({
	title: {
		type: String,
		min: 1,
		required: true,
	},
	description: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				return value.length >= 3;
			},
			message: 'Description should be at least 3 characters long.',
		},
	},
	image: { type: String, required: true, max: 1000 },
	location: {
		lat: { type: Number, required: true },
		lng: { type: Number, required: true },
	},
	//Creator will get a unique ID from Mongoose; Also, we place the model reference too.
	creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' },
});

//Place is a MODEL
//Export is different and return constructor function
module.exports = mongoose.model('Place', placeSchema);
