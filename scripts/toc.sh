#!/bin/bash
pushd docs > /dev/null
echo "import React from 'react';"
echo "export const pages = {" 
find . -name "*.md*" -exec echo "    [\"{}\".substr(2)]: React.lazy(() => import(\"{}\"))," \;
echo "}"
popd > /dev/null