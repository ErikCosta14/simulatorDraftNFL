//Utilizar essa função no controllerIndex.index. APÓS RODAR A APLICAÇÃO EXCLUIR ESSA LINHA DE CÓDIGO E REINICIAR A APLICAÇÃO

var us = {
  id: 1,
	usuario: "admin",
	senha: "adm123"
}

await con.registroUsuario(us)
