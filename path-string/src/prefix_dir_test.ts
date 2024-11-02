import { assertEquals, assertThrows } from "jsr:@std/assert";
import { prefixDir } from "./prefix_dir.ts";

type TestCase = {
  label: string;
  inputs: Parameters<typeof prefixDir>;
  expected: ReturnType<typeof prefixDir>;
};

type ThrowTestCase = {
  label: string;
  inputs: Parameters<typeof prefixDir>;
};

Deno.test("prefixDir - argument paths", async (t) => {
  const tests: TestCase[] = [
    {
      label: "if it is empty",
      inputs: ["dir/", []],
      expected: [],
    },
    {
      label: "if it has file",
      inputs: ["dir/", ["f1"]],
      expected: ["dir/f1"],
    },
    {
      label: "if it has dir",
      inputs: ["dir/", ["subDir/"]],
      expected: ["dir/subDir/"],
    },
    {
      label: "if it has nested path",
      inputs: ["dir/", ["subDir/f1"]],
      expected: ["dir/subDir/f1"],
    },
    {
      label: "if it has some elements",
      inputs: ["dir/", ["f1", "subDir/"]],
      expected: ["dir/f1", "dir/subDir/"],
    },
  ];

  for (const test of tests) {
    await t.step(test.label, () => {
      const got = prefixDir(...test.inputs);
      assertEquals(got, test.expected);
    });
  }
});

Deno.test("prefixDir - arugment prefix", async (t) => {
  const tests: TestCase[] = [
    {
      label: "if it has suffix with slash",
      inputs: ["dir/", ["f1"]],
      expected: ["dir/f1"],
    },
    {
      label: "if it has prefix and suffix with slash",
      inputs: ["/dir/", ["f1"]],
      expected: ["/dir/f1"],
    },
    {
      label: "if it has prefix and suffix with slash",
      inputs: ["/dir/", ["f1"]],
      expected: ["/dir/f1"],
    },
    {
      label: "if it is only slash",
      inputs: ["/", ["f1"]],
      expected: ["/f1"],
    },
  ];
  for (const test of tests) {
    await t.step(test.label, () => {
      const got = prefixDir(...test.inputs);
      assertEquals(got, test.expected);
    });
  }

  const throwTests: ThrowTestCase[] = [
    {
      label: "if it has no suffix with slash",
      inputs: ["base", ["f1"]],
    },
    {
      label: "if it is empty",
      inputs: ["", ["f1"]],
    },
  ];
  for (const test of throwTests) {
    await t.step(test.label, () => {
      assertThrows(() => prefixDir(...test.inputs));
    });
  }
});

Deno.test("prefixDir - combine continuous slash into one", async (t) => {
  const tests: TestCase[] = [
    {
      label: "if dir and file have double slash",
      inputs: ["dir//", ["//f1"]],
      expected: ["dir/f1"],
    },
    {
      label: "if sub dir has double slash",
      inputs: ["dir1/", ["//dir2//"]],
      expected: ["dir1/dir2/"],
    },
    {
      label: "if dir has root double shash",
      inputs: ["//dir1/", ["/dir2/"]],
      expected: ["/dir1/dir2/"],
    },
  ];
  for (const test of tests) {
    await t.step(test.label, () => {
      const got = prefixDir(...test.inputs);
      assertEquals(got, test.expected);
    });
  }
});
