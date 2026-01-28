import { KeyType } from "../enums/KeyType.js";
import { Calculator } from "./Calculator.js";

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
                case KeyType.NUMBER:
                    btn.textContent=key.value;
                    btn.classList.add("button--dark");
                    break;

                case KeyType.OPERATOR:
                    btn.textContent= this.calculator.shiftMode ? key.label.shift : key.label.normal;
                    btn.classList.add("button--orange");  

                    if(["÷","×"].includes(btn.textContent))
                        btn.classList.add("button--operator"); 

                    break;
                    
                case KeyType.EQUALS:
                    btn.textContent= key.label;
                    btn.classList.add("button--green");      
                    break;
                    
                case KeyType.ACTION:
                    btn.textContent= key.label;
                    btn.classList.add("button--red"); 
                    break;                   
            }

            key.domElement=btn;

            this.buttonsContainer.appendChild(btn);

            btn.onclick=()=>this.handleKey(key);

        });
    }

    handleKey(key){

        switch (key.type){
            case KeyType.NUMBER:
                this.calculator.inputNumber(key);
                break;

            case KeyType.OPERATOR:
                this.calculator.inputOperator(key);
                break;

            case KeyType.ACTION:
                this.handleActionKey(key);
                break;

            case KeyType.EQUALS:
                this.calculator.equals();
                break;
        }


        this.updateUI();


    }

    updateUI(){
        this.displayValueEl.textContent=this.calculator.displayValue;

        this.displayErrorEl.textContent=this.calculator.displayError;
    }

    handleActionKey(key){
        switch (key.actionType) {
            case "clear":
                this.calculator.clearAll();
                break;
            case "shift":
                this.calculator.operatorState.toggleShiftMode();
                this.updateOperationKeys();
                break;
            default:
                break;
        }
    }

    updateOperationKeys(){

        const operationKeys=this.keys.filter(key=>key.type==KeyType.OPERATOR);

        operationKeys.forEach(key=>{
            if(!key.domElement) return;
            const label=this.calculator.operatorState.getLabel(key);

            key.domElement.textContent=label;
        });
    }
}    



