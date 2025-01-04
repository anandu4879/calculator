
const inputBox = document.getElementById('input');
const expressionDiv = document.getElementById('expression');
const resultDiv=document.getElementById('result');

let result='';
let expression='';
//define event handlerfor button click
function buttonClick(event)
{
    //get values from clicked button
    const target=event.target;
    const action=target.dataset.action;
    const value=target.dataset.value; 
    //console.log(target,action,value);

    switch(action){
        case 'number':
            addValue(value);
            break;
        case 'clear':
            clear();
            break;
        case 'submit':
            submit();
            break;
        case 'negate':
            negate();
            break;
        case 'mod':
            percentage();
            break;
        case 'decimal':
            decimal(value);
            break;
        case 'mod':
            percentage();
            break;
        case 'backspace':
            backspace();
            break;
        case 'addition':
        case 'multiplication':
        case 'division': 
        case 'subtraction':
            if(expression===''&& result!==''){
                startFromResult(value);
            }else if(expression!==''&&!isLastOperator()){
                addValue(value);
            }
            break;
    }
    //display
    updateDisplay(expression,result);
}

inputBox.addEventListener('click',buttonClick);

function addValue(value){
   if(value=='.'){
    const lastOperatorIndex=expression.search(/[+\-+/]/);
    const lastDecimalIndex=expression.indexOf('.');
    const lastNumberIndex=Math.max(expression.indexOf('+'),expression.indexOf('-'),expression.indexOf('*'),expression.indexOf('/'));
    if((lastDecimalIndex < lastOperatorIndex ||lastDecimalIndex < lastNumberIndex ||lastDecimalIndex === -1)&&(expression=== '' || expression.slice(lastNumberIndex + 1).indexOf('-')===-1)){
        expression+=value;
    }
   }else{
    expression+=value;
   }
}
function updateDisplay(expression,result){
    expressionDiv.textContent=expression;
    resultDiv.textContent=result;
}
function clear(){
    expression='';
    result='';
}
function backspace(){
    expression=expression.slice(0,-1)
}
function startFromResult(value){
    expression+=result+value;

}
function isLastOperator(value){
    return isNaN(parseInt(expression.slice(-1)));
}
function submit(){
    result=evaluateExpression();
    expression='';
}
function evaluateExpression(){
    const evalResult=eval(expression);
    return isNaN(evalResult)|| !isFinite(evalResult)
    ? ''
    :evalResult < 1
    ? parseFloat(evalResult.toFixed(10))
    :parseFloat(evalResult.toFixed(2)); 
}
function negate(){
    if (expression===''&&result!==''){
         result=-result;
    }else if(!expression.startsWith('-')&& expression!==''){
        expression='-'+expression;
    }else if(expression.startsWith('-')){
        expression=expression.slice(1);
    }

}
function percentage(){
    if(expression!==''){
        result=evaluateExpression();
        expression='';
        if(!isNaN(result)&&isFinite(result)){
            result/=100;
        }else{
            result='';
        }
    }else if(result!==''){
        result=parseFloat(result)/100;
    }
}
function decimal(value){
    if(!expression.endsWith('.')&& !isNaN(expression.slice(-1))){
        addValue(value);
    }

}
function adjustForScreen() {
    const width = window.innerWidth;
    const fontSize = width < 480 ? '14px' : '32px';
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => (btn.style.fontSize = fontSize));
}

window.addEventListener('resize', adjustForScreen);
window.addEventListener('load', adjustForScreen);
