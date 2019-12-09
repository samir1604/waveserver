const { Router } = require('express');
const fs = require('fs');
const path = require('path');

const services = require('../services/fileServer');
const config = require('../config.json');

const router = Router();
const MAX_RECORDS = config.MaxEnd;

router.get('/:num_page', async (req, res) => {
	const num_page = parseInt(req.params.num_page);
	const start = (num_page - 1) * MAX_RECORDS;
	const end = start + MAX_RECORDS;
	const jsonList = await services.get(start, end);
	res.json(jsonList);
});

router.get('/audio/:url', async (req, res) => {
	const audioName = req.params.url;
	const mimeType = {
		'.wav': 'audio/wav',
		'.mp3': 'audio/mpeg',
	};

	const baseDir = path.resolve(__dirname, '..');
	const pathFolder = path.join(baseDir, config.processedFolderName, audioName);
	const ext = path.parse(pathFolder).ext;
	fs.readFile(pathFolder, (error, data) => {
		res.setHeader('Content-type', mimeType[ext] || 'text/plain');
		res.end(data);
	});
});

module.exports = router;
