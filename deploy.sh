set -e


echo Building. this may take a minute...
npm run build

# navigate into the build output directory
cd dist

# if you are deploying to a custom domain
# echo 'example.com' > CNAME

echo 'compare-instagram.dancode.es' > CNAME

echo Deploying..
git init
git add -A
git commit -m 'deploy'

# deploy
git push -f https://github.com/dancodedev/compare-instagram.git master:gh-pages

cd -