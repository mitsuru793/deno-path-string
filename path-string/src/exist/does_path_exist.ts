export function doesPathExist(file: string): boolean {
  try {
    Deno.lstatSync(file);
    return true;
  } catch (err) {
    if (!(err instanceof Deno.errors.NotFound)) {
      throw err;
    }
    return false;
  }
}
