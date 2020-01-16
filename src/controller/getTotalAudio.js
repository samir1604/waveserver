const { getAudioCountAsync } = require('../domain');

module.exports = async (req, res) => {
	const result = await getAudioCountAsync();
	res.json(result);
};
