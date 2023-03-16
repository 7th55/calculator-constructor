import { proveExhaustiveness } from '@/typeUtils';

// Availabel operators.
//
// These strings used converted to mathematical operations.
export type MathOperator = '+' | '-' | '×' | '/';

// The funciton will be returned by converting the "MathOperator" to
// mathematical operations.                                        
export type MathOperatorFunction = (a: number, b: number) => number;

// Function receives the "MathOperator" as argument 
// and returns the "MathOperatorFunction". 
//
// Examples: "mathOperatorToFunction('×')" will returned 
// the arrow function "(a, b) => a * b;".
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


