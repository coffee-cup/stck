import { Node } from "../types";

export const expectType = (type: string, node: Node) => {
  if (node.type !== type) {
    throw new Error(`Expected ${node} to have type ${type}`);
  }
};
