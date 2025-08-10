const con = require('../Model/conexaoBD');
const infUser = require('../Model/infoConect')

var jogSelect = []
var jogNoSelect = []
var franquias = []
var picksIniciais = []
var todasPicks = []
var pickAtual;
var numEsc;
var rodada;
var nomeSim;
var ini;

exports.simuladorGet = async (req, res) => {
    var idFranq = parseInt(req.params.idFranq)
    
    infUser.id = idFranq;

    var pagInfo = {
        title: 'Simulador',
        idFranquia: idFranq,
        inicio: ini, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect, 
        picksIniciais: picksIniciais,
        todasPicks: todasPicks,
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.cancelar = async (req, res) => {
    var idFranq = parseInt(req.params.idFranq)
    
    jogSelect = [];
    jogNoSelect = [];
    franquias = [];
    picksIniciais = [];
    todasPicks = [];
    numEsc = 0;
    pickAtual = 0;
    rodada = 0;
    nomeSim = "";
    ini = false;

    infUser.id = idFranq;

    var pagInfo = {
        title: 'Simulador',
        idFranquia: idFranq,
        inicio: ini, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect, 
        picksIniciais: picksIniciais,
        todasPicks: todasPicks,
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.iniciar = async (req, res) => {
    // reset para evitar acumular dados de execuções anteriores
    jogSelect = [];
    jogNoSelect = [];
    franquias = [];
    picksIniciais = [];
    todasPicks = [];
    numEsc = 0;
    pickAtual = 0;
    rodada = 0;
    nomeSim = "";
    ini = false;

    var jogs = await con.buscarJogadores()
    var franq = await con.buscarFranquias()

    const jogadoresComImagem = jogs.map(jogador => {
        if (jogador.imgJog && jogador.imgJog.data) {
            const base64Image = jogador.imgJog.data.toString('base64');
            return {
                ...jogador,
                imgJog: `data:${jogador.imgJog.contentType};base64,${base64Image}`
            };
        }
        return jogador;
    });

    for(var i = 0; i < jogadoresComImagem.length; i++){
        jogNoSelect.push(jogadoresComImagem[i])
    }

    for(var i = 0; i < franq.length; i++){
        franquias.push(franq[i])
    }

    for(var i = franquias.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [franquias[i], franquias[j]] = [franquias[j], franquias[i]]
    }

    numEsc = 0;
    pickAtual = 1;
    rodada = 1;
    ini = true;

    nomeSim = req.body.nmSimulacao

    await pickFranqs(infUser.id);
    await addPicks();

    var pagInfo = {
        title: 'Simulador', 
        idFranquia: infUser.id,
        inicio: ini, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect,  
        picksIniciais: picksIniciais,
        todasPicks: todasPicks,
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.selecionar = async (req, res) => {
    var idJogador = parseInt(req.params.idJog)

    for(var i = 0; i < jogNoSelect.length; i++) {
        if (jogNoSelect[i].id == idJogador) {
            jogSelect[pickAtual - 1] = jogNoSelect[i];
            jogNoSelect.splice(i, 1);

            numEsc++;
            await verificaEsc(numEsc);
            pickAtual++;
        }
    }

    await pickFranqs(infUser.id);
    await addPicks();

    var pagInfo = {
        title: 'Simulador', 
        idFranquia: infUser.id,
        inicio: ini, 
        rodada: rodada,
        pick: pickAtual, 
        jogadores: jogNoSelect,  
        picksIniciais: picksIniciais,
        todasPicks: todasPicks,
        franquia: true
    }

    res.render('simulador', pagInfo)
}

exports.finalizar = async (req, res) => {
    var idFr = parseInt(req.params.idFranq)

    if((jogSelect.length > 0) && (nomeSim != "")){
        var idSim = Math.floor(Math.random() * 10000);
        
        if(jogSelect.length % franquias.length != 0){
            jogSelect.pop()
        }

        var f = 0;
        var rod = 0;
        for(var i = 0; i < jogSelect.length; i++){
            var pick = {
                idSimulacao: idSim,
                pick: i+1,
                rodada: rod+1,
                nmFranquia: franquias[f].nmFranquia,
                nmJogador: jogSelect[i].nmJogador,
                posicao: jogSelect[i].posicao
            }

            f++;

            if(f >= franquias.length) {
                rod++;
                f = 0;
            }

            await con.registrarPick(pick);

            ini = false;
        }

        var simulacao = {
            idFranquia: idFr,
            idSimulacao: idSim,
            nmSimulacao: nomeSim,
            rodadas: rod,
            numJogs: jogSelect.length,
        }
    
        await con.registarSimulacao(simulacao)
    }

    var rota = '/simulador/' + idFr

    res.redirect(rota)
}

async function verificaEsc(n) {
    if (n >= franquias.length) {
        numEsc = 0;
        rodada++;
    }
}

async function pickFranqs(idFran) {
    if(jogNoSelect.length > 0){
        while (franquias[numEsc].id != idFran) {
            jogAleatorio = Math.floor(Math.random() * jogNoSelect.length);
            
            jogSelect[pickAtual - 1] = jogNoSelect[jogAleatorio];
            jogNoSelect.splice(jogAleatorio, 1);

            numEsc++;
            await verificaEsc(numEsc);
            pickAtual++;
        }
    }
}

async function addPicks() {
    if(jogSelect.length >= 0){
        var numFranq = 0;
        for(var i = 0; i < jogSelect.length; i++){
            if(i < 5) {
                picksIniciais[i] = franquias[numFranq].nmFranquia + " PICK " + jogSelect[i].nmJogador;
            }

            todasPicks[i] = franquias[numFranq].nmFranquia + " PICK " + jogSelect[i].nmJogador;
            numFranq++

            if(numFranq >= franquias.length) {
                numFranq = 0;
            }
        }
    }
}