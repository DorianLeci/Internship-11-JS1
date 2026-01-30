import { OperatorSearchMap } from "./OperatorSearchMap.js";

export class HistoryManager{
    constructor(history){
        this.history=history;
        this.activeFilter=null;
    }

    setOperatorFilter(opFilter){
        this.activeFilter=opFilter;
        return this.getFilteredList();
    }

    clearOperatorFilter(){
        this.activeFilter=null;
        return this.getFilteredList();
    }

    getFilteredList(){
        if(this.activeFilter)
            return this.history.entries.filter(entry=>entry.operator.label===this.activeFilter);

        return [...this.history.entries];
    }

    search(query){
        const q=query.trim().toLowerCase();

        if(!q) return this.getFilteredList();

        return this.history.entries.filter(entry=>{ 
            const keywords=OperatorSearchMap[entry.operator.label];

            return keywords.some(k=>k.startsWith(q));
        });
    }


}