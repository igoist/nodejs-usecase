const fs = require('fs');
const http = require('http');
const path = require('path');

const fileKey = 'data-h1-favorite-geek-test';
const inputFileName = `./data/${ fileKey }.json`;

let downloadImg = (imgDir, url) => {
  http.get(url, res => {
    let data = '';
    res.setEncoding('binary');

    res.on('data', chunk => {
      data += chunk;
    });

    res.on('end', () => {
      let imgPath = path.resolve(imgDir, path.basename(url)); //  + '.jpeg'
      fs.writeFile(imgPath, data, 'binary', err => {
        // if (err) throw err;
        if (err) return;
        console.log('Image downloaded: ', path.basename(url));
      });
    });
  }).on('error', (err) => {
    console.log(err);
  });
};

fs.readFile(inputFileName, (err, data) => {
  if (err) throw err;
  let tmp = JSON.parse(data);
  for (let i = 0; i < tmp.length; i++) {
    // let tmpStr = `${ tmp[i].pin_id }: ${tmp[i].imgUrl}\n`;
    // console.log(tmpStr);

    downloadImg('./img/test', tmp[i].imgUrl);
  }
});
