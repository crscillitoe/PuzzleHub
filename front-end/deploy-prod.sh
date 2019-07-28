#! /bin/bash
set -x

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
cd SSR
forever stopall
cp -r dist backup_dist
rm -rf dist
unzip dist.zip
PORT=1234 forever start dist/server.js
EOF
