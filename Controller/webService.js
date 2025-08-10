const informacoes = require('../Model/conexaoBD.js');

exports.apiJogadores = async function (req, res) {
  var json = await informacoes.buscarJogadores();

  res.json(json);
};

exports.apiJogador = async function (req, res) {
  var idJog = parseInt(req.params.idJog)
  var json = await informacoes.carregarJogador(idJog);

  res.json(json);
};

exports.apiFranquias = async function (req, res) {
  var json = await informacoes.buscarFranquias();

  res.json(json);
};

exports.apiFranquia = async function (req, res) {
  var idFran = parseInt(req.params.idFran)
  var json = await informacoes.carregarFranquiaId(idFran);

  res.json(json);
};
