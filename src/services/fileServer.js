const path = require('path');
const fileTools = require('../filework/fileTools');
const config = require('../config.json');

const baseDir = path.resolve(__dirname, '..');
const jsonFile = path.join(baseDir, config.jsonFileName);

module.exports = {
	async get(start, end) {
		const result = await fileTools.readJsonFileAsync(jsonFile);
		return result.slice(start, end);
	},
};
