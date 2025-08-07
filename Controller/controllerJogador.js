const con = require('../Model/conexaoBD');

exports.cadastro = (req, res) => {
    jogador = req.body;

    if (jogador.nmJogador != undefined && jogador.nmJogador != null && jogador.nmJogador != '') {
        try {
            jogador.idade = parseInt(jogador.idade);
            jogador.altura = parseFloat(jogador.altura);
            jogador.peso = parseFloat(jogador.peso);
            jogador.imgJog = {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        } catch (error) {
            console.error('Erro ao cadastrar jogador:', error);
            res.status(500).send('Erro ao cadastrar jogador');
            return;
        }

        jogador.id = Math.floor(Math.random() * 1000000);

        con.registroJogador(jogador)
    }

    res.render('cadastroJogador', { title: 'Cadastro de Jogador' });
}