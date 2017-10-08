const path = require('path');
const fs = require('fs');

const fixtures = [];
const baseDir = path.join(__dirname, '../fixtures/ttml');
const filenames = fs.readdirSync(baseDir);

filenames.forEach(filename => {
  if (filename.endsWith('.ttml')) {
    const name = path.basename(filename, '.ttml');
    const filepath = path.join(baseDir, filename);
    const ttml = fs.readFileSync(filepath, 'utf8').trim();
    const object = require(`../fixtures/object/${name}.js`);
    fixtures.push({name, ttml, object});
  }
});

module.exports = fixtures;
