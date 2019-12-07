export interface Location {
  start: {
    offset: number;
    line: number;
    column: number;
  };
  end: {
    offset: number;
    line: number;
    column: number;
  };
}

export interface Node extends Location {
  type: string;
}

type Body = Expression[];

export interface Program extends Node {
  type: "program";
  body: Body;
}

export interface LoopExpression extends Node {
  type: "loop";
  stack: string;
  body: Body;
}

export interface FunctionExpression extends Node {
  type: "function";
  name: string;
  body: Body;
}

export interface CallExpression extends Node {
  type: "call";
  name: string;
}

export interface Identifier extends Node {
  type: "literal";
  value: string;
}

export interface LiteralExpression extends Node {
  type: "literal";
  value: any;
}

export type Expression =
  | LoopExpression
  | FunctionExpression
  | LiteralExpression
  | Identifier
  | CallExpression;
