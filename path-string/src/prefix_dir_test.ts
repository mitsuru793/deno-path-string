import { assertEquals, assertThrows } from "jsr:@std/assert";
import { prefixDir } from "./prefix_dir.ts";

type TestCase = {
  inputs: Parameters<typeof prefixDir>;
  expected: ReturnType<typeof prefixDir>;
};

Deno.test("prefixDir - argument paths", async (t) => {
  // valid
  await t.step("if it is empty", () => {
    const got = prefixDir("dir/", []);
    assertEquals(got, []);
  });

  await t.step("if it has file", () => {
    const got = prefixDir("dir/", ["f1"]);
    assertEquals(got, ["dir/f1"]);
  });

  await t.step("if it has dir", () => {
    const got = prefixDir("dir/", ["subDir/"]);
    assertEquals(got, ["dir/subDir/"]);
  });

  await t.step("if it has nested path", () => {
    const got = prefixDir("dir/", ["subDir/f1"]);
    assertEquals(got, ["dir/subDir/f1"]);
  });

  await t.step("if it has some elements", () => {
    const got = prefixDir("dir/", ["f1", "subDir/"]);
    assertEquals(got, ["dir/f1", "dir/subDir/"]);
  });
});

Deno.test("prefixDir - arugment prefix", async (t) => {
  // valid
  await t.step("if it has suffix with slash", () => {
    const got = prefixDir("dir/", ["f1"]);
    assertEquals(got, ["dir/f1"]);
  });

  await t.step("if it has prefix and suffix with slash", () => {
    const got = prefixDir("/dir/", ["f1"]);
    assertEquals(got, ["/dir/f1"]);
  });

  await t.step("if it has prefix and suffix with slash", () => {
    const got = prefixDir("/dir/", ["f1"]);
    assertEquals(got, ["/dir/f1"]);
  });

  await t.step("if it is only slash", () => {
    const got = prefixDir("/", ["f1"]);
    assertEquals(got, ["/f1"]);
  });

  // throw error
  await t.step("if it has no suffix with slash", () => {
    assertThrows(() => {
      prefixDir("base", ["f1"]);
    });
  });

  await t.step("if it is empty", () => {
    assertThrows(() => {
      prefixDir("", ["f1"]);
    });
  });
});

Deno.test("prefixDir - combine continuous slash into one", () => {
  const tests: TestCase[] = [
    {
      inputs: ["dir//", ["//f1"]],
      expected: ["dir/f1"],
    },
    {
      inputs: ["dir1//", ["//dir2//"]],
      expected: ["dir1/dir2/"],
    },
    {
      inputs: ["//dir1//", ["//dir2//"]],
      expected: ["/dir1/dir2/"],
    },
  ];
  for (const { inputs, expected } of tests) {
    const got = prefixDir(...inputs);
    assertEquals(got, expected);
  }
});
