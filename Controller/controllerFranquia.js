const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

exports.verFranquia = async (req, res) => {
    var idFran = parseInt(req.params.idFranq)

    var fra = await con.carregarFranquiaId(idFran)

    var usuarioLog = await infUser.getUsuario()
    var franq = true;
    var adm = false;

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
        franquia: franq,
        idFranquia: usuarioLog.id,
        franquiaMostrar: franquiaComImagem[0],
        admin: adm,
        nmUsuario: await infUser.getNmUsuario(),
        conectado: true
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
        nmUsuario: await infUser.getNmUsuario(),
        conectado: true
    }

    res.render('editaFranquia', pageInfo)
}

exports.postEditarFra = async (req, res) => {
    var id = parseInt(req.params.idFra)
    
    var fra = await con.carregarFranquiaId(id)

    var logo = {
        data: fra[0].logo.data,
        contentType: fra[0].logo.contentType
    }

    if (req.file) {
        logo = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        }
    }

    try {
        franquia = {
            id: id,
            nmFranquia: req.body.nmFranquia,
            estado: req.body.estado,
            cidade:req.body.cidade,
            conferencia: req.body.conferencia + " " + req.body.regiao,
            descFranquia: req.body.descFranquia,
            logo: logo
        }
    } catch (error) {
        console.error('Erro ao editar franquia:', error);
        res.status(500).send('Erro ao editar franquia');
        return;
    }

    await con.editarFranquia(franquia)

    var red = '/franquias/verdetalhes/' + id
    res.redirect(red)
}

exports.deletar = async (req, res) => {
    var id = parseInt(req.params.idFra)

    await con.deletarFranquia(id)

    res.redirect('/franquias')
}