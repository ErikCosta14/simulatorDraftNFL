var express = require('express');
var router = express.Router();
const multer = require('multer');
var controllerJogador = require('../Controller/controllerJogador');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET */
router.get('/verdetalhes/:idJog', controllerJogador.verJogador);
router.get('/editar/:idJog', controllerJogador.getEditarJog)
router.get('/deletar/:idJog', controllerJogador.deletar)

/* POST */
router.post('/editar/:idJog', upload.single('imgJog'), controllerJogador.postEditarJog)

module.exports = router;
