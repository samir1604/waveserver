const fs = require('fs');
const path = require('path');
const config = require('../config.json');

const audioPath = config.audioFolderName;
const jsonFile = config.jsonFile;
const processedFolder = config.processedFolder;

exports.readAudioFolderAsync = function() {
    return new Promise(resolve => {
        let fileList = [];
        fs.readdir(audioPath, (error, files) => {
            if (error) { throw error; }
            files.forEach(file => {
                fileList = [...fileList, {name: file} ];
            });
            resolve(fileList);
        });
    });
}

exports.writeAudioNameToJsonFileAsync = function(list) {
    return new Promise(resolve => {
        const strJson = JSON.stringify(list);
        fs.writeFile(jsonFile, strJson, 'utf-8', err => {
            if (err) { throw err; }
            resolve(true);
        });
    });
}

exports.readJsonFileAsync = function() {
    return new Promise(resolve => {
        fs.readFile(jsonFile, 'utf-8', (error, data) => {
            if (error) { throw error; }

            console.log('Data: ' + data);
            if (!data) { resolve([]); } else {
                resolve(JSON.parse(data));
            }
        });
    });
}

module.exports.moveProcessedAudioAsync = function(list) {
    return new Promise(resolve => {
        list.forEach(file => {
            fs.rename(file, path.join(processedFolder, file), error => {
                if(error) { throw error; }
                resolve(true);
            });
        });
    });
}
