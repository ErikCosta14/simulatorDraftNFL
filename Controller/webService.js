const informacoes = require('../Model/conexaoBD.js');

exports.apiJogadores = async function (req, res) {

  var listaJogadores = await informacoes.buscarJogadores();
    
  var json = { lista_jogadores: listaJogadores };

  res.json(json);
};

exports.apiFranquias = async function (req, res) {

  var listaFranquias = await informacoes.buscarFranquias();
    
  var json = { lista_franquias: listaFranquias };

  res.json(json);
};
