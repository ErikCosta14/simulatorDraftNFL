const con = require('../Model/conexaoBD');
const bcrypt = require('bcrypt');

exports.index = async (req, res) => {
    var conectado = false;

    if (conectado) {
        res.render('index', { title: 'Tela Inicial' });
    } else {
        res.render('login')
    }
}