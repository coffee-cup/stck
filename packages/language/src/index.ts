import { interpret } from "./interpret";
import { parse } from "./parser";
import { Value } from "./types";

export * from "./interpret";
export * from "./parser";
export * from "./types";

export const run = (code: string, input?: Value[]): Value[] => {
  const program = parse(code);
  const state = interpret(program, input);

  const output = state.stacks.o || [];
  return output;
};
