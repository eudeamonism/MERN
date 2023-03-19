const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const HttpError = require('../models/http-error');
const User = require('../models/user');

const getUsers = async (req, res, next) => {
	let users;
	try {
		//we apply filters to find method unless we risk showing sensitive information like password
		users = await User.find({}, '-password');
	} catch (err) {
		const error = new HttpError(`Fetching users failed: ${err.message}`, 500);
		return next(error);
	}
	res.json({ users: users.map((user) => user.toObject({ getters: true })) });
};

const signup = async (req, res, next) => {
	const errors = validationResult(req);

	if (!errors.isEmpty()) {
		return next(res.status(400).json({ errors: errors.array() }));
	}

	//Pull data, destructure, from req.body, not params which is url
	const { name, email, password } = req.body;

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

	//Hashing Password first from receiving it from text form req.body above
	try {
		hashedPassword = await bcrypt.hash(password, 12);
	} catch (err) {
        const error = new HttpError(`Password hash failed, please try again later. Error: ${err.message}`, 500);
        return next(error);
	}

	const createdUser = new User({
		name,
		email,
		password: hashedPassword,
		image: req.file.path,
		places: [],
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

	res.json({
		message: 'Logged in!',
		user: existingUser.toObject({ getters: true }),
	});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
