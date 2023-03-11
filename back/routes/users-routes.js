const express = require('express');
const { check } = require('express-validator');

const usersControllers = require('../controllers/users-controller');

const router = express.Router();

router.get('/', usersControllers.getUsers);

router.post(
	'/signup',
	[check('name').not().isEmpty().withMessage('Please enter your first name'), check('email').normalizeEmail().isEmail().withMessage(`What you have entered doesn't meet the requirements of an email`), check('password').isLength({min: 6}).withMessage(`Password must have at least 6 characters`)],
	usersControllers.signup
);

router.post('/login', usersControllers.login);

module.exports = router;
