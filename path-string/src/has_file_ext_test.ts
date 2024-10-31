import { assert, assertFalse } from "jsr:@std/assert";
import { hasFileExt } from "./has_file_ext.ts";

Deno.test("hasFileExt - argument path", async (t) => {
  // valid
  await t.step("if it has file extension", () => {
    assert(hasFileExt("file.txt"));
  });

  await t.step("if it nested file path", () => {
    assert(hasFileExt("dir/file.txt"));
  });

  // invalid
  await t.step("if it is empty", () => {
    assertFalse(hasFileExt(""));
  });

  await t.step("if it is only dot(.)", () => {
    assertFalse(hasFileExt("."));
  });

  await t.step("if it has no file extention", () => {
    assertFalse(hasFileExt("file"));
  });

  await t.step("if it is directory", () => {
    assertFalse(hasFileExt("dir/"));
  });

  await t.step("if it is dot file", () => {
    assertFalse(hasFileExt(".sample"));
  });
});
