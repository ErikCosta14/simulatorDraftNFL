var express = require('express');
var router = express.Router();
var controllerIndex = require('../Controller/controllerIndex');

/* GET home page. */
router.get('/', controllerIndex.index);

router.post('/', controllerIndex.index);

module.exports = router;
