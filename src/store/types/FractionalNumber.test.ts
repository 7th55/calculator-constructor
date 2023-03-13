import { floatToFrac, FractionalNumber, fracToFloat } from './FractionalNumber';

export {};

describe('Conversion between "number" and "FractionalNumber"', () => {
  test('floatToFrac: Examples from the comments', () => {
    expect(floatToFrac(123)).toEqual({ integral: 123, decimal: null });
    expect(floatToFrac(123.456)).toEqual({ integral: 123, decimal: [4, 5, 6] });
    expect(floatToFrac(-123.456)).toEqual({
      integral: -123,
      decimal: [4, 5, 6],
    });
    expect(floatToFrac(0.00123)).toEqual({
      integral: 0,
      decimal: [0, 0, 1, 2, 3],
    });
  });
  test('fracToFloat: Examples from the comments', () => {
    expect(fracToFloat(floatToFrac(123))).toBe(123);
    expect(fracToFloat(floatToFrac(123.456))).toBe(123.456);
    expect(fracToFloat(floatToFrac(-123.456))).toBe(-123.456);
    expect(fracToFloat(floatToFrac(0.00123))).toBe(0.00123);
  });
});
