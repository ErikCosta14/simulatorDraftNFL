var express = require('express');
var router = express.Router();
const multer = require('multer');
var controllerJogador = require('../Controller/controllerJogador');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET */
router.get('/jogador', controllerJogador.cadastroGet);

/* POST */
router.post('/jogador', upload.single('imgJog'), controllerJogador.cadastroPost);

module.exports = router;
