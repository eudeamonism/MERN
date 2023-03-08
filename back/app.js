require('dotenv').config();
const express = require('express');

const placesRoutes = require('./routes/places-routes');


koopa = process.env.PORT;
const app = express();

// app.use(bodyParser.urlencoded({ extended: false }));

//Route: we applied a new route to our placeRoutes
app.use('/api/places', placesRoutes);


app.listen(koopa);
