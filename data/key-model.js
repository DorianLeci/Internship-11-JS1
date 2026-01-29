import { factorial } from "../helpers/MathHelpers.js";
import { Position } from "../enums/PositionEnum.js";
import { KeyType } from "../enums/KeyType.js";
import { OperatorType } from "../enums/OperatorType.js";

class Dual{
    constructor(normal,shift){
        this.normal=normal;
        this.shift=shift;
    }
}

class Key{
    constructor(type){
        this.type=type;
        this.domElement=null;
    }
}

class NumKey extends Key{
    constructor (value){
        super(KeyType.NUMBER);
        this.value=value;
    }
}

class OpKey extends Key{
    constructor(normalLabel,shiftLabel,normalFunc,shiftFunc,normalUnary,shiftUnary,normalPosition,shiftPosition){
        super(KeyType.OPERATOR);
        this.label=new Dual(normalLabel,shiftLabel);
        this.func=new Dual(normalFunc,shiftFunc);
        this.unary = new Dual(normalUnary,shiftUnary);
        this.position=new Dual(normalPosition,shiftPosition);
    }
}

class ActionKey extends Key{
    constructor(actionType,label){
        super(KeyType.ACTION);
        this.actionType=actionType;
        this.label=label;
    }
}

class EqualsKey extends Key{
    constructor(){
        super(KeyType.EQUALS);
        this.label="=";
    }
}

export const keys=[

    new ActionKey("power","ON"),
    new ActionKey("clear","C"),
    new ActionKey("shift","Shift"),
    new OpKey(OperatorType.X_SQUARED,OperatorType.CBRT,a=>a*a,a=>Math.cbrt(a),true,true,Position.POSTFIX,Position.PREFIX),    

    new NumKey("7"),
    new NumKey("8"),
    new NumKey("9"),
    new OpKey(OperatorType.DIVISION,OperatorType.SQRT,(a,b)=>a/b,a=>Math.sqrt(a),false,true,Position.INFIX,Position.PREFIX),        

    new NumKey("4"),
    new NumKey("5"),
    new NumKey("6"),
    new OpKey(OperatorType.MULTIPLICATION,OperatorType.LOGARITHM,(a,b)=>a*b,a=>Math.log10(a),false,true,Position.INFIX,Position.PREFIX),

    new NumKey("1"),
    new NumKey("2"),
    new NumKey("3"),
    new OpKey(OperatorType.SUBTRACTION,OperatorType.X_SQUARED, (a,b)=>a-b, a=>a*a*a, false, true,Position.INFIX,Position.POSTFIX),

    new NumKey("0"),
    new NumKey("."),
    new EqualsKey(),
    new OpKey(OperatorType.ADDITION,OperatorType.FACTORIAL, (a,b)=>a+b, a=>factorial(a), false, true,Position.INFIX,Position.POSTFIX),

]
