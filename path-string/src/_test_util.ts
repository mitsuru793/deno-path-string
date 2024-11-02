import { assertEquals, assertThrows } from "@std/assert";

export function testMakePath(
  name: string,
  cb: (tmpDir: string) => void,
  ignore = false,
): void {
  Deno.test({
    name,
    fn() {
      const tempDir = Deno.makeTempDirSync({
        prefix: "deno_io-writer_make_path_test_",
      });
      cb(tempDir);
      Deno.removeSync(tempDir, { recursive: true });
    },
    ignore,
  });
}

// deno-lint-ignore no-explicit-any
type TestFunction = (...args: any[]) => unknown;

export type TestCase<T extends TestFunction> = {
  label: string;
  inputs: Parameters<T>;
  expected: ReturnType<T>;
};

type TestRunner<T extends TestFunction> = (
  inputs: TestCase<T>["inputs"],
) => ReturnType<T>;

export function tableDrivenTest<T extends TestFunction>(
  testname: string,
  testcases: TestCase<T>[],
  runner: TestRunner<T>,
): void {
  Deno.test(testname, async (t) => {
    for (const testcase of testcases) {
      await t.step(testcase.label, () => {
        const got = runner(testcase.inputs);
        assertEquals(got, testcase.expected);
      });
    }
  });
}

export type ThrowTestCase<T extends TestFunction> = {
  label: string;
  inputs: Parameters<T>;
};

export function tableDrivenTestThrow<T extends TestFunction>(
  testname: string,
  testcases: ThrowTestCase<T>[],
  runner: TestRunner<T>,
): void {
  Deno.test(testname, async (t) => {
    for (const testcase of testcases) {
      await t.step(testcase.label, () => {
        assertThrows(() => {
          runner(testcase.inputs);
        });
      });
    }
  });
}
