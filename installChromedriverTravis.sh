#!/bin/bash

wget -N http://chromedriver.storage.googleapis.com/2.21/chromedriver_linux64.zip

unzip chromedriver_linux64.zip
chmod +x chromedriver

export PATH="$PWD:$PATH"
