#!/bin/sh

rm -rf ./docs
cd packages/client
NODE_ENV=prod yarn build

cd ../..

mv ./packages/client/dist/ ./docs