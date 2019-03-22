ng build --output-path dist
git commit -am "build prod"
git push
git -C .. subtree push --prefix front-end/dist origin prod
ssh -i $1 bitnami@3.82.184.166 'sh /home/bitnami/git/pullProd.sh'
