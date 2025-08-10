var express = require('express');
var router = express.Router();
var controllerIndex = require('../Controller/controllerIndex');
var controllerApi = require('../Controller/webService')

/* GET */
router.get('/', controllerIndex.index);

/* POST */
router.post('/', controllerIndex.index);

/* GET Web Service. */
router.get('/api/jogadores',controllerApi.apiJogadores );

router.get('/api/franquias',controllerApi.apiFranquias );

module.exports = router;
