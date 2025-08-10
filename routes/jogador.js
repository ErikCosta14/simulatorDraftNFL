var express = require('express');
var router = express.Router();
var controllerJogador = require('../Controller/controllerJogador');

/* GET */
router.get('/verdetalhes/:idJog', controllerJogador.verJogador);

module.exports = router;
