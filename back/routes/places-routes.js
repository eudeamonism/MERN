const express = require('express');

const router = express.Router();

//filter which route then executes a function
router.get('/', (req, res, next) => {
	console.log('GET Request in Places');
	//JSON on response
	res.json({ message: 'It works!' });
});

//exporting convention
module.exports = router;