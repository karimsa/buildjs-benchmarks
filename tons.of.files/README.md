# The Tons-of-Files Test

 - No plugins should be loaded or used.
 - Each tool config should:
   - Have a single task which should copy files from the glob `src/js/*.js` to `dist/js`.
   - The `src/js` directory must have 1000 copies of unminified bootstrap JS.
   - The test is to determine how the tools adapt to large numbers of files.