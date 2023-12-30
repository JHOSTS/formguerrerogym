function id(el){
    return document.getElementById(el);
};

function ValidaValores(idCampo){
    id(idCampo).onkeyup = function(){
        var v = this.value,
            integer = v.split('.')[0];

        v = v.replace(/\D/, "");
        v = v.replace(/^[0]+/, "");

        if (idCampo === 'peso'){
            let valor = v.replace(/\D/g, '');
            if (valor.length > 5) {
              valor = valor.slice(0, 5);
            }
            if (valor.length > 3) {
              valor = valor.slice(0, 3) + '.' + valor.slice(3);
            }
            v = valor.replace(",",".");

            v = v.length > 5 ? '' : v;
        }
        else
            v = v.length > 3 ? '' : v;

        this.value = v;
    }
};

function habilitaQuadril() {
var sexo = document.getElementById("sexo").value;
document.getElementById("divQuadril").hidden = sexo == "feminino" ? false : true;

if(!document.getElementById("divQuadril").hidden) 
    document.getElementById("quadril").setAttribute("required", "true");
};

function calcularGorduraCorporal() {
// Fórmula para calcular a gordura corporal para homens
// Gordura corporal (%) = 86.010 × 10(cintura - pescoco) - 70.041 × 10(altura) + 36.76
// Fórmula para calcular a gordura corporal para mulheres
// Gordura corporal (%) = 163.205 × 10(cintura + quadril - pescoco) - 97.684 × 10(altura) - 78.387

let gorduraCorporal; 
let altura = document.getElementById("altura").value; 
let peso = document.getElementById("peso").value; 
let cintura = document.getElementById("cintura").value;
let pescoco = document.getElementById("pescoco").value;
let sexo = document.getElementById("sexo").value;
let quadril = document.getElementById("quadril").value;
let quadrilDesabilitado = document.getElementById("divQuadril").hidden;

if (sexo.toLowerCase() === 'masculino') {
    gorduraCorporal = 86.010 * Math.log10(cintura - pescoco) - 70.041 * Math.log10(altura) + 36.76;
} else if (sexo.toLowerCase() === 'feminino') {
    gorduraCorporal = (163.205 * Math.log10(cintura + quadril - pescoco) - 97.684 * Math.log10(altura) - 78.387)/10;
}

if (sexo === "") {
    alert("Por favor, selecione o campo Sexo.");
} else if (peso === "") {
    alert("Por favor, preencha o campo Peso.");
} else if (altura === "") {
    alert("Por favor, preencha o campo Altura.");
} else if (pescoco === "") {
    alert("Por favor, preencha o campo Pescoço.");
} else if (cintura === "") {
    alert("Por favor, preencha o campo Cintura.");
} else if (quadril === "" && !quadrilDesabilitado) {
    alert("Por favor, preencha o campo Quadril.");
}
else
    openPopup(gorduraCorporal.toFixed(2).toString());
}

function adicionarTagsDinamicamente() {
    // Criação do botão
    var button = document.createElement("button");
    button.className = "copy-button";
    button.onclick = copiarConteudo;

    // Criação do ícone dentro do botão
    var span = document.createElement("span");
    span.className = "glyphicon glyphicon-copy";
    span.setAttribute("aria-hidden", "true");

    // Adiciona o ícone dentro do botão
    button.appendChild(span);

    // Adiciona o botão à div com o ID "resultPlaceholder"
    document.getElementById("resultPlaceholder").appendChild(button);

}

function openPopup(valorGordura) {
    document.getElementById("resultPlaceholder").innerText = "Resultado: " + valorGordura;
    adicionarTagsDinamicamente();
    document.getElementById('popup').style.display = 'block';
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function copiarConteudo() {
    // Seleciona o conteúdo da div
    var conteudo = document.getElementById("resultPlaceholder").textContent;

    // Cria um elemento de texto temporário
    var elementoTemporario = document.createElement("textarea");

    // Define o valor do elemento de texto para o conteúdo que você deseja copiar
    elementoTemporario.value = conteudo;

    // Adiciona o elemento de texto ao DOM
    document.body.appendChild(elementoTemporario);

    // Seleciona o conteúdo do elemento de texto
    elementoTemporario.select();

    // Executa o comando de cópia
    document.execCommand("copy");

    // Remove o elemento de texto temporário
    document.body.removeChild(elementoTemporario);

    alert("Resultado copiado!");
}