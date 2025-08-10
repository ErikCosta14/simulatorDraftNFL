var express = require('express');
var router = express.Router();
var controllerFranquia = require('../Controller/controllerFranquia');

/* GET */
router.get('/verdetalhes/:idFranq', controllerFranquia.verFranquia);

module.exports = router;