const fs = require('fs');
const path = require('path');

const dirPath = './img';

fs.readdir(dirPath, (err, files) => {
  if (err) throw err;
  // if (err) return;

  files.map(file => {
    const oldPath = path.resolve(dirPath, file);
    const newPath = oldPath + '.jpeg';

    fs.rename(oldPath, newPath, err => {
      if (err) throw err;

      console.log('complete: ', oldPath, ' => ', newPath);
    });
  });
});
