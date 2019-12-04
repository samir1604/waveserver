const fs = require('fs').promises;
const path = require('path');

function createList(storeList, file, stat) {
	const item = createItem(file, stat);
	const newStore = [...storeList, item];
	return newStore;
}

function createItem(file, { size, birthtime }) {
	return {
		name: file,
		size,
		created: birthtime,
	};
}

function getFileName(file) {
	const temp = file.split('\\');
	return temp[temp.length - 1];
}

module.exports = {
	async createStoreItem(storeList, file) {
		return new Promise(resolve => {
			const fileName = getFileName(file);
			let temp = [];
			fs.stat(file, (error, stats) => {
				if (error) {
					throw error;
				}
				if (stats.isFile()) {
					temp = createList(storeList, fileName, stats);
				}
				resolve(temp);
			});
		});
	},

	async createJsonList(fileNameList, folder, proccess) {
		const pJson = fileNameList.map(async file => {
			const elements = await this.createElement(file, folder);
			await this.moveToProcessedAsync(folder, proccess, file);
			return elements;
		});
		return await Promise.all(pJson);
	},

	async createElement(file, folder) {
		const stat = await fs.stat(path.join(folder, file));
		return createItem(file, stat);
	},

	async readAudioFromFolderAsync(folder) {
		return await fs.readdir(folder);
		/*
		return new Promise(resolve => {
			let storeList = [];
			fs.readdir(folder, (error, files) => {
				if (error) {
					throw error;
				}
				files.forEach(file => {
					storeList = this.createStoreItem(storeList, path.join(folder, file));
				});
				resolve(storeList);
			});
		});
		*/
	},

	async updateJsonFileAsync(jsonFile, list, data) {
		const newList = [...list, ...data];
		const strJson = JSON.stringify(newList);
		await fs.writeFile(jsonFile, strJson);
		/*
		return new Promise(resolve => {
			const strJson = JSON.stringify(list);
			fs.writeFile(jsonFile, strJson, 'utf-8', err => {
				if (err) {
					throw err;
				}
				resolve(true);
			});
		});
		*/
	},

	async readJsonFileAsync(jsonFilePath) {
		const result = await fs.readFile(jsonFilePath, 'utf-8');
		if (result) return JSON.parse(result);
		return [];
		/*
		return new Promise(resolve => {
			fs.readFile(jsonFilePath, 'utf-8', (error, data) => {
				if (error) {
					throw error;
				}
				if (!data) {
					resolve([]);
				} else {
					resolve(JSON.parse(data));
				}
			});
		});
		*/
	},

	async moveToProcessedAsync(src, dest, file) {
		try {
			const srcPath = path.join(src, file);
			const destPath = path.join(dest, file);
			await fs.rename(srcPath, destPath);
		} catch (e) {
			console.log(e);
		}

		/*
		return new Promise(resolve => {

			fs.rename(srcPath, destPath, error => {
				if (error) {
					throw error;
				}
				resolve(true);
			});
		});
		*/
	},
};
