//Goal is to have users create many places where such data is most likely in their database?
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
	name: {
		type: String,
		required: true,
		validate: {
			validator: function (value) {
				return value.length >= 2;
			},
			message: 'A name must be at least 2 characters long',
		},
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	password: {
		type: String,
		required: true,
		minLength: 8,
		maxLength: 64,
		validate: {
			validator: function (v) {
				return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
					v
				);
			},
			message:
				'The password must be at least 8 characters long with at least one of the following: lowercase, uppercase, number, and special character (@$!%*?&)',
		},
	},
	image: { type: String, required: true },
	//I think this spot is the critical spot where we connect our user document with their respective places document data.
	places: { type: String, required: true },
});

//Something else you have to here with unique for email
userSchema.index({ email: 1 }, { unique: true });

module.exports = mongoose.model('User', userSchema);
