const router = require('express').Router();
const chatController = require('./chatController');

router.get('/', chatController);

module.exports = router;
