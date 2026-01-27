export class Calculator{
    constructor(){
        this.first=null;
        this.second=null;
        this.operator=null;
        this.displayValue="";
        this.shiftMode=false;
    }

    inputNumber(numKey){

        if(!this.operator)
            this.first=this.first===null ? Number(numKey.value) : Number(this.first+numKey.value);

        else if(this.operator)
            this.second=this.second===null ? Number(numKey.value) : Number(this.second+numKey.value);

        this.updateDisplayValue(numKey.value);
    }

    inputOperator(opKey){

        const labelToDisplay= this.shiftMode ? opKey.label.shift : opKey.label.normal;

        if(!this.first && (labelToDisplay=="-" || labelToDisplay=="+"))
            this.first=0;

        this.operator=opKey;

        this.updateDisplayValue(labelToDisplay);
    }

    updateDisplayValue(newInput){
        this.displayValue+=newInput;

        console.log("first op: ",this.first);
        console.log("Operator:",this.operator);
        console.log("second op: ",this.second);
    }

    equals(){
        if(this.first==null){
            this.displayValue="Error: Ne postoji niti jedan operand";
            return;
        }

        const keyFunction= this.shiftMode ? this.operator.func.shift : this.operator.func.normal;
        const isUnary= this.shiftMode ? this.operator.unary.shift : this.operator.unary.normal;

        if(isUnary){
            const result= keyFunction(this.first);
            
            this.displayValue=String(result);

            this.first=result;
            this.second=null;
            this.operator=null;
        }

        else{
            if(this.second==null){
                this.displayValue="Error: Nedostaje drugi operand";
                return;
            }

            const result=keyFunction(this.first,this.second);
            this.displayValue=String(result);

            console.log("Rezultat: ",result);
        }
    }


}