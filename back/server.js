const express = require('express');
const app = express();
const dotenv = require('dotenv')
require('dotenv').config();

const PORT = process.env.PORT

app.get('/', (req, res) => {
	res.send('Hello dWorlda!');
});

app.listen(5000, () => {
	console.log(process.env.PORT_KEY);
});
