# HOW TO DEPLOY
# STEP 1 - Become one with the build
`cd ${puzzle-hub-dir}/front-end`
`npm run build:ssr`

# STEP 2 - Create the legendary ZIP file
`zip -r dist.zip dist`

# STEP 3 - SCP The legendary ZIP file
`scp -i KEY.pem dist.zip bitnami@3.221.42.3:~/SSR/dist.zip`

# STEP 4 - Enter the server
`ssh -i KEY.pem bitnami@3.221.42.3`
`cd SSR`

# STEP 5 - kill the server
`forever stopall`

# STEP 6 - Remove old files and extract new files
`rm -rf dist`
`unzip dist.zip`

# STEP 7 - Start the server
`PORT=1234 forever start dist/server.js`