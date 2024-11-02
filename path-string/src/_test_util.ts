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

type TableDrivenOption<T extends TestFunction> = {
  prefixedTestName?: string;
  subTestName?: (testcase: TestCase<T> | ThrowTestCase<T>) => string;
};

function createCaseName<T extends TestFunction>(
  testcase: TestCase<T> | ThrowTestCase<T>,
  option: TableDrivenOption<T>,
): string {
  if (option.subTestName === undefined) {
    return testcase.label;
  }

  return option.subTestName(testcase);
}

export function tableDrivenTest<T extends TestFunction>(
  testcases: TestCase<T>[],
  runner: TestRunner<T>,
  option: TableDrivenOption<T> = {},
): void {
  if (option.prefixedTestName === undefined) {
    for (const testcase of testcases) {
      const caseName = createCaseName(testcase, option);
      Deno.test(caseName, () => {
        const got = runner(testcase.inputs);
        assertEquals(got, testcase.expected);
      });
    }
    return;
  }

  Deno.test(option.prefixedTestName, async (t) => {
    for (const testcase of testcases) {
      const caseName = createCaseName(testcase, option);
      await t.step(caseName, () => {
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
  testcases: ThrowTestCase<T>[],
  runner: TestRunner<T>,
  option: TableDrivenOption<T> = {},
): void {
  if (option.prefixedTestName === undefined) {
    for (const testcase of testcases) {
      const caseName = createCaseName(testcase, option);
      Deno.test(caseName, () => {
        assertThrows(() => {
          runner(testcase.inputs);
        });
      });
    }
    return;
  }

  Deno.test(option.prefixedTestName, async (t) => {
    for (const testcase of testcases) {
      const caseName = createCaseName(testcase, option);
      await t.step(caseName, () => {
        assertThrows(() => {
          runner(testcase.inputs);
        });
      });
    }
  });
}

type BinedTarget<T extends TestFunction> = {
  runner: TestRunner<T>;
};

export function bindTableDrivenTest<T extends TestFunction>(
  binded: BinedTarget<T>,
) {
  return (
    prefixedTestName: string,
    testcases: TestCase<T>[],
    option: TableDrivenOption<T> = {},
  ) => {
    tableDrivenTest<T>(
      testcases,
      binded.runner,
      { ...option, prefixedTestName },
    );
  };
}

export function bindTableDrivenTestThrow<T extends TestFunction>(
  binded: BinedTarget<T>,
) {
  return (
    prefixedTestName: string,
    testcases: ThrowTestCase<T>[],
    option: TableDrivenOption<T> = {},
  ) => {
    tableDrivenTestThrow<T>(
      testcases,
      binded.runner,
      { ...option, prefixedTestName },
    );
  };
}
