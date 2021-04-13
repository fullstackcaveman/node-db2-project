const Car = require('./cars-model');
const db = require('../../data/db-config');

const checkCarId = async (req, res, next) => {
	try {
		const car = await Car.getById(req.params.id);
		if (car) {
			req.car = car;
			next();
		} else {
			res.status(404).json({ message: 'Car not found' });
		}
	} catch (err) {
		next(err);
	}
};

const checkCarPayload = (req, _res, next) => {
	const error = { status: 400 };
	const { vin, make, model, mileage } = req.body;

	if (vin === undefined) {
		error.message = 'vin is missing';
	} else if (make === undefined) {
		error.message = 'make is missing';
	} else if (model === undefined) {
		error.message = 'model is missing';
	} else if (mileage === undefined) {
		error.message = 'mileage is missing';
	}

	if (error.message) {
		next(error);
	} else {
		next();
	}
};

const checkVinNumberValid = (req, res, next) => {
	// DO YOUR MAGIC
};

const checkVinNumberUnique = async (req, res, next) => {
	try {
		const existingVin = await db('cars')
			.where('vin', req.body.vin.trim())
			.first();

		if (existingVin) {
			next({ status: 400, message: `vin ${req.body.vin} already exists` });
		}
	} catch (err) {
		next(err);
	}
};

module.exports = {
	checkCarId,
	checkCarPayload,
	checkVinNumberUnique,
	checkVinNumberValid,
};
