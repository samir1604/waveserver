const path = require('path');
const fileTools = require('./fileTools');
const config = require('../config.json');

const baseDir = path.resolve(__dirname, '..');
const audioPath = path.join(baseDir, config.audioFolderName);
const jsonFile = path.join(baseDir, config.jsonFileName);
const processedPath = path.join(baseDir, config.processedFolderName);

async function updateFile(file) {
	try {
		const json = await fileTools.readJsonFileAsync(jsonFile);
		console.log(json);
		/*
		const newList = await fileTools.createStoreItem(
			json,
			path.join(audioPath, file)
		);

		const result = await fileTools.writeAudioNameToJsonFileAsync(
			jsonFile,
			newList
		);

		if (result) {
			await fileTools.moveToProcessedAsync(audioPath, processedPath, file);
		}
		*/
	} catch (err) {
		console.log(err);
	}
}

async function update() {
	try {
		const audioList = await fileTools.readAudioFromFolderAsync(audioPath);		
		if (audioList.length <= 0) return;
		const jsonList = await fileTools.createJsonList(
			audioList,
			audioPath,
			processedPath
		);
		
		const jsonData = await fileTools.readJsonFileAsync(jsonFile);
		await fileTools.updateJsonFileAsync(jsonFile, jsonList, jsonData);

		/*
		const pMove = audioList.map(async file => {
			return await fileTools.moveToProcessedAsync(
				audioPath,
				processedPath,
				file
			);
		});

		await Promise.all(pMove);

		/*
		const audioList = await fileTools.readAudioFolderToListAsync(audioPath);

		if (audioList.length <= 0) return;

		const json = await fileTools.readJsonFileAsync(jsonFile);
		const newList = [...json, ...audioList];
		const result = await fileTools.writeAudioNameToJsonFileAsync(
			jsonFile,
			newList
		);

		if (result) {
			audioList.forEach(async item => {
				const { name } = item;
				await fileTools.moveToProcessedAsync(audioPath, processedPath, name);
			});
		}
		*/
	} catch (err) {
		console.log(err);
	}
}

module.exports.update = update;
module.exports.updateFile = updateFile;
