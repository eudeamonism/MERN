require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const placesRoutes = require('./routes/places-routes');

koopa = process.env.PORT;
const app = express();

//Initiate Middleware
app.use(placesRoutes);

app.listen(koopa);
