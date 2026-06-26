const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const targets = [
  'src/assets/box-banheiro.jpg',
  'src/assets/fachada-casa.jpg',
  'src/assets/porta-aluminio.jpg',
  'src/assets/portfolio/casa-vidro.jpeg',
  'src/assets/portfolio/duas-rodas.jpeg',
  'src/assets/portfolio/container.jpeg',
  'src/assets/portfolio/gambatoo.jpeg'
];

async function run() {
  for (const relPath of targets) {
    const absPath = path.join(__dirname, '..', relPath);
    const outPath = absPath.replace(/\.(jpe?g)$/i, '.webp');
    const before = fs.statSync(absPath).size;
    await sharp(absPath).webp({ quality: 80 }).toFile(outPath);
    const after = fs.statSync(outPath).size;
    console.log(
      `${relPath} -> ${path.basename(outPath)} (${(before / 1024).toFixed(0)}KB -> ${(after / 1024).toFixed(0)}KB)`
    );
  }
}

run();
