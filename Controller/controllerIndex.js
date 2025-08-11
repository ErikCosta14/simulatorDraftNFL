const con = require('../Model/conexaoBD');
var infUser = require('../Model/infoConect');

var conectado = false;
var usuario;
var senha;
var user = false;

exports.index = async (req, res) => {
    if(!conectado){
        usuario = req.body.usuario;
        senha = req.body.senha;
    }
    
    if(senha != undefined && senha != null && senha != '') {
        conectado = await con.verificaUsuario(usuario, senha);
        var fr = await con.buscarUsuario(usuario);
        infUser.setUsuario(fr)
    }

    if (conectado) {
        console.log(usuario)
        if (usuario != "admin") {
            user = true
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

        var franquias = await con.buscarFranquias();

        const franquiasComImagem = franquias.map(franquia => {
            if(franquia.logo && franquia.logo.data) {
                const base64Image = franquia.logo.data.toString('base64');
                return {
                    ...franquia,
                    logo: `data:${franquia.logo.contentType};base64,${base64Image}`
                }
            }
            return franquia;
        });

        var jogs = [];
        var fran = [];

        for(var i = 0; i < 3; i++) {
            if (jogadoresComImagem[i] != undefined){
                jogs.push(jogadoresComImagem[i])                
            }

            if (franquiasComImagem[i] != undefined){
                fran.push(franquiasComImagem[i])               
            }
        }

        var usuarioLog = await infUser.getUsuario()
        var idFr = usuarioLog.id

        var existeFr = await con.carregarFranquiaId(idFr)
        var nmUser;
        
        if (existeFr.length > 0) {
            nmUser = existeFr[0].nmFranquia
        } else {
            nmUser = "Administrador"
        }

        await infUser.setNmUsuario(nmUser)

        var pagInfo = {
            title: 'Tela Inicial', 
            jogadores: jogs, 
            franquias: fran, 
            franquia: user, 
            idFranquia: idFr,
            nmUsuario: await infUser.getNmUsuario()
        }

        res.render('index', pagInfo);
    } else {
        res.render('login', { title: 'Tela de Login', franquia:false });
    }
}


exports.jogadores = async (req, res) => {
    var jogs = await con.buscarJogadores()

    const jogadoresComImagem = jogs.map(jogador => {
        if (jogador.imgJog && jogador.imgJog.data) {
            const base64Image = jogador.imgJog.data.toString('base64');
            return {
                ...jogador,
                imgJog: `data:${jogador.imgJog.contentType};base64,${base64Image}`
            };
        }
        return jogador;
    });

    var usuarioLog = await infUser.getUsuario()
    var idFr = usuarioLog.id

    pagInfo = {
        title: "Jogadores",
        idFranquia: idFr,
        franquia: user,
        jogadores: jogadoresComImagem,
        nmUsuario: await infUser.getNmUsuario()
    }

    res.render('jogadores', pagInfo)
}

exports.franquias = async (req, res) => {
    var franq = await con.buscarFranquias()

    const franquiasComImagem = franq.map(franquia => {
        if(franquia.logo && franquia.logo.data) {
            const base64Image = franquia.logo.data.toString('base64');
            return {
                ...franquia,
                logo: `data:${franquia.logo.contentType};base64,${base64Image}`
            }
        }
        return franquia;
    });
    
    var usuarioLog = await infUser.getUsuario()
    var idFr = usuarioLog.id

    pagInfo = {
        title: "Franquias",
        idFranquia: idFr,
        franquia: user,
        franquias: franquiasComImagem,
        nmUsuario: await infUser.getNmUsuario()
    }

    res.render('franquias', pagInfo)
}