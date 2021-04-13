const express = require('express');
const db = require('../../data/db-config');
const Cars = require('./cars-model');

const router = express.Router();

router.get('/', async (req, res, next) => {
	try {
		const data = await Cars.getAll();
		res.json(data);
	} catch (err) {
		next(err);
	}

	db('cars')
		.then((cars) => {
			res.json(cars);
		})
		.catch(() => {
			res.status(500).json({ message: 'Failed to retrieve cars' });
		});
});

module.exports = router;
