const fs = require('fs');
const path = require('path');

console.log(process.env.WORK_FOLDER_PATH, process.env.BUILD_FOLDER_PATH);

const file = fs
  .readFileSync(path.resolve(process.env.WORK_FOLDER_PATH, 'Untitled-1.js'))
  .toString();
// console.log(file);

const cspMetaRegex = /<meta[^\<]*?["']Content-Security-Policy["'][^\>]*?>/is;
const insertRegex = /idbToggleLabel.appendChild\(idbToggle\);/i;
const insertRegex_already =
  /\/\/ start-mark-c0e8ccb0(.*)\/\/ end-mark-c0e8ccb0(\n*)/is;

(async () => {
  replace('index.html');
  replace('Degrees of Lewdity VERSION.html.mod.html');
  replace('Degrees of Lewdity VERSION.html.mod-polyfill.html');
})();
function replace(filepath) {
  let text = fs
    .readFileSync(path.resolve(process.env.BUILD_FOLDER_PATH, filepath))
    .toString();
  if (cspMetaRegex.test(text)) {
    console.log('replace cspMeta');
    text = text.replace(cspMetaRegex, '');
  }
  if (insertRegex.test(text) && !text.includes(file)) {
    if (insertRegex_already.test(text)) {
      console.log('replace insert_already');
      text = text.replace(insertRegex_already, '');
    }
    console.log('replace insert');
    text = text.replace(insertRegex, '$&' + file);
  }
  fs.writeFileSync(path.resolve(process.env.BUILD_FOLDER_PATH, filepath), text);
}
