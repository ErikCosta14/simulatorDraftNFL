var express = require('express');
var router = express.Router();
var controllerIndex = require('../Controller/controllerIndex');

/* GET */
router.get('/', controllerIndex.index);
router.get('/jogadores', controllerIndex.jogadores);
router.get('/franquias', controllerIndex.franquias);

/* POST */
router.post('/', controllerIndex.index);

module.exports = router;
