let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();  //variavel sempre atribuida no inicio
let tentativas = 1;

// Para alterar os textos do HTML através do JavaScript
// variável = document.querySelector (dessa forma identificamos qual atributo do HTML queremos modifgicar)
// Com o .innerHTML atribuimos um valor à variavel, que modificará o HTML

        //  let titulo = document.querySelector("h1");
        //  titulo.innerHTML = "Jogo do numero secreto";
        //  
        //  let paragrafo = document.querySelector("p");
        //  paragrafo.innerHTML = "Escolha um numero entre 1 e 10";

// Criando funcoes - função é responsável por executar alguma ação dentro do nosso programa
// Funcoes tambem podem ser utilizadas para isolar um padrao de código, como as 4 linhas acima

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, "Brazilian Portuguese Female", { rate: 1.2 });  //se refere a linha 7 do index.html, que faz uma chamada para o site https://responsivevoice.org/
}

function exibirMensagemInicial() {
    exibirTextoNaTela("h1", "Jogo do numero oculto");
    exibirTextoNaTela("p", "Escolha um numero entre 1 e 10");
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector("input").value;
    // console.log(chute == numeroSecreto);  //booleano - verdadeiro ou falso

    if (chute == numeroSecreto) {
        exibirTextoNaTela("h1", "Acertou!");
        let palavraTentativa = tentativas > 1 ? "tentativas" : "tentativa";
        let mensagemTentativas = `Voce descobriu o numero secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela("p", mensagemTentativas);
        document.getElementById("reiniciar").removeAttribute("disabled");
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela("p", "O numero oculto eh menor");
        } else {
            exibirTextoNaTela("p", "O numero oculto eh maior");
        }
        tentativas++;
        limparCampo();
    }

}

function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista == numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();
        // return parseInt(Math.random() * 10 + 1); //return irá retornar o valor para ser salva na variavel numeroSecreto, que é descrita na linha 2

    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

function limparCampo() {
    chute = document.querySelector("input");
        chute.value = " ";
}

function reiniciarJogo() {
    numeroSecreto = gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
