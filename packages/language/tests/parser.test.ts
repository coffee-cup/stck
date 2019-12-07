import { parse } from "../src/parser";

describe("parser", () => {
  it("literal", () => {
    expect(parse('"hello"')).toMatchSnapshot();
    expect(parse("1")).toMatchSnapshot();
  });

  it("identifier", () => {
    expect(parse("a")).toMatchSnapshot();
  });

  it("if expression", () => {
    expect(parse("if (cond) trueBranch else falseBranch")).toMatchSnapshot();
  });

  it("function expression", () => {
    expect(parse("(x) => a")).toMatchSnapshot();
    expect(parse("(x) => (y) => foo(x)(y)")).toMatchSnapshot();
  });

  it("call", () => {
    expect(parse("foo(a)")).toMatchSnapshot();
    expect(parse("foo(a)(b)")).toMatchSnapshot();
  });
});
