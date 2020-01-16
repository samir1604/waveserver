const express = require('express');
const path = require('path');
const app = express();

const appPort = parseInt(process.env.PORT);
// Settings
app.set('appName', 'Audio wav server');
app.set('port', appPort);

//Enable CORS
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*'); // update to match the domain you will make the request from
	res.header(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	next();
});

// Routes
app.use(require('./routes'));

// Static
app.use(express.static(path.join(__dirname, 'public')));

// 404 handler
app.use((req, res, next) => {
	res.status(404).send('404 Not Found!!!');
});

module.exports = app;
