DEPLOY_USER="bitnami"
DEPLOY_IP="3.221.42.3"
DEPLOY_DIR="~/SSR"

ssh -i $PUZZLEHUB_KEY $DEPLOY_USER@$DEPLOY_IP << EOF
set -x
cd SSR
cd server_1
forever stop dist/server.js
cd ..
rm -rf server_1
mkdir server_1
cp -r backup_dist server_1/dist
cd server_1
PORT=1234 forever start dist/server.js
cd ..
cd server_2
forever stop dist/server.js
cd ..
rm -rf server_2
mkdir server_2
cp -r backup_dist server_2/dist
cd server_2
PORT=1235 forever start dist/server.js
EOF
