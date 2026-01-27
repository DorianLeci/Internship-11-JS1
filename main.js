import { CalculatorUI } from "./calculator/CalculatorUI.js";
import { keys } from "./data/key-model.js";

const display=document.querySelector(".display-container");
const button=document.querySelector(".button-container");

const calculatorUI=new CalculatorUI(display,button,keys);
calculatorUI.createButtons();