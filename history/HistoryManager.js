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

        if(!q) return [...this.history.entries];

        return this.history.entries.filter(entry=>entry.operator.label===q);
    }


}