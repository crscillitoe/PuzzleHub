#! /bin/bash
BUILD_PATH="."
BUILD_DIR="dist"

DEPLOY_USER="bitnami"
DEPLOY_IP="3.221.42.3"
DEPLOY_DIR="~/SSR/dist.zip"

error_and_exit() {
  echo >&2 "$@"
  exit 1
}

deploy_server() {
  SERVER=$1
  PORT=$2
  BACKUP_DIR=$3
  read -r -d '' RETURN << EOM
cd $SERVER
forever stop dist/server.js
cd ..
mkdir -p $BACKUP_DIR
cp -r $SERVER/dist $BACKUP_DIR/$SERVER
rm -rf $SERVER
mkdir $SERVER
cp -r dist $SERVER/dist
cd $SERVER
PORT=$PORT forever start dist/server.js
cd ..
EOM
  echo "$RETURN"
}

get_commands() {
  local RETURN=''
  if [[ "$1" == "prod" ]]; then
    read -r -d '' RETURN << EOM
set -x
cd SSR
rm -rf dist
unzip $BUILD_DIR.zip
rm -rf backup_dist_prod
$(deploy_server server_1 1234 backup_dist_prod)
$(deploy_server server_2 1235 backup_dist_prod)
EOM
  echo "$RETURN"
  fi

  if [[ "$1" == "dev" ]]; then
    read -r -d '' RETURN << EOM
set -x
cd SSR
rm -rf backup_dist_dev
$(deploy_server server_3 1236 backup_dist_dev)
rm -rf dist
EOM
  echo "$RETURN"
  fi
}

deploy() {
  rm -rf $BUILD_PATH/$BUILD_DIR
  npm run build:ssr
  rm -f $BUILD_DIR.zip
  zip -r $BUILD_DIR.zip $BUILD_PATH/$BUILD_DIR
  scp -i $PUZZLEHUB_KEY $BUILD_DIR.zip $DEPLOY_USER@$DEPLOY_IP:$DEPLOY_DIR
  ssh -i $PUZZLEHUB_KEY $DEPLOY_USER@$DEPLOY_IP << EOM
$(get_commands $1)
EOM
}

[ "$#" -eq 1 ] || error_and_exit "Please specify an environment: {prod, dev}"

ENVIRONMENTS="prod:dev"

if [[ ":$ENVIRONMENTS:" = *:$1:* ]]; then
  deploy $1
else
  error_and_exit "Please specify one of the following: {prod, dev}"
fi
