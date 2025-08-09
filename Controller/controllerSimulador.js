const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

var jogSelect = []
var jogNoSelect = []
var franquias = []
var pickAtual;
var numEsc;

var rodada;
var nomeSim;
var inicio = false;

exports.simuladorGet = async (req, res) => {
    var idFranq = parseInt(req.params.idFranq)
    
    var pagInfo = {
        title: 'Simulador', 
        idFranquia: idFranq,
        inicio: inicio, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect, 
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.iniciar = async (req, res) => {
    var jogs = con.buscarJogadores()
    var franq = con.buscarFranquias()

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

    for(var i = 0; i < jogadoresComImagem.length; i++){
        jogNoSelect.push(jogadoresComImagem[i])
    }

    for(var i = 0; i < franq.length; i++){
        franquias.push(franq[i])
    }

    for(var i = franquias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [franquias[i], franquias[j] = franquias[j], franquias[i]]
    }

    numEsc = 0;
    pickAtual = 1;
    rodada = 1;

    nomeSim = req.body.nmSimulacao

    inicio = true;

    var fr = controllerIndex.idFranquia

    while (franquias[numEsc].id != infUser.id) {
        jogAleatorio = Math.floor(Math.random() * jogNoSelect.length);
        
        jogSelect[pickAtual - 1] = jogNoSelect[jogAleatorio];
        jogNoSelect.splice(jogAleatorio, 1);

        numEsc++;
        verificaEsc(numEsc);
        rodada++;
        pickAtual++;
    }

    var pagInfo = {
        title: 'Simulador', 
        idFranquia: infUser.id,
        inicio: inicio, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect, 
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.cancelar = async (req, res) => {
    jogNoSelect = [];
    franquias = [];
    pickAtual = 0;
    rodada = 0;
    nomeSim = "";
    inicio = false;

    var pagInfo = {
        title: 'Simulador', 
        idFranquia: infUser.id,
        inicio: inicio, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect, 
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.selecionar = async (req, res) => {
    var idJogador = parseInt(req.params.idJog)

    for(var i = 0; i < jogNoSelect.length; i++) {
        if (jogNoSelect[i].id == idJogador) {
            jogSelect[pickAtual - 1] = jogNoSelect[i];
            jogNoSelect.splice(i, 1);

            numEsc++;
            verificaEsc(numEsc);
            rodada++;
            pickAtual++;
        }
    }

    while (franquias[numEsc].id != infUser.id) {
        jogAleatorio = Math.floor(Math.random() * jogNoSelect.length);
        
        jogSelect[pickAtual - 1] = jogNoSelect[jogAleatorio];
        jogNoSelect.splice(jogAleatorio, 1);

        numEsc++;
        verificaEsc(numEsc);
        rodada++;
        pickAtual++;
    }

    var pagInfo = {
        title: 'Simulador', 
        idFranquia: infUser.id,
        inicio: inicio, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect, 
        franquia: true
    }

    res.render('simulador', pagInfo)
}

async function verificaEsc(n) {
    if (n >= franquias.length) {
        numEsc = 0;
    }
}