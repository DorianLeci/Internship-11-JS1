import { Calculator } from "./calculator.js";

export class CalculatorUI{
    constructor(displayContainer,buttonsContainer,keys){
        this.displayValueEl = displayContainer.querySelector(".display__value");
        this.displayErrorEl = displayContainer.querySelector(".display__error");
        this.buttonsContainer=buttonsContainer;
        this.keys=keys;
        this.calculator=new Calculator();
    }

    createButtons(){
        this.keys.forEach(key=>{

            const btn=document.createElement("button");

            switch (key.type){
                case "number":
                    btn.textContent=key.value;
                    btn.classList.add("button--dark");
                    break;

                case "operation":
                    btn.textContent= this.calculator.shiftMode ? key.label.shift : key.label.normal;
                    btn.classList.add("button--orange");   
                    break;
                    
                case "equals":
                    btn.textContent= key.label;
                    btn.classList.add("button--green");      
                    break;
                    
                case "action":
                    btn.textContent= key.label;
                    btn.classList.add("button--red"); 
                    break;                   
            }

            this.buttonsContainer.appendChild(btn);

            btn.onclick=()=>this.handleKey(key);

        });
    }

    handleKey(key){

        switch (key.type){
            case "number":
                this.calculator.inputNumber(key);
                break;

            case "operation":
                this.calculator.inputOperator(key);
                break;

            case "action":
                break;

            case "equals":
                this.calculator.equals();
                break;
        }


        this.updateUI();


    }

    updateUI(){
        this.displayValueEl.textContent=this.calculator.displayValue;

        this.displayErrorEl.textContent=this.calculator.displayError;

    }
}



