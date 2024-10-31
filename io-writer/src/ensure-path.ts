import { ensureDirSync, ensureFileSync } from "jsr:@std/fs";
import { isDir, isFile } from "@mitsuru793/path-string";

export function ensurePath(path: string): void {
  if (path === ".") {
    return;
  }

  if (isFile(path)) {
    ensureFileSync(path);
    return;
  }

  if (isDir(path)) {
    ensureDirSync(path);
    return;
  }

  throw new Error(`Unexpected path type: ${path}`);
}
