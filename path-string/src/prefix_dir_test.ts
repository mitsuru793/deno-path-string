import { assertEquals, assertThrows } from "jsr:@std/assert";
import { prefixDir } from "./prefix_dir.ts";

type TestCase = {
  label: string;
  inputs: Parameters<typeof prefixDir>;
  expected: ReturnType<typeof prefixDir>;
};

function tableDrivenTest(
  testname: string,
  testcases: TestCase[],
) {
  Deno.test(testname, async (t) => {
    for (const testcase of testcases) {
      await t.step(testcase.label, () => {
        const got = prefixDir(...testcase.inputs);
        assertEquals(got, testcase.expected);
      });
    }
  });
}

type ThrowTestCase = {
  label: string;
  inputs: Parameters<typeof prefixDir>;
};

function tableDrivenTestThrow(
  testname: string,
  testcases: ThrowTestCase[],
) {
  Deno.test(testname, async (t) => {
    for (const testcase of testcases) {
      await t.step(testcase.label, () => {
        assertThrows(() => {
          prefixDir(...testcase.inputs);
        });
      });
    }
  });
}

tableDrivenTest("prefixDir - argument paths", [
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
]);

tableDrivenTest("prefixDir - argument paths", [
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
]);

tableDrivenTest("prefixDir - arugment prefix for valid", [
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
]);

tableDrivenTestThrow("prefixDir - arugment prefix for throwing error", [
  {
    label: "if it has no suffix with slash",
    inputs: ["base", ["f1"]],
  },
  {
    label: "if it is empty",
    inputs: ["", ["f1"]],
  },
]);

tableDrivenTest("prefixDir - combine continuous slash into one", [
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
]);
