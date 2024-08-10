import { handleClickOperator, result, subScreenNumber, resultToZero } from "./operator.js";

const dayModeBtn = document.querySelector('#screen img');
const body = document.querySelector('body');
const trashBtn = document.querySelector('#right-container img');
const calculator = document.querySelector(".calculator");
const buttons = document.querySelector("#button-container");
const buttonPer = document.querySelectorAll('#button-container button');
const mainScreenNumber = document.querySelector('#screen h1');


let forScreenNumber;
let numberInput = [];
let currentNumber = '';
let negative = false;



//Main screenchange
function postNumberOnScreen() {
    console.log(numberInput)
    let mainScreenDisplay = `${negative ? '-' : ''}${forScreenNumber}`
    mainScreenNumber.textContent = mainScreenDisplay.length > 10 ? (mainScreenDisplay / 10**(mainScreenDisplay.length - 1)).toFixed(5) : mainScreenDisplay;
    if (forScreenNumber.length >= 9 ) {
        mainScreenNumber.style.fontSize = '2.5rem';
    } 
    else if (forScreenNumber.length> 6) {
        mainScreenNumber.style.fontSize = '3rem';
    } 
    else {
        mainScreenNumber.style.fontSize = '4rem'
    }
    
    currentNumber = numberInput.length === 0 ? '' : Number(numberInput.join(''));
    console.log(currentNumber);

    // console.log(numberInput);
    
}


function handleClickButton(e){
    
    if (e.target.id !== 'button-container'){

        if(!isNaN(e.target.textContent)){
            const int = e.target.textContent;
            if( numberInput.length === 1 && Number(int) === 0 && Number(numberInput[0]) === 0) {
                forScreenNumber = 0;
               
            } 
            else if (!numberInput.includes('.') && numberInput.length < 10){
                numberInput.push(int);
                
                forScreenNumber = Number(numberInput.join(''));
                
                
            } 
            else if (numberInput.includes('.') && (numberInput.length - numberInput.indexOf('.')) <= 2) {
                numberInput.push(int);
                console.log('r')
                forScreenNumber = numberInput.join('');
            }
            
        } 


        else if(e.target.className === 'operator') {
            numberInput = [];
            handleClickOperator(e.target.textContent, currentNumber);
            currentNumber = '';
            if (result !== '') {
                forScreenNumber = Math.abs(result);
                
            } 
            if(!isNaN(result) && result < 0) {
                negative = true;
            }
        }

        else if (e.target.className === 'prog'){
            switch (e.target.textContent) {
                case 'AC':
                    numberInput = []
                    forScreenNumber = 0;
                    resultToZero();
                    subScreenNumber.textContent = '';
                    break;
                case 'DEL':
                    numberInput.pop();
                    resultToZero();
                    if(numberInput.length === 0) {
                        negative = false;
                    } 
                    forScreenNumber = numberInput.join('');
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
        
        postNumberOnScreen();
    }
    
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
        trashBtn.src = './src/trash-day.png';
        calculator.style.boxShadow = `0px 0px 247px -60px rgba(230,255,0,0.5)`;

    } else {
        dayModeBtn.src = './src/sun.png';
        dayModeBtn.alt = 'sun-icon';
        trashBtn.src = './src/trash-night.png';
        calculator.style.boxShadow = '';
        
    }
}

dayModeBtn.addEventListener('click', toggleDayMode)
