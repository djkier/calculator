const dayModeBtn = document.querySelector('#screen img');
const body = document.querySelector('body');
const trashBtn = document.querySelector('#right-container img');
const calculator = document.querySelector(".calculator");
const buttons = document.querySelector("#button-container");
const buttonPer = document.querySelectorAll('#button-container button');
const mainScreenNumber = document.querySelector('#screen h1');


let history = [];
let numberInput = [];
let forScreenNumber, firstNumber, operator;
let negative = false;


//screenchange
function postNumberOnScreen() {
    if (numberInput.includes('.') && (numberInput.length - numberInput.indexOf('.')) <= 2){
        forScreenNumber = numberInput.join('');

    } else if (numberInput.includes('.') && numberInput.length - numberInput.indexOf('.')>= 3) {
        forScreenNumber = Number(numberInput.join('')).toFixed(2);
    } 
    else if (!numberInput.includes('.')) {
        forScreenNumber = Number(numberInput.join('')).toLocaleString();
    }
    
    console.log(numberInput);


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
    
}

function handleClickButton(e){

    if(!isNaN(e.target.textContent)){
        const int = e.target.textContent;
        if( numberInput.length === 1 && Number(int) === 0 && Number(numberInput[0]) === 0) {
            postNumberOnScreen();
        } 
        else if (!numberInput.includes('.') && numberInput.length < 10){
            numberInput.push(int);
            postNumberOnScreen();
        } 
        else if (numberInput.includes('.') && (numberInput.length - numberInput.indexOf('.')) <= 2) {
            numberInput.push(int);
            postNumberOnScreen();
        }
    } 

    
    // else if(e.target.className === 'operator'){
    //     console.log(e.target.textContent + " I'm a Operator")
    // } 


    else if (e.target.className === 'prog'){
        switch (e.target.textContent) {
            case 'AC':
                numberInput = []
                forScreenNumber = 0;
                postNumberOnScreen();
                break;
            case 'DEL':
                numberInput.pop();
                postNumberOnScreen();
                break;
            default:
                console.log('negative clicked')
                postNumberOnScreen();
                
        }
    } 

    else if (e.target.className.includes('dot')){
        if(!numberInput.includes('.') && numberInput.length < 10){
            numberInput.push('.');
            forScreenNumber = numberInput.join('');
            postNumberOnScreen();
        }
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
