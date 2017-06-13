#!/bin/bash -e

# this allows us to treat any locally installed clis
# as commands
export PATH="$PATH:./node_modules/.bin"

# set the number of iterations
export MAX_ITERATIONS=500

# set tools
export TOOLS=(gulp grunt fly brunch)

# create directory for logs
mkdir -p build

# cleanup
function cleanup() {
  zip -r build.zip build
  rm -rf build
  kill ${PIDS[@]} &>/dev/null || echo ""
}

trap cleanup EXIT

# add common files
for tool in ${TOOLS[@]}; do
  cd $tool

  npm i -d &>../build/npm-$tool.log

  rm -rf src dist
  mkdir -p src/{css,js} dist

  cp ../node_modules/jquery/dist/jquery.js src/js/
  cp ../node_modules/bootstrap/dist/js/bootstrap.js src/js/
  cp ../node_modules/bootstrap/dist/css/bootstrap.css src/css/

  cd ..

  ./benchone.sh $tool >build/build-$tool.log || (cat build/build-$tool.log; exit 1)
done

# show stats
echo ""
echo "  ############################"
echo "  # RESULTS                  #"
echo "  ############################"

TOOLS="$(echo ${TOOLS[@]} | sed 's/ /,/g')" node stats.js
