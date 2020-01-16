/* SYSTEM */
const path = require('path');
const baseDir = path.resolve(__dirname, '..');

/* ENVIRONMENT */
const jsonFile = path.join(baseDir, process.env.JSON_FILE);
const persistence = process.env.persistence;
const HOST = process.env.HOST;
const USER = process.env.USER;
const PASS = process.env.PASS;
const BASE = process.env.DATABASE;

/* REQUIRES MODULES */
const dbConnect = require('../sql/dbCnn');

module.exports = {
	build: () => {
		switch (persistence) {
			case 'json':
				return require('../repository/jsonRepo')(jsonFile);
				break;
			case 'mysql':
				return require('../repository/mySqlRepo')(
					dbConnect(HOST, USER, PASS, BASE)
				);
				break;
			default:
				throw error('No repository defined');
				break;
		}
	},
};
