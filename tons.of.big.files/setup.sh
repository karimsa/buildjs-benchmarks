#!/bin/bash

N=1000
M=100

# get proper dirname
cd $(dirname $0)
DIRNAME=$PWD
cd $OLDPWD

# copy over
echo "Copying files for tons.of.big.files ($N files in 1 file, then make $M copies of that file) ..."
echo $TOOLS | tr ' ' '\n' | while read tool; do
  mkdir -p ${DIRNAME}/${tool}/src/js

  # reset file if exists
  echo '' > ${DIRNAME}/${tool}/src/js/bootstrap-big.js

  # copy all copies into single big
  for ((i=0;i<$N;i++)); do
    cat ${DIRNAME}/../node_modules/bootstrap/dist/js/bootstrap.js >> ${DIRNAME}/${tool}/src/js/bootstrap-big.js
  done

  # create copies of big files
  for ((i=1;i<$M;i++)); do
    cp ${DIRNAME}/${tool}/src/js/bootstrap-big.js ${DIRNAME}/${tool}/src/js/bootstrap-big-${i}.js
  done
done