import { repeat } from "lodash";
import { EvalError, typeError } from "./errors";
import {
  Expression,
  Identifier,
  Literal,
  Node,
  Call,
  NodeType,
  OP,
  Operator,
  Program,
  PushPop,
  Value,
  FunctionExpr,
} from "./types";

export type Stack = Value[];

export interface State {
  stacks: { [id: string]: Stack };
  ftable: { [name: string]: FunctionExpr };
}

export type VisitNode<T = Node> = (node: T, state: State) => Value;

type Visitor = {
  [Type in Node["type"]]?: VisitNode<Extract<Node, { type: Type }>>;
};

const createEmptyState = (): State => {
  return {
    stacks: {},
    ftable: {},
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

const visitPushPop: VisitNode<PushPop> = (node, state) => {
  const { left, right } = node;
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
    throw new EvalError("Cannot pop from literal", node);
  } else if (left == null) {
    throw new EvalError("left side of pushpop cannot be empty", node);
  }

  throw new Error("fallthrough on pushpop");
};

const visitOperator: VisitNode<Operator> = (node, state) => {
  const { op, left, right } = node;

  const val1: any = pop(left.value, state);
  const val2: any =
    right == null
      ? pop(left.value, state)
      : right.type === "literal"
      ? right.value
      : pop(right.value, state);

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

const visitFunction: VisitNode<FunctionExpr> = (node, state) => {
  const results = node.body.map(node => visit(node, state));
  return results.length > 0 ? results[0] : 0;
};

const visitCall: VisitNode<Call> = (node, state) => {
  const fn = state.ftable[node.name];

  if (fn == null) {
    throw new EvalError(`Function ${node.name} is not defined`, node);
  }

  return visitFunction(fn, state);
};

const visitors: Visitor = {
  program: visitProgram,
  pushpop: visitPushPop,
  operator: visitOperator,
  call: visitCall,
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

const createFTable = (program: Program, state: State) => {
  program.body.forEach(expr => {
    if (expr.type === "function") {
      if (state.ftable[expr.name] != null) {
        throw new EvalError(`Function ${expr.name} cannot be redefined`, expr);
      }

      state.ftable[expr.name] = expr;
    }
  });
};

export const interpret = (program: Program): State => {
  const state = createEmptyState();

  createFTable(program, state);

  visit(program, state);
  return state;
};
