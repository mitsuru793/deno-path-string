import { isDir } from "./is_dir.ts";

export function mustDir(path: string): void {
  if (!isDir(path)) {
    throw new Error(`argument dir is suffixed with slash: ${path}`);
  }
}
