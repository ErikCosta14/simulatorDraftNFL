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