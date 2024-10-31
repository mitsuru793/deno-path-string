import { assert, assertFalse } from "jsr:@std/assert";
import { isFile } from "./is_file.ts";

Deno.test("isFile - argument path", async (t) => {
  // valid
  await t.step("if it has no suffix with slash", () => {
    assert(isFile("file"));
  });

  await t.step("if it is nest path", () => {
    assert(isFile("dir/sub/file"));
  });

  // invalid
  await t.step("if it has suffix with slash", () => {
    assertFalse(isFile("file/"));
  });

  await t.step("if it is empty", () => {
    assertFalse(isFile(""));
  });
});
