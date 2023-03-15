import fc from 'fast-check';
import {
  addDigitToFrac,
  addFractionalPart,
  floatToFrac,
  fracToFloat,
} from './FractionalNumber';

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
  test('addDigitToFrac: Examples from the comments', () => {
    expect(addDigitToFrac(floatToFrac(123), 7)).toEqual({
      integral: 1237,
      decimal: null,
    });
    expect(addDigitToFrac(addFractionalPart(floatToFrac(0)), 7)).toEqual({
      integral: 0,
      decimal: [7],
    });
    expect(
      addDigitToFrac(addDigitToFrac(addFractionalPart(floatToFrac(0)), 0), 0)
    ).toEqual({
      integral: 0,
      decimal: [0, 0],
    });
    expect(
      addDigitToFrac(addDigitToFrac(addFractionalPart(floatToFrac(0)), 0), 1)
    ).toEqual({
      integral: 0,
      decimal: [0, 1],
    });
    expect(addDigitToFrac(floatToFrac(123.456), 7)).toEqual({
      integral: 123,
      decimal: [4, 5, 6, 7],
    });
    expect(addDigitToFrac(floatToFrac(-123.456), 7)).toEqual({
      integral: -123,
      decimal: [4, 5, 6, 7],
    });
    expect(addDigitToFrac(floatToFrac(0.00123), 7)).toEqual({
      integral: 0,
      decimal: [0, 0, 1, 2, 3, 7],
    });
  });
  test('addFractionalPart: Examples from the comments', () => {
    expect(addFractionalPart(floatToFrac(123))).toEqual({
      integral: 123,
      decimal: [],
    });
    expect(addFractionalPart(floatToFrac(123.456))).toEqual({
      integral: 123,
      decimal: [4, 5, 6],
    });
  });
  test('Property: A composition of floatToFrac & fracToFloat is idempotent', () => {
    fc.assert(
      fc.property(
        fc.integer(),
        (num: number) => fracToFloat(floatToFrac(num)) === num
      )
    );
    // FIXME: This requires support for complex numbers like "-1.401298464324817e-45"
    // fc.assert(
    //   fc.property(
    //     fc.float(),
    //     (num: number) => fracToFloat(floatToFrac(num)) === num
    //   )
    // );
  });
}); //
