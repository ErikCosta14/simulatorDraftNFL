var express = require('express');
var router = express.Router();
const multer = require('multer');
var controllerFranquia = require('../Controller/controllerFranquia');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

/* GET */
router.get('/verdetalhes/:idFranq', controllerFranquia.verFranquia);
// router.get('/editar/:idJog', controllerFranquia.getEditarJog)
// router.get('/deletar/:idJog', controllerFranquia.deletar)

/* POST */
// router.post('/editar/:idJog', upload.single('logo'), controllerFranquia.postEditarJog)

module.exports = router;