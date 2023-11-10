const fs = require('fs');
const path = require('path');

const dirName = 'data200410';

const mode = 1;

// const handle = (err, data) => {
//   if (err) throw err;
//   let tmp = JSON.parse(data);
//   for (let i = 0; i < tmp.length; i++) {
//     let tmpStr = `${ tmp[i].title }: ${tmp[i].link}\n`;
//     // console.log(tmpStr);

//     fs.appendFile(outputFileName, tmpStr, err => {
//       if (err) throw err;
//     });
//   }
// };

const handleWrap = (outputFileName) => {
  return (err, data) => {
    if (err) throw err;
    let tmp = JSON.parse(data);
    for (let i = 0; i < tmp.length; i++) {
      let tmpStr = `${ tmp[i].title }: ${tmp[i].link}\n`;
      // console.log(tmpStr);

      fs.appendFile(outputFileName, tmpStr, err => {
        if (err) throw err;
      });
    }
  };
}


//
let dirRead = (dirPath, callbackWrap, suffix) => {
  fs.readdir(dirPath, (err, files) => {
    // if (err) throw err;
    if (err) return;

    files.map(file => {

      if (file.match(/^\..*/)) {
        // console.log('this file match the regex: ', path.resolve(dirPath, file));
        return;
      }

      const extname = path.extname(file).trim().toLocaleLowerCase();

      if (extname === suffix) {
        // console.log(file);
        // console.log(path.resolve(dirPath, file));
        // console.log(file.match(/(.*)\.(json|md)/)[1]);
        const outputFileName = path.resolve(dirName, (file.match(/(.*)\.(json|md)/)[1] + '-translated.md'));
        fs.readFile(path.resolve(dirPath, file), callbackWrap(outputFileName));
      }
    });
  });
};


if (mode === 0) {
  // const fileKey = 'data-d00-1534493132065';
  // const fileKey = 'data-d01-1534493150043';
  // const fileKey = 'data-d02-1534493160955';
  // const fileKey = 'data-d02-1535107787231';
  // const fileKey = 'data-d01-1535107778353';
  // const fileKey = 'data-d00-1535107768700';
  const fileKey = 'data-d00-1550648622959';
  // const fileKey = 'data-d01-1550648631211';
  // const fileKey = 'data-d02-1550648645314';


  const inputFileName = `./${ dirName }/${ fileKey }.json`;
  const outputFileName = `./${ dirName }/${ fileKey }-translated.md`;

  fs.readFile(inputFileName, handleWrap(outputFileName));
} else if (mode === 1) {
  dirRead(dirName, handleWrap, '.json');
}

