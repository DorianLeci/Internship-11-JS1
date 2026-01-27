class Operand{
    constructor(){
        this.value=null;
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
        this.shiftMode=false;
    }

    inputNumber(numKey){

        if(this.operator==null)
            this.first.value=this.first.value==null ? Number(numKey.value*this.first.sign) : Number(this.first.value+numKey.value);

        else if(this.operator!=null)
            this.second.value=this.second.value==null ? Number(numKey.value*this.second.sign) : Number(""+this.second.value+numKey.value);

        this.updateDisplayValue(numKey.value);
    }

    inputOperator(opKey){

        const label = this.shiftMode ? opKey.label.shift : opKey.label.normal;
        const isUnary = this.shiftMode ? this.operator?.unary.shift : this.operator?.unary.normal;
        
        if((label == "-" || label == "+") && this.handleFirstOperandSign(label))
            return;

        if(!isUnary && (label == "-" || label == "+") && this.handleSecondOperandSign(label))
            return;

        if(this.operator){
            this.displayValue = "Error: lančanje operacija nije dozvoljeno";
            return;
        }

        this.operator = opKey;
        this.updateDisplayValue(label);
    }

    handleFirstOperandSign(label){
        if(this.first.value!=null) return false;

        if(this.first.isSignUsed){
            this.displayValue = "Error: više predznaka prvog broja!";
            return true;
        }

        this.first.sign = label === "-" ? -1 : 1;
        this.first.isSignUsed=true;
        this.updateDisplayValue(label);
        return true;
        
    }

    handleSecondOperandSign(label){

        if(!this.operator || this.second.value!=null) return false;

        if (this.second.isSignUsed) {
            this.displayValue = "Error: više predznaka drugog broja!";
            return true;
        }

        this.second.sign = label === "-" ? -1 : 1;
        this.second.isSignUsed = true;
        this.updateDisplayValue(label);
        return true;
    }

    updateDisplayValue(newInput){
        this.displayValue+=newInput;

        console.log("first op: ",this.first);
        console.log("Operator:",this.operator);
        console.log("second op: ",this.second);
    }

    equals(){
        if(this.first.value==null){
            this.displayValue="Error: Ne postoji niti jedan operand";
            return;
        }

        if(this.operator==null)
            return;
            
        const isUnary= this.shiftMode ? this.operator.unary.shift : this.operator.unary.normal;

        if(!isUnary && this.second.value==null){
            this.displayValue="Error: Nedostaje drugi operand";
            return;
        }

        this.handleOperationResult(isUnary);
    }


    handleOperationResult(isUnary){
        const keyFunction= this.shiftMode ? this.operator.func.shift : this.operator.func.normal;
        const result= isUnary ? keyFunction(this.first.value) : keyFunction(this.first.value,this.second.value);
            
        this.displayValue=String(result);

        this.first.value=result;
        this.second.value=null;
        this.operator=null;
    }


}