const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const services = require('../services/fileServer');

const router = Router();
const MAX_RECORDS = process.env.MAX_END;
const processedFolder = process.env.PROCESSED_FOLDER;

const URL_TOTAL = process.env.URL_TOTAL;
const URL_PAGE = process.env.URL_PAGE;
const URL_AUDIO = process.env.URL_AUDIO;

router.get(URL_TOTAL, async (req, res) => {
	const total = await services.getTotal();
	res.json({ total });
});

router.get(URL_PAGE, async (req, res) => {
	const num_page = parseInt(req.params.num_page);
	const start = (num_page - 1) * MAX_RECORDS;
	const end = start + MAX_RECORDS;
	const jsonList = await services.get(start, end);
	res.json(jsonList);
});

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

module.exports = router;
