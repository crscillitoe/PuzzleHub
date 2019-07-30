#! /bin/bash

BUILD_PATH="."
BUILD_DIR="dist"

DEPLOY_USER="bitnami"
DEPLOY_IP="3.221.42.3"
DEPLOY_DIR="~/SSR/dist.zip"

rm -rf $BUILD_PATH/$BUILD_DIR
npm run build:ssr
zip -r $BUILD_DIR.zip $BUILD_PATH/$BUILD_DIR
scp -i $PUZZLEHUB_KEY $BUILD_DIR.zip $DEPLOY_USER@$DEPLOY_IP:$DEPLOY_DIR
ssh -i $PUZZLEHUB_KEY $DEPLOY_USER@$DEPLOY_IP << EOF
set -x
cd SSR
rm -rf backup_dist
cd server_1
forever stop dist/server.js
cd ..
cp -r server_1/dist backup_dist
rm -rf server_1
unzip dist.zip
mkdir server_1
cp -r dist server_1/dist
cd server_1
PORT=1234 forever start dist/server.js
cd ..
cd server_2
forever stop dist/server.js
cd ..
rm -rf server_2
mkdir server_2
cp -r dist server_2/dist
cd server_2
PORT=1235 forever start dist/server.js
cd ..
rm -rf dist
EOF
