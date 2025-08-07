const con = require('../Model/conexaoBD');

exports.index = async (req, res) => {
    var conectado = false;
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    
    if(senha != undefined && senha != null && senha != '') {
        conectado = await con.buscarUsuario(usuario, senha);
    }

    if (conectado) {
        res.render('index', { title: 'Tela Inicial' });
    } else {
        res.render('login', { title: 'Tela de Login' });
    }
}