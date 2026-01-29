import { ErrorMessages } from "./ErrorMessages.js";

export function factorial(n){
    let res=1;

    for(let i=1;i<=n;i++)
        res*=i;

    return res;
}

export function toNumberSafe(string){
    const number=Number(string);

    if(isNaN(number)) return null;

    return number;
}

export function mapOperatorForDisplay(label){
    switch (label){
        case "x²": return "²";
        case "x³": return "³";
        default: return label;
    }
}

export function checkOperationEdgeCases(operatorLabel, firstNum, secondNum, isUnary) {

    switch (operatorLabel){
        case "÷":
            if(!isUnary && secondNum==0)
                return ErrorMessages.DIVIDE_BY_ZERO;
            break;

            case "!":
                if(firstNum<0 || !Number.isInteger(firstNum))
                    return ErrorMessages.NEGATIVE_FACTORIAL;
            break;

            case "√":
                if (firstNum < 0)
                    return ErrorMessages.SQRT_NEGATIVE;
            break;

    }
    return null;
}

export function formatNumberForDisplay(value){

    if(value==Infinity) return "∞";
    if(value==-Infinity) return "-∞";

    const absValue = Math.abs(value);

    if ((absValue !== 0 && (absValue >= 1e7 || absValue < 1e-3))) {
        return value.toExponential(8);
    }

    const factor = Math.pow(10, 8);
    return Math.round(value * factor) / factor;
}
