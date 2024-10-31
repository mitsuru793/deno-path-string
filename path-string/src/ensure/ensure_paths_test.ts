import { assert, fail } from "jsr:@std/assert";
import { join } from "jsr:@std/path";
import { testMakePath } from "./_test_util.ts";
import { ensurePaths } from "./ensure_paths.ts";

testMakePath("ensurePaths - if argument is not empty", (tmpDir) => {
  let joined = [join(tmpDir, "f1")];
  ensurePaths(joined);
  assert(Deno.lstatSync(joined[0]).isFile, joined[0]);

  joined = ["a/", "a/b/", "a/f2"].map((v) => join(tmpDir, v));
  ensurePaths(joined);
  assert(Deno.lstatSync(joined[0]).isDirectory, joined[0]);
  assert(Deno.lstatSync(joined[1]).isDirectory, joined[1]);
  assert(Deno.lstatSync(joined[2]).isFile, joined[2]);
});

testMakePath("ensurePaths - if arugment is empty", (_tmpDir) => {
  try {
    ensurePaths([]);
  } catch (e) {
    fail(`Thtrow error: ${e}`);
  }
});
