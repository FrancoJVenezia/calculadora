let operador = "";
let pantallaDos = "";
let pantallaUno = "";
const numeros = document.getElementById("numeroUno");
function changeSign(){
  pantallaUno = pantallaUno.toString();
  if(pantallaUno && pantallaUno.includes('-')) {
    pantallaUno = Math.abs(pantallaUno);
  } else {
    pantallaUno = - pantallaUno;
  }
}
function appendNumber(e) {
  if(pantallaUno == Number.POSITIVE_INFINITY || pantallaUno == Number.NEGATIVE_INFINITY) return
  let number = e.target.textContent.toString();
  if(number === '+/-') return;
  if(number === '.' && pantallaUno.includes('.')) return;
  if(pantallaUno.length === 19) return;
  pantallaUno += number;
}
function reset(){
  pantallaUno= "";
  pantallaDos= "";
  operador="";
}
function clearEntry(){
  pantallaUno = '';
}
function calculate() {
  if(pantallaDos !== '' && pantallaUno !== ''){
    switch (operador){
      case '+':
        pantallaUno = parseFloat(pantallaDos) + parseFloat(pantallaUno);
        break;
      case '-':
        pantallaUno = parseFloat(pantallaDos) - parseFloat(pantallaUno);
        break;
      case '*':
        pantallaUno = parseFloat(pantallaDos) * parseFloat(pantallaUno);
        break;
      case '/':
        pantallaUno = parseFloat(pantallaDos) / parseFloat(pantallaUno);
        break;
      default:
        return
    }
    pantallaDos = '';
    operador = '';
  }
}
function getOperator(e){
  if(pantallaUno === '' ||pantallaUno == Number.POSITIVE_INFINITY ||
    pantallaUno == Number.NEGATIVE_INFINITY) return
  if(pantallaDos !== ''){
    calculate();
  }

  operador = e.target.innerText.toString();
  pantallaDos = pantallaUno;
  pantallaUno = '';
}

function updateDisplay() {
  let $currentDisplay = document.querySelector('#pantallaUno');
  let $previousDisplay = document.querySelector('#pantallaDos');
  
  if (pantallaUno == Number.POSITIVE_INFINITY || pantallaUno == Number.NEGATIVE_INFINITY) {
    $currentDisplay.innerText = 'Error';
    $previousDisplay.innerText = `${pantallaDos} ${operador}`;
    return
  };

  $currentDisplay.innerText = pantallaUno;
  $previousDisplay.innerText = `${pantallaDos} ${operador}`;
}

function inputManager() {
  const $buttons = document.querySelectorAll('.numero');
  $buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      appendNumber(e);
      updateDisplay();
    });
  });

  const $operators = document.querySelectorAll('.operator');
  $operators.forEach((operator) => {
    operator.addEventListener('click', (e) => {
      getOperator(e);
      updateDisplay();
    });
  });

  const $clear = document.querySelector('#borrar');
  $clear.addEventListener('click',() => {
    reset();
    updateDisplay();
  });

  const $equals = document.querySelector('#resultado');
  $equals.addEventListener('click', () => {
    calculate();
    updateDisplay();
  });
  const $plusMinus = document.querySelector('#plus-minus');
  $plusMinus.addEventListener('click', () => {
    changeSign();
    updateDisplay();
  });
}
inputManager()