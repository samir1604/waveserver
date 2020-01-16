const { Router } = require('express');
const getTotalAudio = require('../controller/getTotalAudio');
const getPage = require('../controller/getPage');
const getAudio = require('../controller/getAudio');
// const fs = require('fs');
// const path = require('path');

// const services = require('../services/fileServer');

const router = Router();
// const processedFolder = process.env.PROCESSED_FOLDER;

const URL_TOTAL = process.env.URL_TOTAL;
const URL_PAGE = process.env.URL_PAGE;
const URL_AUDIO = process.env.URL_AUDIO;

router.get(URL_TOTAL, getTotalAudio);
router.get(URL_PAGE, getPage);
router.get(URL_AUDIO, getAudio);

/*
router.get(URL_AUDIO, async (req, res) => {
	const audioName = req.params.audio;
	const mimeType = {
		'.wav': 'audio/wav',
		'.mp3': 'audio/mp3',
	};

	const baseDir = path.resolve(__dirname, '..');
	const pathFolder = path.join(baseDir, processedFolder, audioName);
	const ext = path.parse(pathFolder).ext;
	fs.readFile(pathFolder, (error, data) => {
		res.setHeader('Content-type', mimeType[ext] || 'text/plain');
		res.end(data);
	});
});

*/

module.exports = router;
