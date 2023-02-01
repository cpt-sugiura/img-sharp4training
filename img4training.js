const sharp = require('sharp');
const fs = require('fs');
const imageSize = require('image-size');

const srcDir = `${__dirname}/src`;
const distDir = `${__dirname}/dist`;
const fileNames = fs.readdirSync(srcDir);

let i = 1;
fileNames.forEach(name => {
  const path = `${srcDir}/${name}`;
  const size = imageSize(path);
  const longSideLen = size.height < size.width ? size.width : size.height
  console.log(longSideLen)
  sharp(path).resize(longSideLen, longSideLen, {
    fit: 'contain',
    background: {r: 255, g: 255, b: 255, alpha: 0}
  }).png().toFile(`${distDir}/${i}.png`);

  const len = Math.floor(longSideLen / 2);
  sharp(path).resize(len, len, {
    fit: 'cover',
    background: {r: 255, g: 255, b: 255, alpha: 0},
    position: 'top',
  }).png().toFile(`${distDir}/${i}a.png`);
  i++;
});
