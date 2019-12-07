import { parse as parseRaw } from "./parserRaw";
import { Program } from "./types";

export const parse = (input: string): Program => parseRaw(input);
