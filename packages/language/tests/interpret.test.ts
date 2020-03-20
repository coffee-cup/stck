import { run } from "../";

describe("interpret", () => {
  it("comments do nothing", () => {
    expect(run(`# hello`)).toHaveLength(0);
  });

  it("pushpop", () => {
    expect(run("1>o")).toEqual([1]);
    expect(run("2>a a>o")).toEqual([2]);
    expect(run("3>a 4>a a> a>o")).toEqual([3]);
  });

  it("operators", () => {
    expect(run("1>a 2>a a+ a>o")).toEqual([3]);
    expect(run("1>a 4>b a+b a>o")).toEqual([5]);
    expect(run("9>a a+3 a>o")).toEqual([12]);
    expect(run(`"world">a "hello ">a a+ a>o`)).toEqual(["hello world"]);

    expect(run("3>a 2>a a- a>o")).toEqual([-1]);
    expect(run("3>a a-10 a>o")).toEqual([-7]);

    expect(run(`4>a 2>a a* a>o`)).toEqual([8]);
    expect(run(`4>a a*3 a>o`)).toEqual([12]);
    expect(run(`4>a "ab">a a* a>o`)).toEqual(["abababab"]);

    expect(run("2>a 4>a a/ a>o")).toEqual([2]);
    expect(run("10>a a/2 a>o")).toEqual([5]);

    expect(run("1>a 2>a 0>a a?")).toEqual([]);
  });

  it("loops", () => {
    expect(run("5>n (n n-1 1>o n?)")).toEqual([1, 1, 1, 1, 1]);
  });

  it("functions", () => {
    expect(run(`{:foo 1>o} :foo`)).toEqual([1]);
    expect(run(`{:foo 1>a a+1 a>o} :foo`)).toEqual([2]);
    expect(run(`{:foo 1>a a-2 a>o} :foo`)).toEqual([-1]);
  });

  it("uses input stack", () => {
    expect(run(`i>o`, [1])).toEqual([1]);
  });

  it("only allows functions to be defined at top level", () => {
    expect(() => run(`{:foo {:bar} } :foo`)).toThrow();
    expect(() => run(`1>a (a a>b {:bar} )`)).toThrow();
  });

  it("throws error when pushing to input stack", () => {
    expect(() => run(`1>i`)).toThrow();
  });

  it("throws error when popping from output stack", () => {
    expect(() => run(`o>`)).toThrow();
  });
});
