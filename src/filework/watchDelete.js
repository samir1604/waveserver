const path = require('path');
const fileTools = require('./fileTools');

const baseDir = path.resolve(__dirname, '..');
const jsonFile = path.join(baseDir, process.env.JSON_FILE);
const processedPath = path.join(baseDir, process.env.PROCESSED_FOLDER);

const deleteFiles = async () => {
	const currentDate = new Date();
	const jsonList = await fileTools.readJsonFileAsync(jsonFile);

	const deleteItems = jsonList.filter(
		item => currentDate.getDate() >= new Date(item.deleteOn).getDate()
	);
	console.log('Json: ');
	console.log(jsonList);

	console.log('Borrar: ');
	console.log(deleteItems);
};

module.exports.deleteFiles = deleteFiles;

/*
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
    

	let deleteItems = [];
	for (item of jsonList) {
		let temp = jsonList.splice(
			jsonList.findIndex(
				item => new Date(item.deleteOn).getDate() >= currentDate.getDate()
			),
			1
		);
		if (temp.length > 0) deleteFiles = [...deleteFiles, ...temp];
	}
	
	const deleteItems = jsonList.filter(
		item => currentDate.getDate() >= new Date(item.deleteOn).getDate()
	);
	console.log('Json: ');
	console.log(jsonList);

	console.log('Borrar: ');
	console.log(deleteItems);
}

// module.exports.deleteFiles = deleteFiles;

*/
