import { Position } from "../enums/PositionEnum.js";

export class OperatorState {
    constructor() {
        this.operator = null; 
        this.shiftMode = false;
    }

    isUnary(opKey = null) {
        const key = opKey ?? this.operator;
        if (!key) return false;

        return this.shiftMode ? key.unary.shift : key.unary.normal;
    }

    isPrefix(opKey = null) {
        const key = opKey ?? this.operator;
        
        if (!key) return false;

        const position = this.shiftMode ? key.position.shift : key.position.normal;
        return position == Position.PREFIX;
    }


    getLabel(opKey = null) {
        const key = opKey ?? this.operator;
        if (!key) return null;

        return this.shiftMode ? key.label.shift : key.label.normal;
    }

    getFunction(opKey = null) {
        const key = opKey ?? this.operator;
        if (!key) return null;

        return this.shiftMode ? key.func.shift : key.func.normal;
    }

    getPosition(opKey = null) {
        const key = opKey ?? this.operator;
        if (!key) return null;

        return this.shiftMode ? key.position.shift : key.position.normal;
    }

    isSnapshotPrefix(){
        if(!this.operator) return false;

        return this.operator.position==Position.PREFIX;
    }

    reset() {
        this.operator = null;
    }

    toggleShiftMode() {
        this.shiftMode = !this.shiftMode;
    }
}
