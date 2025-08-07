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

    async buscarUsuario(usuario, senha) {
        await conexao_bd()
        const colecao = bd().collection('usuarios');
        var user = await colecao.findOne({usuario: usuario});

        if (user && await bcrypt.compare(senha, user.senha)) {
            return true;
        } else {
            return false;
        }
    }
}

module.exports = new ConexaoBD();