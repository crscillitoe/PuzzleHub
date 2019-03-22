ng build --output-path dist-beta
git commit -am "build beta"
git push
git -C .. subtree push --prefix front-end/dist-beta origin beta
ssh -i $1 bitnami@3.82.184.166 'sh /home/bitnami/git/pullBeta.sh'
