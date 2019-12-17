const path = require('path');
const fileTools = require('./fileTools');
const config = require('../config.json');

const baseDir = path.resolve(__dirname, '..');
const jsonFile = path.join(baseDir, config.jsonFileName);
const processedPath = path.join(baseDir, config.processedFolderName);

async function deleteFiles() {
	const currentDate = new Date();
	const jsonList = await fileTools.readJsonFileAsync(jsonFile);

	/*
	for await (item of jsonList) {
		const itemDate = new Date(item.deleteOn);
		if (currentDate >= itemDate) {
			jsonList.splice(item, 1);
		}
    }
    */
	const deleteItems = jsonList.splice(
		jsonList.findIndex(item => {
			const itemDate = new Date(item.deleteOn);
			return !(currentDate <= itemDate);
		}),
		1
	);

	console.log(jsonList);
}

module.exports.deleteFiles = deleteFiles;
