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

export interface FunctionExpression extends Node {
  type: "function";
  param: Expression;
  body: Expression;
}

export interface IfExpression extends Node {
  type: "if";
  cond: Expression;
  trueBranch: Expression;
  falseBranch: Expression;
}

export interface CallExpression extends Node {
  callee: Expression;
  arg: Expression;
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
  | FunctionExpression
  | IfExpression
  | CallExpression
  | LiteralExpression
  | Identifier;
