const fs = require('fs').promises;
const path = require('path');

module.exports = {
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
		return {
			name: file,
			size,
			created: birthtime,
		};
	},

	moveToProcessFolder(src, dest, file) {
		const srcPath = path.join(src, file);
		const destPath = path.join(dest, file);
		fs.rename(srcPath, destPath);
	},

	async readJsonFileAsync(jsonFilePath) {
		const result = await fs.readFile(jsonFilePath, 'utf-8');
		if (result) return JSON.parse(result);
		return [];
	},

	async updateJsonFileAsync(jsonFile, list, data) {
		const newList = [...list, ...data];
		const strJson = JSON.stringify(newList);
		await fs.writeFile(jsonFile, strJson);
	},
};
