// Configurar variables de entorno
require('dotenv').config({
	path: `.env.${process.env.NODE_ENV || 'dev'}`,
});

const HOST = process.env.HOST;
const USER = process.env.USER;
const PASS = process.env.PASS;
const BASE = process.env.DATABASE;

const app = require('./app');
const watch = require('./filework/watchFolder');
const watchDelete = require('./filework/watchDelete');

const dbCnn = require('./sql/dbCnn');
//const mySql = require('mysql');
// const db = require('./infrastructure/index');
// const repo = require('./infrastructure/waverepo');

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

async function mysql() {
	const db = dbCnn(HOST, USER, PASS, BASE);
	const result = await db.query('SELECT * FROM wave');
	console.log(result);
}

main();
watcher();
//deleteAudio();
//mysql();
