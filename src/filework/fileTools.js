const fs = require('fs').promises;
const path = require('path');

const ADD_DAYS = parseInt(process.env.DAYS_TO_DELETE);

module.exports = {
	/// DEPRECATED ///
	async createJsonListAsync(list, audioFolder, processFolder) {
		let newList = [];
		for await (const file of list) {
			const element = await this.createElementAsync(file, audioFolder);
			newList = [...newList, element];
			this.moveToProcessFolder(audioFolder, processFolder, file);
		}
		return newList;
	},

	async createElementAsync(file, folder) {
		const { size, birthtime } = await fs.stat(path.join(folder, file));
		const deleteDate = new Date(birthtime);
		deleteDate.setDate(birthtime.getDate() + ADD_DAYS);
		return {
			name: file,
			size,
			created: birthtime,
			deleteOn: deleteDate,
		};
	},

	async moveToProcessFolder(src, dest, file) {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);
		await fs.copyFile(srcPath, destPath);
		fs.unlink(srcPath);
	},

	async readJsonFileAsync(jsonFilePath) {
		const result = await fs.readFile(jsonFilePath, 'utf-8');
		if (result) return JSON.parse(result);
		return [];
	},

	/// DEPRECATED ///
	async updateJsonFileAsync(jsonFile, list, data) {
		const newList = [...list, ...data];
		const strJson = JSON.stringify(newList);
		await fs.writeFile(jsonFile, strJson);
	},

	async updateJsonFile(jsonFilePath, jsonList) {
		const jsonData = await this.readJsonFileAsync(jsonFilePath);
		const newList = [...jsonList, ...jsonData];
		await fs.writeFile(jsonFilePath, JSON.stringify(newList));
	},
};
