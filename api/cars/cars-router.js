const express = require('express');
const db = require('../../data/db-config');
const { checkCarId } = require('./cars-middleware');
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

router.get('/:id', checkCarId, async (req, res) => {
	res.json(req.car);
});

router.post('/', async (req, res, next) => {
	try {
		const newCar = await Cars.create(req.body);
		res.status(201).json(newCar);
	} catch (err) {
		next(err);
	}
});

module.exports = router;
