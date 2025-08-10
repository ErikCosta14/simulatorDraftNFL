const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

exports.verJogador = async (req, res) => {
    var idJog = parseInt(req.params.idJog)

    var jog = await con.carregarJogador(idJog)

    var usuarioLog = await infUser.getUsuario()
    var franq = false;
    var adm = true;

    if(usuarioLog.usuario != "admin") {
        franq = true;
        adm = false; 
    }

    const jogadorComImagem = jog.map(jogador => {
        if (jogador.imgJog && jogador.imgJog.data) {
            const base64Image = jogador.imgJog.data.toString('base64');
            return {
                ...jogador,
                imgJog: `data:${jogador.imgJog.contentType};base64,${base64Image}`
            };
        }
        return jogador;
    });

    var pagInfo = {
        title: "Detalhes ",
        franquia: franq,
        idFranquia: usuarioLog.id,
        jogador: jogadorComImagem[0],
        admin: adm
    }

    res.render('consultaJogador', pagInfo)
}