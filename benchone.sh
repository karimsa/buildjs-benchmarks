#!/bin/bash -e

# pick tool from args
tool=$1
echo "* Starting benchmark for $tool ..."
cd $tool

# cleanup
sum=0
rm -f bench.log

# pick date command
DATE="date"

if [ "$(node -e 'console.log(require("os").platform())')" == "darwin" ]; then
  DATE="gdate" # assuming this is installed
fi

# run benchmarks
for ((i=0;i<MAX_ITERATIONS;i++)); do
  start=$($DATE +"%s%N")
  $tool $(cat args 2>/dev/null || echo "")
  e="$?"
  end=$($DATE +"%s%N")
  dur=$[end-start]

  # if errors out, fail entire benchmark
  if [ "$e" -ne "0" ]; then
    exit $e
  fi

  # keep track
  echo "#$i: $[dur] ns"
  echo $dur >> bench.log
done