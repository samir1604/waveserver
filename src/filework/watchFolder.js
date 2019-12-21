const chokidar = require('chokidar');
const updateJson = require('../services/updateJson');
const audioPath = process.env.AUDIO_FOLDER;

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
