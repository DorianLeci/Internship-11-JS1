import { toNumberSafe,mapOperatorForDisplay } from "../helpers/helpers.js";

class Operand{
    constructor(){
        this.value="";
        this.sign=1;
        this.isSignUsed=false;
    }
}

export class Calculator{
    constructor(){
        this.first=new Operand();
        this.second=new Operand();
        this.operator=null;
        this.displayValue="";
        this.displayError="";
        this.shiftMode=false;
    }

    inputNumber(numKey){
        const value=numKey.value;
        const target=this.operator==null ? this.first: this.second;

        if(this.isOperatorUnary()){
            this.displayError="Zabranjeno dodavanje operanada iza unarnog operatora";
            return;
        }

        if(value=="."){
            if(target.value?.includes(".")) return;

            target.value=target.value==="" ? "0." : target.value + ".";
        }

        else
            target.value+=value;

        this.updateDisplayValue(numKey.value);
        this.displayError="";
    }

    inputOperator(opKey){

        const label = this.shiftMode ? opKey.label.shift : opKey.label.normal;
        const isUnary = this.isOperatorUnary();
        
        if((label == "-" || label == "+") && this.handleFirstOperandSign(label))
            return;

        if(!isUnary && (label == "-" || label == "+") && this.handleSecondOperandSign(label))
            return;

        if(this.operator){
            this.displayError = "Lančanje operacija nije dozvoljeno";
            return;
        }

        this.operator = opKey;
        this.updateDisplayValue(mapOperatorForDisplay(label));
    }

    handleFirstOperandSign(label){
        if(this.first.value!=="") return false;

        if(this.first.isSignUsed){
            this.displayError = "Lančanje predznaka broja nije dozvoljeno";
            return true;
        }

        this.first.sign = label === "-" ? -1 : 1;
        this.first.isSignUsed=true;
        this.updateDisplayValue(label);
        return true;
        
    }

    handleSecondOperandSign(label){

        if(!this.operator || this.second.value!=="") return false;

        if (this.second.isSignUsed) {
            this.displayError = "Lančanje predznaka broja nije dozvoljeno";
            return true;
        }

        this.second.sign = label === "-" ? -1 : 1;
        this.second.isSignUsed = true;
        this.updateDisplayValue(label);
        return true;
    }

    updateDisplayValue(newInput){
        this.displayValue+=newInput;
    }

    equals(){
        if(this.first.value===""){
            this.displayError="Ne postoji niti jedan operand";
            return;
        }

        if(this.operator==="")
            return;
            
        const isUnary= this.isOperatorUnary();

        if(!isUnary && this.second.value===""){
            this.displayError="Nedostaje drugi operand";
            return;
        }

        this.handleOperationResult(isUnary);
    }


    handleOperationResult(isUnary){

        const firstNum= toNumberSafe(this.first.value,this.first.sign);
        if(firstNum==null)
            this.displayError="Operand nije validan broj";

        const secondNum= toNumberSafe(this.second.value,this.second.sign);
        if(secondNum==null)
            this.displayError="Operand nije validan broj";

        const keyFunction= this.shiftMode ? this.operator.func.shift : this.operator.func.normal;
        const result= isUnary ? keyFunction(firstNum) : keyFunction(firstNum,secondNum);
            
        this.displayValue=String(result);

        console.log("Operand1: ",firstNum);
        console.log("Operator: ",this.operator);
        console.log("Operand2: ",secondNum);


        this.first.value=this.displayValue;

        this.reset();
    }

    reset(){
        this.second.value="";
        this.second.sign=1;
        this.second.isSignUsed=false;

        this.operator=null;

        this.displayError=null;
    }

    isOperatorUnary(){
        return this.shiftMode ? this.operator?.unary.shift : this.operator?.unary.normal;
    }



}