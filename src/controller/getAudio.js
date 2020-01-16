const path = require('path');
const { getAudioAsync } = require('../domain');

const mimeType = {
	'.wav': 'audio/wav',
	'.mp3': 'audio/mp3',
};

module.exports = async (req, res) => {
	const audioName = req.params.audio;
	const ext = path.parse(audioName).ext;
	const result = await getAudioAsync(audioName);
	res.setHeader('Content-type', mimeType[ext] || 'text/plain');
	res.end(result);

	/*
	const baseDir = path.resolve(__dirname, '..');
	const pathFolder = path.join(baseDir, processedFolder, audioName);
	const ext = path.parse(pathFolder).ext;
	fs.readFile(pathFolder, (error, data) => {
		res.setHeader('Content-type', mimeType[ext] || 'text/plain');
		res.end(data);
	});
	*/
};
