const con = require('../Model/conexaoBD');

exports.cadastroGet = (req, res) => {
    res.render('cadastroJogador', { title: 'Cadastro de Jogador', franquia:false});
}

exports.cadastroPost = (req, res) => {
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