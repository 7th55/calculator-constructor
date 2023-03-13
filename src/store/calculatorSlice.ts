import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { proveExhaustiveness } from 'src/typeUtils';

export type MathOperator = '+' | '-' | '×' | '/';

// A pair of integral and fractional (optional) part of a number
//
// We use this custom type instead of the native JS "number" type, 
// because user inputs each digit independently and we don't want
// to accidently get a floating point error while typing.
//
// We store the "decimal" part as the list of digits instead of the
// regular JS "number", because we need an ability to add zeroes
// at the beginning of a decimal part of a number. In a regular
// JS "number" (or just in mathematics) the zeroes at the beginning 
// are disappearing. 
//
// When the "decimal" is "null" it means the number is an integer 
// (has no fractional part). "integral" must never have a fractional part.
export type FractionalNumber = {
  integral: number;
  decimal: Array<Digit> | null;
};

export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// Stack-like calculator expression.
export type CalculatorStack =
  | { tag: 'end'; number: FractionalNumber }
  | {
      tag: 'top';
      tail: CalculatorStack;
      operator: MathOperator;
      number: FractionalNumber;
    };

export type MathOperatorFunction = (a: number, b: number) => number;

const mathOperatorToFunction = (
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

// Convert FractionalNumber to regular JS number.
const fracToFloat = ({ integral, decimal }: FractionalNumber): number => {
  const decimalNumber: number =
    decimal === null ? 0 : parseFloat(`0.${decimal.join('')}`);

  return integral < 0 ? integral - decimalNumber : integral + decimalNumber;
};

//
const isDigit = (num: number): num is Digit => num >= 0 && num <= 9;

//
const floatToFrac = (num: number): FractionalNumber => {
  const integral = Math.trunc(num);
  const decimal = Math.abs(num) - Math.abs(integral);
  return {
    integral,
    decimal:
      num === integral
        ? null
        : decimal
            .toString()
            .replace('0.', '')
            .split('')
            .map((x) => parseInt(x, 10))
            .filter(isDigit),
  };
};

//
const addDigit = (x: number, digit: Digit): number => x * 10 + digit;

//
const addDigitToFrac = (
  { integral, decimal }: FractionalNumber,
  digit: Digit
): FractionalNumber =>
  decimal === null
    ? { integral: addDigit(integral, digit), decimal }
    : { integral, decimal: decimal.concat(digit) };

//
const addFractionalPart = ({
  integral,
  decimal,
}: FractionalNumber): FractionalNumber =>
  decimal === null ? { integral, decimal: [] } : { integral, decimal };

//
const evalStack = (stack: CalculatorStack): number =>
  stack.tag === 'end'
    ? fracToFloat(stack.number)
    : stack.tag === 'top'
    ? mathOperatorToFunction(stack.operator)(
        evalStack(stack.tail),
        fracToFloat(stack.number)
      )
    : proveExhaustiveness(stack);

type CalculatorState = {
  expression:
    | { tag: 'regular'; stack: CalculatorStack }
    | { tag: 'partial'; stack: CalculatorStack; operator: MathOperator }
    | { tag: 'calculated'; stack: CalculatorStack };
};
const initialState: CalculatorState = {
  expression: { tag: 'regular', stack: { tag: 'end', number: floatToFrac(0) } },
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    pushDigitToStack: (state, action: PayloadAction<Digit | 'fraction'>) => {
      if (action.payload === 'fraction') {
        state.expression =
          state.expression.tag === 'regular'
            ? {
                ...state.expression,
                stack: {
                  ...state.expression.stack,
                  number: addFractionalPart(state.expression.stack.number),
                },
              }
            : state.expression.tag === 'calculated'
            ? {
                tag: 'regular',
                stack: {
                  tag: 'end',
                  number: {
                    integral: 0,
                    decimal: [],
                  },
                },
              }
            : state.expression.tag === 'partial'
            ? {
                tag: 'regular',
                stack: {
                  tag: 'top',
                  tail: state.expression.stack,
                  operator: state.expression.operator,
                  number: {
                    integral: 0,
                    decimal: [],
                  },
                },
              }
            : proveExhaustiveness(state.expression);
      } else {
        state.expression =
          state.expression.tag === 'regular'
            ? {
                tag: state.expression.tag,
                stack: {
                  ...state.expression.stack,
                  number: addDigitToFrac(
                    state.expression.stack.number,
                    action.payload
                  ),
                },
              }
            : state.expression.tag === 'calculated'
            ? {
                tag: 'regular',
                stack: { tag: 'end', number: floatToFrac(action.payload) },
              }
            : state.expression.tag === 'partial'
            ? {
                tag: 'regular',
                stack: {
                  tag: 'top',
                  tail: state.expression.stack,
                  operator: state.expression.operator,
                  number: floatToFrac(action.payload),
                },
              }
            : proveExhaustiveness(state.expression);
      }
    },
    pushOperatorToStack: (state, action: PayloadAction<MathOperator>) => {
      state.expression = {
        tag: 'partial',
        stack: state.expression.stack,
        operator: action.payload,
      };
    },
    calcStack: (state) => {
      state.expression =
        state.expression.tag === 'regular'
          ? {
              tag: 'calculated',
              stack: state.expression.stack,
            }
          : state.expression.tag === 'calculated'
          ? {
              tag: state.expression.tag,
              stack:
                state.expression.stack.tag === 'end'
                  ? state.expression.stack
                  : {
                      tag: 'top',
                      tail: state.expression.stack,
                      operator: state.expression.stack.operator,
                      number: state.expression.stack.number,
                    },
            }
          : state.expression.tag === 'partial'
          ? {
              tag: 'calculated',
              stack: {
                tag: 'top',
                tail: state.expression.stack,
                operator: state.expression.operator,
                // This is how Windows Calculator behaves.
                number: floatToFrac(evalStack(state.expression.stack)),
              },
            }
          : proveExhaustiveness(state.expression);
    },
    resetExpression: (state) => {
      state.expression = initialState.expression;
    },
  },
});

export const { actions } = calculatorSlice;

export const selectCalculator = (state: RootState) => state.calculator;

// Show current input number.
// Divide by zero will return Infinity.
export const selectExpression = (state: RootState): number => {
  const exp = selectCalculator(state).expression;
  return exp.tag === 'regular'
    ? fracToFloat(exp.stack.number)
    : exp.tag === 'partial' || exp.tag === 'calculated'
    ? evalStack(exp.stack)
    : proveExhaustiveness(exp);
};

export const selectLastOperator = (state: RootState): MathOperator | null => {
  const expression = selectCalculator(state).expression;

  return expression.tag === 'regular' || expression.tag === 'calculated'
    ? null
    : expression.tag === 'partial'
    ? expression.operator
    : proveExhaustiveness(expression);
};

export const selectHasGhostFraction = (state: RootState): boolean =>
  floatToFrac(selectExpression(state)).decimal === null &&
  selectCalculator(state).expression.stack.number.decimal !== null;

export default calculatorSlice.reducer;
