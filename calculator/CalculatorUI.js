import { Calculator } from "./calculator.js";

export class CalculatorUI{
    constructor(displayContainer,buttonsContainer,keys){
        this.displayContainer=displayContainer;
        this.buttonsContainer=buttonsContainer;
        this.keys=keys;
        this.calculator=new Calculator();
    }

    createButtons(){
        this.keys.forEach(key=>{

            const btn=document.createElement("button");
            if(key.type=="number")
                btn.textContent=key.value;
            else if(key.type=="operation")
                btn.textContent= this.calculator.shiftMode ? key.label.shift : key.label.normal;

            else if(key.type=="action")
                btn.textContent=key.label;

            this.buttonsContainer.appendChild(btn);

            btn.onclick=()=>this.handleKey(key);

        });
    }

    handleKey(key){
        if(key.type=="number")
            this.calculator.inputNumber(key);

        if(key.type=="operation")
            this.calculator.inputOperator(key);

        if(key.type=="action"){

            switch (key.actionType){
                case "equals":
                    this.calculator.equals();
            }
        }


        this.displayContainer.textContent=this.calculator.displayValue;
    }
}



