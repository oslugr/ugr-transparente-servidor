#!/bin/bash

wget -N http://chromedriver.storage.googleapis.com/2.21/chromedriver_linux64.zip

unzip chromedriver_linux64.zip
chmod +x chromedriver
rm chromedriver_linux64.zip

mv -f chromedriver /usr/local/share/chromedriver
ln -s /usr/local/share/chromedriver /usr/local/bin/chromedriver
ln -s /usr/local/share/chromedriver /usr/bin/chromedriver
