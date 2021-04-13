// STRETCH
exports.seed = function (knex) {
	return knex('cars')
		.truncate()
		.then(function () {
			return knex('cars').insert([
				{
					vin: 18436572,
					make: 'Chevrolet',
					model: 'Corvette',
					mileage: 2000,
				},
			]);
		});
};
