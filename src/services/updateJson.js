const fs = require('fs').promises;
const path = require('path');
const fileTools = require('../filework/fileTools');
const config = require('../config.json');

const baseDir = path.resolve(__dirname, '..');
const audioPath = config.audioFolderName;
const jsonFile = path.join(baseDir, config.jsonFileName);
const processedPath = path.join(baseDir, config.processedFolderName);

async function update() {
	const audioList = await fs.readdir(audioPath);
	if (audioList.length <= 0) return;

	const jsonList = await fileTools.createJsonListAsync(
		audioList,
		audioPath,
		processedPath
	);

	const jsonData = await fileTools.readJsonFileAsync(jsonFile);
	fileTools.updateJsonFileAsync(jsonFile, jsonList, jsonData);
}

module.exports.update = update;
