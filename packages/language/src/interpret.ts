import {
  Value,
  Literal,
  Node,
  NodeType,
  Expression,
  Program,
  Identifier,
  PushPop,
} from "./types";
import { Stack, peek, push } from "./stack";

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

const visitProgram: VisitNode<Program> = (program, state): Value => {
  const results = program.body.map(node => visit(node, state));

  return results.length > 0 ? results[0] : 0;
};

const visitLiteral: VisitNode<Literal> = literal => {
  return literal.value;
};

const visitIdentifier: VisitNode<Identifier> = (identifier, state) => {
  return peek(state.stacks[identifier.value]);
};

const visitPushPop: VisitNode<PushPop> = (pushpop, state) => {
  const id = pushpop.right?.value;
  if (pushpop.left && pushpop.left.type === "literal" && id != null) {
    const [value, stack] = push(pushpop.left.value, state.stacks[id]);
    state.stacks[id] = stack;
    return value;
  }

  return 0;
};

const visitors: Visitor = {
  program: visitProgram,
  pushpop: visitPushPop,
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

export const interpret = (program: Program): { [id: string]: Stack } => {
  const state = createEmptyState();

  visit(program, state);
  return state.stacks;
};
