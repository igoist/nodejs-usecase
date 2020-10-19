/**
 * In this demo
 * use fs.readdir to map all the *.jpg, *.png below the specific dir path
 */
const fs = require('fs');
const path = require('path');

let objs = [];
let count = 0;

// const rootPath = '/Users/Egoist/Documents/Pictures/';
// const rootPath = '/Users/Egoist/Sites/Web/nav-map/';
const rootPath = '/Users/Egoist/Documents/Pictures/素材/gif/';
// const rootPath = '/Users/Egoist/Documents/Pictures/猴急的小月欣🐒/';

/**
 * ...
 * @param {*} dirPath
 */
let dirRead = (dirPath) => {
  fs.readdir(dirPath, (err, files) => {
    // if (err) throw err;
    if (err) return;
    let flag = true;

    files.map((file) => {
      if (file.match(/^\..*/)) {
        // console.log('this file match the regex: ', path.resolve(dirPath, file));
        return;
      }

      const extname = path.extname(file).trim().toLocaleLowerCase();
      // console.log(path.extname(file));

      // if (extname === '.jpg' || extname === '.png') {
      if (extname === '.jpg' || extname === '.jpeg') {
        let nowPath = path.resolve(dirPath, file);
        let relativePath = path.relative(rootPath, nowPath);

        objs.push({
          path: relativePath
        });
        console.log('file', ++count, ': ', file);
      } else if (!extname) {
        flag = false;
        let childDirPath = path.resolve(dirPath, file);
        // console.log('this is a dir: ', childDirPath);
        dirRead(childDirPath);
      }
    });

    if (flag) {
      let map = {
        imgs: objs
      };

      fs.writeFile('map.json', JSON.stringify(map, ['dirname', 'imgs', 'basename', 'path'], 2), (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
      });
    }
  });
};

// dirRead(rootPath);

const readDir = (dirName) => {
  return new Promise((resolve) => {
    fs.readdir(dirName, (err, files) => {
      if (err) {
        console.log(`read ${dirName} failed:`, err);
        resolve(false);
        return;
      }

      console.log(`${dirName} has been read!`);
      resolve(files);
    });
  });
};

const handleFile = (dirPath, lv) => {
  return async (file) => {
    if (file.match(/^\..*/)) {
      console.log('this file match the regex: ', path.resolve(dirPath, file));
      return null;
    }

    const extname = path.extname(file).trim().toLocaleLowerCase();

    let item = {
      name: file,
      path: dirPath + file,
      level: lv
    };

    console.log(`${lv} -- ${file}`);
    if (!extname) {
      // console.log('this guy is dir?!: ', file);
      item.path += '/';

      let r = await analyzeDir(item.path, item.level + 1);

      item.children = r;
    } else {
    }

    return item;
  };
};

// dirPath 必须以 / 结尾
// const analyzeDir = async (dirPath, lv) => {
//   let files = await readDir(dirPath);
//   let arr = [];

//   for (let i = 0; i < files.length; i++) {
//     let item = await handleFile(dirPath, lv)(files[i]);
//     if (item) {
//       arr.push(item);
//     }
//   }

//   console.log('================: ', lv);
//   return arr;
// };

const utils = require('../../Services/server/utils');

const { analyzeDir } = utils.file;

(async () => {
  let r = await analyzeDir(rootPath, 0);

  console.log('r: ', r);
})();
