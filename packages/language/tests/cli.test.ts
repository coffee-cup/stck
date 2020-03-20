import { parseStdin } from "../src/cli";

describe("cli", () => {
  it("stdin parses empty string", () => {
    expect(parseStdin("")).toEqual([]);
  });

  it("stdin parses single stdin string", () => {
    expect(parseStdin("hello")).toEqual(["hello"]);
  });

  it("stdin parses single number", () => {
    expect(parseStdin("1")).toEqual([1]);
  });

  it("stdin parses mix of strings and numbers", () => {
    expect(parseStdin("1\nhello\n2")).toEqual([1, "hello", 2]);
  });
});
