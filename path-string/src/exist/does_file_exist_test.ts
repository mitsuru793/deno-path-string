import { assertEquals } from "@std/assert";
import { doesFileExist } from "./does_file_exist.ts";

Deno.test("doesFileExist", () => {
  const dir = Deno.makeTempDirSync();
  const file = Deno.makeTempFileSync();

  const testcases: [string, boolean][] = [
    [dir, false],
    [file, true],
    ["missing", false],
    ["missing/", false],
  ];
  testcases.forEach(([target, expected]) => {
    const got = doesFileExist(target);
    assertEquals(got, expected);
  });
});
