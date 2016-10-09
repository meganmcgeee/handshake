#!/usr/bin/env sh
./watch.sh &
eval $(cat .env) ./node_modules/.bin/nodemon lib/index.js
