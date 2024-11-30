function showHistory() {
    pass // pas encore implémenté
}


function CEreset() {
    outputTag.innerHTML = "";
    valueA= ""
}


function Creset() {
    outputTag.innerHTML = ""
    valueA = ""
    valueB = ""
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
    valueA += ".";
    display(valueA);
}


function inverse() {
    valueA = (1/valueA).toFixed(2);
    display(valueA);
}


function square() {
    valueA =  (valueA**2).toFixed(2);
    display(valueA);
}


function squareRoot() {
    valueA = Math.sqrt(valueA);
    display(valueA);
}


function display(output) {
    outputTag.innerHTML = output
}


function execute() {
    console.log(valueB, operator, valueA)
    
    if (valueB === "" || valueA === "") { return }
    
    valueA =  Number(valueA)
    valueB = Number(valueB)
    
    switch (operator) {
        case "/":
            valueA = (valueB/valueA).toFixed(2);
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
    operator = clickedOperator
    valueB = valueA;
    valueA = "";
}


const outputTag = document.getElementById("output")
var valueB = 0;
var valueA = "";
var operator = "";


for (let number of document.getElementsByClassName("number")) {
    number.addEventListener("click", () => {
        valueA += number.innerHTML;
        display(valueA)
    });
};
