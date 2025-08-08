const con = require('../Model/conexaoBD');

exports.index = async (req, res) => {
    var conectado = true;
    var usuario = req.body.usuario;
    var senha = req.body.senha;
    var user;
    
    // if(senha != undefined && senha != null && senha != '') {
    //     conectado = await con.verificaUsuario(usuario, senha);
    // }

    if (conectado) {
        if (usuario != "admin") {
            user = true;
        }
    
        var jogadores = await con.buscarJogadores();

        const jogadoresComImagem = jogadores.map(jogador => {
            if (jogador.imgJog && jogador.imgJog.data) {
                const base64Image = jogador.imgJog.data.toString('base64');
                return {
                    ...jogador,
                    imgJog: `data:${jogador.imgJog.contentType};base64,${base64Image}`
                };
            }
            return jogador;
        });

        res.render('index', { title: 'Tela Inicial', jogadores: jogadoresComImagem, franquia:false});
    } //else {
    //     res.render('login', { title: 'Tela de Login', franquia:false });
    // }
}