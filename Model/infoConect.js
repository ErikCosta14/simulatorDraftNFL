var usuarioLogado;

async function setUsuario(usuario) {
    usuarioLogado = usuario;
}

async function getUsuario() {
    return usuarioLogado
}

module.exports = { setUsuario, getUsuario };