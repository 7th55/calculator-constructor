import { proveExhaustiveness } from 'src/typeUtils';

// Available operators.
//
// These strings used converted to mathematical operations.
export type MathOperator = '+' | '-' | '×' | '/';

// The funciton will be returned by converting the "MathOperator" to
// mathematical operations.
export type MathOperatorFunction = (a: number, b: number) => number;

// Function receives an abstract "string" as argument
// and returns a mathematical operation.
export const mathOperatorToFunction = (
  operator: MathOperator
): MathOperatorFunction => {
  switch (operator) {
    case '+':
      return (a, b) => a + b;
    case '-':
      return (a, b) => a - b;
    case '×':
      return (a, b) => a * b;
    case '/':
      return (a, b) => a / b;
    default:
      return proveExhaustiveness(operator);
  }
};
