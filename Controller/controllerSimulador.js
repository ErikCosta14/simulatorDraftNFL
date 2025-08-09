const con = require('../Model/conexaoBD');

var jogSelect = {}
var jogNoSelect = {}
var franquias = {}
var pickAtual;
var rodada;

exports.simuladorGet = async (req, res) => {
    var idFranq = parseInt(req.params.idFranq)

    res.render('simulador', {title:'Simulador', idFranquia: idFranq, inicio: false})
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

    
}