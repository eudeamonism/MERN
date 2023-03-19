require('dotenv').config();
const { v4: uuidv4 } = require('uuid');
const { validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const HttpError = require('../models/http-error');
const User = require('../models/user');

JWT_KEY = process.env.JWT_SECRET;

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
		const error = new HttpError(
			`Password hash failed, please try again later. Error: ${err.message}`,
			500
		);
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
		const error = new HttpError(`Signing up failed; please try again `, 500);
		return next(error);
	}

	//Generate token because user is ok
	//createdUser generates an id because of Mongoose
	let token;
	try {
		token = jwt.sign(
			{ userId: createdUser.id, email: createdUser.email },
			JWT_KEY,
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError(`Signing up failed; please try again.`, 500);
		return next(error);
	}

	//this is status because we created new data
	res
		.status(201)
		.json({ userId: createdUser.id, email: createdUser.email, token: token });
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
	if (!existingUser) {
		const error = new HttpError(
			"Invalid credentials, therefore you couldn't be logged in",
			401
		);
		return next(error);
	}

	//We found a user and need to check the password with bcrypt
	//compare returns a boolean and a promise

	let isValidPassword = false;
	try {
		isValidPassword = await bcrypt.compare(password, existingUser.password);
	} catch (err) {
		const error = new HttpError(
			`Could not log you in, please check your credentials and try again.`,
			500
		);
		return next(error);
	}

	if (!isValidPassword) {
		const error = new HttpError(
			"Invalid credentials, therefore you couldn't be logged in",
			401
		);
		return next(error);
	}
	//We are actually generating a token here too, the same one used in signup.
	let token;
	try {
		token = jwt.sign(
			{ userId: existingUser.id, email: existingUser.email },
			JWT_KEY,
			{ expiresIn: '1h' }
		);
	} catch (err) {
		const error = new HttpError(`Logging in failed; please try again.`, 500);
		return next(error);
	}

	res.json({
		userId: existingUser.id,
		email: existingUser.email,
		token: token,
	});
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
