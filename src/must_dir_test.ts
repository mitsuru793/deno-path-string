import { assert, assertThrows } from "jsr:@std/assert";
import { isDir } from "./is_dir.ts";

Deno.test("mustDir - arugment path", async (t) => {
  // successful
  await t.step("if it has suffix with slash", () => {
    assert(isDir("dir/"));
  });

  // throw error
  await t.step("if it has no suffix with slash", () => {
    assertThrows(() => {
      assert(isDir("dir"));
    });
  });

  await t.step("if it is empty", () => {
    assertThrows(() => {
      assert(isDir(""));
    });
  });
});
