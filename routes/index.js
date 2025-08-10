var express = require('express');
var router = express.Router();
var controllerIndex = require('../Controller/controllerIndex');

/* GET */
router.get('/', controllerIndex.index);

/* POST */
router.post('/', controllerIndex.index);

module.exports = router;
