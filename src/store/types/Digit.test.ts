import { addDigit } from './Digit';

describe('Add "Digit" to "number"', () => {
  test('addDigit: Examples from comment', () => {
    expect(addDigit(123, 7)).toBe(1237);
    expect(addDigit(0, 7)).toBe(7);
    expect(addDigit(-123, 7)).toBe(-1237);
  });
});
