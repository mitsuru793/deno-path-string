import { assertEquals, assertThrows } from "jsr:@std/assert";
import { appendPrefixDir } from "./append_prefix.ts";

Deno.test("appendPrefixDir - argument paths", async (t) => {
  // valid
  await t.step("if it is empty", () => {
    const got = appendPrefixDir("dir/", []);
    assertEquals(got, []);
  });

  await t.step("if it has file", () => {
    const got = appendPrefixDir("dir/", ["f1"]);
    assertEquals(got, ["dir/f1"]);
  });

  await t.step("if it has dir", () => {
    const got = appendPrefixDir("dir/", ["subDir/"]);
    assertEquals(got, ["dir/subDir/"]);
  });

  await t.step("if it has nested path", () => {
    const got = appendPrefixDir("dir/", ["subDir/f1"]);
    assertEquals(got, ["dir/subDir/f1"]);
  });

  await t.step("if it has some elements", () => {
    const got = appendPrefixDir("dir/", ["f1", "subDir/"]);
    assertEquals(got, ["dir/f1", "dir/subDir/"]);
  });
});

Deno.test("appendPrefixDir - arugment prefix", async (t) => {
  // valid
  await t.step("if it has suffix with slash", () => {
    const got = appendPrefixDir("dir/", ["f1"]);
    assertEquals(got, ["dir/f1"]);
  });

  await t.step("if it has prefix and suffix with slash", () => {
    const got = appendPrefixDir("/dir/", ["f1"]);
    assertEquals(got, ["/dir/f1"]);
  });

  await t.step("if it has prefix and suffix with slash", () => {
    const got = appendPrefixDir("/dir/", ["f1"]);
    assertEquals(got, ["/dir/f1"]);
  });

  await t.step("if it is only slash", () => {
    const got = appendPrefixDir("/", ["f1"]);
    assertEquals(got, ["/f1"]);
  });

  // throw error
  await t.step("if it has no suffix with slash", () => {
    assertThrows(() => {
      appendPrefixDir("base", ["f1"]);
    });
  });

  await t.step("if it is empty", () => {
    assertThrows(() => {
      appendPrefixDir("", ["f1"]);
    });
  });
});
