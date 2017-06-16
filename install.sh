#!/bin/bash

cd $(dirname $0)
dirname="$PWD"
cd $OLDPWD

log="$dirname/build"
test=$1

mkdir -p $log

cd $1

rm -f $log/$test.deps.log $log/$test.lines.log

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
  echo " - $i: $dep total dependencies." >> $log/$test.deps.log

  # update min
  if [ "$dep" -le "$depMinA" ]; then
    depMinA="$dep"
    depMinB="$i"
  fi

  # find lines of code
  length=0
  for file in $(find . | grep '.js' | sed -E '/node_modules|dist|src|package/d'); do
    if [ -f "$file" ]; then
      n=$(cat -n $file | tail -n 1 | tr '\t' ' ' | tr -s ' ' | cut -d\  -f2)
      length=$[length+n]
    fi
  done

  # add to log
  echo " - $i: $length total lines of code." >> $log/$test.lines.log

  # update min
  if [ "$length" -le "$codeMinA" ]; then
    codeMinA="$length"
    codeMinB="$i"
  fi

  cd ..
done

# log
cat > $log/$test.deps.log.tmp << _EOF
Dependency counts for $test:
$(cat $log/$test.deps.log)

The most 'lightweight' setup is via $depMinB (in terms of dependencies).
_EOF

cat > $log/$test.lines.log.tmp << _EOF

Code (lines) count for $test:
$(cat $log/$test.lines.log)

The most 'lightweight' setup is via $codeMinB (in terms of lines of code).
_EOF

mv $log/$test.deps.log.tmp $log/$test.deps.log
mv $log/$test.lines.log.tmp $log/$test.lines.log