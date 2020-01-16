module.exports = db => {
	return {
		wave: require('./wave')(db),
		group: require('./group')(db),
	};
};
