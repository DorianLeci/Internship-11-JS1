import { factorial } from "../helpers/helpers.js";

class NumKey{
    constructor (value){
        this.type="number";
        this.value=value;
    }
}

class OpKey{
    constructor(normalLabel,shiftLabel,normalFunc,shiftFunc){
        this.type="operation";
        this.label={normal: normalLabel, shift: shiftLabel};
        this.normalFunction=normalFunc;
        this.shiftFunction=shiftFunc;
    }
}

class ActionKey{
    constructor(actionType,label){
        this.type="action";
        this.actionType=actionType;
        this.label={normal: label, shift: label};
    }
}

export const keys=[

    new NumKey("1"),
    new NumKey("2"),
    new NumKey("3"),
    new NumKey("4"),
    new NumKey("5"),
    new NumKey("6"),
    new NumKey("7"),
    new NumKey("8"),
    new NumKey("9"),

    new OpKey("+","!",(a,b)=>a+b,a=>factorial(a)),
    new OpKey("-","x³",(a,b)=>a-b,a=>a*a*a),
    new OpKey("x","log",(a,b)=>a*b,a=>Math.log10(a)),
    new OpKey("÷","√",(a,b)=>a/b,a=>Math.sqrt(a)),
    new OpKey("x²","∛",a=>a*a,a=>Math.cbrt(a)),

    new ActionKey("equals","="),
    new ActionKey("clear","C"),
    new ActionKey("shift","Shift"),
    new ActionKey("delete","Del")
]
