const path = require('path');
const fileTools = require('../filework/fileTools');

const baseDir = path.resolve(__dirname, '..');
const jsonFile = path.join(baseDir, process.env.JSON_FILE);

module.exports = {
	async get(start, end) {
		const result = await fileTools.readJsonFileAsync(jsonFile);
		return result.slice(start, end);
	},
	async getTotal() {
		const result = await fileTools.readJsonFileAsync(jsonFile);
		return result.length;
	},
};
