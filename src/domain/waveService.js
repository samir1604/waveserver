const path = require('path');
const repo = require('./repoFactory').build();
const tools = require('../infraservices/fileTools');
const ADD_DAYS = parseInt(process.env.DAYS_TO_DELETE);
const AUDIO_FOLDER = process.env.AUDIO_FOLDER;
const PROCESSED_FOLDER = process.env.PROCESSED_FOLDER;

module.exports = () => {
	const createItem = (file, stat) => {
		const { size, birthtime } = stat;
		const deleteDate = new Date(birthtime);
		const name = path.basename(file);
		deleteDate.setDate(birthtime.getDate() + ADD_DAYS);
		return {
			name,
			size,
			created: birthtime,
			deleteOn: deleteDate,
		};
	};

	const addWave = async ({ file, stat }) => {
		try {
			const item = createItem(file, stat);
			const sourcePath = AUDIO_FOLDER;
			const destPath = PROCESSED_FOLDER;
			const fileName = path.basename(file);

			await Promise.all([
				tools.moveToProcessFolder(sourcePath, destPath, fileName),
				repo.wave.addAudioAsync(item),
			]);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteWave = async () => {
		const currentDate = new Date('2020-01-18');
		const items = await repo.wave.getByDate(currentDate);

		for (let item of items) {
			const pathFile = path.join(PROCESSED_FOLDER, item.name);
			await tools.deleteFile(pathFile);
		}
		await repo.wave.deleteByDate(currentDate);
	};

	return {
		addWave,
		deleteWave,
	};
};
