import { interpret, parse, State as IState } from "stck";
import { Error } from "./types";

export const compute = async (
  code: string,
): Promise<{
  result: IState | null;
  error: Error | null;
}> => {
  try {
    const ast = parse(code);
    const result = interpret(ast);
    return { result, error: null };
  } catch (e) {
    if (e.location && e.location.start) {
      const start = e.location.start;
      const error = `Error ${start.line}:${start.column}\n\n${e.message}`;
      return {
        result: null,
        error: {
          message: e.message,
          position: start,
        },
      };
    }

    return { result: null, error: { message: e.message } };
  }
};
