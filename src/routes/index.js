const { Router } = require('express');
const updateJson = require('../filework/updateJson');
const router = Router();

router.get('/', (req, res) => {
    updateJson.run();
    res.send('ok');
});

module.exports = router;