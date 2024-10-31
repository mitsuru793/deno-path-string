import { ensurePath } from "./ensure_path.ts";

export function ensurePaths(paths: string[]): void {
  for (const path of paths) {
    ensurePath(path);
  }
}
