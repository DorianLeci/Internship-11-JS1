import { HistoryEntry } from "./HistoryEntry.js";

export class History{
    constructor(limit=10){
        this.entries=[];
        this.limit=limit;
    }

    addEntry(first,second,operator,result,displayValue){
        const entry=new HistoryEntry(first,second,operator,result,displayValue);

        const lastEntry=this.entries.at(-1);

        if(lastEntry && lastEntry.expression===entry.expression && lastEntry.result===entry.result)
            return;

        this.entries.push(entry);

        if(this.entries.length>this.limit)
            this.entries.shift();

        this.entries.forEach(entry=>console.log("History: ",entry));

    }

    clear(){
        this.entries=[];
    }
}