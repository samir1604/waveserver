const fileTools = require('../../infraservices/fileTools');

module.exports = jsonFile => {
	const getAsync = async (start, end) => {
		const result = await fileTools.readJsonFileAsync(jsonFile);
		return result.slice(start, end);
	};

	const getTotalAsync = async () => {
		const result = await fileTools.readJsonFileAsync(jsonFile);
		return result.length;
	};

	const getAudioAsync = async audioPath => {
		return await fileTools.readAudioFileAsync(audioPath);
	};

	const addAudioAsync = async item => {
		await fileTools.updateJsonAsync(jsonFile, item);
	};

	return {
		getAsync,
		getTotalAsync,
		getAudioAsync,
		addAudioAsync,
	};
};
