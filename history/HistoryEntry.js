export class HistoryEntry{
    constructor(first,second,operator,result,displayValue){
        this.first=first;
        this.second=second;
        this.operator=operator;
        this.result=result;
        this.addedAt=new Date();
        this.expression= displayValue;
    }
}