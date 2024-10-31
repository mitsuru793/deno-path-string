import { SEPARATOR } from "jsr:@std/path/constants";
import { isDir } from "./is_dir.ts";
import { isFile } from "./is_file.ts";

export function parent(path: string): string {
  if (path === "") {
    throw new Error("Argument path must not empty.");
  }

  const flags = path.split(SEPARATOR);

  if (isFile(path)) {
    // ex: file
    if (flags.length === 1) {
      return "../";
    }

    // ex: dir/sub/file
    if (flags.length > 1) {
      return flags.slice(0, -1).join(SEPARATOR) + SEPARATOR;
    }
  }

  if (isDir(path)) {
    // ex: dir/
    if (flags.length === 2) {
      return ".";
    }
    // ex: dir/a/b/
    if (flags.length > 2) {
      return flags.slice(0, -2).join(SEPARATOR) + SEPARATOR;
    }
  }

  throw new Error(`Unexpected case: ${path}`);
}
