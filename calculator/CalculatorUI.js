import { KeyType } from "../enums/KeyType.js";
import { Calculator } from "./Calculator.js";
import { OperatorLabel } from "../enums/OperatorLabel.js";
import { ActionType } from "../enums/ActionType.js";
import { HistoryManager } from "../history/HistoryManager.js";

export class CalculatorUI{
    constructor(displayContainer,buttonsContainer,keys){
        this.displayValueEl = displayContainer.querySelector(".display__value");
        this.displayErrorEl = displayContainer.querySelector(".display__error");
        this.buttonsContainer=buttonsContainer;
        this.keys=keys;
        this.calculator=new Calculator();
        this.baseFont=window.getComputedStyle(this.displayValueEl).fontSize;
        this.filteredList=[];
        this.historyManager=new HistoryManager(this.calculator.history);
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

                    if([OperatorLabel.DIVISION,OperatorLabel.MULTIPLICATION].includes(btn.textContent))
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

            default:
                return;
        }


        this.updateUI();


    }

    updateUI(){
        this.displayValueEl.textContent=this.calculator.displayValue;

        this.displayErrorEl.textContent=this.calculator.displayError;
    }

    adjustFontSize(element, minFont = 12) {

        let maxFontVar;

        if(window.innerWidth>=701) maxFontVar="--display-base-font-large";
        else if(window.innerWidth>=500) maxFontVar="--display-base-font-medium";
        else maxFontVar="--display-base-font-small";

        const computedStyle = getComputedStyle(element);
        const maxFont = parseInt(computedStyle.getPropertyValue(maxFontVar));

        let fontSize = parseInt(window.getComputedStyle(element).fontSize);

        if (element.scrollWidth > element.clientWidth && fontSize > minFont) {
            element.style.fontSize = (fontSize - 1) + 'px';
        } else if (element.scrollWidth < element.clientWidth && fontSize < maxFont) {
            element.style.fontSize = (fontSize + 1) + 'px';
        }
    }

    handleActionKey(key){
        switch (key.actionType) {
            case ActionType.CLEAR:
                this.calculator.clearAll();
                this.resetFont();
                break;
            case ActionType.SHIFT:
                this.calculator.operatorState.toggleShiftMode();
                this.updateOperationKeys();
                break;

            case ActionType.POWER:
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

        if([OperatorLabel.LOGARITHM,OperatorLabel.SQRT].includes(label)){
            key.domElement.classList.remove("button--small");
        }
            
        if([OperatorLabel.DIVISION,OperatorLabel.MULTIPLICATION].includes(label))
            key.domElement.classList.add("button--small");
    }

    resetFont(){
        this.displayValueEl.style.fontSize="";
    }

    handlePowerSwitch(key){

        const isOn=this.calculator.isOn;

        const historyToggle=document.querySelector(".history__toggle");
        historyToggle.classList.toggle("toggle--off",!isOn);

        key.domElement.classList.toggle("button--power-on",isOn);
        key.domElement.classList.toggle("button--power-off",!isOn);

        this.displayValueEl.parentElement.classList.toggle("display--off",!isOn);

        this.buttonsContainer.classList.toggle("buttons--off",!isOn);

        key.domElement.textContent= isOn ? "ON" : "OFF";
    }

    addHistoryEventListener(){
        const historyToggle=document.querySelector(".history__toggle");
        const historyDropdown=document.querySelector(".history__dropdown");
        const calculatorOverlay=document.querySelector(".calculator-overlay");

        historyToggle.addEventListener("click",()=>{

            if(!this.calculator.isOn) return;

            historyDropdown.classList.toggle("active");
            calculatorOverlay.classList.toggle("active");
            
            this.filteredList=this.historyManager.getFilteredList();
            this.renderHistory();

        });
    }

    addFilterButtons(){
        const historyFilters=document.querySelector(".history__filters");

        Object.values(OperatorLabel).forEach(op=>{
            const newButton=document.createElement("button");
            newButton.classList.add("history__filter");

            newButton.dataset.filter=op;
            newButton.textContent=op;

            historyFilters.appendChild(newButton);
            
            newButton.addEventListener("click",(e)=>{
                const operatorFilter=e.currentTarget.dataset.filter;
                this.filteredList=this.historyManager.setOperatorFilter(operatorFilter);
                this.renderHistory();
            });
        });

        const allButton=document.querySelector('[data-filter="all"]');

        allButton.addEventListener("click",()=>{
            this.resetHistoryWithAll();
            this.renderHistory();
        });
    }

    addHistorySearchListener(){
        const searchInput=document.querySelector(".history__search");

        searchInput.addEventListener("input",(e)=>{
            const query=e.currentTarget.value;
            this.filteredList=this.historyManager.search(query);

            this.renderHistory();
        });
    }

    renderHistory(){
        const historyList=document.querySelector(".history__list");

        historyList.innerHTML="";

        this.filteredList.forEach(entry=>{
            const entryDiv=document.createElement("div");
            entryDiv.classList.add("history__item");

            const exprResultDiv=document.createElement("div");
            exprResultDiv.classList.add("history__expression-result");
            exprResultDiv.textContent=`${entry.expression} = ${entry.result}`;

            const timeDiv=document.createElement("div");
            timeDiv.classList.add("history__time-div");
            timeDiv.textContent=entry.addedAt.toLocaleTimeString();

            entryDiv.appendChild(exprResultDiv);
            entryDiv.appendChild(timeDiv);

            historyList.appendChild(entryDiv);
        })
    }

    resetHistoryWithAll(){
        this.activeFilter=null;
        this.filteredList=this.historyManager.clearOperatorFilter();
    }

    InitializeUI(){
        this.createButtons();
        this.addHistoryEventListener();
        this.addFilterButtons();
        this.addHistorySearchListener();
    }


}    



