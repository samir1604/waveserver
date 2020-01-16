const path = require('path');
const processFolder = process.env.PROCESSED_FOLDER;

const { wave } = require('./repoFactory').build();
const response = require('./messageResponse');
const tools = require('../infraservices/fileTools');

const errorResponse = err => response(null, false, err.message);

module.exports = {
	getAudioCountAsync: async () => {
		try {
			const count = await wave.getTotalAsync();
			return response({ total: count }, true, null);
		} catch (err) {
			return errorResponse(err);
		}
	},
	getPageAsync: async (start, end) => {
		try {
			const audios = await wave.getAsync(start, end);
			return response({ audios }, true, null);
		} catch (err) {
			return errorResponse(err);
		}
	},
	getAudioAsync: async fileName => {
		const pathFolder = path.join(processFolder, fileName);
		return await tools.readAudioFileAsync(pathFolder);
	},
};
