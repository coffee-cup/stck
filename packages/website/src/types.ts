import { Position } from "stck";

export interface Error {
  message: string;
  position?: Position;
}
