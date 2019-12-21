require('dotenv').config({
	path: `.env.${process.env.NODE_ENV || 'dev'}`,
});

const app = require('./app');
const watch = require('./filework/watchFolder');
const watchDelete = require('./filework/watchDelete');

async function main() {
	await app.listen(app.get('port'));
	console.log(process.env.PORT);
	console.log(`App ${app.get('appName')}`);
	console.log(`Server on port, ${app.get('port')}`);
}

async function watcher() {
	await watch.start();
}

async function deleteAudio() {
	await watchDelete.deleteFiles();
}

main();
watcher();
//deleteAudio();
