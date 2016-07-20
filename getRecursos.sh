#!/bin/bash

rm -rf public/imagenes public/img public/doc public/graph

#Change wget lines in the future!!
#wget https://codeload.github.com/oslugr/recursos-transparente-ugr/zip/master -O recursos.zip
wget https://codeload.github.com/oslugr/recursos-transparente-ugr/zip/refactor -O recursos.zip

unzip -o recursos.zip -d public/
#change refactor for master
mv public/recursos-transparente-ugr-refactor/* public/
rm -rf public/recursos-transparente-ugr-refactor
rm public/LICENSE public/README.md recursos.zip
