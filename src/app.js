const express = require('express');
const path = require('path');
const app = express();

// Settings
app.set('appName', 'Audio wav server');
app.set('port', 3000);

// Routes
app.use(require('./routes/index'));

// Static
app.use(express.static(path.join(__dirname,'public')));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send('404 Not Found!!!');
});

module.exports = app;