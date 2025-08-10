const con = require('../Model/conexaoBD');

exports.carregarHistorico = async (req, res) => {
    var idFranquia = parseInt(req.params.idFranq)

    var simulacoes = await con.buscarHistoricos(idFranquia);

    res.render('historico', {title: 'Simulações', idFranquia: idFranquia, simulacao: simulacoes, franquia:true})
}

exports.carregarSimulacao = async (req, res) => {
    var idSim = parseInt(req.params.idSim)

    var simulacao = await con.carregarSimulacao(idSim);
    var picks = await con.carregarPick(idSim);

    var escolhas = [];

    for(var i = 0; i < simulacao[0].rodadas; i++){
        var vetPicks = []

        for(var j = 0; j < picks.length; j++){
            if(picks[j].rodada == (i+1)) {
                vetPicks.push(picks[j])
            }
        }

        
        escolhas.push({
            rodada: i+1,
            escolha: vetPicks
        })
        
    }

    var infoPag = {
        title: simulacao[0].nmSimulacao, 
        nmSimulacao: simulacao[0].nmSimulacao, 
        idFranquia: simulacao[0].idFranquia,
        escolhas: escolhas, 
        franquia: true
    }

    res.render('simulacao', infoPag)
}