// STRETCH
exports.seed = function (knex) {
	return knex('cars')
		.truncate()
		.then(function () {
			return knex('cars').insert([
				{
					vin: '12121212121212121',
					make: 'toyota',
					model: 'prius',
					mileage: 250000,
					title: 'salvage',
					transmission: 'CVT',
				},
				{
					vin: '23232323232323232',
					make: 'ford',
					model: 'mustang',
					mileage: 120000,
					title: 'clean',
					transmission: 'manual',
				},
				{
					vin: '34343434343434343',
					make: 'honda',
					model: 'accord',
					mileage: 220000,
					title: 'clean',
					transmission: 'automatic',
				},
			]);
		});
};
