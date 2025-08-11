var usuarioLogado;
var nmUsuario;

async function setNmUsuario(nm) {
    nmUsuario = nm;
}

async function getNmUsuario() {
    return nmUsuario
}

async function setUsuario(usuario) {
    usuarioLogado = usuario;
}

async function getUsuario() {
    return usuarioLogado
}

module.exports = { setUsuario, getUsuario, setNmUsuario, getNmUsuario };