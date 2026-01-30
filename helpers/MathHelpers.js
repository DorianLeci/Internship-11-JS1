import { ErrorMessages } from "./ErrorMessages.js";
import { OperatorLabel } from "../enums/OperatorLabel.js";

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
        case OperatorLabel.X_SQUARED: return "²";
        case OperatorLabel.X_CUBED: return "³";
        default: return label;
    }
}

export function checkOperationEdgeCases(operatorLabel, firstNum, secondNum, isUnary) {

    switch (operatorLabel){
        case OperatorLabel.DIVISION:
            if(!isUnary && secondNum==0)
                return ErrorMessages.DIVIDE_BY_ZERO;
            break;

            case OperatorLabel.FACTORIAL:
                if(firstNum<0 || !Number.isInteger(firstNum))
                    return ErrorMessages.NEGATIVE_FACTORIAL;
            break;

            case OperatorLabel.SQRT:
                if (firstNum < 0)
                    return ErrorMessages.SQRT_NEGATIVE;
            break;

            case OperatorLabel.LOGARITHM:
                if(firstNum<=0)
                    return ErrorMessages.LOG_NEGATIVE;
            break;

            default:
                return null;

    }
}

export function formatNumberForDisplay(value){

    if(value==Infinity) return "∞";
    if(value==-Infinity) return "-∞";

    const absValue = Math.abs(value);

    if ((absValue !== 0 && (absValue >= 1e7 || absValue < 1e-3))) {
        return value.toExponential(8);
    }

    const factor = Math.pow(10, 8);
    return String(Math.round(value * factor) / factor);
}
