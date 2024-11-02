import { ensureDirSync, ensureFileSync } from "jsr:@std/fs";
import { isDir } from "../is_dir.ts";
import { isFile } from "../is_file.ts";

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
