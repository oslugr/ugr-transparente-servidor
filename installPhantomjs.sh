#!/bin/bash

sudo apt-get install build-essential chrpath libssl-dev libxft-dev libfreetype6 libfreetype6-dev libfontconfig1 libfontconfig1-dev
wget https://bitbucket.org/ariya/phantomjs/downloads/phantomjs-2.1.1-linux-x86_64.tar.bz2 -O phantomjs.tar.bz2
tar xvjf phantomjs.tar.bz2
rm phantomjs.tar.bz2
sudo mv phantomjs-2.1.1-linux-x86_64/bin/phantomjs /usr/local/share
sudo ln -sf /usr/local/share/phantomjs /usr/local/bin
rm -rf phantomjs-2.1.1-linux-x86_64
