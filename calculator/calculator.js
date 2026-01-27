export class Calculator{
    constructor(){
        this.first=null;
        this.second=null;
        this.operator=null;
        this.displayValue="";
        this.shiftMode=false;
    }

    inputNumber(value){

        if(!this.operator)
            this.first=this.first===null ? Number(value) : Number(this.first+value);

        else if(this.operator)
            this.second=this.second===null ? Number(value) : Number(this.second+value);

        this.updateDisplayValue(value);
    }

    inputOperator(label){
        this.operator=label;

        this.updateDisplayValue(label);
    }

    updateDisplayValue(newInput){
        this.displayValue+=newInput;

        console.log("first op: ",this.first);
        console.log("second op: ",this.second);
    }
}