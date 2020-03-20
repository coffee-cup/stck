import * as commander from "commander";
import * as fs from "fs";
import * as getStdin from "get-stdin";
import * as path from "path";
import { interpret } from "./interpret";
import { parse } from "./parser";
import { Value } from "./types";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"),
);
const version: string = packageJson.version;

const readFile = (filename: string): Promise<string> => {
  const fullpath = path.resolve(process.cwd(), filename);
  return new Promise((resolve, reject) => {
    fs.readFile(fullpath, "utf8", (err, data) => {
      if (err != null) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const log = (s: string) => {
  // tslint:disable-next-line:no-console
  console.log(s);
};

const run = async (input: Value[]) => {
  const program = new commander.Command();
  program.version(version);

  program.parse(process.argv);

  try {
    if (program.args.length !== 1) {
      throw new Error(
        program.args.length === 0 ? "Filename required" : "Too many args",
      );
    }

    const filename = program.args[0];
    const contents = await readFile(filename);
    const ast = parse(contents);
    const state = interpret(ast, input);

    const output = state.stacks.o || [];

    log(output.join(""));
  } catch (e) {
    if (e.location != null) {
      const loc = e.location.start;
      log(`${loc.line}:${loc.column} ${e.message}`);
    } else {
      log(e.message);
    }
  }
};

const numRegex = /^-?\d+\.?\d*$/;
export const parseStdin = (stdin: string): Value[] => {
  if (stdin == null || stdin === "") {
    return [];
  }

  return stdin.split("\n").map(line => {
    try {
      if (numRegex.test(line)) {
        return parseFloat(line);
      }
    } catch (e) {
      // do nothing
    }

    return line;
  });
};

getStdin().then(stdin => {
  const inputStack = parseStdin(stdin.trim());
  run(inputStack);
});
