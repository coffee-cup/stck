import * as getStdin from "get-stdin";
import * as fs from "fs";
import * as path from "path";
import * as commander from "commander";

const packageJson = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, "../package.json"), "utf8"),
);
const version: string = packageJson.version;

const readFile = (filename: string): Promise<string> => {
  const fullpath = path.resolve(__dirname, filename);
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

const run = async () => {
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
    console.log(contents);
  } catch (e) {
    console.log(e.message);
  }
};

run();
