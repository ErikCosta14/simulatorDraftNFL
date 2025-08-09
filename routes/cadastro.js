var express = require('express');
var router = express.Router();
const multer = require('multer');
var controllerCadastro = require('../Controller/controllerCadastro');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET */
router.get('/jogador', controllerCadastro.cadastroJogGet);
router.get('/franquia', controllerCadastro.cadastroFraGet);

/* POST */
router.post('/jogador', upload.single('imgJog'), controllerCadastro.cadastroJogPost);
router.post('/franquia', upload.single('logo'), controllerCadastro.cadastroFraPost);

module.exports = router;
