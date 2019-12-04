const app = require('./app');
const watch = require('./filework/watchFolder');

async function main() {
	await app.listen(app.get('port'));
	console.log(`App ${app.get('appName')}`);
	console.log(`Server on port, ${app.get('port')}`);
}

async function watcher() {
	await watch.start();
}

main();
watcher();
