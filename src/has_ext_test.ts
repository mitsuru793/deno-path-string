import { assert, assertFalse } from "jsr:@std/assert";
import { hasExt } from "./has_ext.ts";

Deno.test("hasExt - argument path", async (t) => {
  // valid
  await t.step("if it has file extension", () => {
    assert(hasExt("file.txt"));
  });

  await t.step("if it nested file path", () => {
    assert(hasExt("dir/file.txt"));
  });

  // invalid
  await t.step("if it is empty", () => {
    assertFalse(hasExt(""));
  });

  await t.step("if it is only dot(.)", () => {
    assertFalse(hasExt("."));
  });

  await t.step("if it has no file extention", () => {
    assertFalse(hasExt("file"));
  });

  await t.step("if it is directory", () => {
    assertFalse(hasExt("dir/"));
  });

  await t.step("if it is dot file", () => {
    assertFalse(hasExt(".sample"));
  });
});
