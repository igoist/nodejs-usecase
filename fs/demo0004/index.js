const fs = require('fs');
const path = require('path');


const rootPath = '/Users/Egoist/Documents/Pictures/';

let CountJPG = 0;
let CountPNG = 0;
let CountGIF = 0;
let CountNoExt = 0;
let CountUnknown = 0;

let count = (err, files) => {
  // if (err) throw err;
  // console.timeEnd('Reading...');
  console.log('files.length: ', files.length);
  if (err) return;

  for (var i = 0; i < files.length; i++) {
    try {
      // console.log(files[i].ex);
      // console.log(path.extname(files[i]));
      let extname = path.extname(files[i]).toUpperCase();
      // console.log(extname);
      if (extname === '.JPG' || extname === '.JPEG') {
        CountJPG++;
        continue;
      }
      if (extname === '.PNG') {
        CountPNG++;
        continue;
      }
      if (extname === '.GIF') {
        CountGIF++;
        continue;
      }
      if (extname === '') {
        CountNoExt++;
        continue;
      }
      CountUnknown++;
    } catch (e) {
      console.log('Error: ', e);
    }
  }
  console.timeEnd('Reading...');
  console.log('CountJPG: ', CountJPG);
  console.log('CountPNG: ', CountPNG);
  console.log('CountGIF: ', CountGIF);
  console.log('CountNoExt: ', CountNoExt);
  console.log('CountUnknown: ', CountUnknown);
};

let dirRead = (dirPath, callback) => {
  console.time('Reading...');
  fs.readdir(dirPath, callback);
};

dirRead(rootPath, count);

/////////////////
function move(oldPath, newPath, callback) {

    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                copy();
            } else {
                callback(err);
            }
            return;
        }
        callback();
    });

    function copy() {
        var readStream = fs.createReadStream(oldPath);
        var writeStream = fs.createWriteStream(newPath);

        readStream.on('error', callback);
        writeStream.on('error', callback);

        readStream.on('close', function () {
            fs.unlink(oldPath, callback);
        });

        readStream.pipe(writeStream);
    }
}
