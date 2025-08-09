var express = require('express');
var router = express.Router();
var controllerSimulador = require('../Controller/controllerSimulador');

/* GET */
router.get('/:idFranq', controllerSimulador.simuladorGet);
router.get('iniciar')

/* POST */

module.exports = router;
