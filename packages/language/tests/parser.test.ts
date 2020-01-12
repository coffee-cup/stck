import { parse } from "../src";
import {
  Comment,
  FunctionExpr,
  Program,
  Node,
  Call,
  Loop,
  PushPop,
} from "../src/types";

const firstNode = (program: Program): Node => program.body[0];

describe("parser", () => {
  it("full", () => {
    const program = parse(`
# comment

a+a
a-2
a*c
hello/world

1>a
a>
a>b

(a
  a>b
)

{:foo
  a+b
}

:foo
`);

    expect(program).toMatchSnapshot();
  });

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
    expect(firstNode(parse("a+b"))).toMatchSnapshot();
    expect(firstNode(parse("a+2"))).toMatchSnapshot();

    expect(firstNode(parse("a?"))).toMatchSnapshot();
  });

  it("pushpop", () => {
    {
      const pushpop = firstNode(parse("a>b")) as PushPop;
      expect(pushpop.type).toBe("pushpop");

      expect(pushpop.left!.type).toBe("identifier");
      expect(pushpop.left!.value).toBe("a");

      expect(pushpop.right!.type).toBe("identifier");
      expect(pushpop.right!.value).toBe("b");
    }

    {
      const pushpop = firstNode(parse("1>b")) as PushPop;
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

  it("comments", () => {
    {
      const comment = firstNode(
        parse(`
  # this is a comment
  `),
      ) as Comment;

      expect(comment.type).toBe("comment");
      expect(comment.value).toBe("this is a comment");
      expect(comment).toMatchSnapshot;
    }

    {
      const comment = parse(`
  # this is a comment

  a+a

  # second comment
  `);

      expect(comment).toMatchSnapshot;
    }
  });
});
