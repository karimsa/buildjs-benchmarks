# The Simple Test

 - No plugins should be loaded or used.
 - Each tool config should:
   - Have 3 "tasks"/goals: `js`, `css`, `default`.
   - The `js` task should copy files from the glob `src/js/*.js` to `dist/js`.
   - The `css` task should copy files from the glob `src/css/*.css` to `dist/css`.
   - The `default` task should run `js` and `css`.
   - Since all we're doing is copying, I've added bootstrap and jquery (unminified &
   bundled) to the dependencies so we have large files to test against.