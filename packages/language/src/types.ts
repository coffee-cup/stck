export type NodeType =
  | "program"
  | "loop"
  | "function"
  | "pushpop"
  | "operator"
  | "call"
  | "literal"
  | "identifier"
  | "comment";

export interface Position {
  offset: number;
  line: number;
  column: number;
}

export interface Range {
  start: Position;
  end: Position;
}

export interface Node extends Range {
  type: NodeType;
}

export type Body = Expression[];

export interface Program extends Node {
  type: "program";
  body: Body;
}

export interface Loop extends Node {
  type: "loop";
  stack: string;
  body: Body;
}

export interface FunctionExpr extends Node {
  type: "function";
  name: string;
  body: Body;
}

export interface PushPop extends Node {
  type: "pushpop";
  left?: Identifier | Literal;
  right?: Identifier;
}

export type OP = "+" | "-" | "*" | "/";

export interface Operator extends Node {
  type: "operator";
  op: OP;
  left: Identifier;
  right: Identifier | Literal;
}

export interface Call extends Node {
  type: "call";
  name: string;
}

export interface Identifier extends Node {
  type: "identifier";
  value: string;
}

export interface Literal extends Node {
  type: "literal";
  value: any;
}

export interface Comment extends Node {
  type: "comment";
  value: string;
}

export type Expression =
  | Loop
  | FunctionExpr
  | Literal
  | Identifier
  | Call
  | PushPop
  | Operator
  | Comment;

export type Value = string | number;
