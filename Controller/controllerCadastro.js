const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

exports.cadastroJogGet = async (req, res) => {
   res.render('cadastroJogador', { title: 'Cadastro de Jogador', franquia:false, nmUsuario: await infUser.getNmUsuario(), conectado: true});
}

exports.cadastroJogPost = (req, res) => {
    try {
        jogador = {
            id: Math.floor(Math.random() * 10000),
            nmJogador: req.body.nmJogador,
            posicao: req.body.posicao,
            faculdade:req.body.faculdade,
            descJog: req.body.descJog,
            idade: parseInt(req.body.idade),
            altura: parseFloat(req.body.altura),
            peso: parseFloat(req.body.peso),
            imgJog: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }
    } catch (error) {
        console.error('Erro ao cadastrar jogador:', error);
        res.status(500).send('Erro ao cadastrar jogador');
        return;
    }

    con.registroJogador(jogador)

    res.redirect('/')
}

exports.cadastroFraGet = async (req, res) => {
    res.render('cadastroFranquia', { title: 'Cadastro de Jogador', franquia:false, nmUsuario: await infUser.getNmUsuario(), conectado: true});
}

exports.cadastroFraPost = (req, res) => {
    try {
        franquia = {
            id: Math.floor(Math.random() * 10000),
            nmFranquia: req.body.nmFranquia,
            estado: req.body.estado,
            cidade:req.body.cidade,
            conferencia: req.body.conferencia + " " + req.body.regiao,
            descFranquia: req.body.descFranquia,
            logo: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        }

        usuario = {
            id: franquia.id,
            usuario: req.body.usuario,
            senha: req.body.senha
        }
    } catch (error) {
        console.error('Erro ao cadastrar jogador:', error);
        res.status(500).send('Erro ao cadastrar jogador');
        return;
    }

    con.registroFranquia(franquia)
    con.registroUsuario(usuario)

    res.redirect('/')
}