const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const config = require('../config.json');
const updateJson = require('../services/updateJson');

const baseDir = path.resolve(__dirname, '..');
const audioPath = path.join(baseDir, config.audioFolderName);

async function start() {
	try {
		let fsWait = 0;
		const watcher = chokidar.watch(audioPath, { persistent: true });
		watcher.on('add', async file => {
			clearTimeout(fsWait);
			fsWait = setTimeout(async () => {
				await updateJson.update();
			}, 500);
		});
	} catch (e) {
		console.log(e);
	}
}
module.exports.start = start;
