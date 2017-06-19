#!/bin/bash

N=1000

# get proper dirname
cd $(dirname $0)
DIRNAME=$PWD
cd $OLDPWD

# copy over
echo "Copying files for big.file ($N files in 1 file) ..."
echo $TOOLS | tr ' ' '\n' | while read tool; do
  mkdir -p ${DIRNAME}/${tool}/src/js

  # reset file if exists
  echo '' > ${DIRNAME}/${tool}/src/js/bootstrap-big.js

  # copy all copies into single big
  for ((i=0;i<$N;i++)); do
    cat ${DIRNAME}/../node_modules/bootstrap/dist/js/bootstrap.js >> ${DIRNAME}/${tool}/src/js/bootstrap-big.js
  done
done