const display = document.querySelector("#display");
const numeros = document.querySelectorAll("[id*=tecla]");
const operadores = document.querySelectorAll("[id*=operador]");

let operador;
let numeroAnterior;

const atualizarDisplay = (texto) => {display.textContent += texto;}

const inserirNumero = (event) => {atualizarDisplay(event.target.textContent);}

numeros.forEach(numero => numero.addEventListener("click", inserirNumero));

const limparDisplay = () => {display.textContent = ""};

const convNumDecBrToInt = (numero) => {return numero.replace(",", ".");}

const convNumDecIntToBr = (numero) => {return numero.replace(".", ",");}

const selecionaOperador = (event) => {
  operador = event.target.textContent;
  numeroAnterior = convNumDecBrToInt(display.textContent);
  limparDisplay();
};

operadores.forEach((operador) => operador.addEventListener("click", selecionaOperador));

const calcular = () => {
  if (operador !== undefined) {
    const numeroAtual = convNumDecBrToInt(display.textContent);

    const resultado = eval(`${numeroAnterior}${operador}${numeroAtual}`);
    const operacaoRealizada = `${numeroAnterior} ${operador} ${numeroAtual}`;
    
    limparDisplay();
    
    atualizarDisplay(convNumDecIntToBr(resultado.toString()));
    
    operador = undefined;

    console.log("[ Operacao: " + operacaoRealizada + " ]");
  }
};

document.querySelector("#igual").addEventListener("click", calcular);

document.querySelector("#limparDisplay").addEventListener("click", limparDisplay);

const limparCalculo = () => {
  limparDisplay();
  operador = undefined;
  numeroAnterior = undefined;
}

document.querySelector("#limparCalculo").addEventListener("click", limparCalculo);

const removerUltimoNumero = () => {display.textContent = display.textContent.slice(0, -1);}

document.querySelector("#backspace").addEventListener("click", removerUltimoNumero);

const inverterSinal = () => {
  const numDisplayOri = convNumDecBrToInt(display.textContent);
  const numDisplay = numDisplayOri * (-1);
  
  limparDisplay();

  atualizarDisplay(convNumDecIntToBr(numDisplay.toString()));
}

document.querySelector("#inverter").addEventListener("click", inverterSinal);

const existeValor = () => display.textContent.length > 0;

const existeDecimal = () => display.textContent.indexOf(",") !== -1;

const inserirDecimal = () => {
  if (!existeDecimal()) {
    if (existeValor()) {
      atualizarDisplay(",");
    } else {
      atualizarDisplay("0,");
    }
  }
};

document.querySelector("#decimal").addEventListener("click", inserirDecimal);