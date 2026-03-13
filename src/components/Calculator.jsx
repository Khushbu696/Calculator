import { useState } from "react";
import "../styles/Calculator.css";

const buttons = [
    "C", "←", "%",
    "÷", "7", "8", "9",
    "×", "4", "5", "6",
    "-", "1", "2", "3",
    "+", "0", ".", "="
];

export default function Calculator() {
    const [display, setDisplay] = useState("0");
    const [prevValue, setPrevValue] = useState(null);
    const [operator, setOperator] = useState(null);
    const [waitingForNew, setWaitingForNew] = useState(false);

    const inputNumber = (num) => {
        if (waitingForNew) {
            setDisplay(num);
            setWaitingForNew(false);
        } else {
            setDisplay(display === "0" ? num : display + num);
        }
    };

    const inputOperator = (op) => {
        if (operator && !waitingForNew) calculate();

        setPrevValue(parseFloat(display));
        setOperator(op);
        setWaitingForNew(true);
    };

    const calculate = () => {
        if (operator == null || prevValue == null) return;

        const current = parseFloat(display);
        let result;

        switch (operator) {
            case "+":
                result = prevValue + current;
                break;
            case "-":
                result = prevValue - current;
                break;
            case "×":
                result = prevValue * current;
                break;
            case "÷":
                result = current === 0 ? "Error" : prevValue / current;
                break;
            case "%":
                result = prevValue % current;
                break;
            default:
                return;
        }

        setDisplay(String(result));
        setPrevValue(null);
        setOperator(null);
        setWaitingForNew(true);
    };

    const handleClick = (value) => {
        if (!isNaN(value) || value === ".") {
            inputNumber(value);
        } else if (["+", "-", "×", "÷", "%"].includes(value)) {
            inputOperator(value);
        } else if (value === "=") {
            calculate();
        } else if (value === "C") {
            setDisplay("0");
            setPrevValue(null);
            setOperator(null);
        } else if (value === "←") {
            setDisplay(display.length > 1 ? display.slice(0, -1) : "0");
        }
    };

    return (
        <div className="calc-wrapper">
            <div className="calculator">
                <div className="display">{display}</div>

                <div className="buttons">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            className={`btn ${["+", "-", "×", "÷", "="].includes(btn) ? "operator" : ""
                                } ${btn === "=" ? "equals" : ""}`}
                            onClick={() => handleClick(btn)}
                        >
                            {btn}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
}
