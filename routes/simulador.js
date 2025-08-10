var express = require('express');
var router = express.Router();
var controllerSimulador = require('../Controller/controllerSimulador');

/* GET */
router.get('/:idFranq', controllerSimulador.simuladorGet);
router.get('iniciar', controllerSimulador.iniciar);
router.get('/cancelar', controllerSimulador.cancelar);
router.get('/selecionar/:idJog', controllerSimulador.selecionar);
router.get('/finalizar')

/* POST */

module.exports = router;
