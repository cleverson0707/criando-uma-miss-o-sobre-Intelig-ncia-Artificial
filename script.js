// 1. Modelagem das Perguntas usando Objetos (Conceito chave do desafio)
const perguntasDaMissao = [
    {
        titulo: "Qual tag HTML é usada para definir o conteúdo principal e exclusivo de uma página?",
        alternativas: ["<header>", "<div>", "<main>", "<section>"],
        correta: 2 // Índice da resposta certa
    },
    {
        titulo: "No JavaScript, qual método usamos para criar um novo elemento HTML do zero?",
        alternativas: ["document.getElementById()", "document.createElement()", "container.appendChild()", "element.textContent"],
        correta: 1
    },
    {
        titulo: "Se novos botões estão acumulando na tela ao clicar, qual comando resolve limpando o container?",
        alternativas: ["container.innerHTML = ''", "botao.remove()", "botoes.forEach()", "document.body.clear()"],
        correta: 0
    }
];

// 2. Variáveis de Estado do Jogo
let nomeDoUsuario = "";
let indicePerguntaAtual = 0;
let totalAcertos = 0;

// 3. Captura dos Elementos do DOM
const telaInicial = document.getElementById("tela-inicial");
const telaQuiz = document.getElementById("tela-quiz");
const telaResultado = document.getElementById("tela-resultado");

const inputNome = document.getElementById("input-nome");
const btnIniciar = document.getElementById("btn-iniciar");
const btnProxima = document.getElementById("btn-proxima");
const btnReiniciar = document.getElementById("btn-reiniciar");

const tituloPergunta = document.getElementById("titulo-pergunta");
const containerAlternativas = document.getElementById("container-alternativas");
const feedbackTexto = document.getElementById("feedback-texto");

const mensagemFinal = document.getElementById("mensagem-final");
const pontuacaoTexto = document.getElementById("pontuacao-texto");
const feedbackVisual = document.getElementById("feedback-visual");

// --- FUNÇÕES DE FLUXO ---

// Inicia o Quiz e valida o nome
btnIniciar.addEventListener("click", function() {
    if (inputNome.value.trim() === "") {
        alert("Por favor, digite seu nome de desenvolvedor(a) para começar!");
        return;
    }
    nomeDoUsuario = inputNome.value;
    telaInicial.classList.add("escondido");
    telaQuiz.classList.add("escondido"); // Garante reset
    telaQuiz.classList.remove("escondido");
    
    indicePerguntaAtual = 0;
    totalAcertos = 0;
    mostrarPergunta();
});

// Mostra a pergunta atual na tela
function mostrarPergunta() {
    // Limpa feedbacks anteriores
    feedbackTexto.textContent = "";
    btnProxima.classList.add("escondido");

    // Estratégia de Limpeza: Apaga os botões anteriores para evitar acúmulo (Desafio anterior!)
    containerAlternativas.innerHTML = "";

    let perguntaAtual = perguntasDaMissao[indicePerguntaAtual];
    tituloPergunta.textContent = perguntaAtual.titulo;

    // Percorre a array de alternativas criando os botões dinamicamente
    perguntaAtual.alternativas.forEach((alternativa, indice) => {
        const botao = document.createElement("button");
        botao.textContent = alternativa;
        botao.classList.add("btn-alternativa");

        // Evento Ouvinte de Clique para validar a resposta
        botao.addEventListener("click", function() {
            verificarResposta(indice, perguntaAtual.correta);
        });

        containerAlternativas.appendChild(botao);
    });
}

// Verifica se o usuário acertou ou errou e muda a cor dos botões (Desafio do Botão Vermelho)
function verificarResposta(indiceSelecionado, indiceCorreto) {
    const botoes = containerAlternativas.querySelectorAll(".btn-alternativa");

    // Desativa todos os botões para o usuário não clicar duas vezes
    botoes.forEach(b => b.disabled = true);

    if (indiceSelecionado === indiceCorreto) {
        botoes[indiceSelecionado].classList.add("correta");
        feedbackTexto.textContent = "Excelente! Você acertou. ✨";
        feedbackTexto.style.color = "#52b788";
        totalAcertos++;
    } else {
        botoes[indiceSelecionado].classList.add("errada"); // Fica vermelho!
        botoes[indiceCorreto].classList.add("correta"); // Mostra a certa em verde
        feedbackTexto.textContent = "Ah, resposta incorreta! Fique atento aos conceitos. 🚀";
        feedbackTexto.style.color = "#e63946";
    }

    btnProxima.classList.remove("escondido");
}

// Controla a mudança de perguntas ou fim do jogo
btnProxima.addEventListener("click", function() {
    indicePerguntaAtual++;
    if (indicePerguntaAtual < perguntasDaMissao.length) {
        mostrarPergunta();
    } else {
        exibirResultadoFinal();
    }
});

// Tela de Resultado Final Personalizada (Desafio do Feedback Visual)
function exibirResultadoFinal() {
    telaQuiz.classList.add("escondido");
    telaResultado.classList.remove("escondido");

    // Inclui o nome do usuário customizado
    mensagemFinal.textContent = `Missão Cumprida, ${nomeDoUsuario}!`;
    pontuacaoTexto.textContent = `Você acertou ${totalAcertos} de ${perguntasDaMissao.length} perguntas.`;

    // Limpa classes anteriores do container de feedback visual
    feedbackVisual.className = "";

    // Muda a cor da área de feedback conforme o desempenho do estudante
    if (totalAcertos === perguntasDaMissao.length) {
        feedbackVisual.classList.add("resultado-sucesso");
        pontuacaoTexto.textContent += " Você é um(a) mestre do código! 🏆";
    } else {
        feedbackVisual.classList.add("resultado-falha");
        pontuacaoTexto.textContent += " Que tal revisar os códigos e tentar de novo? 💪";
    }
}

// Reseta o jogo para o início
btnReiniciar.addEventListener("click", function() {
    telaResultado.classList.add("escondido");
    telaInicial.classList.remove("escondido");
    inputNome.value = "";
});
