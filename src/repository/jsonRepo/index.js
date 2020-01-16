module.exports = jsonFile => {
	return {
		wave: require('./wave')(jsonFile),
	};
};
