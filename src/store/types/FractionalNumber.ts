import { addDigit, Digit, isDigit } from './Digit';

// A pair of integral and fractional (optional) part of a number.
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
// (has no fractional part). "integral" must never have a fractional part in it.
// It's intentionaly made impossible to create or modifiy a "FractionalNumber"
// value outside of this module without using specialized functions/helpers
// from this module. So that you are protected from creating invalid values.
//
// Examples:
//
// - "123" will be represented as "{ integral: 123, fractional: null }"
// - "123.456" will be represented as "{ integral: 123, fractional: [4, 5, 6] }"
// - "-123.456" will be represented as "{ integral: -123, fractional: [4, 5, 6] }"
// - "0.00123" will be represented as "{ integral: 0, fractional: [0, 0, 1, 2, 3] }"
//
// "{ integral: 123, fractional: [] }" is also a possible value.
// See the comment for "addFractionalPart" function to see what can it mean.
export type FractionalNumber = FractionalNumberTag & InternalFractionalNumber;

// WARNING! Do not export! Only for module internal use!
enum FractionalNumberTag {
  _ = '',
}

// WARNING! Do not export! Only for module internal use!
type InternalFractionalNumber = {
  readonly integral: number;
  readonly decimal: Array<Digit> | null;
};

// Convert regular JS "number" to a "FractionalNumber".
//
// "num" can be either integral or floating point.
//
// Examples:
//
// - "floatToFrac(123)" will return "{ integral: 123, decimal: null }"
// - "floatToFrac(123.456)" will return "{ integral: 123, decimal: [4, 5, 6] }"
// - "floatToFrac(-123.456)" will return "{ integral: -123, decimal: [4, 5, 6] }"
// - "floatToFrac(0.00123)" will return "{ integral: 0, decimal: [0, 0, 1, 2, 3] }"
export const floatToFrac = (num: number): FractionalNumber => {
  const parts: Array<string> = num.toString().split('.');

  const result: InternalFractionalNumber =
    parts.length === 0
      ? { integral: 0, decimal: null }
      : {
          integral: parseInt(parts[0], 10),
          decimal:
            parts.length < 2
              ? null
              : parts[1]
                  .split('')
                  .map((x) => parseInt(x, 10))
                  .filter(isDigit),
        };

  return result as FractionalNumber;
};

// Convert "FractionalNumber" back to a regular JS "number".
//
// Examples:
//
// - "fracToFloat({ integral: 123, decimal: null })" will return "123"
// - "fracToFloat({ integral: 123, decimal: [4, 5, 6] })" will return "123.456"
// - "fracToFloat({ integral: -123, decimal: [4, 5, 6] })" will return "-123.456"
// - "fracToFloat({ integral: 0, decimal: [0, 0, 1, 2, 3] })" will return "0.00123"
export const fracToFloat = ({
  integral,
  decimal,
}: FractionalNumber): number => {
  const decimalNumber: number =
    decimal === null ? 0 : parseFloat(`0.${decimal.join('')}`);

  return integral < 0 ? integral - decimalNumber : integral + decimalNumber;
};

// Add a digit to a "FractionalNumber".
//
// Adds a digit either to an integral or a fractional part.
// If there's no fractional part ("decimal" equals to "null"), then the digit
// will be added into the "integral" part. Otherwise it will be added into the
// fractional part.
//
// Examples:
//
// - "addDigitToFrac({ integral: 123, fractional: null }, 7)"
//   will return "{ integral: 1237, fractional: null }"
// - "addDigitToFrac({ integral: 0, fractional: [] }, 7)"
//   will return "{ integral: 0, fractional: [7] }"
// - "addDigitToFrac({ integral: 0, fractional: [0] }, 0)"
//   will return "{ integral: 0, fractional: [0, 0] }"
// - "addDigitToFrac({ integral: 0, fractional: [0] }, 1)"
//   will return "{ integral: 0, fractional: [0, 1] }"
// - "addDigitToFrac({ integral: 123, fractional: [4, 5, 6] }, 7)"
//   will return "{ integral: 123, fractional: [4, 5, 6, 7] }"
// - "addDigitToFrac({ integral: -123, fractional: [4, 5, 6] }, 7)"
//   will return "{ integral: -123, fractional: [4, 5, 6, 7] }"
// - "addDigitToFrac({ integral: 0, fractional: [0, 0, 1, 2, 3] }, 7)"
//   will return "{ integral: 0, fractional: [0, 0, 1, 2, 3, 7] }"
export const addDigitToFrac = (
  { integral, decimal }: FractionalNumber,
  digit: Digit
): FractionalNumber => {
  const result: InternalFractionalNumber =
    decimal === null
      ? { integral: addDigit(integral, digit), decimal }
      : { integral, decimal: decimal.concat(digit) };

  return result as FractionalNumber;
};

// Add an indication of fractional part presence to a "FractionalNumber".
//
// This function is idempotent. Only adds empty list of digits if there was
// no fractional part before. Returns original value if there already is
// a fractional part.
//
// An empty list of digits means that user started to type a fractional part.
// It results into adding new digits to the fractional part instead of
// integral part. Also it will cause a render of a ghost floating point sign.
//
// Examples:
//
// - "addFractionalPart({ integral: 123, fractional: null })"
//   will return "{ integral: 123, fractional: [] }"
// - "addFractionalPart({ integral: 123, fractional: [] })"
//   will return "{ integral: 123, fractional: [] }" (nothing changed)
// - "addFractionalPart({ integral: 123, fractional: [4, 5, 6] })"
//   will return "{ integral: 123, fractional: [4, 5, 6] }" (nothing changed)
export const addFractionalPart = (num: FractionalNumber): FractionalNumber => {
  if (num.decimal !== null) return num; // Idempotence

  const result: InternalFractionalNumber = {
    integral: num.integral,
    decimal: [],
  };

  return result as FractionalNumber;
};
