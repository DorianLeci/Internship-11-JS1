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
            else
                btn.textContent=key.label.normal;

            this.buttonsContainer.appendChild(btn);

            btn.onclick=()=>this.handleKey(key);

        });
    }

    handleKey(key){
        if(key.type=="number")
            this.calculator.inputNumber(key.value);

        if(key.type=="operation")
            this.calculator.inputOperator(key.label.normal);

        this.displayContainer.textContent=this.calculator.displayValue;
    }
}



