import { Value } from "./types";

export type Stack = Value[];

export const createStack = (): Stack => [];

export const peek = (stack?: Stack): Value => {
  if (stack != null) {
    return stack[stack.length - 1];
  }

  return 0;
};

export const push = (value: Value, stack?: Stack): [Value, Stack] => {
  if (stack != null) {
    stack.push(value);
    return [value, stack];
  }

  const newStack = createStack();
  return push(value, newStack);
};

export const pop = (stack?: Stack): [Value, Stack?] => {
  if (stack != null) {
    const result = stack.pop();
    return [result ?? 0, stack];
  }

  return [0, stack];
};
