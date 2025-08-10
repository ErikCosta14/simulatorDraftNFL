var express = require('express');
var router = express.Router();
var controllerSimulador = require('../Controller/controllerSimulador');

/* GET */
router.get('/:idFranq', controllerSimulador.simuladorGet);
router.get('/selecionar/:idJog', controllerSimulador.selecionar);
router.get('/finalizar/:idFranq', controllerSimulador.finalizar);
router.get('/cancelar/:idFranq', controllerSimulador.cancelar);

/* POST */
router.post('/iniciar', controllerSimulador.iniciar);

module.exports = router;
