#!/bin/bash

# get proper dirname
cd $(dirname $0)
DIRNAME=$PWD
cd $OLDPWD

# copy over
echo "Copying files ..."
echo $TOOLS | tr ' ' '\n' | while read tool; do
  mkdir -p ${DIRNAME}/${tool}/src/{js,css}

  cp ${DIRNAME}/../node_modules/bootstrap/dist/js/bootstrap.js ${DIRNAME}/${tool}/src/js/
  cp ${DIRNAME}/../node_modules/bootstrap/dist/css/bootstrap.css ${DIRNAME}/${tool}/src/css/
done