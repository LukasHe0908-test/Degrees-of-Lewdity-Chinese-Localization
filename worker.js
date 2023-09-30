const fs = require('fs');
const path = require('path');

process.env.WORK_FOLDER_PATH = path.resolve(__dirname, './');
process.env.BUILD_FOLDER_PATH = path.resolve(__dirname, './');

console.log(process.env.WORK_FOLDER_PATH, process.env.BUILD_FOLDER_PATH);

const file = fs
  .readFileSync(path.resolve(process.env.WORK_FOLDER_PATH, 'Untitled-1.js'))
  .toString();
// console.log(file);

const cspMetaRegex = /<meta[^\<]*?["']Content-Security-Policy["'][^\>]*?>/is;
const insertRegex = /list\.lastChild\.append\("[^"]*?indexedDB"\);/i;

(async () => {
  let text = fs
    .readFileSync(path.resolve(process.env.BUILD_FOLDER_PATH, 'index.html'))
    .toString();
  if (cspMetaRegex.test(text)) {
    console.log('replace cspMeta');
    text = text.replace(cspMetaRegex, '');
  }
  if (insertRegex.test(text) && !/id=\"c0e8ccb0\"/i.test(text)) {
    console.log('replace insert');
    text = text.replace(insertRegex, '$&' + file);
  }
  fs.writeFileSync(
    path.resolve(process.env.BUILD_FOLDER_PATH, 'index.html'),
    text
  );
})();
