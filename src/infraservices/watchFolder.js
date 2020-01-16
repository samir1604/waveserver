const chokidar = require('chokidar');
const waveService = require('../domain/waveService')();
const audioPath = process.env.AUDIO_FOLDER;

let items = [];
const handleItems = file => {
	items = [...items, file];
};

const watchArray = () => {
	setInterval(async () => {
		if (items.length > 0) {
			const item = items.shift();
			try {
				await waveService.addWave(item);
			} catch (err) {
				console.log(err);
			}
		}
	}, 500);
};

function start() {
	watchArray();
	const watcher = chokidar.watch(audioPath, {
		persistent: true,
		awaitWriteFinish: {
			stabilityThreshold: 2000,
			pollInterval: 100,
		},
	});
	watcher.on('add', async (file, stat) => {
		handleItems({
			file,
			stat,
		});
	});

	/*
		let fsWait = 0;
		const watcher = chokidar.watch(audioPath, { persistent: true });
		watcher.on('add', async file => {
			clearTimeout(fsWait);
			fsWait = setTimeout(async () => {
				await updateJson.update();
			}, 500);
		});
	*/
}
module.exports.start = start;
