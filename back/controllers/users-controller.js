const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');
const { validationResult } = require('express-validator');
const User = require('../models/user');

const DUMMY_USERS = [
	{
		id: 'u1',
		name: 'Dumbster Dave',
		email: 'dummy@gmail.com',
		password: 'password',
	},
];

const getUsers = (req, res, next) => {
	//return array of users
	res.json({ users: DUMMY_USERS });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(res.status(400).json({ errors: errors.array() }));

		// throw new HttpError(
		// 	`Since invalid inputs were passed, please check your data --> ${errors.errors[0].msg}`,
		// 	422
		// );
	}

	//Pull data, destructure, from req.body, not params which is url
	const { name, email, password, places } = req.body;

	//Mongoose Package has own error, mongoose method findOne returns promise and is async
	//Because block scopiny must ensure let over const
	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			`Signing up failed, please try again later. Error: ${err.message}`,
			500
		);
		return next(error);
	}

	if (existingUser) {
		const error = new HttpError(
			`User exists already. Please login instead.`,
			422
		);
		return next(error);
	}
	//This is where we fill our document, mongoose, via a new Class constructor
	const createdUser = new User({
		name,
		email,
		password,
		image:
			'https://static.wikia.nocookie.net/nickelodeon/images/9/9a/Ren-stimpy-25-anniversar-hp1y-1.png/revision/latest?cb=20170521210219',
		places,
	});

	try {
		await createdUser.save();
	} catch (err) {
		const error = new HttpError(
			`Signing up failed; please try again. ${err.message}`,
			500
		);
		return next(error);
	}

	//this is status because we created new data
	res.status(201).json({ user: createdUser.toObject({ getters: true }) });
};

const login = async (req, res, next) => {
	//post request; therefore, need data from body via destructuring
	const { email, password } = req.body;

	let existingUser;
	try {
		existingUser = await User.findOne({ email: email });
	} catch (err) {
		const error = new HttpError(
			`Logging in failed, please try again later. Error: ${err.message}`,
			500
		);
		return next(error);
	}

	//if the database password does not match password entered from req.body
	if (!existingUser || existingUser.password !== password) {
		const error = new HttpError(
			"Invalid credentials, therefore you couldn't be logged in",
			401
		);
		return next(error);
	}

	res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
