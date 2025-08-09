var express = require('express');
var router = express.Router();
var controllerHistorico = require('../Controller/controllerHistorico');

/* GET */
router.get('/:idFranq', controllerHistorico.carregarHistorico);
router.get('/simulacao/:idSim')

/* POST */

module.exports = router;
