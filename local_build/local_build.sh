#!/bin/bash

# Locally build and compress the core Blockly files into a single JavaScript
# file.
#
# Copyright 2018 Google Inc.
# https://developers.google.com/blockly/
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#   http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
#
# Usage: local_build.sh.
#
# This script generates only local_blockly_compressed.js. You may modify it as
# needed to build other files.
#
# The compressed file is a concatenation of all of Blockly's core files, run
# through a local copy of Google's Closure Compiler with simple optimizations
# turned on.

# Future work:
# - Trim down Google's Apache licenses, to match the output of build.py.
# - Generate other compressed files generated by build.py normally.
# - Add a good error message if multiple versions of the closure compiler were
#   found.

# Note that the root folder MUST be named 'local_build'.

EXPECTED_PWD='local_build'
if [[ ${PWD##*/} != $EXPECTED_PWD ]]; then
  echo ""
  echo "  WARNING   This script should be run from the blockly/local_build folder."
  echo ""
  exit 1
fi

# Find the Closure Compiler.
if [ -f "$(npm root)/google-closure-compiler/compiler.jar" ]; then
  COMPILER="$(npm root)/google-closure-compiler/compiler.jar"
elif [ -f closure-compiler*.jar ]; then
  COMPILER="closure-compiler*.jar"
  # TODO: Check whether multiple files were found.
else
  echo "ERROR: Closure Compiler not found."
  echo "Download from this URL, and place jar file in current directory."
  echo "https://dl.google.com/closure-compiler/compiler-latest.zip"
  exit 1
fi

echo Using $COMPILER as the compiler.
rm local_blockly_compressed.js 2> /dev/null
echo Compiling Blockly core...
java -jar $COMPILER \
  --js='../core/**.js' \
  --js='../../closure-library/closure/goog/**.js' \
  --js='../../closure-library/third_party/closure/goog/**.js' \
  --generate_exports \
  --warning_level='DEFAULT' \
  --compilation_level SIMPLE_OPTIMIZATIONS \
  --dependency_mode=STRICT \
  --entry_point=Blockly \
  --js_output_file local_blockly_compressed.js

if [ -s local_blockly_compressed.js ]; then
  echo Compilation OK.
else
  echo Compilation FAIL.
  exit 1
fi
