import { interpret, parse } from "../src";

const run = (code: string) => {
  const program = parse(code);
  const state = interpret(program);

  const output = (state.stacks.o || [])[0];
  return output;
};

describe("interpret", () => {
  it("comments do nothing", () => {
    expect(run(`# hello`)).toBeUndefined();
  });

  it("pushpop", () => {
    expect(run("1>o")).toBe(1);
    expect(run("2>a a>o")).toBe(2);
    expect(run("3>a 4>a a> a>o")).toBe(3);
  });

  it("operators", () => {
    expect(run("1>a 2>a a+ a>o")).toBe(3);
    expect(run("1>a 4>b a+b a>o")).toBe(5);
    expect(run("9>a a+3 a>o")).toBe(12);
    expect(run(`"world">a "hello ">a a+ a>o`)).toBe("hello world");

    expect(run("3>a 2>a a- a>o")).toBe(-1);
    expect(run("3>a a-10 a>o")).toBe(-7);

    expect(run(`4>a 2>a a* a>o`)).toBe(8);
    expect(run(`4>a a*3 a>o`)).toBe(12);
    expect(run(`4>a "ab">a a* a>o`)).toBe("abababab");

    expect(run("2>a 4>a a/ a>o")).toBe(2);
    expect(run("10>a a/2 a>o")).toBe(5);
  });

  it("functions", () => {
    expect(
      run(`
{:foo
1>o
}

:foo
`),
    ).toBe(1);
  });
});
