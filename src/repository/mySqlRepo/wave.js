const map = require('./map');

const GET_AUDIOS = 'SELECT * FROM waveview.wave LIMIT ?,?';
const COUNT_ALL = 'SELECT count(*) as count FROM waveview.wave;';
const INSERT_AUDIO =
	'INSERT IGNORE INTO waveview.wave (id, size, created, deleteOn) VALUES (?,?,?,?)';

const DELETE_BY_DATE =
	'DELETE FROM waveview.wave WHERE DATE(deleteOn) <= DATE(?);';

const SELECT_BY_DATE =
	'SELECT id FROM waveview.wave WHERE date(deleteOn) <= date(?);';

module.exports = ({ query }) => {
	const getAsync = async (start, end) => {
		const queryResult = await query(GET_AUDIOS, [start, end]);
		const result = map(queryResult);

		const response = result.map(item => ({
			name: item.id,
			size: item.size,
			created: item.created,
			deleteOn: item.deleteOn,
		}));

		return response;
	};

	const getTotalAsync = async () => {
		const queryResult = await query(COUNT_ALL);
		const result = map(queryResult);
		return result[0].count;
	};

	const addAudioAsync = async ({ name, size, created, deleteOn }) => {
		const data = [name, size, created, deleteOn];
		await query(INSERT_AUDIO, data);
	};

	const deleteByDate = async date => {
		await query(DELETE_BY_DATE, [date]);
	};

	const getByDate = async date => {
		const queryResult = await query(SELECT_BY_DATE, [date]);
		const result = map(queryResult);
		const response = result.map(item => ({ name: item.id }));
		return response;
	};

	return {
		getAsync,
		getTotalAsync,
		addAudioAsync,
		deleteByDate,
		getByDate,
	};
};
