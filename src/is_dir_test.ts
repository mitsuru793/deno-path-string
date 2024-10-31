import { assert, assertFalse } from "jsr:@std/assert";
import { isDir } from "./is_dir.ts";

Deno.test("isDir - argument path", async (t) => {
  // valid
  await t.step("if it is dot without suffix with slash", () => {
    assert(isDir("."));
  });

  await t.step("if it has suffix with slash", () => {
    assert(isDir("dir/"));
  });

  await t.step("if it is nest path", () => {
    assert(isDir("root/dir/sub/"));
  });

  // invalid
  await t.step("if it has no suffix with slash", () => {
    assertFalse(isDir("dir"));
  });

  await t.step("if it is empty", () => {
    assertFalse(isDir(""));
  });
});
