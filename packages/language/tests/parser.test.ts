import { parse } from "../src/parser";
import {
  Program,
  Node,
  CallExpression,
  Identifier,
  LiteralExpression,
  LoopExpression,
  FunctionExpression,
} from "../src/types";

const firstNode = (program: Program): Node => program.body[0];

describe("parser", () => {
  it("literal", () => {
    const stringLit = parse('"hello"');
    expect(stringLit).toMatchSnapshot();
    expect((firstNode(stringLit) as LiteralExpression).value).toBe("hello");
    expect(firstNode(stringLit).type === "literal");

    const numberLit = parse("1");
    expect(numberLit).toMatchSnapshot();
    expect((firstNode(numberLit) as LiteralExpression).value).toBe(1);
    expect(firstNode(numberLit).type === "literal");
  });

  it("identifier", () => {
    const ident = parse("helloWorld");
    expect(firstNode(ident).type).toBe("identifier");
    expect((firstNode(ident) as Identifier).value).toBe("helloWorld");
    expect(ident).toMatchSnapshot();

    try {
      parse("1_$%invalid");
      expect(true).toBe(false);
    } catch (e) {}
  });

  it("call", () => {
    const ident = parse(":foo");
    expect(firstNode(ident).type).toBe("call");
    expect((firstNode(ident) as CallExpression).name).toBe("foo");
    expect(ident).toMatchSnapshot();

    try {
      parse("1_$%invalid");
      expect(true).toBe(false);
    } catch (e) {}
  });

  it("loop", () => {
    const loop = parse(`
(a
b c d e f 

g)
`);

    expect(firstNode(loop).type).toBe("loop");
    expect((firstNode(loop) as LoopExpression).stack).toBe("a");
    expect(loop).toMatchSnapshot();
  });

  it("function", () => {
    const func = parse(`
{:foo
b c d e f 

g}
`);

    expect(firstNode(func).type).toBe("function");
    expect((firstNode(func) as FunctionExpression).name).toBe("foo");
    expect(func).toMatchSnapshot();
  });
});
