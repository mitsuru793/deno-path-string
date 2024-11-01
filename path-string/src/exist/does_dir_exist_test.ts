import { assertEquals } from "@std/assert";
import { doesDirExist } from "./does_dir_exist.ts";

Deno.test("doesDirExist", () => {
  const dir = Deno.makeTempDirSync();
  const file = Deno.makeTempFileSync();

  const testcases: [string, boolean][] = [
    [dir, true],
    [file, false],
    ["missing", false],
    ["missing/", false],
  ];
  testcases.forEach(([target, expected]) => {
    const got = doesDirExist(target);
    assertEquals(got, expected);
  });
});
