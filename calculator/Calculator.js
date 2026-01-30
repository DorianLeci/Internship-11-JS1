import { toNumberSafe,mapOperatorForDisplay,checkOperationEdgeCases, formatNumberForDisplay } from "../helpers/MathHelpers.js";
import { ErrorMessages } from "../helpers/ErrorMessages.js";
import { OperatorState } from "./OperatorState.js";
import { Operand } from "./Operand.js";
import { Position } from "../enums/PositionEnum.js";
import { OperatorLabel} from "../enums/OperatorLabel.js";
import { History } from "../history/History.js";


export class Calculator{
    constructor(){
        this.first=new Operand();
        this.second=new Operand();
        this.operatorState=new OperatorState();
        this.history=new History();
        this.displayValue="";
        this.displayError="";
        this.isOn=true;
    }

    inputNumber(numKey){
        this.displayError="";7

        const value=numKey.value;
        const isOperatorPrefix=this.operatorState.isSnapshotPrefix();
        const operator = this.operatorState.operator;


        if (operator?.unary && operator.position == Position.POSTFIX) {
            this.displayError = ErrorMessages.UNARY_AFTER_OPERAND;
            return;
        }

        const target = (!operator || isOperatorPrefix) ? this.first : this.second;

        if(operator && !isOperatorPrefix && this.first.value==""){
            this.displayError=ErrorMessages.NO_OPERAND_BEFORE;
            return;
        }

        if(value=="."){
            if(target.value?.includes(".")) return;
            target.value=target.value==="" ? "0." : target.value + ".";
        }
        else
            target.value+=value;

        this.updateDisplayValue(numKey.value);
    }

    inputOperator(opKey){
        this.displayError="";

        const label = this.operatorState.getLabel(opKey)
        const isUnary=this.operatorState.isUnary(opKey);
        const isPrefix=this.operatorState.isPrefix(opKey);
        
        if((label == OperatorLabel.ADDITION || label == OperatorLabel.SUBTRACTION) && this.handleFirstOperandSign(label))
            return;

        if(!isUnary && (label == OperatorLabel.ADDITION || label == OperatorLabel.SUBTRACTION) && this.handleSecondOperandSign(label))
            return;

        if(this.operatorState.operator){
            this.displayError =ErrorMessages.CHAINING_OPERATOR;
            return;
        }        

        if(isUnary && isPrefix){
            this.handlePrefixUnary(opKey);
            return;
        }        

        this.saveOperator(opKey);
    }

    handleFirstOperandSign(label){

        if (this.first.value!=="" 
            && this.first.value !== OperatorLabel.SUBTRACTION 
            && this.first.value !== OperatorLabel.ADDITION) return false;

        if(this.first.isSignUsed){
            this.displayError = ErrorMessages.CHAINING_SIGN;
            return true;
        }

        this.first.value=label;
        this.first.isSignUsed=true;
        this.updateDisplayValue(this.first.value);

        return true;
        
    }

    handleSecondOperandSign(label){

        const operator=this.operatorState.operator;

        if (!operator) return false;

        if(operator.unary){
            this.displayError = ErrorMessages.UNARY_AFTER_OPERAND;
            return true;
        }

        if (this.second.value!=="" 
            && this.second.value !== OperatorLabel.SUBTRACTION 
            && this.second.value !== OperatorLabel.ADDITION) return false;

        if (this.second.isSignUsed) {
            this.displayError = ErrorMessages.CHAINING_SIGN;
            return true;
        }

        this.second.value =label;
        this.second.isSignUsed = true;
        this.updateDisplayValue(this.second.value);
        return true;
    }

    updateDisplayValue(newInput){
        this.displayValue+=newInput;
    }

    handlePrefixUnary(opKey){
        if(this.first.value!==""){
            this.displayError=ErrorMessages.UNARY_POSITION(this.operatorState.getLabel(opKey));
            return;
        }
        this.saveOperator(opKey);
    }

    saveOperator(opKey){    
        const opLabel=this.operatorState.getLabel(opKey);
        const opFunc=this.operatorState.getFunction(opKey);
        const opUnary=this.operatorState.isUnary(opKey);
        const opPosition=this.operatorState.getPosition(opKey);

        const newOperator=this.operatorState.operator ={
            label: opLabel,
            function: opFunc,
            unary: opUnary,
            position: opPosition
        };

        this.updateDisplayValue(mapOperatorForDisplay(newOperator.label)); 
    }

    equals(){

        if(this.first.value===""){
            this.displayError=ErrorMessages.NO_OPERAND;
            return false;
        }

        if(!this.operatorState.operator){
            this.operatorState.operator={
                label: OperatorLabel.IDENTITY,
                unary: true,
                function: (x)=>x,
            };
        }
            
        const isUnary= this.operatorState.operator.unary;

        if(this.operatorState.operator && !isUnary && this.second.value===""){
            this.displayError=ErrorMessages.MISSING_SECOND_OPERAND;
            return false;
        }

        const result=this.handleOperationResult(isUnary);

        if (result==null)
            return false;

        return true;
    }


    handleOperationResult(isUnary){

        const firstNum= toNumberSafe(this.first.value);
        if(firstNum==null){
            this.displayError=ErrorMessages.INVALID_OPERAND;
            return null;
        }

        const secondNum= toNumberSafe(this.second.value);
        if(secondNum==null){
            this.displayError=ErrorMessages.INVALID_OPERAND;
            return null;
        }

        const edgeCaseError=checkOperationEdgeCases(this.operatorState.operator.label,firstNum,secondNum,isUnary);

        if(edgeCaseError){
            this.displayError=edgeCaseError;
            return null;
        }

        const keyFunction=this.operatorState.operator.function;

        const result= isUnary ? keyFunction(firstNum) : keyFunction(firstNum,secondNum);
        this.displayResultAndReset(firstNum,secondNum,result);

        return result;
            
    }

    displayResultAndReset(firstNum,secondNum,result){

        const formattedNumber=formatNumberForDisplay(result);

        console.log("Operator: ",this.operatorState.operator);
        this.history.addEntry(firstNum,secondNum,this.operatorState.operator,result,this.displayValue);

        this.displayValue=formattedNumber;

        this.first.value=this.displayValue;

        this.reset();
    }


    reset(resetFirst=false){

        if(resetFirst){
            this.first.value="";
            this.first.isSignUsed=false;
        }
            
        this.second.value="";
        this.second.isSignUsed=false;

        this.operatorState.reset();

        this.displayError="";
    }

    clearAll(){
        this.reset(true);

        this.displayValue="";
    }

    togglePower(){
        this.isOn=!this.isOn;

        if(!this.isOn){
            this.clearAll();
            this.history.clear();
        }
    }

}