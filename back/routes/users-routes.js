const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');

const fileUpload = require('../middleware/file-upload')

const router = express.Router();

//GET USERS
router.get('/', usersControllers.getUsers);

//SIGNUP
router.post(
    '/signup',
    fileUpload.single('image'),
	[
		check('name').not().isEmpty().withMessage('Please enter your first name'),
		check('email')
			.normalizeEmail()
			.isEmail()
			.withMessage(
				`What you have entered doesn't meet the requirements of an email`
			),
		check('password')
			.isLength({ min: 8 })
			.withMessage(`Password must have at least 8 characters`),
	],
	usersControllers.signup
);
//LOGIN
router.post('/login', usersControllers.login);

module.exports = router;
