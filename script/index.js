const dayModeBtn = document.querySelector('#screen img');
const body = document.querySelector('body');
const trashBtn = document.querySelector('#right-container img');
const calculator = document.querySelector(".calculator");
const buttons = document.querySelector("#button-container");
const buttonPer = document.querySelectorAll('#button-container button')


let history = [];
let firstNumber = [];
let secondNumber = [];
let operator;





function handleClickButton(e){
 
    if(!isNaN(e.target.textContent)){
        console.log(e.target.textContent);
    } 
    // else if(e.target.className === 'operator'){
    //     console.log(e.target.textContent + " I'm a Operator")
    // } 
    // else if (e.target.className === 'prog'){
    //     console.log('Hi Iam an innate program')
    // } 
    // else if (e.target.className.includes('dot')){
    //     console.log('hi im a DOT');
    // }
    
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
