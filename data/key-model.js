import { factorial } from "../helpers/MathHelpers.js";
import { Position } from "../enums/PositionEnum.js";
import { KeyType } from "../enums/KeyType.js";
import { OperatorLabel } from "../enums/OperatorLabel.js";
import { ActionType } from "../enums/ActionType.js";

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

    new ActionKey(ActionType.POWER,"ON"),
    new ActionKey(ActionType.CLEAR,"C"),
    new ActionKey(ActionType.SHIFT,"Shift"),
    new OpKey(OperatorLabel.X_SQUARED,OperatorLabel.CBRT,a=>a*a,a=>Math.cbrt(a),true,true,Position.POSTFIX,Position.PREFIX),    

    new NumKey("7"),
    new NumKey("8"),
    new NumKey("9"),
    new OpKey(OperatorLabel.DIVISION,OperatorLabel.SQRT,(a,b)=>a/b,a=>Math.sqrt(a),false,true,Position.INFIX,Position.PREFIX),        

    new NumKey("4"),
    new NumKey("5"),
    new NumKey("6"),
    new OpKey(OperatorLabel.MULTIPLICATION,OperatorLabel.LOGARITHM,(a,b)=>a*b,a=>Math.log10(a),false,true,Position.INFIX,Position.PREFIX),

    new NumKey("1"),
    new NumKey("2"),
    new NumKey("3"),
    new OpKey(OperatorLabel.SUBTRACTION,OperatorLabel.X_SQUARED, (a,b)=>a-b, a=>a*a*a, false, true,Position.INFIX,Position.POSTFIX),

    new NumKey("0"),
    new NumKey("."),
    new EqualsKey(),
    new OpKey(OperatorLabel.ADDITION,OperatorLabel.FACTORIAL, (a,b)=>a+b, a=>factorial(a), false, true,Position.INFIX,Position.POSTFIX),

]
