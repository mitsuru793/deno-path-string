import { prefixDir } from "./prefix_dir.ts";
import { bindTableDrivenTest, bindTableDrivenTestThrow } from "./_test_util.ts";

const tableTest = bindTableDrivenTest<typeof prefixDir>({
  runner: (inputs) => prefixDir(...inputs),
});

const tableTestThrow = bindTableDrivenTestThrow<typeof prefixDir>({
  runner: (inputs) => prefixDir(...inputs),
});

tableTest("prefixDir() - argument paths", [
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

tableTest("prefixDir() - argument prefix for valid", [
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

tableTestThrow("prefixDir() - argument prefix for throwing error", [
  {
    label: "if it has no suffix with slash",
    inputs: ["base", ["f1"]],
  },
  {
    label: "if it is empty",
    inputs: ["", ["f1"]],
  },
]);

tableTest("prefixDir() - combine continuous slash into one", [
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
