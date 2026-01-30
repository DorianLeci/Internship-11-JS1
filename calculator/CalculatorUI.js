import { KeyType } from "../enums/KeyType.js";
import { Calculator } from "./Calculator.js";
import { OperatorType } from "../enums/OperatorType.js";

export class CalculatorUI{
    constructor(displayContainer,buttonsContainer,keys){
        this.displayValueEl = displayContainer.querySelector(".display__value");
        this.displayErrorEl = displayContainer.querySelector(".display__error");
        this.buttonsContainer=buttonsContainer;
        this.keys=keys;
        this.calculator=new Calculator();
        this.initialFont=window.getComputedStyle(this.displayValueEl).fontSize;
    }

    createButtons(){
        this.keys.forEach(key=>{

            const btn=document.createElement("button");
            btn.classList.add("calculator__button");

            switch (key.type){
                case KeyType.NUMBER:
                    btn.textContent=key.value;
                    btn.classList.add("button--dark");
                    break;

                case KeyType.OPERATOR:
                    btn.textContent= this.calculator.shiftMode ? key.label.shift : key.label.normal;
                    btn.classList.add("button--orange");  

                    if([OperatorType.DIVISION,OperatorType.MULTIPLICATION].includes(btn.textContent))
                        btn.classList.add("button--small"); 

                    break;
                    
                case KeyType.EQUALS:
                    btn.textContent= key.label;
                    btn.classList.add("button--green");      
                    break;
                    
                case KeyType.ACTION:
                    btn.textContent= key.label;
                    key.actionType=="power" ? btn.classList.add("button--power-on") : btn.classList.add("button--red"); 
                    break;                   
            }

            key.domElement=btn;

            this.buttonsContainer.appendChild(btn);

            btn.onclick=()=>this.handleKey(key);

        });
    }

    handleKey(key){

        if(!this.calculator.isOn && key.actionType!="power") return;

        switch (key.type){
            case KeyType.NUMBER:
                this.calculator.inputNumber(key);
                this.adjustFontSize(this.displayValueEl);
                break;

            case KeyType.OPERATOR:
                this.calculator.inputOperator(key);
                this.adjustFontSize(this.displayValueEl);                
                break;

            case KeyType.ACTION:
                this.handleActionKey(key);
                break;

            case KeyType.EQUALS:
                if(this.calculator.equals()==true)
                    this.resetFont();
                break;
        }


        this.updateUI();


    }

    updateUI(){
        this.displayValueEl.textContent=this.calculator.displayValue;

        this.displayErrorEl.textContent=this.calculator.displayError;
    }

    adjustFontSize(element, minFont = 12, maxFont = 40) {

        let fontSize = parseInt(window.getComputedStyle(element).fontSize);

        if(element.scrollWidth>element.clientWidth && fontSize>minFont)
            element.style.fontSize=(fontSize-1)+"px";

        else if(element.scrollWidth<element.clientWidth && fontSize<maxFont)
            element.style.fontSize=(fontSize+1)+"px";
    }

    handleActionKey(key){
        switch (key.actionType) {
            case "clear":
                this.calculator.clearAll();
                this.resetFont();
                break;
            case "shift":
                this.calculator.operatorState.toggleShiftMode();
                this.updateOperationKeys();
                break;

            case "power":
                this.calculator.togglePower();
                this.handlePowerSwitch(key);
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

            this.updateClass(key,label);

            key.domElement.textContent=label;
        });
    }

    updateClass(key,label){

        if([OperatorType.LOGARITHM,OperatorType.SQRT].includes(label)){
            key.domElement.classList.remove("button--small");
        }
            
        if([OperatorType.DIVISION,OperatorType.MULTIPLICATION].includes(label))
            key.domElement.classList.add("button--small");
    }

    resetFont(){
        this.displayValueEl.style.fontSize=this.initialFont;
    }

    handlePowerSwitch(key){
        key.domElement.classList.toggle("button--power-on",this.calculator.isOn);
        key.domElement.classList.toggle("button--power-off",!this.calculator.isOn);

        this.displayValueEl.parentElement.classList.toggle("display--off",!this.calculator.isOn);

        key.domElement.textContent= this.calculator.isOn ? "ON" : "OFF";
    }
}    



