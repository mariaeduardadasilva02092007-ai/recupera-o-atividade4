const input = document.getElementById("tarefaInput");
const botao = document.getElementById("adicionarBtn");
const lista = document.getElementById("listaTarefas");
const contador = document.getElementById("contador");
const mensagem = document.getElementById("mensagem");
const vazio = document.getElementById("vazio");

let tarefas = [];

botao.addEventListener("click", adicionarTarefa);

function adicionarTarefa() {
    const texto = input.value.trim();

    if (texto === "") {
        mensagem.textContent = "Digite uma tarefa antes de adicionar.";
        return;
    }

    mensagem.textContent = "";

    const tarefa = {
        texto: texto,
        concluida: false
    };

    tarefas.push(tarefa);

    input.value = "";

    mostrarTarefas();
}

function mostrarTarefas() {
    lista.innerHTML = "";

    tarefas.forEach((tarefa, index) => {
        const item = document.createElement("li");

        item.textContent = tarefa.texto;

        if (tarefa.concluida) {
            item.classList.add("concluida");
        }

        item.addEventListener("click", function () {
            tarefa.concluida = !tarefa.concluida;
            mostrarTarefas();
        });

        const excluir = document.createElement("button");

        excluir.textContent = "Excluir";
        excluir.classList.add("excluir");

        excluir.addEventListener("click", function (event) {
            event.stopPropagation();
            tarefas.splice(index, 1);
            mostrarTarefas();
        });

        item.appendChild(excluir);
        lista.appendChild(item);
    });

    atualizarContador();

    if (tarefas.length === 0) {
        vazio.style.display = "block";
    } else {
        vazio.style.display = "none";
    }
}

function atualizarContador() {
    const concluidas = tarefas.filter(
        tarefa => tarefa.concluida
    ).length;

    contador.textContent =
        `${concluidas} de ${tarefas.length} tarefas concluídas`;
}

mostrarTarefas();