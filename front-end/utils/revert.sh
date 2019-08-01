#! /bin/bash
DEPLOY_USER="bitnami"
DEPLOY_IP="3.221.42.3"

error_and_exit() {
  echo >&2 "$@"
  exit 1
}

revert_server() {
  SERVER=$1
  PORT=$2
  BACKUP_DIR=$3
  read -r -d '' RETURN << EOM
cd $SERVER
forver stop dist/server.js
cd ..
rm -rf $SERVER
mkdir $SERVER
cp -r $BACKUP_DIR/$SERVER $SERVER/dist
cd $SERVER
PORT=$PORT forever start dist/server
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
$(revert_server server_1 1234 backup_dist_prod)
$(revert_server server_2 1235 backup_dist_prod)
EOM
  echo "$RETURN"
  fi

  if [[ "$1" == "dev" ]]; then
    read -r -d '' RETURN << EOM
set -x
cd SSR
$(revert_server server_3 1236 backup_dist_dev)
EOM
  echo "$RETURN"
  fi
}

revert() {
  ssh -i $PUZZLEHUB_KEY $DEPLOY_USER@$DEPLOY_IP << EOM
$(get_commands $1)
EOM
}

[ "$#" -eq 1 ] || error_and_exit "Please specify an environment: {prod, dev}"

ENVIRONMENTS="prod:dev"

if [[ ":$ENVIRONMENTS:" = *:$1:* ]]; then
  get_commands $1
else
  error_and_exit "Please specify one of the following: {prod, dev}"
fi
