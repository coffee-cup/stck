import { repeat } from "lodash";
import { EvalError, typeError } from "./errors";
import {
  Expression,
  Identifier,
  Literal,
  Node,
  NodeType,
  OP,
  Operator,
  Program,
  PushPop,
  Value,
} from "./types";

export type Stack = Value[];

export interface State {
  stacks: { [id: string]: Stack };
}

export type VisitNode<T = Node> = (node: T, state: State) => Value;

type Visitor = {
  [Type in Node["type"]]?: VisitNode<Extract<Node, { type: Type }>>;
};

const createEmptyState = (): State => {
  return {
    stacks: {},
  };
};

const peek = (id: string, { stacks }: State): Value => {
  const stack = stacks[id];
  if (stack == null) {
    return 0;
  }

  return stack[stack.length - 1];
};

const pop = (id: string, { stacks }: State): Value => {
  const stack = stacks[id];
  if (stack == null || stack.length === 0) {
    return 0;
  }

  return stack.pop()!;
};

const push = (value: Value, id: string, { stacks }: State) => {
  let stack = stacks[id];
  if (stack == null) {
    stack = [];
  }

  stack.push(value);
  stacks[id] = stack;
};

const isNumber = (v: Value): boolean => typeof v === "number";
const isString = (v: Value): boolean => typeof v === "string";

const visitProgram: VisitNode<Program> = (program, state): Value => {
  const results = program.body.map(node => visit(node, state));

  return results.length > 0 ? results[0] : 0;
};

const visitLiteral: VisitNode<Literal> = literal => {
  return literal.value;
};

const visitIdentifier: VisitNode<Identifier> = (identifier, state) => {
  return peek(identifier.value, state);
};

const visitPushPop: VisitNode<PushPop> = ({ left, right }, state) => {
  const id = right?.value;

  if (left && left.type === "literal" && id != null) {
    // push literal onto right
    push(left.value, id, state);
    return left.value;
  } else if (left && left.type === "identifier" && id != null) {
    // pop value from left and push onto right
    const value = pop(left.value, state);
    push(value, id, state);

    return value;
  } else if (left && left.type === "identifier") {
    // pop from left
    const value = pop(left.value, state);
    return value;
  } else if (left && left.type === "literal") {
    throw new Error("Cannot pop from literal");
  }

  throw new Error("fallthrough on pushpop");
};

// assume no errors here
const operations: {
  [key in OP]: (...args: any) => Value;
} = {
  "+": (val1, val2) => val1 + val2,
  "-": (val1, val2) => val1 - val2,
  "*": (val1, val2) => {
    if (isString(val2)) {
      return repeat(val2, val1);
    }

    return val1 * val2;
  },
  "/": (val1, val2) => {
    return val1 / val2;
  },
};

const visitOperator: VisitNode<Operator> = (node, state) => {
  const { op, left, right } = node;

  const val1: any = pop(left.value, state);
  const val2: any =
    right.type === "literal" ? right.value : pop(right.value, state);

  let result: Value = 0;

  if (op === "+") {
    result = val1 + val2;
  } else if (op === "-") {
    if (isString(val1)) {
      throw new EvalError(typeError("subtraction", "number", val1), left);
    } else if (isString(val2)) {
      throw new EvalError(typeError("subtraction", "number", val2), right);
    }

    result = val1 - val2;
  } else if (op === "*") {
    if (isString(val2)) {
      throw new EvalError(typeError("multiplication", "number", val2), right);
    }

    result =
      isNumber(val1) && isNumber(val2) ? val1 * val2 : repeat(val1, val2);
  } else if (op === "/") {
    if (isString(val1)) {
      throw new EvalError(typeError("division", "number", val1), left);
    } else if (isString(val2)) {
      throw new EvalError(typeError("division", "number", val2), right);
    }

    result = val1 / val2;
  } else {
    throw new EvalError(`Operator ${op} not recognized`, node);
  }

  push(result, left.value, state);
  return result;
};

const visitors: Visitor = {
  program: visitProgram,
  pushpop: visitPushPop,
  operator: visitOperator,
  literal: visitLiteral,
  identifier: visitIdentifier,
};

const visit = (node: Node, state: State): Value => {
  const fn = visitors[node.type] as VisitNode<Node>;

  if (fn != null) {
    return fn(node as any, state);
  }

  return 0;
};

export const interpret = (program: Program): State => {
  const state = createEmptyState();

  visit(program, state);
  return state;
};
