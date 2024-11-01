import { assertEquals } from "jsr:@std/assert";
import { doesPathExist } from "./does_path_exist.ts";
import { testMakePath } from "../_test_util.ts";
import { ensurePaths } from "../ensure/mod.ts";
import { prefixDir } from "../prefix_dir.ts";

testMakePath("doesPathExist", (tmpDir) => {
  const [file, dir] = prefixDir(tmpDir + "/", ["f1", "dir1/"]);
  ensurePaths([file, dir]);

  const tests: [string, boolean][] = [
    [file, true],
    [dir, true],
    [".", true],
    ["missing", false],
    ["", false],
  ];
  for (const [input, expected] of tests) {
    assertEquals(doesPathExist(input), expected);
  }
});
