import { isDir } from "./is_dir.ts";

export function hasExt(path: string): boolean {
  if (path === "" || isDir(path)) {
    return false;
  }

  return path.match(/.+[.][^.]+$/) !== null;
}
