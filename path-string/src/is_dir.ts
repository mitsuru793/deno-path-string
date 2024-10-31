import { SEPARATOR } from "jsr:@std/path/constants";

export function isDir(path: string): boolean {
  if (path === ".") {
    return true;
  }

  return path.match(new RegExp(`${SEPARATOR}$`)) !== null;
}
