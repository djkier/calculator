const subScreenNumber = document.querySelector('#screen p');
let first = '';
let second = '';
let result = '';
let oper = '';
let history = [];
let subHistory = {first: '', second: '', operator: '', result: '',}


function resultToZero(){
    result = '';
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
        console.log('not equal')
        
        if (first === '') {
           
            if (curr === '' && result === '') {
                console.log('q1')
                first = 0;
            } else if (curr === '' && result !== ''){
                console.log('w1')
                first = result;
            } 
            else if (curr !== ''){
                console.log('e1')
                
                first = curr;
               
            }
            oper = op;
        
        } else {

            if (curr === '') {
                console.log('r1')
                oper = op;
            
            } else {
                console.log('t1')
                second = curr;
            }
            
        }

        

        if (first !== '' && second !== ''){
            console.log('y1')
            operation();

            
            oper = op;
            first = result;
            
        }

        subScreenNumber.textContent = `${first} ${oper}`;

    } else {
        console.log('equal')
        console.log(oper)

        if (first === '') {
            console.log('q2')
            first = curr === '' ? 0 : curr;
        } 

        if (oper === '') {
            console.log('w2')
            result = first;
            subScreenNumber.textContent = `${first} =`;

            subHistory.first = first
            subHistory.result = result;
            history.push(subHistory);
            subHistory = {first: '', second: '', operator: '', result: '',};

        } else if (oper !== '' && second === '') {
            console.log('e2')
            second = curr;

            
        }
        
       

        if (first !== '' && second !== '') {
            console.log('r2')
            subScreenNumber.textContent = `${first} ${oper} ${second}`;
            operation();
        }
        

        
}

console.log(history);

    
}

    

export { handleClickOperator, result, subScreenNumber, resultToZero }