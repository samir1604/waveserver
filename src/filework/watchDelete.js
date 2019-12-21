const path = require('path');
const fileTools = require('./fileTools');

const baseDir = path.resolve(__dirname, '..');
const jsonFile = path.join(baseDir, process.env.JSON_FILE);
const processedPath = path.join(baseDir, process.env.PROCESSED_FOLDER);

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
