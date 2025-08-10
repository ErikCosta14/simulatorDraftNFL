var express = require('express');
var router = express.Router();
var controllerApi = require('../Controller/webService')

/* GET Web Service. */
router.get('/jogadores',controllerApi.apiJogadores );
router.get('/jogador/:idJog',controllerApi.apiJogador );
router.get('/franquias',controllerApi.apiFranquias );
router.get('/franquia/:idFran',controllerApi.apiFranquia );

module.exports = router;