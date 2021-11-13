#!/bin/sh

rm -rf dist \

mv dist_ dist \

find ./dist/node_modules -type f \( \
-name ".npmignore" \
-o -name ".travis.yml" \
-o -name "*.md" \
-o -name "*.mkd" \
-o -name "*.txt" \
-o -name "*.html" \
-o -name "*.htm" \
-o -name "LICENSE-MIT" \
-o -name "CODEOWNERS" \
-o -name "LICENSE" \
-o -name "license" \
-o -name "README.js" \
-o -name ".package-lock.json" \) -delete

find ./dist/node_modules -type d -empty -delete