#!/bin/bash -e

# this allows us to treat any locally installed clis
# as commands
export PATH="$PATH:./node_modules/.bin"

# set the number of iterations
export MAX_ITERATIONS=10

# set tools
export TOOLS=(gulp grunt fly brunch)

# add common files
for tool in ${TOOLS[@]}; do
  cd $tool

  npm i

  rm -rf src dist
  mkdir -p src/{css,js} dist

  cp ../node_modules/jquery/dist/jquery.js src/js/
  cp ../node_modules/bootstrap/dist/js/bootstrap.js src/js/
  cp ../node_modules/bootstrap/dist/css/bootstrap.css src/css/

  cd ..

  ./benchone.sh $tool &
  PIDS+=($!)
done

# wait for benchmarks
for pid in ${PIDS[@]}; do
  wait $pid
done

# show stats
echo "  ############################"
echo "  # RESULTS                  #"
echo "  ############################"

TOOLS="$(echo ${TOOLS[@]} | sed 's/ /,/g')" node stats.js