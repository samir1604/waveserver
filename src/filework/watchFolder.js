const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');

const config = require('../config.json');
const updateJson = require('./updateJson');

const baseDir = path.resolve(__dirname, '..');
const audioPath = path.join(baseDir, config.audioFolderName);

let fsWait = null;
async function start() {
	try {
		const watcher = chokidar.watch(audioPath, { persistent: true });
		watcher.on('add', async file => {
			clearTimeout(fsWait);
			// if (fsWait) return;
			fsWait = setTimeout(async () => {
				await updateJson.update();
			}, 500);
		});
		/*
		fs.watch(audioPath, { persistent: true }, async (event, file) => {
			console.log(`Evento: ${event}`);
			console.log(`Fichero: ${file}`);
			if (file) {
				if (fsWait) return;
				fsWait = setTimeout(() => {
					fsWait = false;
				}, 500);
				console.log(`Disparando evento a: ${file}`);
				// await updateJson.updateFile(file);
			}

		});*/
	} catch (e) {
		console.log(e);
	}
}
module.exports.start = start;
