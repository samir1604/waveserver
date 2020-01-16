module.exports = queryResult => {
	return Object.values(JSON.parse(JSON.stringify(queryResult)));
};
