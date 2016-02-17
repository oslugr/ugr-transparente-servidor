#!/bin/bash

rm -rf public/imagenes public/img public/doc public/graph
wget https://codeload.github.com/oslugr/recursos-transparente-ugr/zip/master -O recursos.zip
unzip -o recursos.zip -d public/
mv public/recursos-transparente-ugr-master/* public/
rm -rf public/recursos-transparente-ugr-master
rm public/LICENSE public/README.md recursos.zip
