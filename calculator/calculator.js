import { toNumberSafe,mapOperatorForDisplay,checkOperationEdgeCases } from "../helpers/mathHelpers.js";
import { ErrorMessages } from "../helpers/errorMessages.js";

class Operand{
    constructor(){
        this.value="";
        this.sign=1;
        this.isSignUsed=false;
    }
}

class OperatorState{
    constructor(){
        this.operator=null;
        this.shiftMode=false;
    }

    isOperatorUnary(){
        return this.shiftMode ? this.operator?.unary.shift : this.operator?.unary.normal;
    }

    getOperatorLabel(){
        return this.shiftMode ? this.operator?.label.shift : this.operator?.label.normal;
    }

    reset(){
        this.operator=null;
    }

}

export class Calculator{
    constructor(){
        this.first=new Operand();
        this.second=new Operand();
        this.operatorState=new OperatorState();
        this.displayValue="";
        this.displayError="";
    }

    inputNumber(numKey){
        const value=numKey.value;
        const target=this.operatorState.operator==null ? this.first: this.second;

        if(this.operatorState.operator && this.first.value==""){
            this.displayError=ErrorMessages.NO_OPERAND_BEFORE;
            return;
        }

        if(this.operatorState.isOperatorUnary()){
            this.displayError=ErrorMessages.UNARY_AFTER_OPERAND;
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
        const isUnary = this.operatorState.isOperatorUnary();
        
        if((label == "-" || label == "+") && this.handleFirstOperandSign(label))
            return;

        if(!isUnary && (label == "-" || label == "+") && this.handleSecondOperandSign(label))
            return;

        if(this.operatorState.operator){
            this.displayError =ErrorMessages.CHAINING_OPERATOR;
            return;
        }

        this.operatorState.operator = opKey;
        this.updateDisplayValue(mapOperatorForDisplay(label));
    }

    handleFirstOperandSign(label){
        if(this.first.value!=="") return false;

        if(this.first.isSignUsed){
            this.displayError = ErrorMessages.CHAINING_SIGN;
            return true;
        }

        this.first.sign = label === "-" ? -1 : 1;
        this.first.isSignUsed=true;
        this.updateDisplayValue(label);
        return true;
        
    }

    handleSecondOperandSign(label){

        if(!this.operatorState.operator || this.second.value!=="") return false;

        if (this.second.isSignUsed) {
            this.displayError = ErrorMessages.CHAINING_SIGN;
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
            this.displayError=ErrorMessages.NO_OPERAND;
            return;
        }

        if(this.operatorState.operator==null)
            return;
            
        const isUnary= this.operatorState.isOperatorUnary();

        if(this.operatorState.operator!=null && !isUnary && this.second.value===""){
            this.displayError=ErrorMessages.MISSING_SECOND_OPERAND;
            return;
        }

        this.handleOperationResult(isUnary);
    }


    handleOperationResult(isUnary){

        const firstNum= toNumberSafe(this.first.value,this.first.sign);
        if(firstNum==null)
            this.displayError=ErrorMessages.INVALID_OPERAND;

        const secondNum= toNumberSafe(this.second.value,this.second.sign);
        if(secondNum==null)
            this.displayError=ErrorMessages.INVALID_OPERAND;

        const edgeCaseError=checkOperationEdgeCases(this.operatorState.getOperatorLabel(),firstNum,secondNum,isUnary);

        if(edgeCaseError){
            this.displayError=edgeCaseError;
            return;
        }

        const keyFunction= this.shiftMode ? this.operatorState.operator.func.shift : this.operatorState.operator.func.normal;
        const result= isUnary ? keyFunction(firstNum) : keyFunction(firstNum,secondNum);
            
        this.displayValue=String(result);
        this.first.value=this.displayValue;

        this.reset();
    }

    reset(){
        this.second.value="";
        this.second.sign=1;
        this.second.isSignUsed=false;

        this.operatorState.reset();

        this.displayError=null;
    }

}