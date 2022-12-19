#!/bin/bash
# $1: path of file which wanted to import. EX: ../src/utils/icon.ts
file="../../src/Theme/Images.ts"

if [ -f "$file" ] ; then
    rm "$file"
fi
touch ../../src/Theme/Images.ts

echo "import { ThemeVariables } from './theme'" >>../../src/Theme/Images.ts

echo "export default function ({}: ThemeVariables) {" >>../../src/Theme/Images.ts

echo return { >>../../src/Theme/Images.ts
for entry in Images/*; do
    IFS='/.'                  # space is set as delimiter
    read -ra ADDR <<<"$entry" # str is read into an array as tokens separated by IFS
    str="${ADDR[1]}"
    str2="${ADDR[2]}"
    echo "${str} : require('@/Assets/Images/$(echo ${str}).${str2}')," >>../../src/Theme/Images.ts
done

echo "} }" >>../../src/Theme/Images.ts
