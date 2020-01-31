import { repeat } from "lodash";
import { EvalError, typeError } from "./errors";
import {
  Call,
  Expression,
  FunctionExpr,
  Identifier,
  Literal,
  Loop,
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
  ftable: { [name: string]: FunctionExpr };
  isTopLevel: boolean;
}

export type VisitNode<T = Node> = (node: T, state: State) => void;

type Visitor = {
  [Type in Node["type"]]?: VisitNode<Extract<Node, { type: Type }>>;
};

const createEmptyState = (): State => ({
  stacks: {},
  ftable: {},
  isTopLevel: true,
});

const isStackEmpty = (id: string, { stacks }: State): boolean =>
  stacks[id] == null || stacks[id].length === 0;

const peek = (id: string, { stacks }: State): Value => {
  const stack = stacks[id];
  if (stack == null) {
    return 0;
  }

  return stack[stack.length - 1];
};

const pop = (id: string, { stacks }: State, node): Value => {
  if (id === "o") {
    throw new EvalError("Cannot pop from output stack", node);
  }

  const stack = stacks[id];
  if (stack == null || stack.length === 0) {
    return 0;
  }

  return stack.pop()!;
};

const push = (value: Value, id: string, { stacks }: State, node: Node) => {
  if (id === "i") {
    throw new EvalError("Cannot push to input stack", node);
  }

  let stack = stacks[id];
  if (stack == null) {
    stack = [];
  }

  stack.push(value);
  stacks[id] = stack;
};

const isNumber = (v: Value): boolean => typeof v === "number";
const isString = (v: Value): boolean => typeof v === "string";

const visitProgram: VisitNode<Program> = (program, state) => {
  program.body.forEach(node => visit(node, state));
};

const visitPushPop: VisitNode<PushPop> = (node, state) => {
  const { left, right } = node;
  const id = right?.value;

  if (left && left.type === "literal" && id != null) {
    // push literal onto right
    push(left.value, id, state, node);
  } else if (left && left.type === "identifier" && id != null) {
    // pop value from left and push onto right
    const value = pop(left.value, state, node);
    push(value, id, state, node);
  } else if (left && left.type === "identifier") {
    // pop from left
    pop(left.value, state, node);
  } else if (left && left.type === "literal") {
    throw new EvalError("Cannot pop from literal", node);
  } else if (left == null) {
    throw new EvalError("left side of pushpop cannot be empty", node);
  }
};

const visitOperator: VisitNode<Operator> = (node, state) => {
  const { op, left, right } = node;

  if (op === "?") {
    // single operand
    if (right != null) {
      throw new EvalError(
        `${op} operator requires only leftmost operand`,
        node,
      );
    }

    const val = peek(left.value, state);
    if (val === 0) {
      state.stacks[left.value] = [];
    }
  } else {
    // multiple operands
    const val1: any = pop(left.value, state, node);
    const val2: any =
      right == null
        ? pop(left.value, state, node)
        : right.type === "literal"
        ? right.value
        : pop(right.value, state, node);

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

    push(result, left.value, state, node);
  }
};

const evalFunction: VisitNode<FunctionExpr> = (node, state) => {
  node.body.forEach(node => visit(node, state));
};

const visitFunction: VisitNode<FunctionExpr> = (node, state) => {
  if (!state.isTopLevel) {
    throw new EvalError("Functions can only be defined at the top level", node);
  }
};

const visitCall: VisitNode<Call> = (node, state) => {
  const fn = state.ftable[node.name];

  if (fn == null) {
    throw new EvalError(`Function ${node.name} is not defined`, node);
  }

  const tmp = state.isTopLevel;
  state.isTopLevel = false;

  evalFunction(fn, state);

  state.isTopLevel = tmp;
};

const visitLoop: VisitNode<Loop> = (node, state) => {
  const tmp = state.isTopLevel;
  state.isTopLevel = false;

  while (!isStackEmpty(node.stack, state)) {
    node.body.forEach(n => visit(n, state));
  }

  state.isTopLevel = tmp;
};

const visitors: Visitor = {
  program: visitProgram,
  pushpop: visitPushPop,
  operator: visitOperator,
  function: visitFunction,
  call: visitCall,
  loop: visitLoop,
};

const visit: VisitNode<Node> = (node: Node, state: State) => {
  const fn = visitors[node.type] as VisitNode<Node>;

  if (fn != null) {
    fn(node as any, state);
  }
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
