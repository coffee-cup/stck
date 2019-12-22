import { capitalize } from "lodash";
import { Range } from "./types";

export class EvalError extends Error {
  constructor(message: string, range: Range) {
    super(message);
    (this as any).location = range;
  }
}

export const typeError = (
  operator: string,
  expected: string,
  received: any,
): string =>
  `${capitalize(operator)} expected: ${expected}, received: ${received}`;
