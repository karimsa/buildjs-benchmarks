#!/bin/bash

cd $(dirname $0)
dirname="$PWD"
cd $OLDPWD

log="$dirname/build"
test=$1

cd $1

rm -f $log/$test-deps.log $log/$test-lines.log

depMinA="100000"
depMinB="nobody"

codeMinA="100000"
codeMinB="nobody"

for i in $(echo $TOOLS | tr ' ' '\n'); do
  cd $i

  # start with silent-ish install
  npm i >/dev/null

  # figure out dependency count
  dep=$(npm ls | cat -n | tail -n 1 | tr -s ' ' | cut -d\  -f2)

  # get rid of number for newline
  dep=$[dep-1]

  # add to log
  echo " - $i: $dep total dependencies." >> $log/$test-deps.log

  # update min
  if [ "$dep" -le "$depMinA" ]; then
    depMinA="$dep"
    depMinB="$i"
  fi

  # find lines of code
  length=0
  for file in $(find . | grep '.js' | sed '/node_modules/d'); do
    if [ -f "$file" ]; then
      n=$(cat -n $file | tail -n 1 | tr '\t' ' ' | tr -s ' ' | cut -d\  -f2)
      length=$[length+n]
    fi
  done

  # add to log
  echo " - $i: $length total lines of code." >> $log/$test-lines.log

  # update min
  if [ "$length" -le "$codeMinA" ]; then
    codeMinA="$length"
    codeMinB="$i"
  fi

  cd ..
done

# log
echo ""
echo "Dependency counts for $test:"
cat $log/$test-deps.log
echo ""
echo "$depMinB is the most 'lightweight' (in terms of dependencies)."

echo ""
echo "Code (lines) count for $test:"
cat $log/$test-lines.log
echo ""
echo "$codeMinB is the most 'lightweight' (in terms of lines of code)."