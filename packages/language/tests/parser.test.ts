import { parse } from "../src/parser";
import { FunctionExpr, Program, Node, Call, Loop, PushPop } from "../src/types";

const firstNode = (program: Program): Node => program.body[0];

describe("parser", () => {
  // it("literal", () => {
  //   const stringLit = firstNode(parse('"hello"')) as Literal;
  //   expect(stringLit).toMatchSnapshot();
  //   expect(stringLit.value).toBe("hello");
  //   expect(stringLit.type === "literal");

  //   const numberLit = firstNode(parse("1")) as Literal;
  //   expect(numberLit).toMatchSnapshot();
  //   expect(numberLit.value).toBe(1);
  //   expect(numberLit.type === "literal");
  // });

  // it("identifier", () => {
  //   const ident = firstNode(parse("helloWorld")) as Identifier;
  //   expect(ident.type).toBe("identifier");
  //   expect(ident.value).toBe("helloWorld");
  //   expect(ident).toMatchSnapshot();

  //   try {
  //     parse("1_$%invalid");
  //     expect(true).toBe(false);
  //   } catch (e) {}
  // });

  it("call", () => {
    const ident = firstNode(parse(":foo")) as Call;
    expect(ident.type).toBe("call");
    expect(ident.name).toBe("foo");
    expect(ident).toMatchSnapshot();

    try {
      parse("1_$%invalid");
      expect(true).toBe(false);
    } catch (e) {}
  });

  it("operators", () => {
    expect(firstNode(parse("a+"))).toMatchSnapshot();
    expect(firstNode(parse("a+b"))).toMatchSnapshot();
    expect(firstNode(parse("a+2"))).toMatchSnapshot();
  });

  it("pushpop", () => {
    {
      const pushpop = firstNode(parse("a > b")) as PushPop;
      expect(pushpop.type).toBe("pushpop");

      expect(pushpop.left!.type).toBe("identifier");
      expect(pushpop.left!.value).toBe("a");

      expect(pushpop.right!.type).toBe("identifier");
      expect(pushpop.right!.value).toBe("b");
    }

    {
      const pushpop = firstNode(parse("1 > b")) as PushPop;
      expect(pushpop.type).toBe("pushpop");

      expect(pushpop.left!.type).toBe("literal");
      expect(pushpop.left!.value).toBe(1);

      expect(pushpop.right!.type).toBe("identifier");
      expect(pushpop.right!.value).toBe("b");
    }

    {
      const pushpop = firstNode(parse("a>")) as PushPop;
      expect(pushpop.type).toBe("pushpop");

      expect(pushpop.left!.type).toBe("identifier");
      expect(pushpop.left!.value).toBe("a");

      expect(pushpop.right).toBe(null);
    }
  });

  it("loop", () => {
    {
      const loop = firstNode(
        parse(`
(a
a+b
)
`),
      ) as Loop;

      expect(loop.type).toBe("loop");
      expect(loop.stack).toBe("a");
      expect(loop).toMatchSnapshot();
    }

    {
      const loop = firstNode(parse(`(a)`)) as Loop;

      expect(loop).toMatchSnapshot();
    }
  });

  it("function", () => {
    {
      const func = firstNode(
        parse(`
{:foo
  a+b
}
`),
      ) as FunctionExpr;

      expect(func.type).toBe("function");
      expect(func.name).toBe("foo");
      expect(func).toMatchSnapshot();
    }

    {
      const func = firstNode(parse(`{:foo}`)) as FunctionExpr;
      expect(func).toMatchSnapshot();
    }
  });
});
