import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../app/store';
import { proveExhaustiveness } from 'src/typeUtils';
import { Digit } from './types/Digit';
import {
  addDigitToFrac,
  addFractionalPart,
  floatToFrac,
  FractionalNumber,
  fracToFloat,
} from './types/FractionalNumber';

export type MathOperator = '+' | '-' | '×' | '/';

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
                  number: addFractionalPart(floatToFrac(0)),
                },
              }
            : state.expression.tag === 'partial'
            ? {
                tag: 'regular',
                stack: {
                  tag: 'top',
                  tail: state.expression.stack,
                  operator: state.expression.operator,
                  number: addFractionalPart(floatToFrac(0)),
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
