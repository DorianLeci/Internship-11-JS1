export function factorial(n){
    let res=1;

    for(let i=1;i<n;i++)
        res*=i;

    return res;
}

export function toNumberSafe(string,sign){
    const number=Number(string)*sign;

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