# JS Build Tools Benchmarks [![Build Status](https://travis-ci.org/karimsa/buildjs-benchmarks.svg?branch=master)](https://travis-ci.org/karimsa/buildjs-benchmarks)

| To see the latest benchmarks, click the travis badge above.

This repository is meant to display the automated benchmarks
of the various build tools available to JS users. The only major
requirements for the build tool is for it to be truly configurable
and highly extensible (i.e. webpack doesn't count as a build tool
since you need to hack it to compile certain assets).

## Support tools

 - gulp
 - grunt
 - fly
 - brunch

*Please open an issue to discuss additions to this list.*

## Notes on the test

 - Each tool must be benchmarked in the same Travis CI setup (i.e. same OS + packages).
 - Each tool config should:
   - Have 3 "tasks"/goals: `js`, `css`, `default`.
   - The `js` task should copy files from the glob `src/js/*.js` to `dist/js`.
   - The `css` task should copy files from the glob `src/css/*.css` to `dist/css`.
   - The `default` task should run `js` and `css`.
   - Since all we're doing is copying, I've added bootstrap and jquery (unminified &
   bundled) to the dependencies so we have large files to test against.
 - No plugins should be loaded or used.

This may not be the greatest attempt to benchmark these tools as
it does not extensively calculate any tool's capabilities. Possible
thoughts for future updates is to add a few standard plugins to each
and to calculate with and without each plugin to be able to provide
more detailed benchmarks (i.e. eslint, babel, etc.).

## Contributing

If you would like to help out with the project or believe that things
should be done differently, please open [an issue](issues).

Enjoy! :)

## License

Licensed under MIT license.

Copyright (C) 2017 Karim Alibhai.