/**
 * In this demo
 * use fs.readdir to map all the *.jpg, *.png below the specific dir path
 */
const fs = require('fs');
const path = require('path');

let objs = [];
let count = 0;

const dirPath = '/Users/Egoist/Documents/Pictures/';

/**
 * ...
 * @param {*} dirPath
 */
let dirRead = dirPath => {
  fs.readdir(dirPath, (err, files) => {
    // if (err) throw err;
    if (err) return;
    let flag = true;

    files.map(file => {

      if (file.match(/^\..*/)) {
        console.log('this file match the regex: ', path.resolve(dirPath, file));
        return;
      }

      const extname = path.extname(file).trim().toLocaleLowerCase();
      // console.log(path.extname(file));

      if (extname === '.jpg' || extname === '.png') {
        objs.push({
          path: path.resolve(dirPath, file)
        });
        console.log(file, ++count);
      } else if (!extname) {
        flag = false;
        let childDirPath = path.resolve(dirPath, file);
        console.log('this is a dir: ', childDirPath);
        dirRead(childDirPath);
      }
    });

    if (flag) {
      let map = {
        // dirname: dirPath,
        imgs: objs
      }

      fs.writeFile('map.json', JSON.stringify(map, ['dirname', 'imgs', 'basename', 'path'], 2), err => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
  });
};

dirRead(dirPath);