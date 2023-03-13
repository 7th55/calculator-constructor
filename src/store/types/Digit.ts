// A representation of a single digit of a number.
//
// For the cases when we need a smaller subset of a "number".
// For example a list of digits for a fractional part of a number or
// digits to render digit buttons.
export type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;

// Check and prove that the "number" is a "Digit".
//
// Examples:
//
// const a: number = 7;
// const d: Digit = a; // Error!
//
// const a: number = 7;
// if (isDigit(a)) {
//   const d: Digit = a; // Works!
// }
export const isDigit = (num: number): num is Digit => num >= 0 && num <= 9;

// Add "Digit" at the end of a "number".
//
// Example:
//
// - "addDigit(123, 7)" returns "1237"
// - "addDigit(0, 7)" returns "7"
// - "addDigit(-123, 7)" returns "-1237"
export const addDigit = (x: number, digit: Digit): number =>
  x >= 0 ? x * 10 + digit : x * 10 - digit;
