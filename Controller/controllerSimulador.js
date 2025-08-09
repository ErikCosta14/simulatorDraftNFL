const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

var jogSelect = []
var jogNoSelect = []
var franquias = []
var pickAtual;
var rodada;
var nomeSim;
var inicio = false;

exports.simuladorGet = async (req, res) => {
    var idFranq = parseInt(req.params.idFranq)

    res.render('simulador', {title:'Simulador', idFranquia: idFranq, inicio: inicio})
}

exports.iniciar = async (req, res) => {
    var jogs = con.buscarJogadores()
    var franq = con.buscarFranquias()

    for(var i = 0; i < jogs.length; i++){
        jogNoSelect.push(jogs[i])
    }

    for(var i = 0; i < franq.length; i++){
        franquias.push(franq[i])
    }

    for(var i = franquias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [franquias[i], franquias[j] = franquias[j], franquias[i]]
    }

    pickAtual = 1;
    rodada = 1;

    nomeSim = req.body.nmSimulacao

    inicio = true;

    var fr = controllerIndex.idFranquia

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
}