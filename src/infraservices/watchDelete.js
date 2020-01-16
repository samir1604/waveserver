const schedule = require('node-schedule');
const waveService = require('../domain/waveService')();

module.exports.deleteFiles = () => {
	const j = schedule.scheduleJob(
		'* 0 0 * * *',
		async () => await waveService.deleteWave()
	);
};
