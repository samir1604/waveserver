const fs = require('fs').promises;
const path = require('path');
const fileTools = require('../filework/fileTools');

const baseDir = path.resolve(__dirname, '..');
const audioPath = process.env.AUDIO_FOLDER;
const jsonFile = path.join(baseDir, process.env.JSON_FILE);
const processedPath = path.join(baseDir, process.env.PROCESSED_FOLDER);
const JSON_BUFFER = parseInt(process.env.JSON_BUFFER);

async function updateJson(jsonList, name) {
	const element = await fileTools.createElementAsync(name, audioPath);
	const newList = [...jsonList, element];
	if (newList.length >= JSON_BUFFER) {
		await fileTools.updateJsonFile(jsonFile, newList);
		return [];
	}

	return newList;
}

async function update() {
	const dir = await fs.opendir(audioPath);
	let jsonList = [];
	for await (const file of dir) {
		const { name } = file;
		jsonList = await updateJson(jsonList, name);
		await fileTools.moveToProcessFolder(audioPath, processedPath, name);
	}

	if (jsonList.length > 0) {
		await fileTools.updateJsonFile(jsonFile, jsonList);
		jsonList = [];
	}

	/*
	const audioList = await fs.readdir(audioPath);
	if (audioList.length <= 0) return;

	
	
	const jsonList = await fileTools.createJsonListAsync(
		audioList,
		audioPath,
		processedPath
	);

	const jsonData = await fileTools.readJsonFileAsync(jsonFile);
	fileTools.updateJsonFileAsync(jsonFile, jsonList, jsonData);
	*/
}

module.exports.update = update;
