const dayModeBtn = document.querySelector('#screen img');
const body = document.querySelector('body');
const trashBtn = document.querySelector('#right-container img');
const calculator = document.querySelector(".calculator");
const buttons = document.querySelector("#button-container");
const buttonPer = document.querySelectorAll('#button-container button');
const mainScreenNumber = document.querySelector('#screen h1');


let history = [];
let numberInput = [];
let forScreenNumber, firstNumber, secondNumber, result, operator;
let negative = false;

function divideByZero(){
    return "Can't Divide By Zero"
}

function operation(operatorSign, firstNum, secondNum){
    switch (operatorSign) {
        case '+':
            result = firstNum + secondNum;   
            break;
        case '-':
            result = firstNum - secondNum;
            break;
        case 'X':
            result = firstNum * secondNum;
            break;
        case '/':
            result = secondNum !== 0 ? firstNum/secondNum : divideByZero(); 
            break;
        default:
            //equal sign operator
            result = 0;
            break;
    }
}

function subScreenChanger() {
    console.log('Im function Sub Screen');
}

//Main screenchange
function postNumberOnScreen() {
    mainScreenNumber.textContent = `${negative ? '-' : ''}${forScreenNumber}`;
    if (numberInput.length >= 9 ) {
        mainScreenNumber.style.fontSize = '2.5rem';
    } 
    else if (numberInput.length > 6) {
        mainScreenNumber.style.fontSize = '3rem';
    } 
    else {
        mainScreenNumber.style.fontSize = '4rem'
    }

    // console.log(numberInput);
    
}



function handleClickButton(e){

    if(!isNaN(e.target.textContent)){
        const int = e.target.textContent;
        if( numberInput.length === 1 && Number(int) === 0 && Number(numberInput[0]) === 0) {
        } 
        else if (!numberInput.includes('.') && numberInput.length < 10){
            numberInput.push(int);
            forScreenNumber = Number(numberInput.join('')).toLocaleString();
        } 
        else if (numberInput.includes('.') && (numberInput.length - numberInput.indexOf('.')) <= 2) {
            numberInput.push(int);
            forScreenNumber = numberInput.join('');
        }

    } 

    
    else if(e.target.className === 'operator'){
        
        if (!operator) {
            if (!isNaN(result) && numberInput.length === 0) {
                firstNumber = Number(result);
                secondNumber = '';
            } else {
            // if (isNaN(result)) {
                let absFirstNumber = numberInput.length === 0 ? 0 : Number(numberInput.join(''));
                firstNumber = negative ? -absFirstNumber : absFirstNumber;
                numberInput = [];
                negative = false;
            } 
        }

        if (operator && !isNaN(firstNumber) && numberInput.length > 0){
            let absSecondNumber = Number(numberInput.join(''));
            secondNumber = negative ? -absSecondNumber : absSecondNumber;
            numberInput = [];
            negative = false;
        }

        if (isNaN(secondNumber) && e.target.textContent === '='){
            result = Number(firstNumber);
        } else if (!isNaN(secondNumber)){
            operation(operator, firstNumber, secondNumber);
        }

        // subScreenChanger();
        

        console.log(`
    First No.:     ${firstNumber}
    Second No.:    ${secondNumber}
    Result:        ${result}`);
        operator = e.target.textContent === '=' ? '' : e.target.textContent;

        console.log(`
    Operator: ${operator}`)

    } 


    else if (e.target.className === 'prog'){
        switch (e.target.textContent) {
            case 'AC':
                numberInput = []
                forScreenNumber = 0;
                break;
            case 'DEL':
                numberInput.pop();
                break;
            default:
                //toggle negative sign
                negative = !negative;
        }
    } 

    else if (e.target.className.includes('dot')){
        if(!numberInput.includes('.') && numberInput.length < 10){
            numberInput.push('.');
            forScreenNumber = numberInput.join('');
        }
    }
    // postNumberOnScreen();
    
}

buttons.addEventListener('click', handleClickButton)
buttonPer.forEach(btn => {
    btn.addEventListener('mousedown', () => {
        
        btn.style.transform = 'scale(0.90)';
    });
    btn.addEventListener('mouseup', ()=> {
    
        btn.style.transform = 'scale(1.0)';
    })
})


function toggleDayMode(){
    body.classList.toggle('day-mode')
    if (body.className) {
        dayModeBtn.src = './src/moon.svg';
        dayModeBtn.alt = 'moon-icon';
        trashBtn.src = './src/trash-day.png'
        calculator.style.boxShadow = `0px 0px 247px -60px rgba(230,255,0,0.5)`;

    } else {
        dayModeBtn.src = './src/sun.png';
        dayModeBtn.alt = 'sun-icon';
        trashBtn.src = './src/trash-night.png';
        calculator.style.boxShadow = '';
        
    }
}

dayModeBtn.addEventListener('click', toggleDayMode)
