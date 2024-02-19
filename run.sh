cd /Users/vyhoang/Documents/GitHub/mongoose-embedded
rm -rf nestjs-mongoose-embedded-1.0.1.tgz
yarn build
cd /Users/vyhoang/Documents/GitHub/test-mongoose-embedded/node_modules/@nestjs
rm -rf mongoose-embedded
cd /Users/vyhoang/Documents/GitHub/test-mongoose-embedded
yarn cache clean
yarn