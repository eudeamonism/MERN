const fs = require('fs');
const path = require('path');

require('dotenv').config();
const express = require('express');

const placesRoutes = require('./routes/places-routes');

const usersRoutes = require('./routes/users-routes');
const HttpError = require('./models/http-error');

koopa = process.env.PORT;
konnection = process.env.CONNECTION;
const app = express();

const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.json());
//This grants access to these folders
app.use('/uploads/images', express.static(path.join('uploads', 'images')));

//Allow CORS
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept, Authorization'
	);
	// res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

//Route: we applied a new route to our placeRoutes
app.use('/api/places', placesRoutes);
app.use('/api/users', usersRoutes);

//In case the specified route does not exist, error handler
app.use((req, res, next) => {
	const error = new HttpError('Could not find this route.', 404);
	throw error;
});

//If things were sent twice.
app.use((error, req, res, next) => {
	if (req.file) {
		fs.unlink(req.file.path, (err) => {
			console.log(err);
		});
	}

	if (res.headersSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

//Setting up MongoDB connection
mongoose
	.connect(`${konnection}`, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => app.listen(koopa))
	.catch((error) => console.log('Error connecting to MongoDB: ' + error));
