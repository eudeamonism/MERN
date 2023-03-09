require('dotenv').config();
const express = require('express');

const placesRoutes = require('./routes/places-routes');

koopa = process.env.PORT;
const app = express();

const bodyParser = require('body-parser');

app.use(bodyParser.json());

//Route: we applied a new route to our placeRoutes
app.use('/api/places', placesRoutes);

//Error handling Middleware for our routes
app.use((error, req, res, next) => {
	if (res.headersSent) {
		return next(error);
	}

	res.status(error.code || 500);
	res.json({ message: error.message || 'An unknown error occurred!' });
});

app.listen(koopa);
