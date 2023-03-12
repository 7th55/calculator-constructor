// Read more about it here:
// https://www.typescriptlang.org/docs/handbook/2/narrowing.html#exhaustiveness-checking
export const proveExhaustiveness = <T extends never>(x: T): never => {
  throw new Error(
    `Value was not exhaustively checked! This runtime value mismatches its type: ${JSON.stringify(
      x
    )}`
  );
};
