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

export interface Loop extends Node {
  type: "loop";
  stack: string;
  body: Body;
}

export interface Function extends Node {
  type: "function";
  name: string;
  body: Body;
}

export interface PushPop extends Node {
  type: "pushpop";
  left?: Identifier | Literal;
  right?: Identifier;
}

export type OP = "+" | "_" | "*" | "/";

export interface Operator extends Node {
  type: "operator";
  op: string;
  left: Identifier;
  right?: Identifier;
}

export interface Call extends Node {
  type: "call";
  name: string;
}

export interface Identifier extends Node {
  type: "literal";
  value: string;
}

export interface Literal extends Node {
  type: "literal";
  value: any;
}

export type Expression =
  | Loop
  | Function
  | Literal
  | Identifier
  | Call
  | PushPop
  | Operator;
