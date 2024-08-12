const subScreenNumber = document.querySelector('#screen p');
const historyScreen = document.querySelector('#history-screen'); 
const trashBtn = document.querySelector('#right-container img');

let first = '';
let second = '';
let result = '';
let oper = '';
let history = [];
let subHistory = {first: '', second: '', operator: '', result: '',}





function historyCall(sub){
    
        const subP = document.createElement('p');
        const mainP = document.createElement('p');
        const insMainP = document.createTextNode(sub.result);
        const historyContainer = document.createElement('div');

        subP.className = 'number-sub-history';
        mainP.className = 'number-main-history';
        historyContainer.className = 'history-container';

        if (sub.second === '' && sub.operator === ''){
            const insSubPHalf = document.createTextNode(`${sub.first} =`);
            subP.appendChild(insSubPHalf);
        } 
        else {
            const insSubPWhole = document.createTextNode(`${sub.first} ${sub.operator} ${sub.second} =`);
            subP.appendChild(insSubPWhole);
        }
        mainP.appendChild(insMainP);
        historyContainer.append(subP, mainP);


        if (history.length === 0) {
            historyScreen.appendChild(historyContainer);
        } else {
            const getClassName = document.querySelector('.history-container');
            historyScreen.insertBefore(historyContainer, getClassName);
        }

}



function resultToZero(){
    result = '';
    subScreenNumber.textContent = '';
}

function divideByZero(){
     
     return 'ERROR'
}

function operation(){
    switch (oper){
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
        case 'X':
            result = first * second;
            break;
        case '/':
            result = second !== 0 ? first / second : divideByZero();
            break;
        default:
            console.log("ERROR")
    }
    subHistory.first = first;
    subHistory.second = second;
    subHistory.operator = oper;
    subHistory.result = result;
    historyCall(subHistory);
    history.push(subHistory);
    subHistory = {first: '', second: '', operator: '', result: '',};
    first = '';
    second = '';
    oper = '';
    
}

function handleClickOperator(op, curr){
    if (result === "ERROR") {
        result = 0;
    }


    if (op !== '='){

        if (first === '') {
           
            if (curr === '' && result === '') {
     
                first = 0;
            } else if (curr === '' && result !== ''){
      
                first = result;
            } 
            else if (curr !== ''){
  
                
                first = curr;
               
            }
            oper = op;
        
        } else {

            if (curr === '') {
       
                oper = op;
            
            } else {
            
                second = curr;
            }
            
        }

        

        if (first !== '' && second !== ''){
          
            operation();
            
            
            oper = op;
            first = result;
            
        }

        subScreenNumber.textContent = `${first} ${oper}`;

    } else {
      

        if (first === '') {
         
            first = curr === '' ? 0 : curr;
        } 

        if (oper === '') {
          
            result = first;
            subScreenNumber.textContent = `${first} =`;

            subHistory.first = first
            subHistory.result = result;
            historyCall(subHistory);
            history.push(subHistory);
            subHistory = {first: '', second: '', operator: '', result: '',};

        } else if (oper !== '' && second === '') {
     
            second = curr;

            
        }
        
       

        if (first !== '' && second !== '') {
     
            subScreenNumber.textContent = `${first} ${oper} ${second}`;
            operation();
            
        }
        

        
}
}


trashBtn.addEventListener('click', ()=> {
    history = [];
    while(historyScreen.firstChild) {
        historyScreen.removeChild(historyScreen.firstChild)
    };
    trashBtn.style.animation = `trash 600ms ease-in-out`;
    trashBtn.addEventListener('animationend', ()=> {
        trashBtn.style.animation = '';
    })
    
})
    

export { handleClickOperator, result, subScreenNumber, resultToZero }