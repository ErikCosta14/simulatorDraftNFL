var express = require('express');
var router = express.Router();
const multer = require('multer');
var controllerFranquia = require('../Controller/controllerFranquia');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET */
router.get('/verdetalhes/:idFranq', controllerFranquia.verFranquia);
router.get('/editar/:idFra', controllerFranquia.getEditarFra)
router.get('/deletar/:idFra', controllerFranquia.deletar)

/* POST */
router.post('/editar/:idFra', upload.single('logo'), controllerFranquia.postEditarFra)

module.exports = router;