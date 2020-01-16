const { getPageAsync } = require('../domain');

module.exports = async (req, res) => {
	const num_page = parseInt(req.query.pag);
	const itemPerPage = parseInt(req.query.items);
	const start = (num_page - 1) * itemPerPage;
	const end = start + itemPerPage;
	const response = await getPageAsync(start, end);
	res.json(response);
};
