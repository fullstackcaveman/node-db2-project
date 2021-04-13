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

router.get('/:id', (req, res) => {
	const id = req.params.id;

	db('cars')
		.where({ id })
		.first()
		.then((car) => {
			res.json(car);
		})
		.catch(() => {
			res.status(500).json({ message: 'Failed to retrieve car' });
		});
});

module.exports = router;
