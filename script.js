function showHistory() {
    pass // pas encore implémenté
}


function CEreset() {
    outputTag.innerHTML = "";
    valueA= "";
}


function Creset() {
    outputTag.innerHTML = "";
    valueA = "";
    valueB = "";
    calculationsTag.style.color = "#F3F3F3"; // cache le texte sans le décharger
}


function deleteDigit() {
    valueA = valueA.slice(0, -1);
    display(valueA);
}


function  modifySign() {
    valueA = -Number(valueA);
    display(valueA);
}


function commaHandler() {
    console.log(commaModeEnabled)
    if (!commaModeEnabled) {
        valueA += ".";
        display(valueA);
        commaModeEnabled = true
    }
}


function inverse() {
    valueA = formatNumber(1/valueA);
    display(valueA);
}


function square() {
    valueA =  formatNumber(valueA**2);
    display(valueA);
}


function squareRoot() {
    valueA = formatNumber(Math.sqrt(valueA));
    display(valueA);
}


function formatNumber(number) {
    if (number*100 % 1 !== 0) {
        return number.toFixed(2)
    } else { return number }
}


function display(output) {
    outputTag.innerHTML = output
}


function execute() {
    console.log(valueB, operator, valueA)
    
    if (operator==="" && valueA !== "") {
        calculationsTag.innerHTML = valueA+" =";
        calculationsTag.style.color = "#7E7E7E";
        return;
    }
    if (valueA === "") { console.log("ahah"); return }
    
    calculationsTag.innerHTML += ` ${valueA} =`
    valueA =  Number(valueA)
    valueB = Number(valueB)
    
    switch (operator) {
        case "/":
            valueA = formatNumber(valueB/valueA);
            break;
        case "*":
            valueA = valueB*valueA;
            break;
        case "+":
            valueA = valueB+valueA;
            break;
        case "-":
            valueA = valueB-valueA;
            break;
    }
    operator = "";
    if (valueA % 1 === 0 ) { commaModeEnabled = false };
    
    if (isFinite(valueA)) {
        display(valueA);
    } else {
        display("Error");
        valueA = "";
    }
}


function operatorHandler(clickedOperator) {
    if (operator !== "") { 
        // permet plusieurs opérations sans appuyer sur exe à chaque fois
        execute(); 
    }
    operator = clickedOperator;
    
    let symbol = operator
    switch (operator) {
        case "*": { symbol = String.fromCharCode(215) }
        case "/": {symbol = String.fromCharCode(247) }
    }
    calculationsTag.innerHTML = `${valueA} ${symbol}`
    calculationsTag.style.color = "#7E7E7E";
    
    valueB = valueA;
    valueA = "";
    commaModeEnabled = false;
}


const outputTag = document.getElementById("output");
const calculationsTag = document.getElementById("calculations");
var valueB = 0;
var valueA = "";
var operator = "";
var commaModeEnabled = false;

for (let number of document.getElementsByClassName("number")) {
    number.addEventListener("click", () => {
        valueA += number.innerHTML;
        display(valueA);
    });
};
