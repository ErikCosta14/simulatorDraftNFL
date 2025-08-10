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

exports.getEditarJog = async (req, res) => {
    var idJog = parseInt(req.params.idJog)

    var jog = await con.carregarJogador(idJog)

    var usuarioLog = await infUser.getUsuario()

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

    var pageInfo = {
        title: "Detalhes ",
        franquia: false,
        idFranquia: usuarioLog.id,
        jogador: jogadorComImagem[0],
    }

    res.render('editaJogador', pageInfo)
}

exports.postEditarJog = async (req, res) => {
    var id = parseInt(req.params.idJog)
    
    var jog = await con.carregarJogador(id)

    var imgJog = {
        data: jog[0].imgJog.data,
        contentType: jog[0].imgJog.contentType
    }

    if (req.file) {
        imgJog = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }

    try {
        jogador = {
            id: id,
            nmJogador: req.body.nmJogador,
            posicao: req.body.posicao,
            faculdade:req.body.faculdade,
            descJog: req.body.descJog,
            idade: parseInt(req.body.idade),
            altura: parseFloat(req.body.altura),
            peso: parseFloat(req.body.peso),
            imgJog: imgJog     
        }
    } catch (error) {
        console.error('Erro ao cadastrar jogador:', error);
        res.status(500).send('Erro ao cadastrar jogador');
        return;
    }

    await con.editarJogador(jogador)

    var red = '/jogadores/verdetalhes/' + id
    res.redirect(red)
}

exports.deletar = async (req, res) => {
    var id = parseInt(req.params.idJog)

    await con.deletarJogador(id)

    res.redirect('/jogadores')
}