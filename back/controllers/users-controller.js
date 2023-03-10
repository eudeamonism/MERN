const { v4: uuidv4 } = require('uuid');
const HttpError = require('../models/http-error');

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

const signup = (req, res, next) => {
	//Pull data, destructure, from req.body, not params which is url
	const { name, email, password } = req.body;
	const hasUser = DUMMY_USERS.find((u) => u.email === email);

	if (hasUser) {
		throw new HttpError(
			'Could not create user since email has already been registered',
			422
		);
	}

	const createdUser = {
		//place data in variable to pass into somewhere like json or db
		id: uuidv4(),
		name,
		email,
		password,
	};

	//Add new data into existing db
	DUMMY_USERS.push(createdUser);

	//this is status because we created new data
	res.status(201).json({ user: createdUser });
};

const login = (req, res, next) => {
	//post request; therefore, need data from body via destructuring
	const { email, password } = req.body;

	//find method: find an email from DB that matches req.body.email
	const identifiedUser = DUMMY_USERS.find((u) => u.email === email);

	//Is there a user with such an email in our database?
	if (!identifiedUser || identifiedUser.password !== password) {
		throw new HttpError(
			"Couldn't identify user from within our database. Does this user exist? Perhaps incorrect information?",
			401
		);
	}

	res.json({ message: 'Logged in!' });
};

exports.getUsers = getUsers;
exports.signup = signup;
exports.login = login;
