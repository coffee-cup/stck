import { parse as parseRaw } from "./parserRaw";
import { Expression } from "./types";

export const parse = (input: string): Expression => parseRaw(input);
