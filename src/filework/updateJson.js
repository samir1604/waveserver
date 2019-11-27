const fileTools = require('./fileTools');

async function update() {
    try {
        const audioList = await fileTools.readAudioFolderAsync();
        const jsonFile = await fileTools.readJsonFileAsync();

        const newList = [...jsonFile, ...audioList];
        console.log(newList);
        const result = await fileTools.writeAudioNameToJsonFileAsync(newList);

        if (result) {
            // await fileTools.moveProcessedAudioAsync(audioList);
        }
    } catch (err) {
        console.log(err);
    }
}

function run() {
    update();
}

module.exports.run = run;

