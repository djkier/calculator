const dayModeBtn = document.querySelector('#screen img');
const body = document.querySelector('body');
const trashBtn = document.querySelector('#right-container img');
const calculator = document.querySelector(".calculator");

function toggleDayMode(){
    document.querySelector('body').classList.toggle('day-mode');
}

let counter = 0;

dayModeBtn.addEventListener('click', () => {
    body.classList.toggle('day-mode')
    counter++; 
    console.log('clicked ' + counter)
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

})