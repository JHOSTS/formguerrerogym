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
// Gordura corporal (%) = 86.010 × log10(cintura - pescoco) - 70.041 × log10(altura) + 36.76
// Fórmula para calcular a gordura corporal para mulheres
// Gordura corporal (%) = 163.205 × log10(cintura + quadril - pescoco) - 97.684 × log10(altura) - 78.387

let gorduraCorporal; 
let altura = document.getElementById("altura").value; 
let peso = document.getElementById("peso").value; 
let cintura = document.getElementById("cintura").value;
let pescoco = document.getElementById("pescoco").value;
let sexo = document.getElementById("sexo").value;
let quadril = document.getElementById("quadril").value;

if(altura != '' && peso != '' && cintura != '' && pescoco != '' && sexo != ''){
if(document.getElementById("divQuadril").hidden === false){
    if(quadril === ''){
        alert('Medida do quadril não preenchida'); 
        return;
    }
}
}

if (sexo.toLowerCase() === 'masculino') {
gorduraCorporal = 86.010 * Math.log10(cintura - pescoco) - 70.041 * Math.log10(altura) + 36.76;
} else if (sexo.toLowerCase() === 'feminino') {
gorduraCorporal = 163.205 * Math.log10(cintura + quadril - pescoco) - 97.684 * Math.log10(altura) - 78.387;
}

openDynamicPopup(gorduraCorporal.toFixed(2).toString());
//alert("Resultado: " + gorduraCorporal.toFixed(2).toString()); // Retornando o valor da gordura corporal com duas casas decimais
}

function openPopup(valorGordura) {
    // document.getElementById("resultPlaceholder").innerText = valorGordura;
    document.getElementById('popup').style.display = 'block';
}

// Função para fechar o pop-up
function closePopup() {
    document.getElementById('popup').style.display = 'none';
}

function openDynamicPopup(valorGordura) {
    // Cria um elemento div para o pop-up
    var popupContainer = document.createElement('div');
    popupContainer.className = 'popup-container';

    // Cria um elemento div para o resultado
    var resultElement = document.createElement('div');
    resultElement.className = 'result';
    resultElement.textContent = valorGordura;
    popupContainer.appendChild(resultElement);

    // Cria um elemento input para a imagem
    var inputImage = document.createElement('input');
    inputImage.type = 'file';
    inputImage.accept = 'image/*';
    inputImage.onchange = function (event) {
        previewImage(event);
    };
    popupContainer.appendChild(inputImage);

    // Cria um elemento img para a visualização da imagem
    var imagePreview = document.createElement('img');
    imagePreview.className = 'popup-image';
    imagePreview.alt = 'Imagem';
    popupContainer.appendChild(imagePreview);

    // Cria um elemento button para fechar o pop-up
    var closeButton = document.createElement('button');
    closeButton.textContent = 'Fechar';
    closeButton.onclick = function () {
        document.body.removeChild(popupContainer);
    };
    popupContainer.appendChild(closeButton);

    // Adiciona o pop-up ao corpo do documento
    document.body.appendChild(popupContainer);

    // Exibe o pop-up
    popupContainer.style.display = 'block';

    openPopup();
}
