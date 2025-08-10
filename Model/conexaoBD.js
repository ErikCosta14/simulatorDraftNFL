const mongodb = require('mongodb')
const bcrypt = require('bcrypt');
const saltRounds = 10;
        

const ClienteMongo = mongodb.MongoClient;
var cliente;

const conexao_bd = async () => {
    if (!cliente)
        cliente = await ClienteMongo.connect('mongodb://localhost:27017/');
}

const bd = () => {
    return cliente.db('simDraft');
}

class ConexaoBD {
    async registroUsuario(usuario) {
        await conexao_bd()
        const colecao = bd().collection('usuarios');

        var senha = usuario.senha;
        usuario.senha = await bcrypt.hash(senha, saltRounds);

        await colecao.insertOne(usuario);
    }

    async verificaUsuario(usuario, senha) {
        await conexao_bd()
        const colecao = bd().collection('usuarios');
        var user = await colecao.findOne({usuario: usuario});

        if (user && await bcrypt.compare(senha, user.senha)) {
            return true;
        } else {
            return false;
        }
    }

    async buscarUsuario(usuario) {
        await conexao_bd()
        const colecao = bd().collection('usuarios');
        return await colecao.findOne({usuario: usuario});
    }

    async registroJogador(jogador) {
        await conexao_bd()
        const colecao = bd().collection('jogadores');
        await colecao.insertOne(jogador);
    }

    async buscarJogadores() {
        await conexao_bd()
        const colecao = bd().collection('jogadores');
        return await colecao.find().toArray();
    }

    async carregarJogador(idJogador) {
        await conexao_bd()
        const colecao = bd().collection('jogadores');
        return await colecao.find({id: idJogador}).toArray();
    }

    async registroFranquia(franquia) {
        await conexao_bd()
        const colecao = bd().collection('franquias');
        await colecao.insertOne(franquia);
    }

    async buscarFranquias() {
        await conexao_bd()
        const colecao = bd().collection('franquias');
        return await colecao.find().toArray();
    }

    async carregarFranquia(nmFranquia) {
        await conexao_bd()
        const colecao = bd().collection('franquias');
        return await colecao.find({nmFranquia: nmFranquia})
    }

    async carregarFranquiaId(idFranquia) {
        await conexao_bd()
        const colecao = bd().collection('franquias');
        return await colecao.find({id: idFranquia}).toArray();
    }

    async buscarHistoricos(idFranquia) {
        await conexao_bd()
        const colecao = bd().collection('simulacoes');
        return await colecao.find({idFranquia: idFranquia}).toArray();
    }

    async carregarSimulacao(idSimulacao) {
        await conexao_bd()
        const colecao = bd().collection('simulacoes');
        return await colecao.find({idSimulacao: idSimulacao}).toArray();
    }

    async registarSimulacao(simulacao) {
        await conexao_bd()
        const colecao = bd().collection('simulacoes');
        await colecao.insertOne(simulacao)
    }

    async registrarPick(pick) {
        await conexao_bd()
        const colecao = bd().collection('picks');
        await colecao.insertOne(pick)
    }

    async carregarPick(idSimulacao) {
        await conexao_bd()
        const colecao = bd().collection('picks');
        return await colecao.find({idSimulacao: idSimulacao}).toArray();
    }
}

module.exports = new ConexaoBD();