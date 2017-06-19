#!/bin/bash

N=1000

# get proper dirname
cd $(dirname $0)
DIRNAME=$PWD
cd $OLDPWD

# copy over
echo "Copying files for tons.of.files ($N files) ..."
echo $TOOLS | tr ' ' '\n' | while read tool; do
  mkdir -p ${DIRNAME}/${tool}/src/js

  for ((i=0;i<$N;i++)); do
    cp ${DIRNAME}/../node_modules/bootstrap/dist/js/bootstrap.js ${DIRNAME}/${tool}/src/js/bootstrap-${i}.js
  done
done