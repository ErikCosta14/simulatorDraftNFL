const con = require('../Model/conexaoBD');
var infUser = require('../Model/infoConect');

var conectado = false;
var usuario;
var senha;
var user;

exports.index = async (req, res) => {
    usuario = req.body.usuario;
    senha = req.body.senha;
    
    if(senha != undefined && senha != null && senha != '') {
        conectado = await con.verificaUsuario(usuario, senha);
        var fr = await con.buscarUsuario(usuario);
        infUser.usuario = usuario
        infUser.id = fr.id
    }

    if (conectado) {
        if (infUser.usuario != "admin") {
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

        res.render('index', { title: 'Tela Inicial', jogadores: jogs, franquias: fran, franquia:user, idFranquia: infUser.id});
    } else {
        res.render('login', { title: 'Tela de Login', franquia:false });
    }
}