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
