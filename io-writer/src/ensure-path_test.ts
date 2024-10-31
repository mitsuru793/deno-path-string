import { assert } from "jsr:@std/assert";
import { join } from "jsr:@std/path";
import { ensurePath } from "./ensure-path.ts";
import { testMakePath } from "./_test_util.ts";

testMakePath("ensurePath - if argument path is file", (tmpDir) => {
  const tests = [
    "file.txt",
    "file",
    ".file",
    "a/b/f1",
  ];

  for (const input of tests) {
    const joined = join(tmpDir, input);
    ensurePath(joined);
    assert(Deno.lstatSync(joined).isFile, input);
  }
});

testMakePath("ensurePath - if argument path is directory", (tmpDir) => {
  const tests = [
    "dir/",
    "a/b/",
  ];

  for (const input of tests) {
    const joined = join(tmpDir, input);
    ensurePath(joined);
    assert(Deno.lstatSync(joined).isDirectory, input);
  }

  // special pattern
  ensurePath(".");
  assert(Deno.lstatSync(".").isDirectory);
});
