/**
 * In this demo
 * use fs.readdir to map all the *.jpg, *.png below the specific dir path
 */
const fs = require('fs');
const path = require('path');

let objs = [];

const dirPath = '/Users/Egoist/Documents/Pictures';

fs.readdir(dirPath, (err, files) => {
  if (err) throw err;

  files.map(file => {

    if (file.match(/^\..*/)) {
      console.log('this file match the regex: ', file);
      return;
    }

    const extname = path.extname(file).trim().toLocaleLowerCase();
    console.log(path.extname(file));

    if (extname === '.jpg' || extname === '.png') {
      objs.push({
        basename: file
      })
    } else if (!extname) {
      let childDirPath = path.resolve(dirPath, file);
      console.log('this is a dir: ', childDirPath);
      fs.readdir(childDirPath, (err, files) => {
        if (err) throw err;

        files.map(file => {
          if (file.match(/^\..*/)) {
            console.log('this file match the regex: ', path.resolve(childDirPath, file));
            return;
          }

          console.log(childDirPath, file);
        })
      });
    }
  });

  let map = {
    dirname: dirPath,
    imgs: objs
  }

  fs.writeFile('map.json', JSON.stringify(map, ['dirname', 'imgs', 'basename'], 2), err => {
    if (err) throw err;
    console.log('The file has been saved!');
  });
});
