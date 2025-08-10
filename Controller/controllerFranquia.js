const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

exports.verFranquia = async (req, res) => {
    var idFran = parseInt(req.params.idFranq)

    var fra = await con.carregarFranquiaId(idFran)

    var usuarioLog = await infUser.getUsuario()
    var franq = false;
    var adm = true;

    if(usuarioLog.usuario == "admin") {
        franq = false;
        adm = true; 
    }

    const franquiaComImagem = fra.map(franquia => {
        if(franquia.logo && franquia.logo.data) {
            const base64Image = franquia.logo.data.toString('base64');
            return {
                ...franquia,
                logo: `data:${franquia.logo.contentType};base64,${base64Image}`
            }
        }
        return franquia;
    });

    var pagInfo = {
        title: "Detalhes ",
        franquia: false,
        idFranquia: usuarioLog.id,
        franquiaMostrar: franquiaComImagem[0],
        admin: true
    }

    res.render('consultaFranquia', pagInfo)
}

exports.getEditarFra = async (req, res) => {
    var idFra = parseInt(req.params.idFra)

    var fra = await con.carregarFranquiaId(idFra)

    var usuarioLog = await infUser.getUsuario()

    const franquiasComImagem = fra.map(franquia => {
        if(franquia.logo && franquia.logo.data) {
            const base64Image = franquia.logo.data.toString('base64');
            return {
                ...franquia,
                logo: `data:${franquia.logo.contentType};base64,${base64Image}`
            }
        }
        return franquia;
    });

    var pageInfo = {
        title: "Detalhes ",
        franquia: false,
        idFranquia: usuarioLog.id,
        franquiaMostrar: franquiasComImagem[0],
    }

    res.render('editaFranquia', pageInfo)
}

exports.postEditarFra = async (req, res) => {
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