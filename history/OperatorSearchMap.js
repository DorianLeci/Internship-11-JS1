import { OperatorLabel } from "../enums/OperatorLabel.js";

export const OperatorSearchMap = Object.freeze({
    [OperatorLabel.ADDITION]: ["plus", "zbroj", "addition", "add", "+"],
    [OperatorLabel.SUBTRACTION]: ["minus", "oduzimanje", "subtraction", "subtract", "-"],
    [OperatorLabel.MULTIPLICATION]: ["*", "puta", "množenje", "mnozenje", "multiplication", "multiply"],
    [OperatorLabel.DIVISION]: ["÷", "dijeljenje", "division", "divide", "/"],
    [OperatorLabel.SQRT]: ["√", "korijen", "sqrt"],
    [OperatorLabel.CBRT]: ["∛", "kubni korijen", "cbrt"],
    [OperatorLabel.IDENTITY]: ["x", "identitet"],
    [OperatorLabel.X_SQUARED]: ["x²", "kvadrat", "square"],
    [OperatorLabel.X_CUBED]: ["x³", "kocka", "cube"],
    [OperatorLabel.LOGARITHM]: ["log", "ln", "logaritam"],
    [OperatorLabel.FACTORIAL]: ["!", "faktorijel", "factorial"],
    [OperatorLabel.POWER]: ["^", "potencija", "power"]
});
