import { factorial } from "../helpers/mathHelpers.js";

class Dual{
    constructor(normal,shift){
        this.normal=normal;
        this.shift=shift;
    }
}

class NumKey{
    constructor (value){
        this.type="number";
        this.value=value;
    }
}

class OpKey{
    constructor(normalLabel,shiftLabel,normalFunc,shiftFunc,normalUnary,shiftUnary,normalPosition,shiftPosition){
        this.type="operation";
        this.label=new Dual(normalLabel,shiftLabel);
        this.func=new Dual(normalFunc,shiftFunc);
        this.unary = new Dual(normalUnary,shiftUnary);
        this.position=new Dual(normalPosition,shiftPosition);
    }
}

class ActionKey{
    constructor(actionType,label){
        this.type="action";
        this.actionType=actionType;
        this.label=label;
    }
}

class EqualsKey{
    constructor(){
        this.type="equals";
        this.label="=";
    }
}

export const keys=[

    new ActionKey("clear","C"),
    new OpKey("÷","√",(a,b)=>a/b,a=>Math.sqrt(a),false,true,null,"prefix"),
    new OpKey("×","log",(a,b)=>a*b,a=>Math.log10(a),false,true,null,"prefix"),
    new OpKey("x²","∛",a=>a*a,a=>Math.cbrt(a),true,true,"postfix","prefix"),

    new NumKey("7"),
    new NumKey("8"),
    new NumKey("9"),
    new OpKey("-", "x³", (a,b)=>a-b, a=>a*a*a, false, true,null,"postfix"),

    new NumKey("4"),
    new NumKey("5"),
    new NumKey("6"),
    new OpKey("+","!", (a,b)=>a+b, a=>factorial(a), false, true,null,"postfix"),

    new NumKey("1"),
    new NumKey("2"),
    new NumKey("3"),
    new EqualsKey(),

    new NumKey("0"),
    new NumKey("."),
    new ActionKey("shift","Shift"),
    new ActionKey("delete","Del"),
]
