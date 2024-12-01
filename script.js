function toggleHistory() {
    if (historyIsVisible) {
        calculationsTag.style.color = "#F3F3F3"; // cache le texte sans le décharger
        historyIsVisible = !historyIsVisible;
    } else {
        calculationsTag.style.color = "#7E7E7E";
        historyIsVisible = !historyIsVisible;
    }
}


function CEreset() {
    outputTag.innerHTML = "";
    valueA = "";
}


function Creset() {
    outputTag.innerHTML = "";
    valueA = "";
    valueB = "";
    calculationsTag.style.color = "#F3F3F3"; // cache le texte sans le décharger
}


function deleteDigit() {
    valueA = valueA.slice(0, -1);
    if (valueA.slice(-1) === ".") { 
        valueA = valueA.slice(0, -1); 
        commaModeEnabled = false;
    }
    display(valueA);
}


function  modifySign() {
    valueA = String(-Number(valueA));
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
    calculationsTag.innerHTML =  `1/(${valueA})`
    valueA = format(1/valueA);
    display(valueA);
}


function square() {
    calculationsTag.innerHTML =  `sqr(${valueA})`
    valueA =  format(valueA**2);
    display(valueA);
}


function squareRoot() {
    calculationsTag.innerHTML =  String.fromCharCode(8730)+valueA
    valueA = format(Math.sqrt(valueA));
    display(valueA);
}


function format(value) {
    if (value*100 % 1 !== 0) {
        return value.toFixed(2)
    } else { 
        if (typeof value === "string") {
            return value;
        } else {
            return String(value)
        }
    }
}


function display(output) {
    outputTag.innerHTML = output
}


function execute() {    
    if (operator==="" && valueA !== "") {
        calculationsTag.innerHTML = valueA+" =";
        calculationsTag.style.color = "#7E7E7E";
        return;
    }
    if (valueA === "") { return }
    
    calculationsTag.innerHTML += ` ${valueA} =`
    valueA =  Number(valueA)
    valueB = Number(valueB)
    
    switch (operator) {
        case "/": valueA = format(valueB/valueA); break;
        case "*": valueA = valueB*valueA; break;
        case "+": valueA = valueB+valueA; break;
        case "-": valueA = valueB-valueA; break;
    }
    operator = "";
    if (valueA % 1 === 0 ) { commaModeEnabled = false };
    
    if (isFinite(valueA)) {
        display(valueA);
    } else {
        display("Error");
        valueA = "";
    }
    valueA =  String(valueA)
    valueB = String(valueB)
}


function operatorHandler(clickedOperator) {
    if (operator !== "" && valueA !=="") { 
        // permet plusieurs opérations sans appuyer sur exe à chaque fois
        execute(); 
        return;
    }
    operator = clickedOperator;

    let symbol = operator
    switch (operator) {
        case "*":  symbol = String.fromCharCode(215); break
        case "/": symbol = String.fromCharCode(247); break
        case "-": symbol = String.fromCharCode(8722); break 
    }
    if (operator !== "" && valueA === "") {
        // modifie l'opérateur selectionné
        calculationsTag.innerHTML = `${valueB} ${symbol}`;
        return;
    }

    calculationsTag.innerHTML = `${valueA} ${symbol}`
    calculationsTag.style.color = "#7E7E7E";
    
    valueB = valueA;
    valueA = "";
    commaModeEnabled = false;
}


const outputTag = document.getElementById("output");
const calculationsTag = document.getElementById("calculations");
var valueB = "";
var valueA = "";
var operator = "";
var commaModeEnabled = false;
var historyIsVisible = true

for (let number of document.getElementsByClassName("number")) {
    number.addEventListener("click", () => {
        valueA += number.innerHTML;
        display(valueA);
    });
};
