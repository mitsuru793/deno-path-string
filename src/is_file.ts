import { SEPARATOR } from "jsr:@std/path/constants";

export function isFile(path: string): boolean {
  return path.match(`[^${SEPARATOR}]$`) !== null;
}
