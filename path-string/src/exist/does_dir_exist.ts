import { doesPathExist } from "./does_path_exist.ts";

export function doesDirExist(currentPath: string): boolean {
  if (!doesPathExist(currentPath)) {
    return false;
  }
  return Deno.lstatSync(currentPath).isDirectory;
}
