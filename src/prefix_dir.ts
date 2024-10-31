import { join } from "jsr:@std/path";
import { isDir } from "./is_dir.ts";

export function prefixDir(dir: string, paths: string[]): string[] {
  if (!isDir(dir)) {
    throw new Error(`Arugment dir is suffixed with slash: ${dir}`);
  }
  return paths.map((path) => join(dir, path));
}
