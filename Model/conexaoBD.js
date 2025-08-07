const mongodb = require('mongodb')

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
        await colecao.insertOne(usuario);
    }
}

module.exports = new ConexaoBD();