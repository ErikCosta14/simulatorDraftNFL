const con = require('../Model/conexaoBD');

exports.carregarHistorico = async (req, res) => {
    var idFranquia = parseInt(req.params.idFranq)

    var simulacoes = con.buscarHistoricos(idFranquia);

    res.render('historico', {title: 'Simulações', idFranquia: idFranquia, simulacoes: simulacoes})
}

exports.carregarSimulacao = async (req, res) => {
    var idSimulacao = parseInt(req.params.idSim);

    var simulacao = con.carregarSimulacao(idSimulacao);

    res.render('simulacao', {titile: simulacao.nmSimulacao, simulacao: simulacao})
}