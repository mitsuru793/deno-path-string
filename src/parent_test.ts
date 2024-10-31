import { assertEquals, assertThrows } from "jsr:@std/assert";
import { parent } from "./parent.ts";

Deno.test("parent - argument path", async (t) => {
  // throw error
  await t.step("if it is empty", () => {
    assertThrows(() => parent(""));
  });

  // valid
  await t.step("if it is file path", () => {
    assertEquals(parent("file"), "../");
  });

  await t.step("if it is dir path", () => {
    assertEquals(parent("dir/"), ".");
  });

  await t.step("if it is nested path", () => {
    assertEquals(parent("dir/file"), "dir/");
    assertEquals(parent("dir/sub/"), "dir/");
  });
});
