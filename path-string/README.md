# path string

Provide utility functions for path of string.

So don't care whether path exists. The path is in only string, but not in IO.

If string ends with slash, it's directory.

- a/
- /a/b/
- . (exception: it's also directory.)

If string doesn't with slash, it's file.

- file
- /a/b/file
