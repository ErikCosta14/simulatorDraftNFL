const con = require('../Model/conexaoBD');

exports.carregarHistorico = async (req, res) => {
    var idFranquia = parseInt(req.params.idFranq)

    var simulacoes = con.buscarHistoricos(idFranquia);

    res.render('historico', {title: 'Simulações', idFranquia: idFranquia, simulacoes: simulacoes})
}

exports.carregarSimulacao = async (req, res) => {
    var idSimulacao = parseInt(req.params.idSim);

    var simulacao = con.carregarSimulacao(idSimulacao);
    var picks = con.carregarPick(idSimulacao);

    var escolhas = [];

    for(var i = 0; i < simulacao.rodadas; i++){
        var vetPicks = []

        for(var j = 0; j < picks.length; i++){
            if(picks[i].rodada == i+1) {
                vetPicks.push(picks[i])
            }
        }

        escolhas[i] = {
            rodada: i+1,
            escolha: vetPicks
        }
    }

    res.render('simulacao', {titile: simulacao.nmSimulacao, nmSimulacao: simulacao.nmSimulacao, escolhas: escolhas})
}