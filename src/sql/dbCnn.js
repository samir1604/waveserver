const { promisify } = require('util');
const mySql = require('mysql');

module.exports = (host, user, pass, base) => {
	const pool = mySql.createPool({
		connectionLimit: 10,
		host,
		user,
		password: pass,
		database: base,
		timezone: 'Z',
	});

	pool.getConnection((err, cnn) => {
		if (err) {
			if (err.code === 'PROTOCOL_CONNECTION_LOST') {
				console.log('Database connection was closed.');
			}
			if (err.code === 'ER_CON_COUNT_ERROR') {
				console.error('Database has too many connections.');
			}
			if (err.code === 'ECONNREFUSED') {
				console.error('Database connection was refused.');
			}
		}
		if (cnn) cnn.release();

		return;
	});

	pool.query = promisify(pool.query).bind(pool);

	return pool;
};
